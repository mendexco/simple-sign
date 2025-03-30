'use client'

import type { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'

export interface ProvidersProps {
  children: ReactNode
}

export default function CustomSessionProvider({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>
}
