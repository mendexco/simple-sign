'use client'

import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@utils/constants'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button onPress={() => router.push(ROUTES.SIGN_IN)}>Enter</Button>
    </div>
  )
}
