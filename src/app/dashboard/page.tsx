import Link from 'next/link'
import { requireUser } from '@/lib/auth'
import { getOrCreateUsage } from '@/lib/quota'
import { db } from '@/lib/db'
import ScoreChart from '@/components/dashboard/ScoreChart'
import EmptyState from '@/components/shared/EmptyState'

export default async function DashboardPage() {
  const user = await requireUser()
  const usage = await getOrCreateUsage(user.id)

  const analyses = await db.analysis.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'asc' },
  })

  const recentAnalyses = [...analyses].reverse().slice(0, 5)

  const totalAnalyses = analyses.length

  const chartData = analyses.map((item, index) => ({
    name: `A${index + 1}`,
    score: item.score,
    atsScore: item.atsScore,
  }))

  return (
    <div className="space-y-6">
      <div className="card-ui p-8">
        <h1 className="text-3xl font-bold text-white">Welcome, {user.name}</h1>
        <p className="mt-2 text-slate-300">
          Manage your resume analyses, track your usage, and improve your ATS score.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card-ui p-6">
          <h2 className="text-lg font-semibold text-white">Current Plan</h2>
          <p className="mt-2 text-slate-300">{user.plan}</p>
        </div>

        <div className="card-ui p-6">
          <h2 className="text-lg font-semibold text-white">Used This Month</h2>
          <p className="mt-2 text-slate-300">
            {usage.usedCount} / {usage.limitCount}
          </p>
        </div>

        <div className="card-ui p-6">
          <h2 className="text-lg font-semibold text-white">Total Analyses</h2>
          <p className="mt-2 text-slate-300">{totalAnalyses}</p>
        </div>
      </div>

      {chartData.length > 0 ? <ScoreChart data={chartData} /> : null}

      <div className='grid gap-6 md:grid-cols-2'>
        <div className='card-ui p-6'>
          <h2 className='text-xl font-semibold text-white'>Upload New Resume</h2>
          <p className='mt-2 text-slate-300'>
            Upload a PDF or TXT resume and get an ATS score with job description matching.
          </p>
          <Link href="/dashboard/upload" className='btn-primary mt-5'>
            Go to Upload
          </Link>
        </div>

        <div className="card-ui p-6">
          <h2 className="text-xl font-semibold text-white">Free Plan Tip</h2>
          <p className="mt-2 text-slate-300">
            Paste a job description before analysis to see matched and missing keywords.
          </p>
        </div>
      </div>

      <div className="card-ui p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">Recent Analyses</h2>
          <Link href="/dashboard/history" className="text-sm text-indigo-300 hover:text-indigo-200">
            View all
          </Link>
        </div>

        {recentAnalyses.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No resume analyzed yet"
              description="Start by uploading a PDF or TXT resume. You can also paste a job description to compare keyword match."
              actionLabel="Analyze Resume"
              actionHref="/dashboard/upload"
            />
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {recentAnalyses.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/history/${item.id}`}
                className="block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-indigo-400/40 hover:bg-white/10"
              >
                <h3 className="font-semibold text-white">{item.resumeTitle}</h3>
                <p className="mt-1 text-sm text-slate-300">
                  Score: {item.score} | ATS: {item.atsScore}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}