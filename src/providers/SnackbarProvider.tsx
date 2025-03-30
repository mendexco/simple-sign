'use client'

import { Button } from '@heroui/react'
import { closeSnackbar, SnackbarProvider as NotistackSnackbarProvider } from 'notistack'
import { IoIosClose } from 'react-icons/io'

import type { ProvidersProps } from '@utils/types'

const AUTO_HIDE_DURATION = 3000
const CLOSE_ICON_SIZE = 24
const MAX_SNACK = 2

export default function SnackbarProvider({ children }: ProvidersProps) {
  return (
    <NotistackSnackbarProvider
      preventDuplicate
      action={(snackbarId) => (
        <Button
          isIconOnly
          aria-label={`Close snackbar ${snackbarId}`}
          radius="full"
          size="sm"
          variant="light"
          onPress={() => closeSnackbar(snackbarId)}
        >
          <IoIosClose size={CLOSE_ICON_SIZE} />
        </Button>
      )}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      autoHideDuration={AUTO_HIDE_DURATION}
      maxSnack={MAX_SNACK}
    >
      {children}
    </NotistackSnackbarProvider>
  )
}
