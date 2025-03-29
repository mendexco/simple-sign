'use client'

import type { ReactNode } from 'react'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

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
