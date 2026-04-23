import pdf from 'pdf-parse/lib/pdf-parse'

export async function extractTextFromFile(file: File) {
  const fileName = file.name.toLowerCase()

  if (fileName.endsWith('.txt')) {
    return await file.text()
  }

  if (fileName.endsWith('.pdf')) {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const parsed = await pdf(buffer)

    return parsed.text || ''
  }

  throw new Error('Unsupported file type. Please upload a PDF or TXT file.')
}