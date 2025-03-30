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

export { UserOrigin }
export type { UserLogIn, UserRegister }
