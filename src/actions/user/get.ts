'use server'

import { db } from '@utils/database'

export async function getUserById(id: string) {
  console.info('[/user/get] Starting to get user by id...')
  return db.user
    .findUnique({
      where: {
        id
      }
    })
    .then((user) => {
      if (!user?.id) throw new Error('User not found!')
      console.info('[/user/get] User found!')
      return user
    })
    .catch((error) => {
      console.error('[/user/get] Error while searching user: ', error.message)
      return null
    })
}

export async function getUserByEmail(email: string) {
  console.info('[/user/get] Starting to get user by email...')
  return db.user
    .findUnique({
      where: {
        email
      }
    })
    .then((user) => {
      if (!user?.id) throw new Error('User not found!')
      console.info('[/user/get] User found!')
      return user
    })
    .catch((error) => {
      console.error('[/user/get] Error while searching user: ', error.message)
      return null
    })
}
