'use client'

import { Button } from '@heroui/react'

import { useRouter } from '@hooks'

import { PROTECTED_ROUTES } from '@utils/constants'

export default function DashboardPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-2 sm:mt-24 px-10 pb-10 ">
      <div className="flex flex-col gap-3 w-full backdrop-blur border-1 border-gray-500 rounded-xl p-10 rounded-3xl text-center sm:w-40 overflow-auto">
        <h2 className="text-medium font-semibold">sent</h2>
        <Button
          className="font-semibold"
          radius="full"
          size="sm"
          variant="ghost"
          onPress={() => router.push(PROTECTED_ROUTES.FILES_SENT)}
        >
          access
        </Button>
      </div>
      <div className="flex flex-col gap-3 w-full backdrop-blur border-1 border-gray-500 rounded-xl p-10 rounded-3xl text-center sm:w-40 overflow-auto">
        <h2 className="text-medium font-semibold">received</h2>
        <Button
          className="font-semibold"
          radius="full"
          size="sm"
          variant="ghost"
          onPress={() => router.push(PROTECTED_ROUTES.FILES_RECEIVED)}
        >
          access
        </Button>
      </div>
      <div className="flex flex-col gap-3 w-full backdrop-blur border-1 border-gray-500 rounded-xl p-10 rounded-3xl text-center sm:w-40 overflow-auto">
        <h2 className="text-medium font-semibold">upload</h2>
        <Button
          className="font-semibold"
          radius="full"
          size="sm"
          variant="ghost"
          onPress={() => router.push(PROTECTED_ROUTES.UPLOAD)}
        >
          access
        </Button>
      </div>
    </div>
  )
}
