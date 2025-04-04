import '@styles/globals.css'
import { type ReactNode } from 'react'

import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import ObservabilityProvider from '@providers/ObservabilityProvider'
import QueryProvider from '@providers/QueryProvider'
import SessionProvider from '@providers/SessionProvider'
import ThemeProvider from '@providers/ThemeProvider'
import ToastProvider from '@providers/ToastProvider'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat-mono'
})

export const metadata: Metadata = {
  title: 'SimpleSign'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <SessionProvider>
      <html
        suppressHydrationWarning
        lang="en"
      >
        <body className={`${montserrat.variable}`}>
          <ObservabilityProvider>
            <QueryProvider>
              <NextTopLoader showSpinner={false} />
              <ThemeProvider themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
                <ToastProvider />
                {children}
              </ThemeProvider>
            </QueryProvider>
          </ObservabilityProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
