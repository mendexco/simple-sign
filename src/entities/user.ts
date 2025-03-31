import { $Enums } from '@prisma/client'

enum UserOrigin {
  CREDENTIALS = 'CREDENTIALS',
  OAUTH = 'OAUTH'
}

type UserLogIn = {
  email: string
  password: string
}

type UserRegister = {
  name: string
  email: string
  password: string
}

type UserObject = {
  id: string
  name?: string | null
  email?: string
  emailVerified?: Date | null
  password?: string | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
  origin: $Enums.UserOrigin
}

export { UserOrigin }
export type { UserLogIn, UserObject, UserRegister }
