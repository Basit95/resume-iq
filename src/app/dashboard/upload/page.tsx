'use client'

import { useState } from 'react'
import { toast } from 'sonner'

type UploadAnalyzeResponse = {
  success?: boolean
  error?: string
  analysis?: {
    id: string
    resumeTitle: string
    score: number
    atsScore: number
    summary: string
    suggestions: string
    jdMatchScore: number | null
  }
  usage?: {
    usedCount: number
    limitCount: number
  }
  detectedSections?: string[]
  missingKeywords?: string[]
  matchedKeywords?: string[]
}

export default function UploadPage() {
  const [resumeTitle, setResumeTitle] = useState('')
  const [jdText, setJdText] = useState('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<UploadAnalyzeResponse | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    if (!resumeFile) {
      const message = 'Please upload a PDF or TXT resume file.'
      setError(message)
      toast.error(message)
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('resumeTitle', resumeTitle)
      formData.append('jdText', jdText)
      formData.append('resumeFile', resumeFile)

      const response = await fetch('/api/analyze-upload', {
        method: 'POST',
        body: formData,
      })

      const data: UploadAnalyzeResponse = await response.json()

      if (!response.ok) {
        const message = data.error || 'Analysis failed.'
        setError(message)
        toast.error(message)
        setLoading(false)
        return
      }

      setResult(data)
      toast.success('Resume analyzed successfully!')
      setResumeTitle('')
      setJdText('')
      setResumeFile(null)

      const fileInput = document.getElementById('resumeFile') as HTMLInputElement | null
      if (fileInput) fileInput.value = ''
    } catch {
      const message = 'Something went wrong.'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="card-ui p-8">
        <h1 className="text-3xl font-bold text-white">Upload & Match Resume</h1>
        <p className="mt-2 text-slate-300">
          Upload a PDF/TXT resume and optionally paste a job description for keyword matching.
        </p>
      </div>

      <div className="card-ui p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Resume Title</label>
            <input
              type="text"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="input-ui"
              placeholder="Frontend Developer Resume"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Resume File</label>
            <input
              id="resumeFile"
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="input-ui"
              required
            />
            <p className="mt-2 text-xs text-slate-400">Accepted: PDF, TXT</p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Job Description (optional)
            </label>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              className="input-ui min-h-[220px]"
              placeholder="Paste job description here for match score and missing keywords..."
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Upload and Analyze'}
          </button>
        </form>
      </div>

      {result?.analysis ? (
        <div className="card-ui p-8">
          <h2 className="text-2xl font-semibold text-white">Analysis Result</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Resume Score</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-300">
                {result.analysis.score}/100
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">ATS Score</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-300">
                {result.analysis.atsScore}/100
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">JD Match</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-300">
                {result.analysis.jdMatchScore ?? 0}/100
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-white">Summary</h3>
              <p className="mt-2 text-slate-300">{result.analysis.summary}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Suggestions</h3>
              <div className="mt-2 space-y-2">
                {result.analysis.suggestions.split(' | ').map((item, index) => (
                  <p key={index} className="text-slate-300">
                    • {item}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Detected Sections</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.detectedSections?.length ? (
                  result.detectedSections.map((section) => (
                    <span
                      key={section}
                      className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-sm text-indigo-300"
                    >
                      {section}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-300">No major sections detected.</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-white">Matched Keywords</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.matchedKeywords?.length ? (
                    result.matchedKeywords.map((word) => (
                      <span
                        key={word}
                        className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300"
                      >
                        {word}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-300">No matched keywords yet.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">Missing Keywords</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.missingKeywords?.length ? (
                    result.missingKeywords.map((word) => (
                      <span
                        key={word}
                        className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm text-amber-300"
                      >
                        {word}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-300">No missing keywords detected.</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Usage Status</h3>
              <p className="mt-2 text-slate-300">
                {result.usage?.usedCount} / {result.usage?.limitCount} analyses used this month
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}