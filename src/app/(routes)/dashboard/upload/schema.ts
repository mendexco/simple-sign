import { z } from 'zod'

export const uploadSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Field is required'
    })
    .email({
      message: 'Invalid e-mail format'
    }),
  file: z
    .custom<FileList>(
      (val) => {
        return typeof window !== 'undefined' && val instanceof FileList && val.length > 0
      },
      { message: 'File is required' }
    )
    .refine((file) => file?.[0]?.type.startsWith('application/pdf'), {
      message: 'Invalid file'
    })
})
