'use server'

import bcrypt from 'bcrypt'

import { signInSchema } from '@app/(routes)/(auth)/sign-in/schema'

import type { UserLogIn } from '@entities/user'

import { db } from '@utils/database'

export async function logIn(userLogIn: UserLogIn | undefined) {
  console.info('[/user/log-in] Starting search for credentials matching...')

  const parsedCredentials = signInSchema.safeParse(userLogIn)
  if (parsedCredentials.error) throw new Error('Invalid credentials')
  const { email, password } = parsedCredentials.data

  return db.user
    .findUnique({
      where: {
        email
      }
    })
    .then(async (user) => {
      if (!user?.password) {
        console.info('[/user/log-in] No user found with this e-mail address!')
        throw new Error('Invalid credentials!')
      }
      if (user) console.info('[/user/log-in] User e-mail was found!')

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        console.info('[/user/log-in] Invalid password!')
        throw new Error('Invalid credentials!')
      }

      console.info('[/user/log-in] Password matches!')
      return user
    })
    .catch((e) => {
      console.error('[/user/log-in] Error while searching user: ', e.message)
      return null
    })
}
