import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { signIn, type SignInOptions, signOut, useSession } from 'next-auth/react'

import { useRouter } from '@hooks'

import { create } from '@actions/user'
import { getUserByEmail } from '@actions/user/get'

import type { UserRegister } from '@entities/user'

import { AUTH_PROVIDERS, PROTECTED_ROUTES } from '@utils/constants'

type SignInParams = {
  provider: AUTH_PROVIDERS
  targetRoute?: PROTECTED_ROUTES
  additionalOptions?: Omit<SignInOptions, 'callbackUrl'>
}

type SignUpParams = UserRegister

const useCustomSession = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  async function getUserWithEmail(email?: string | null) {
    if (!email) throw new Error('No e-mail provided.')

    return getUserByEmail(email)
      .catch((error) => {
        console.error('Error while getting user: ', error.message)
      })
      .then((user) => {
        if (!user?.id) throw new Error('Error while getting user.')
        return user
      })
  }

  function ensureRedirect(targetRoute?: PROTECTED_ROUTES) {
    if (!!targetRoute && targetRoute !== pathname) router.push(targetRoute)
  }

  async function customSignIn({
    provider,
    targetRoute = PROTECTED_ROUTES.DASHBOARD,
    additionalOptions = {}
  }: SignInParams) {
    if (!!session && session.user?.email === additionalOptions.email) {
      router.push(targetRoute)
      return
    }

    await signOut({
      redirect: false
    })

    return signIn(provider, {
      callbackUrl: targetRoute,
      ...additionalOptions
    })
      .then((response) => {
        if (!response) return null
        if (!response.ok) throw new Error('Error while signing in.')
        ensureRedirect(targetRoute)
        return response
      })
      .catch((error) => {
        console.error('error', error)
        addToast({
          color: 'danger',
          title: error.message
        })
      })
  }

  const signInMutation = useMutation({
    mutationFn: customSignIn
  })

  const signUpMutation = useMutation({
    mutationFn: async (formData: SignUpParams) => {
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
          addToast({
            color: 'danger',
            title: error.message
          })
        })
    }
  })

  return { getUserWithEmail, session, signInMutation, signUpMutation }
}

export default useCustomSession
