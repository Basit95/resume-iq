import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore ResumeIQ features including resume upload, ATS scoring, job description keyword matching, dashboard history, usage quota, and charts.',
  alternates: {
    canonical: '/features',
  },
}

export default function FeaturesPage() {
  return (
    <section className="container-app py-16">
      <h1 className="text-4xl font-bold text-white">Features</h1>
      <p className="mt-4 max-w-3xl text-slate-300">
        ResumeIQ includes resume analysis, quota tracking, authentication,
        protected dashboard pages, PDF/TXT resume upload, job description matching,
        analysis history, charts, and a CMS-style blog.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Resume Upload',
            text: 'Upload PDF or TXT resumes and extract text for structured analysis.',
          },
          {
            title: 'ATS Score',
            text: 'Generate a simple ATS-style score based on sections, contact info, action verbs, and measurable results.',
          },
          {
            title: 'JD Matching',
            text: 'Paste a job description and detect matched and missing keywords.',
          },
          {
            title: 'Usage Quota',
            text: 'Track monthly analysis limits using a SaaS-style free plan system.',
          },
          {
            title: 'Dashboard History',
            text: 'Save each analysis and review previous resume results anytime.',
          },
          {
            title: 'Blog System',
            text: 'Public blog pages demonstrate dynamic routing and content-driven website structure.',
          },
        ].map((feature) => (
          <div key={feature.title} className="card-ui p-6">
            <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}