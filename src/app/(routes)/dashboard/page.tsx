'use client'

import { Button } from '@heroui/react'
import { signOut } from 'next-auth/react'

export default function DashboardPage() {
  return (
    <>
      dash
      <Button onPress={() => signOut()}>sign out</Button>
    </>
  )
}
