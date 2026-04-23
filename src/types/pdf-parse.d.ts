declare module 'pdf-parse/lib/pdf-parse' {
    type PdfParseResult = {
        numpages: number
        numrender: number
        info: unknown
        metadata: unknown
        text: string
        version: string
    }

    function pdfParse(dataBuffer: Buffer): Promise<PdfParseResult>

    export default pdfParse
}