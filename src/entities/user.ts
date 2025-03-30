enum UserOrigin {
  CREDENTIALS = 'CREDENTIALS',
  OAUTH = 'OAUTH'
}

type UserRegister = {
  name: string
  email: string
  password: string
}

export { UserOrigin }
export type { UserRegister }
