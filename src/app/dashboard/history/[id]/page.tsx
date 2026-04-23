import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { db } from '@/lib/db'
import PrintReportButton from '@/components/dashboard/PrintReportButton'
import CopySummaryButton from '@/components/dashboard/CopySummaryButton'

export const metadata: Metadata = {
  title: 'Analysis Report',
  description: 'Detailed resume analysis report with ATS score and job description keyword matching.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await requireUser()
  const { id } = await params

  const analysis = await db.analysis.findFirst({
    where: {
      id,
      userId: user.id,
    },
  })

  if (!analysis) {
    notFound()
  }

  const matchedKeywords = analysis.matchedKeywords
    ? analysis.matchedKeywords.split(' | ').filter(Boolean)
    : []

  const missingKeywords = analysis.missingKeywords
    ? analysis.missingKeywords.split(' | ').filter(Boolean)
    : []

  const suggestions = analysis.suggestions
    ? analysis.suggestions.split(' | ').filter(Boolean)
    : []

  const copyText = `
ResumeIQ Analysis Report

Resume Title: ${analysis.resumeTitle}
Resume Score: ${analysis.score}/100
ATS Score: ${analysis.atsScore}/100
JD Match Score: ${analysis.jdMatchScore ?? 0}/100

Summary:
${analysis.summary}

Suggestions:
${suggestions.map((item, index) => `${index + 1}. ${item}`).join('\n')}

Matched Keywords:
${matchedKeywords.length ? matchedKeywords.join(', ') : 'No matched keywords saved.'}

Missing Keywords:
${missingKeywords.length ? missingKeywords.join(', ') : 'No missing keywords saved.'}
  `.trim()

  return (
    <div className="print-report-page space-y-6">
      <div className="card-ui print-report-card p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="print-muted text-sm text-slate-400">ResumeIQ Report</p>
            <h1 className="print-text-dark mt-2 text-3xl font-bold text-white">
              {analysis.resumeTitle}
            </h1>
            <p className="print-muted mt-2 text-slate-400">
              Generated on {new Date(analysis.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <CopySummaryButton text={copyText} />
            <PrintReportButton />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card-ui print-report-card p-6">
          <h2 className="print-text-dark text-lg font-semibold text-white">Resume Score</h2>
          <p className="mt-3 text-3xl font-bold text-indigo-300 print:text-gray-900">
            {analysis.score}/100
          </p>
        </div>

        <div className="card-ui print-report-card p-6">
          <h2 className="print-text-dark text-lg font-semibold text-white">ATS Score</h2>
          <p className="mt-3 text-3xl font-bold text-indigo-300 print:text-gray-900">
            {analysis.atsScore}/100
          </p>
        </div>

        <div className="card-ui print-report-card p-6">
          <h2 className="print-text-dark text-lg font-semibold text-white">JD Match</h2>
          <p className="mt-3 text-3xl font-bold text-indigo-300 print:text-gray-900">
            {analysis.jdMatchScore ?? 0}/100
          </p>
        </div>
      </div>

      <div className="card-ui print-report-card p-6">
        <h2 className="print-text-dark text-xl font-semibold text-white">Summary</h2>
        <p className="print-text-dark mt-3 text-slate-300">{analysis.summary}</p>
      </div>

      <div className="card-ui print-report-card p-6">
        <h2 className="print-text-dark text-xl font-semibold text-white">Suggestions</h2>
        <div className="mt-4 space-y-2">
          {suggestions.length ? (
            suggestions.map((item, index) => (
              <p key={index} className="print-text-dark text-slate-300">
                {index + 1}. {item}
              </p>
            ))
          ) : (
            <p className="print-muted text-slate-400">No suggestions available.</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card-ui print-report-card p-6">
          <h2 className="print-text-dark text-xl font-semibold text-white">Matched Keywords</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {matchedKeywords.length ? (
              matchedKeywords.map((item) => (
                <span
                  key={item}
                  className="print-chip rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300"
                >
                  {item}
                </span>
              ))
            ) : (
              <p className="print-muted text-slate-300">No matched keywords saved.</p>
            )}
          </div>
        </div>

        <div className="card-ui print-report-card p-6">
          <h2 className="print-text-dark text-xl font-semibold text-white">Missing Keywords</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {missingKeywords.length ? (
              missingKeywords.map((item) => (
                <span
                  key={item}
                  className="print-chip rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm text-amber-300"
                >
                  {item}
                </span>
              ))
            ) : (
              <p className="print-muted text-slate-300">No missing keywords saved.</p>
            )}
          </div>
        </div>
      </div>

      {analysis.jdText ? (
        <div className="card-ui print-report-card p-6">
          <h2 className="print-text-dark text-xl font-semibold text-white">Job Description</h2>
          <pre className="print-text-dark mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            {analysis.jdText}
          </pre>
        </div>
      ) : null}

      <div className="card-ui print-report-card p-6">
        <h2 className="print-text-dark text-xl font-semibold text-white">Resume Content</h2>
        <pre className="print-text-dark mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          {analysis.resumeText}
        </pre>
      </div>

      <div className="hidden print:block">
        <p className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
          Generated by ResumeIQ — Full Stack Resume Analyzer SaaS Practice Project
        </p>
      </div>
    </div>
  )
}