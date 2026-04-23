'use client'

import { useState } from 'react'
import { toast } from 'sonner'

type CopySummaryButtonProps = {
    text: string
}

export default function CopySummaryButton({ text }: CopySummaryButtonProps) {
    const [loading, setLoading] = useState(false)

    async function handleCopy() {
        try {
            setLoading(true)
            await navigator.clipboard.writeText(text)
            toast.success('Summary copied to clipboard.')
        } catch {
            toast.error('Could not copy summary.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button onClick={handleCopy} className='btn-secondary print:hidden' disabled={loading}>
            {loading ? 'Copying...' : 'Copy Summary'}
        </button>
    )
}