import Link from 'next/link'
import { requireUser } from '@/lib/auth'
import { db } from '@/lib/db'
import DeleteAnalysisButton from '@/components/dashboard/DeleteAnalysisButton'
import EmptyState from '@/components/shared/EmptyState'

export default async function HistoryPage() {
  const user = await requireUser()

  const analyses = await db.analysis.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="card-ui p-8">
      <h1 className="text-3xl font-bold text-white">Analysis History</h1>
      <p className="mt-2 text-slate-300">
        View all previously analyzed resumes.
      </p>

      {analyses.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No analysis history yet"
            description="Upload your first resume and ResumeIQ will save your analysis here."
            actionLabel="Analyze Resume"
            actionHref="/dashboard/upload"
          />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {analyses.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{item.resumeTitle}</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3 text-sm">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">
                    Score: {item.score}
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">
                    ATS: {item.atsScore}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-slate-300">{item.summary}</p>

              <div className="mt-4 space-y-2">
                {item.suggestions.split(' | ').map((suggestion, index) => (
                  <p key={index} className="text-sm text-slate-400">
                    • {suggestion}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/dashboard/history/${item.id}`}
                  className="btn-secondary"
                >
                  View Report
                </Link>

                <DeleteAnalysisButton id={item.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}