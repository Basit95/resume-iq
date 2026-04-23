import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'View ResumeIQ demo pricing plans including Free, Pro, and Enterprise SaaS-style packages for resume analysis.',
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingPage() {
  return (
    <section className="container-app py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-white">Pricing</h1>
        <p className="mt-4 text-slate-300">
          Demo pricing plans for this portfolio SaaS project. Payments are not enabled
          because this is a free practice project.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="card-ui p-6">
          <h2 className="text-2xl font-semibold text-white">Free</h2>
          <p className="mt-2 text-slate-300">5 analyses per month</p>
          <p className="mt-6 text-3xl font-bold text-white">$0</p>
          <Link href="/signup" className="btn-primary mt-6 w-full">
            Start Free
          </Link>
        </div>

        <div className="card-ui border-indigo-400/40 p-6">
          <h2 className="text-2xl font-semibold text-white">Pro</h2>
          <p className="mt-2 text-slate-300">50 analyses per month</p>
          <p className="mt-6 text-3xl font-bold text-white">$9</p>
          <button className="btn-secondary mt-6 w-full" disabled>
            Demo Only
          </button>
        </div>

        <div className="card-ui p-6">
          <h2 className="text-2xl font-semibold text-white">Enterprise</h2>
          <p className="mt-2 text-slate-300">Custom workflows and reporting</p>
          <p className="mt-6 text-3xl font-bold text-white">Custom</p>
          <button className="btn-secondary mt-6 w-full" disabled>
            Demo Only
          </button>
        </div>
      </div>
    </section>
  )
}