'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogoutButton() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function handleLogout() {
        setLoading(true)

        try {
            await fetch('/api/logout', {
                method: 'POST',
            })

            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button onClick={handleLogout} className="btn-secondary" disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    )
}