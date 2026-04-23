import { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts()

    const staticRoutes = ['', '/features', '/pricing', '/blog'].map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const blogRoutes = posts.map((post) => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...blogRoutes]
}