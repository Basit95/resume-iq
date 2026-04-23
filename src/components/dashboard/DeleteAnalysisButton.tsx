'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DeleteAnalysisButton({ id }: { id: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        const confirmed = window.confirm("Are you sure you want to delete this analysis?")
        if (!confirmed) return;

        setLoading(true)

        try {
            const response = await fetch(`/api/analysis/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                toast.error('Failed to delete analysis.')
                setLoading(false)
                return
            }

            toast.success('Analysis deleted successfully.')
            router.refresh()
        } catch {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className='rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/20'
        >
            {loading ? 'Deleting...' : 'Delete'}
        </button>
    )
}