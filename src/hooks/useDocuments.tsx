import { addToast, Button } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'

import { upload } from '@actions/document'

import type { DocumentUpload } from '@entities/document'

import { PROTECTED_ROUTES } from '@utils/constants'
import { encodePdfToBase64 } from '@utils/helpers'

import useCustomSession from './useCustomSession'
import useRouter from './useRouter'

type UploadDocumentParams = {
  email: string
  file: FileList
}

const useDocuments = () => {
  const { getUserWithEmail, session } = useCustomSession()
  const router = useRouter()

  const uploadDocumentMutation = useMutation({
    mutationFn: async ({ email, file }: UploadDocumentParams) => {
      const senderId = await getUserWithEmail(session?.user?.email).then((user) => {
        return user.id
      })

      const receiverId = await getUserWithEmail(email).then((user) => {
        return user.id
      })

      const fileSelected = file?.[0]
      const base64File = await encodePdfToBase64(fileSelected)

      const payload: DocumentUpload = {
        file: base64File,
        name: fileSelected?.name || '',
        receiverId,
        senderId
      }

      return upload(payload)
        .then((document) => {
          addToast({
            color: 'success',
            endContent: (
              <Button
                size="sm"
                variant="flat"
                onPress={() => router.push(PROTECTED_ROUTES.DASHBOARD)}
              >
                dashboard
              </Button>
            ),
            title: 'Document sent successfully!'
          })
          return document
        })
        .catch((error) => {
          console.error(error)
        })
    }
  })

  return { uploadDocumentMutation }
}

export default useDocuments
