'use client'

import { Button } from '@heroui/react'

import { useRouter } from '@hooks'

import { HomeNavbar } from '@components/HomeNavbar'

import { UNPROTECTED_ROUTES } from '@utils/constants'

export default function HomePage() {
  const router = useRouter()

  return (
    <>
      <HomeNavbar />
      <div className="w-full flex flex-col justify-center items-center mt-32 gap-6">
        <h1 className="text-8xl font-bold text-center">
          SIMPLE
          <br />
          SIGN
        </h1>
        <Button
          className="font-semibold"
          variant="flat"
          onPress={() => router.push(UNPROTECTED_ROUTES.SIGN_IN)}
        >
          start now
        </Button>
      </div>
    </>
  )
}
