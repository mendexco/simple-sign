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
      <div className="w-full  flex justify-center items-center">
        <Button
          className="font-semibold"
          onPress={() => router.push(UNPROTECTED_ROUTES.SIGN_IN)}
        >
          enter
        </Button>
      </div>
    </>
  )
}
