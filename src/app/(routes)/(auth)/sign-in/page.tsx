'use client'

import { useState } from 'react'

import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { z } from 'zod'

import { useCustomSession, useRouter } from '@hooks'

import { AUTH_PROVIDERS, UNPROTECTED_ROUTES } from '@utils/constants'

import { signInSchema } from './schema'

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInPage() {
  const router = useRouter()
  const { signInMutation } = useCustomSession()

  const [isPasswordVisible, setPassordVisible] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInFormData) => {
    signInMutation.mutate({
      additionalOptions: {
        email: data.email,
        password: data.password,
        redirect: false
      },
      provider: AUTH_PROVIDERS.CREDENTIALS
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <Form
        className="flex flex-col max-w-xs w-full gap-3 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={() => setPassordVisible((current) => !current)}
            >
              {isPasswordVisible ? (
                <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          label="Password"
          type={isPasswordVisible ? 'text' : 'password'}
          {...register('password')}
        />
        <Button
          fullWidth
          className="font-semibold"
          color="primary"
          isLoading={signInMutation.isPending}
          size="sm"
          type="submit"
          variant={isValid ? 'shadow' : 'bordered'}
        >
          sign-in
        </Button>
      </Form>
      <span className="text-xs font-semibold">or</span>
      <div className="flex flex-col gap-2 align-center items-center">
        <div className="flex gap-1">
          <Button
            isIconOnly
            isDisabled={signInMutation.isPending}
            variant="solid"
            onPress={() =>
              signInMutation.mutate({
                provider: AUTH_PROVIDERS.GITHUB
              })
            }
          >
            <FaGithub size={32} />
          </Button>
        </div>
        <Button
          className="font-semibold"
          isDisabled={signInMutation.isPending}
          size="sm"
          variant="flat"
          onPress={() => router.push(UNPROTECTED_ROUTES.SIGN_UP)}
        >
          create an account
        </Button>
      </div>
    </div>
  )
}
