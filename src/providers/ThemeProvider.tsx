'use client'

import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

import { useRouter } from '@hooks'

import type { ProvidersProps } from '@utils/types'

type ThemeProvidersProps = ProvidersProps & {
  themeProps?: ThemeProviderProps
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

export default function ThemeProvider({ children, themeProps }: ThemeProvidersProps) {
  const router = useRouter()

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  )
}
