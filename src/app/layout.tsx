import type { Metadata } from 'next'
import './globals.css'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Toaster } from 'sonner'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'ResumeIQ | AI Resume Analyzer SaaS',
    template: '%s | ResumeIQ',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'ResumeIQ | AI Resume Analyzer SaaS',
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'ResumeIQ Resume Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeIQ | AI Resume Analyzer SaaS',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}