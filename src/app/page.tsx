'use client'

import { Button } from '@heroui/button'

import { ThemeSwitcher } from '@components/ThemeSwitcher'

export default function Home() {
  return (
    <div>
      <Button color="primary">Click me</Button>
      <ThemeSwitcher />
    </div>
  )
}
