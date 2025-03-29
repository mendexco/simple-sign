'use client'

import { Button } from '@heroui/react'

import { ThemeSwitcher } from '@components/ThemeSwitcher'

export default function HomePage() {
  return (
    <div>
      <Button
        color="primary"
        onPress={() => {
          throw new Error('Not implemented')
        }}
      >
        Click me
      </Button>
      <ThemeSwitcher />
    </div>
  )
}
