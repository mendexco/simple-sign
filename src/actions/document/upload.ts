'use server'

import { type DocumentUpload } from '@entities/document'

import { db } from '@utils/database'

export async function upload(documentUpload: DocumentUpload) {
  console.info('[/document/upload] Starting to upload file...')
  return db.document
    .create({
      data: {
        file: documentUpload.file,
        name: documentUpload.name,
        receiverId: documentUpload.receiverId,
        senderId: documentUpload.senderId
      }
    })
    .then((document) => {
      console.info('[/document/upload] Document sent successfully!')
      return document
    })
    .catch((e) => {
      console.error('[/document/upload] Error while uploading document: ', e.message)
      return null
    })
}
