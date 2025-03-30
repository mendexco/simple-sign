'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { customQueryClient } from '@utils/queryClient'
import type { ProvidersProps } from '@utils/types'

export default function QueryProvider({ children }: ProvidersProps) {
  return <QueryClientProvider client={customQueryClient}>{children}</QueryClientProvider>
}
