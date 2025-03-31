import { z } from 'zod'

export const signUpSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Field is required'
    })
    .email({
      message: 'Invalid e-mail format'
    }),
  name: z.string().nonempty({
    message: 'Field is required'
  }),
  password: z.string().nonempty({
    message: 'Field is required'
  })
})
