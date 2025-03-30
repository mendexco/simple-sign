import { useMutation } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { signIn, type SignInOptions, useSession } from 'next-auth/react'
import { closeSnackbar, useSnackbar } from 'notistack'

import { create } from '@actions/user'

import type { UserRegister } from '@entities/user'

import { AUTH_PROVIDERS, PROTECTED_ROUTES } from '@utils/constants'

type SignInProps = {
  provider: AUTH_PROVIDERS
  targetRoute?: PROTECTED_ROUTES
  additionalOptions?: Omit<SignInOptions, 'callbackUrl'>
}

type SignUpProps = UserRegister

const useCustomSession = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { enqueueSnackbar } = useSnackbar()

  function ensureRedirect(targetRoute?: PROTECTED_ROUTES) {
    if (!!targetRoute && targetRoute !== pathname) router.push(targetRoute)
  }

  async function customSignIn({
    provider,
    targetRoute = PROTECTED_ROUTES.DASHBOARD,
    additionalOptions = {}
  }: SignInProps) {
    if (!!session) {
      router.push(targetRoute)
      return
    }

    return signIn(provider, {
      callbackUrl: targetRoute,
      ...additionalOptions
    })
      .then((response) => {
        if (!response) return null
        if (!response.ok) throw new Error('Error while signing in.')
        ensureRedirect(targetRoute)
        closeSnackbar()
        return response
      })
      .catch((error) => {
        console.error('error', error)
        enqueueSnackbar(error.message, { variant: 'error' })
      })
  }

  const signInMutation = useMutation({
    mutationFn: customSignIn
  })

  const signUpMutation = useMutation({
    mutationFn: async (formData: SignUpProps) => {
      if (!!session) {
        router.push(PROTECTED_ROUTES.DASHBOARD)
        return
      }

      return create(formData)
        .then((user) => {
          if (!user?.id) throw new Error('Error while signing up.')
          customSignIn({
            additionalOptions: {
              callbackUrl: PROTECTED_ROUTES.DASHBOARD,
              email: formData.email,
              password: formData.password,
              redirect: false
            },
            provider: AUTH_PROVIDERS.CREDENTIALS,
            targetRoute: PROTECTED_ROUTES.DASHBOARD
          })
        })
        .catch((error) => {
          console.error('error', error)
          enqueueSnackbar(error.message, { variant: 'error' })
        })
    }
  })

  return { signInMutation, signUpMutation }
}

export default useCustomSession
