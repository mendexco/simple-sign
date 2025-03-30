import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

import { OAUTH_PROVIDERS, PROTECTED_ROUTES } from '@utils/constants'

type AutoSignInProps = {
  provider: OAUTH_PROVIDERS
  targetRoute?: PROTECTED_ROUTES
}

const useCustomSession = () => {
  const router = useRouter()
  const { data: session } = useSession()

  function autoSignIn({ provider, targetRoute = PROTECTED_ROUTES.DASHBOARD }: AutoSignInProps) {
    if (!!session) {
      router.push(targetRoute)
      return
    }

    return signIn(provider, {
      callbackUrl: targetRoute
    })
  }

  return { autoSignIn }
}

export default useCustomSession
