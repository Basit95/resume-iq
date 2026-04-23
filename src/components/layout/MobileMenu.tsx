'use client'

import Link from "next/link"
import { useState } from "react"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
]

export default function MobileMenu({
    isLoggedIn,
}: {
    isLoggedIn: boolean
}) {
    const [open, setOpen] = useState(false)
    
    return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="btn-secondary"
      >
        Menu
      </button>

      {open ? (
        <div className="absolute left-4 right-4 top-20 rounded-2xl border border-white/10 bg-[#0b1020] p-4 shadow-xl">
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      ) : null}
    </div>
  )
}