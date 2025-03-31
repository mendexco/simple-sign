'use client'

import { useEffect, useState } from 'react'

import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaExpandArrowsAlt } from 'react-icons/fa'
import { z } from 'zod'

import { useDocuments } from '@hooks'

import { DocumentPreview } from '@components/DocumentPreview'

import { uploadSchema } from './schema'

type UploadFormData = z.infer<typeof uploadSchema>

export default function UploadPage() {
  const [openUploadDialog, setOpenUploadDialog] = useState(false)

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema)
  })

  const { uploadDocumentMutation } = useDocuments()

  const selectedFileWatch = watch('file')?.[0] || null

  const onSubmit = async (data: UploadFormData) => {
    setOpenUploadDialog(false)
    uploadDocumentMutation.mutate(data)
  }

  function onFileChange(file: File | undefined) {
    if (file) setOpenUploadDialog(true)
  }

  useEffect(() => {
    onFileChange(selectedFileWatch)
  }, [selectedFileWatch])

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-0 sm:mt-24 p-4 gap-10">
        <h1 className="text-2xl font-bold">Upload Document</h1>
        <Form
          className="flex gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Input
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
              label="Email"
              type="email"
              {...register('email')}
            />
            <div className="flex gap-2">
              <Input
                accept="application/pdf"
                errorMessage={errors.file?.message}
                isInvalid={!!errors.file}
                label="File"
                size="sm"
                type="file"
                {...register('file')}
              />
              <Button
                isIconOnly
                aria-label="Edit"
                isDisabled={!selectedFileWatch}
                size="lg"
                variant="faded"
                onPress={() => setOpenUploadDialog(true)}
              >
                <FaExpandArrowsAlt size={20} />
              </Button>
            </div>
            <Button
              className="font-semibold"
              color="primary"
              isLoading={uploadDocumentMutation.isPending}
              size="sm"
              type="submit"
              variant={isValid ? 'shadow' : 'bordered'}
            >
              send
            </Button>
          </div>
        </Form>
      </div>
      <DocumentPreview
        file={selectedFileWatch}
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
      />
    </>
  )
}
