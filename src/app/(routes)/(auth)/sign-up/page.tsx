'use client'

import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { create } from '@actions/user'

import { ROUTES } from '@utils/constants'

const schema = z.object({
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

type FormData = z.infer<typeof schema>

export default function SignUpPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    console.log('data', data)
    const response = await create(data)
    console.log('response', response)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form
        className="flex flex-col max-w-xs w-full gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          fullWidth
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          label="Name"
          type="name"
          {...register('name')}
        />
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
          SIGN UP
        </Button>
      </Form>
      <Button
        className="font-semibold"
        color="secondary"
        size="sm"
        variant="light"
        onPress={() => router.push(ROUTES.SIGN_IN)}
      >
        sign-in
      </Button>
    </div>
  )
}
