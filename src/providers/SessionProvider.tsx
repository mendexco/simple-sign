'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

import type { ProvidersProps } from '@utils/types'

export default function SessionProvider({ children }: ProvidersProps) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
