import type { FC } from 'react'

import { Button } from '@heroui/react'

import { useRouter } from '@hooks'

import { PROTECTED_ROUTES } from '@utils/constants'

type DashCardProps = {
  title: string
  route: PROTECTED_ROUTES
}

export const DashCard: FC<DashCardProps> = ({ title, route }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-3 w-full backdrop-blur border-1 border-gray-500 rounded-xl p-10 rounded-3xl text-center sm:w-40 overflow-auto">
      <h2 className="text-medium font-semibold">{title}</h2>
      <Button
        className="font-semibold"
        radius="full"
        size="sm"
        variant="ghost"
        onPress={() => router.push(route)}
      >
        access
      </Button>
    </div>
  )
}
