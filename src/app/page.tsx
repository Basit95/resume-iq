import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Resume Analyzer SaaS',
  description:
    'Analyze resumes, check ATS score, compare job description keywords, and track resume improvement inside a full-stack Next.js SaaS dashboard.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <section className="container-app py-20">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-300">
          Full Stack SaaS Practice Project
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Analyze resumes, track usage, and manage your profile in one clean SaaS dashboard.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          ResumeIQ is a portfolio-grade Next.js application with authentication,
          protected routes, quota logic, blog support, and a modern dashboard UI.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup" className="btn-primary">
            Start Free
          </Link>
          <Link href="/pricing" className="btn-secondary">
            View Pricing
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="card-ui p-6">
          <h3 className="text-xl font-semibold text-white">Resume Analysis</h3>
          <p className="mt-3 text-slate-300">
            Upload or paste your resume and get an ATS-style score with practical suggestions.
          </p>
        </div>

        <div className="card-ui p-6">
          <h3 className="text-xl font-semibold text-white">Usage Quota</h3>
          <p className="mt-3 text-slate-300">
            Track free plan usage and show realistic SaaS upgrade flow inside the dashboard.
          </p>
        </div>

        <div className="card-ui p-6">
          <h3 className="text-xl font-semibold text-white">CMS-style Blog</h3>
          <p className="mt-3 text-slate-300">
            Publish career and resume articles through a content-driven blog structure.
          </p>
        </div>
      </div>

      <div className='mt-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
        <div className='card-ui p-8'>
          <h2 className='text-2xl font-bold text-white'>
            Built like a real SaaS product
          </h2>
          <p className='mt-4 text-slate-300'>
            This project demonstrates authentication, protected routes, database-backed
            analysis history, usage quotas, file parsing, job description matching, charts,
            and a CMS-style blog.
          </p>

          <div className='mt-6 grid gap-3 sm:grid-cols-2'>
            {[
              'Next.js App Router',
              'TypeScript',
              'Prisma + SQLite',
              'Cookie Authentication',
              'Resume Upload',
              'JD Keyword Matching',
              'Dashboard Charts',
              'Blog System',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card-ui p-8">
          <h2 className="text-2xl font-bold text-white">Demo workflow</h2>
          <div className="mt-6 space-y-4">
            {[
              'Create a free account',
              'Upload a PDF or TXT resume',
              'Paste a job description',
              'Review ATS and match score',
              'Track history in dashboard',
            ].map((item, index) => (
              <div key={item} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}