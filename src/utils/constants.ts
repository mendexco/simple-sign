export enum ROUTES {
  DASHBOARD = '/dashboard',
  FILES_RECEIVED = '/dashboard/files/received',
  FILES_SENT = '/dashboard/files/sent',
  HOME = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  UPLOAD = '/dashboard/upload'
}

export enum PROTECTED_ROUTES {
  DASHBOARD = ROUTES.DASHBOARD,
  FILES_RECEIVED = ROUTES.FILES_RECEIVED,
  FILES_SENT = ROUTES.FILES_SENT,
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
