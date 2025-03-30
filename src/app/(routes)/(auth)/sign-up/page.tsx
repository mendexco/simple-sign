'use client'

import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCustomSession } from '@hooks'

import { ROUTES } from '@utils/constants'

import { signUpSchema } from './schema'

type FormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema)
  })

  const { signUpMutation } = useCustomSession()

  const onSubmit = async (formData: FormData) => {
    signUpMutation.mutate(formData)
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
          isLoading={signUpMutation.isPending}
          type="submit"
        >
          SIGN UP
        </Button>
      </Form>
      <Button
        className="font-semibold"
        color="secondary"
        isDisabled={signUpMutation.isPending}
        size="sm"
        variant="light"
        onPress={() => router.push(ROUTES.SIGN_IN)}
      >
        sign-in
      </Button>
    </div>
  )
}
