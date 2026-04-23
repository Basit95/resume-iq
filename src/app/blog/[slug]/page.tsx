import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog-data'
import { Metadata } from 'next'

export function generateStaticParams() {
    return getAllPosts().map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({
    params,
}: {  params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        return {
            title: 'Blog post Not found',
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
        canonical: `/blog/${post.slug}`,
        },
        openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author],
        tags: post.tags,
        url: `/blog/${post.slug}`,
        },
        twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        },
    }
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const paragraphs = post.content
        .trim()
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)

    return (
        <section className='container-app py-16'>
            <article className='mx-auto max-w-3xl'>
                <div className='flex flex-wrap gap-2'>
                    {post.tags.map((tag) => (
                        <span
                        key={tag}
                        className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs text-indigo-300"
                        >
                        {tag}
                        </span>
                    ))}
                </div>

                <h1 className='mt-6 text-4xl font-bold text-white'>{post.title}</h1>

                <p className='mt-3 text-sm text-slate-400'>
                    By {post.author} • {post.publishedAt}
                </p>

                <div className='mt-8 space-y-5'>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className='text-lg leading-8 text-slate-300'>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>
        </section>
    )
}