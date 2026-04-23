'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/upload', label: 'Analyze Resume' },
  { href: '/dashboard/history', label: 'History' },
  { href: '/dashboard/settings', label: 'Settings' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="card-ui h-fit p-4">
      <h2 className="mb-4 text-lg font-semibold text-white">Dashboard</h2>

      <nav className="space-y-2">
        {links.map((link) => {
          const isActive =
            link.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(link.href)

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-6 rounded-xl border border-indigo-400/20 bg-indigo-400/10 p-4">
        <p className="text-sm font-medium text-indigo-200">Free Plan</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          You can analyze 5 resumes per month in this demo project.
        </p>
      </div>
    </aside>
  )
}