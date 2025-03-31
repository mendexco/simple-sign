'use server'

import { db } from '@utils/database'

export async function signDocument(documentId: string) {
  console.info('[/document/signature] Starting to sign document...')
  return db.document
    .update({
      data: {
        signed: true
      },
      where: {
        id: documentId
      }
    })
    .then((document) => {
      console.info('[/document/upload] Document successfully signed!')
      return document
    })
    .catch((e) => {
      console.error('[/document/upload] Error while signing document: ', e.message)
      return null
    })
}
