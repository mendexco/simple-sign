export enum ROUTES {
  DASHBOARD = '/dashboard',
  HOME = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  UPLOAD = '/dashboard/upload'
}

export enum PROTECTED_ROUTES {
  DASHBOARD = ROUTES.DASHBOARD,
  UPLOAD = ROUTES.UPLOAD
}

export enum UNPROTECTED_ROUTES {
  HOME = ROUTES.HOME,
  SIGN_IN = ROUTES.SIGN_IN,
  SIGN_UP = ROUTES.SIGN_UP
}

export enum AUTH_PROVIDERS {
  CREDENTIALS = 'credentials',
  GITHUB = 'github',
  GOOGLE = 'google'
}
