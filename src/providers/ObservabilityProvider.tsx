'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import type { ProvidersProps } from '@utils/types'

export default function ObservabilityProvider({ children }: ProvidersProps) {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      {children}
    </>
  )
}
