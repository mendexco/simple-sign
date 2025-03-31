'use client'

import type { PDFDocumentProxy } from 'pdfjs-dist'

import { type FC, useState } from 'react'

import { Button, Modal, ModalContent } from '@heroui/react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/'
}

type DocumentPreviewProps = {
  file?: File | null
  onClose?: () => void
  open?: boolean
}

export const DocumentPreview: FC<DocumentPreviewProps> = ({ file = null, onClose, open = false }) => {
  const [numPages, setNumPages] = useState<number>()

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
  }

  return (
    <Modal
      isOpen={open && !!file}
      size="full"
      onClose={onClose}
    >
      <ModalContent>
        {file && (
          <div className="overflow-auto">
            <Document
              file={file}
              options={options}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (_el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                />
              ))}
            </Document>
            <Button
              fullWidth
              className="absolute bottom-0 z-10"
              radius="none"
              variant="shadow"
              onPress={onClose}
            >
              Close
            </Button>
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}
