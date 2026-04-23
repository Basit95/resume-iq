import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import LogoutButton from './LogoutButton'
import MobileMenu from './MobileMenu'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
]

export default async function Navbar() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1020]/80 backdrop-blur">
      <div className="container-app relative flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Resume<span className="text-indigo-400">IQ</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link href="/dashboard" className="btn-secondary">
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>

        <MobileMenu isLoggedIn={!!user} />
      </div>
    </header>
  )
}