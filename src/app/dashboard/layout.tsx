import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { requireUser } from '@/lib/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'ResumeIQ protected dashboard for resume analysis and history.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUser()

  return (
    <section className="container-app py-10">
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-slate-400">ResumeIQ Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold text-white">
          Resume analysis workspace
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <DashboardSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}