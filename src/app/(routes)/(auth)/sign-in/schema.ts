import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Field is required'
    })
    .email({
      message: 'Invalid e-mail format'
    }),
  password: z.string().nonempty({
    message: 'Field is required'
  })
})
