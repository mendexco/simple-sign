import type { UserObject } from '@entities/user'

type DocumentUpload = {
  file: string
  name: string
  receiverId: string
  senderId: string
}

type DocumentObject = {
  id: string
  name: string | null
  createdAt: Date
  updatedAt: Date
  file: string
  senderId: string
  receiverId: string
  signed: boolean | null
}

type DocumentListedWithReceiver = DocumentObject & {
  receiver: UserObject
}

type DocumentListedWithSender = DocumentObject & {
  sender: UserObject
}

export type { DocumentListedWithReceiver, DocumentListedWithSender, DocumentObject, DocumentUpload }
