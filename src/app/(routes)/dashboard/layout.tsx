'use client'

import type { ReactNode } from 'react'

import { LoggedNavbar } from '@components/LoggedNavbar'

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <LoggedNavbar />
      {children}
    </>
  )
}
