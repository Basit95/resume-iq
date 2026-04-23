import Link from "next/link"

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0b1020]/80">
            <div className="container-app py-10">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <Link href="/" className="text-xl font-bold tracking-tight text-white">
                            Resume<span className="text-indigo-400">IQ</span>
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                            ResumeIQ is a full-stack SaaS-style practice project built with Next.js,
                            TypeScript, Prisma, SQLite, authentication, resume analysis, and dashboard features.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">Product</h3>
                        <div className="mt-4 space-y-3">
                            <Link href="/features" className="block text-sm text-slate-400 hover:text-white">
                                Features
                            </Link>
                            <Link href="/pricing" className="block text-sm text-slate-400 hover:text-white">
                                Pricing
                            </Link>
                            <Link href="/blog" className="block text-sm text-slate-400 hover:text-white">
                                Blog
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">App</h3>
                        <div className="mt-4 space-y-3">
                            <Link href="/login" className="block text-sm text-slate-400 hover:text-white">
                                Login
                            </Link>
                            <Link href="/signup" className="block text-sm text-slate-400 hover:text-white">
                                Sign Up
                            </Link>
                            <Link href="/dashboard" className="block text-sm text-slate-400 hover:text-white">
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 pt-6 pb-6 text-sm text-slate-500 text-center">
                <div className="container-app">
                    © {new Date().getFullYear()} ResumeIQ. Portfolio practice project.
                </div>
            </div>
        </footer>
    )
}