import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/features", "/pricing", "/blog"],
                disallow: ["/dashboard", "/dashboard", "/login", "/signup", "/api"],
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
    }
}