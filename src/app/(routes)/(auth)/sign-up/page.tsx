'use client'

import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCustomSession, useRouter } from '@hooks'

import { UNPROTECTED_ROUTES } from '@utils/constants'

import { signUpSchema } from './schema'

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const { signUpMutation } = useCustomSession()

  const onSubmit = async (formData: SignUpFormData) => {
    signUpMutation.mutate(formData)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <Form
        className="flex flex-col max-w-xs w-full gap-3"
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
          label="E-mail"
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
          size="sm"
          type="submit"
          variant={isValid ? 'shadow' : 'bordered'}
        >
          sign-up
        </Button>
      </Form>
      <Button
        className="font-semibold"
        isDisabled={signUpMutation.isPending}
        size="sm"
        variant="flat"
        onPress={() => router.push(UNPROTECTED_ROUTES.SIGN_IN)}
      >
        sign-in
      </Button>
    </div>
  )
}
