import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const ALLOWED_OPERATIONS = ['create']

const shouldHashPassword = (operation: string, args: unknown): args is { data: { password: string } } => {
  return (
    ALLOWED_OPERATIONS.includes(operation) &&
    typeof args === 'object' &&
    args !== null &&
    'data' in args &&
    typeof args.data === 'object' &&
    args.data !== null &&
    'password' in args.data &&
    typeof args.data.password === 'string'
  )
}

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query']
  }).$extends({
    query: {
      user: {
        $allOperations({ operation, args, query }) {
          if (shouldHashPassword(operation, args)) {
            args.data.password = bcrypt.hashSync(args.data.password, 10)
          }

          return query(args)
        }
      }
    }
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
