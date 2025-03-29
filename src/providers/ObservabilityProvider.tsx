'use client'

import type { ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export interface ProvidersProps {
  children: ReactNode
}

export default function ObservabilityProvider({ children }: ProvidersProps) {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      {children}
    </>
  )
}
