'use client'

import { Button } from '@heroui/react'

import { ThemeSwitcher } from '@components/ThemeSwitcher'

export default function HomePage() {
  return (
    <div>
      <Button color="primary">Click me</Button>
      <ThemeSwitcher />
    </div>
  )
}
