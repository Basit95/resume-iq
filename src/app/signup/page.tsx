'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function SignupPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        const message = data.error || 'Signup failed.'
        setError(message)
        toast.error(message)
        setLoading(false)
        return
      }

      toast.success('Account created successfully.')
      router.push('/dashboard')
      router.refresh()
    } catch {
      const message = 'Something went wrong.'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className="container-app flex min-h-[calc(100vh-80px)] items-center justify-center py-16">
      <div className="card-ui w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="mt-2 text-slate-300">Start using ResumeIQ for free.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Full Name</label>
            <input
              type="text"
              name="name"
              className="input-ui"
              placeholder="Enter Your Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              className="input-ui"
              placeholder="Enter Your Password"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              className="input-ui"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </section>
  )
}