'use server'

import { UserOrigin, type UserRegister } from '@entities/user'

import { db } from '@utils/database'

export async function create(userRegister: UserRegister) {
  console.info('[/user/upload] Starting user creation...')
  return db.user
    .create({
      data: {
        email: userRegister.email,
        name: userRegister.name,
        origin: UserOrigin.CREDENTIALS,
        password: userRegister.password
      }
    })
    .then((user) => {
      console.info('[/user/upload] User successfully created!')
      return user
    })
    .catch((error) => {
      console.error('[/user/upload] Error while creating user: ', error.message)
      return null
    })
}
