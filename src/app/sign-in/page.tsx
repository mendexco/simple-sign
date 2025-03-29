'use client'

import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
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

type FormData = z.infer<typeof schema>

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Form
        className="flex flex-col max-w-xs w-full gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          fullWidth
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          label="Email"
          type="email"
          {...register('email')}
        />
        <Input
          fullWidth
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          label="Password"
          type="password"
          {...register('password')}
        />
        <Button
          fullWidth
          className="font-semibold"
          color="primary"
          type="submit"
        >
          SIGN IN
        </Button>
      </Form>
    </div>
  )
}
