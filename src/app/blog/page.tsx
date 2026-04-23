import Link from 'next/link'
import { getAllPosts } from '@/lib/blog-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read ResumeIQ blog posts about ATS optimization, developer resumes, resume mistakes, and job search improvement.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="container-app py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-white">Blog</h1>
        <p className="mt-4 text-slate-300">
          Career, resume, and ATS optimization insights for job seekers and developers.
        </p>
      </div>

      <div className="mt-10 grid gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="card-ui p-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs text-indigo-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              <Link href={`/blog/${post.slug}`} className="hover:text-indigo-300">
                {post.title}
              </Link>
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              By {post.author} • {post.publishedAt}
            </p>

            <p className="mt-4 text-slate-300">{post.excerpt}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-6 inline-flex text-sm font-medium text-indigo-300 hover:text-indigo-200"
            >
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}