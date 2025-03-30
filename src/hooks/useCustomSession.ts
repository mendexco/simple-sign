import { usePathname, useRouter } from 'next/navigation'
import { signIn, type SignInOptions, useSession } from 'next-auth/react'

import { create } from '@actions/user'

import type { UserRegister } from '@entities/user'

import { AUTH_PROVIDERS, PROTECTED_ROUTES } from '@utils/constants'

type AutoSignInProps = {
  provider: AUTH_PROVIDERS
  targetRoute?: PROTECTED_ROUTES
  additionalOptions?: Omit<SignInOptions, 'callbackUrl'>
}

const useCustomSession = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  function ensureRedirect(targetRoute: PROTECTED_ROUTES) {
    if (pathname !== targetRoute) router.push(targetRoute)
  }

  async function autoSignIn({
    provider,
    targetRoute = PROTECTED_ROUTES.DASHBOARD,
    additionalOptions = {}
  }: AutoSignInProps) {
    if (!!session) {
      router.push(targetRoute)
      return
    }

    return signIn(provider, {
      callbackUrl: targetRoute,
      ...additionalOptions
    }).then((response) => {
      if (response?.ok) ensureRedirect(targetRoute)
      return response
    })
  }

  async function registerUser(data: UserRegister) {
    const user = await create(data)

    if (user?.id) {
      return autoSignIn({
        additionalOptions: {
          email: data.email,
          password: data.password,
          redirect: false
        },
        provider: AUTH_PROVIDERS.CREDENTIALS
      })
    }
  }

  return { autoSignIn, registerUser }
}

export default useCustomSession
