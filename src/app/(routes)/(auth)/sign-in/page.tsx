'use client'

import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCustomSession } from '@hooks'

import { AUTH_PROVIDERS, ROUTES } from '@utils/constants'

import { signInSchema } from './schema'

type FormData = z.infer<typeof signInSchema>

export default function SignInPage() {
  const router = useRouter()
  const { autoSignIn } = useCustomSession()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: FormData) => {
    await autoSignIn({
      additionalOptions: {
        email: data.email,
        password: data.password,
        redirect: false
      },
      provider: AUTH_PROVIDERS.CREDENTIALS
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
      <Button
        className="font-semibold"
        color="default"
        size="sm"
        variant="light"
        onPress={() =>
          autoSignIn({
            provider: AUTH_PROVIDERS.GITHUB
          })
        }
      >
        sign-in with github
      </Button>
      <Button
        className="font-semibold"
        color="secondary"
        size="sm"
        variant="light"
        onPress={() => router.push(ROUTES.SIGN_UP)}
      >
        sign-up first
      </Button>
    </div>
  )
}
