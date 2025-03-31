import { addToast, Button } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'

import { getReceived, getSent, signDocument, upload } from '@actions/document'

import type { DocumentListedWithReceiver, DocumentListedWithSender, DocumentUpload } from '@entities/document'

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
        return user?.id
      })

      const receiverId = await getUserWithEmail(email).then((user) => {
        return user?.id
      })

      if (!senderId || !receiverId) {
        addToast({
          color: 'danger',
          title: 'Error while getting user.'
        })
        throw new Error('User not found!')
      }

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
                color="success"
                size="sm"
                variant="shadow"
                onPress={() => router.push(PROTECTED_ROUTES.FILES_SENT)}
              >
                sent files
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

  const signDocumentMutation = useMutation({
    mutationFn: async ({ documentId, refetch }: { documentId: string; refetch: () => void }) => {
      return signDocument(documentId)
        .then((document) => {
          addToast({
            color: 'success',
            endContent: (
              <Button
                color="success"
                size="sm"
                variant="shadow"
                onPress={refetch}
              >
                reload
              </Button>
            ),
            title: 'Document signed!'
          })
          return document
        })
        .catch((error) => {
          console.error(error)
        })
    }
  })

  const listReceivedFiles = async () => {
    const userId = await getUserWithEmail(session?.user?.email).then((user) => {
      return user?.id
    })

    if (!userId) {
      addToast({
        color: 'danger',
        title: 'Error while getting user.'
      })
      throw new Error('User not found!')
    }

    return (await getReceived(userId)
      .then((documents) => {
        return documents ?? []
      })
      .catch((error) => {
        console.error(error)
        return []
      })) as DocumentListedWithSender[]
  }

  const listSentFiles = async () => {
    const userId = await getUserWithEmail(session?.user?.email).then((user) => {
      return user?.id
    })

    if (!userId) {
      addToast({
        color: 'danger',
        title: 'Error while getting user.'
      })
      throw new Error('User not found!')
    }

    return (await getSent(userId)
      .then((documents) => {
        return documents ?? []
      })
      .catch((error) => {
        console.error(error)
        return []
      })) as DocumentListedWithReceiver[]
  }

  return { listReceivedFiles, listSentFiles, signDocumentMutation, uploadDocumentMutation }
}

export default useDocuments
