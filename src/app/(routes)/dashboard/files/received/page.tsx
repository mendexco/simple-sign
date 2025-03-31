'use client'

import { useCallback, useState } from 'react'

import { Button, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { FaCheckCircle } from 'react-icons/fa'
import { FaCircleXmark } from 'react-icons/fa6'

import { useDocuments } from '@hooks'

import { DocumentPreview } from '@components/DocumentPreview'

import type { DocumentListedWithSender } from '@entities/document'

import { decodeBase64ToPdf } from '@utils/helpers'

enum COLUMNS_UID {
  SENDER = 'sender',
  FILE_NAME = 'file_name',
  CREATION_DATE = 'creation_date',
  FILE_PREVIEW = 'file_preview',
  IS_SIGNED = 'is_signed'
}

const COLUMNS = [
  { name: 'SENDER', uid: COLUMNS_UID.SENDER },
  { name: 'FILE NAME', uid: COLUMNS_UID.FILE_NAME },
  { name: 'CREATION DATE', uid: COLUMNS_UID.CREATION_DATE },
  { name: 'FILE PREVIEW', uid: COLUMNS_UID.FILE_PREVIEW },
  { name: 'SIGNED', uid: COLUMNS_UID.IS_SIGNED }
]

export default function FilesReceivedPage() {
  const { listReceivedFiles, signDocumentMutation } = useDocuments()
  const { data, isFetching, refetch } = useQuery({
    initialData: [],
    queryFn: listReceivedFiles,
    queryKey: ['documents', 'listReceivedFiles']
  })

  const [filePreview, setFilePreview] = useState<File | null>(null)
  const [openUploadDialog, setOpenUploadDialog] = useState(false)

  function handlePreviewDocument(file: string) {
    setFilePreview(decodeBase64ToPdf(file))
    setOpenUploadDialog(true)
  }

  const renderCell = useCallback((document: DocumentListedWithSender, columnKey: COLUMNS_UID) => {
    switch (columnKey) {
      case COLUMNS_UID.SENDER:
        return (
          <User
            avatarProps={{ name: document.sender.name?.charAt(0), radius: 'lg' }}
            name={document.sender.name}
          >
            {document.sender.email}
          </User>
        )
      case COLUMNS_UID.FILE_NAME:
        return <p className="text-bold text-sm capitalize">{document.name}</p>
      case COLUMNS_UID.CREATION_DATE:
        return (
          <p className="text-bold text-sm capitalize">
            {new Intl.DateTimeFormat('pt-BR', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }).format(new Date(document.createdAt))}
          </p>
        )
      case COLUMNS_UID.FILE_PREVIEW:
        return (
          <Button
            className="font-semibold"
            size="sm"
            variant="ghost"
            onPress={() => handlePreviewDocument(document.file)}
          >
            expand
          </Button>
        )
      case COLUMNS_UID.IS_SIGNED:
        return document.signed ? (
          <Button
            size="sm"
            variant="bordered"
          >
            <FaCheckCircle
              className="text-green-600"
              size={14}
            />
            <p className="text-bold text-sm capitalize font-semibold">
              {new Intl.DateTimeFormat('pt-BR', {
                day: 'numeric',
                month: 'numeric'
              }).format(new Date(document.updatedAt))}
            </p>
          </Button>
        ) : (
          <Button
            isIconOnly
            isLoading={signDocumentMutation.isPending}
            size="sm"
            variant="bordered"
            onPress={() => signDocumentMutation.mutate({ documentId: document.id, refetch })}
          >
            <FaCircleXmark
              className="text-red-700"
              size={14}
            />
          </Button>
        )
      default:
        return null
    }
  }, [])

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align="start"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={'No documents to display.'}
          isLoading={isFetching && !data.length}
          items={data}
          loadingContent={
            <div className="flex flex-col gap-4 w-full px-4">
              <Skeleton className="rounded-lg">
                <div className="h-10 w-full px-2 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-10 w-full px-2 rounded-lg bg-default-200" />
              </Skeleton>
            </div>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey as COLUMNS_UID)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DocumentPreview
        file={filePreview}
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
      />
    </>
  )
}
