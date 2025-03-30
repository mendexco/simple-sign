import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { ROUTES } from '@utils/constants'
import { isProtectedRoute } from '@utils/helpers'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })
  const isLoggedIn = !!token

  // doing only auto sign-out over here due to be a critical situation
  if (!isLoggedIn && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard']
}
