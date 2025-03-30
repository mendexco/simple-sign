'use client'

import { ToastProvider as HeroUIToastProvider } from '@heroui/react'

const AUTO_HIDE_DURATION = 5000
const MAX_SNACK = 3

export default function ToastProvider() {
  return (
    <HeroUIToastProvider
      maxVisibleToasts={MAX_SNACK}
      placement="bottom-center"
      toastProps={{
        shouldShowTimeoutProgress: true,
        timeout: AUTO_HIDE_DURATION
      }}
    />
  )
}
