'use client'

import type { ReactNode } from 'react'

export default function FilesLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return <div className="px-8">{children}</div>
}
