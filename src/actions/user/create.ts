'use server'

import { UserOrigin, type UserRegister } from '@entities/user'

import { db } from '@utils/database'

export async function create(userRegister: UserRegister) {
  console.info('[/user/create] Starting user creation...')
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
      console.info('[/user/create] User successfully created!')
      return user
    })
    .catch((e) => {
      console.error('[/user/create] Error while creating user: ', e.message)
      return null
    })
}
