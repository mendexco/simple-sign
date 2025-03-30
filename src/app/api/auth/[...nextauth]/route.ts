import { PrismaAdapter } from '@auth/prisma-adapter'
import { type AuthOptions, default as NextAuth } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { db } from '@utils/database'

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? ''
    })
  ],
  session: {
    strategy: 'jwt'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
