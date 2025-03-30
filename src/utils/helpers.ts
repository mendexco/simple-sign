import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '@utils/constants'

export const isProtectedRoute = (route: string) => {
  return Object.values(PROTECTED_ROUTES).includes(route as unknown as PROTECTED_ROUTES)
}

export const isUnprotectedRoute = (route: string) => {
  return Object.values(UNPROTECTED_ROUTES).includes(route as unknown as UNPROTECTED_ROUTES)
}

export async function encodePdfToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file || file.type !== 'application/pdf') {
      return reject(new Error('Invalid PDF file.'))
    }

    const reader = new FileReader()
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1]
      resolve(base64)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function decodeBase64ToPdf(base64: string, filename = 'document.pdf'): File {
  const byteCharacters = atob(base64)
  const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0))
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: 'application/pdf' })
  return new File([blob], filename, { type: 'application/pdf' })
}
