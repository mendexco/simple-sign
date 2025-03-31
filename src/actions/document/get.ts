'use server'

import type { DocumentListedWithReceiver, DocumentListedWithSender } from '@entities/document'

import { db } from '@utils/database'

export async function getReceived(receiverId: string) {
  console.info('[/document/list/received] Starting to list received documents...')
  return db.document
    .findMany({
      include: {
        sender: true
      },
      orderBy: { updatedAt: 'desc' },
      where: {
        receiverId
      }
    })
    .then((documents): DocumentListedWithSender[] => {
      console.info('[/document/list/received] Found received documents!')
      return documents
    })
    .catch((e) => {
      console.error('[/document/list/received] Error while listing documents: ', e.message)
      return null
    })
}

export async function getSent(senderId: string) {
  console.info('[/document/list/sent] Starting to list sent documents...')
  return db.document
    .findMany({
      include: {
        receiver: true
      },
      orderBy: { updatedAt: 'desc' },
      where: {
        senderId
      }
    })
    .then((documents): DocumentListedWithReceiver[] => {
      console.info('[/document/list/sent] Found sent documents!')
      return documents
    })
    .catch((e) => {
      console.error('[/document/list/files] Error while listing documents: ', e.message)
      return null
    })
}
