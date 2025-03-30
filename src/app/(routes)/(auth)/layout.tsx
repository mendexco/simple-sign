'use client'

import type { ReactNode } from 'react'

import { Button } from '@heroui/react'
import { IoReturnDownBack } from 'react-icons/io5'

import { useRouter } from '@hooks'

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const router = useRouter()

  return (
    <>
      <div className="absolute top-4 left-4">
        <Button
          isIconOnly
          radius="full"
          size="lg"
          variant="light"
          onPress={() => router.back()}
        >
          <IoReturnDownBack size={32} />
        </Button>
      </div>
      {children}
    </>
  )
}
