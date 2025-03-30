import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '@utils/constants'

export const isProtectedRoute = (route: string) => {
  return Object.values(PROTECTED_ROUTES).includes(route as unknown as PROTECTED_ROUTES)
}

export const isUnprotectedRoute = (route: string) => {
  return Object.values(UNPROTECTED_ROUTES).includes(route as unknown as UNPROTECTED_ROUTES)
}
