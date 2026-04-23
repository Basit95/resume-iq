# ResumeIQ – Full Stack Resume Analyzer SaaS

ResumeIQ is a full-stack SaaS-style resume analyzer built with **Next.js**, **TypeScript**, **Prisma**, and **SQLite**.  
It allows users to create an account, upload a resume, analyze ATS-style resume quality, compare resumes with job descriptions, track usage quota, view analysis history, and generate printable reports.

This project was created as a portfolio/practice project to demonstrate modern full-stack application development using the Next.js App Router.

---

## Live Demo

Coming soon.

---

## Screenshots

Screenshots will be added after the final UI polish.

---

## Features

### Public Website

- Modern landing page
- Features page
- Pricing page
- CMS-style blog listing
- Dynamic blog detail pages
- SEO metadata
- Sitemap
- Robots file
- Responsive navigation
- Footer

### Authentication

- User signup
- User login
- Password hashing
- Cookie-based session
- Protected dashboard routes
- Logout functionality

### Resume Analysis

- Upload PDF or TXT resume
- Extract resume text
- ATS-style scoring
- Resume structure detection
- Contact information check
- Skills, experience, education, and project detection
- Action verb detection
- Measurable achievement detection
- Resume improvement suggestions

### Job Description Matching

- Paste job description
- Calculate job description match score
- Detect matched keywords
- Detect missing keywords
- Save keyword results with each analysis

### Dashboard

- Protected dashboard overview
- Usage quota tracking
- Monthly free analysis limit
- Recent analyses
- Score trend chart
- Analysis history
- Analysis detail page
- Delete analysis
- Settings page

### Report System

- Detailed resume report page
- Copy summary to clipboard
- Print report
- Download report as PDF through browser print
- Print-friendly layout

---

## Tech Stack

### Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- Recharts
- Sonner

### Backend

- Next.js Route Handlers
- Server Components
- Server-side authentication logic
- Middleware route protection

### Database

- SQLite
- Prisma ORM

### File Parsing

- PDF parsing using `pdf-parse`
- TXT file parsing using native File API

### SEO

- Metadata API
- Dynamic metadata
- Sitemap
- Robots file
- Open Graph configuration

---

## Project Structure

```txt
resume-iq/
  prisma/
    schema.prisma
    migrations/

  public/
    og-image.png
    screenshots/

  src/
    app/
      api/
        analysis/
        analyze/
        analyze-upload/
        login/
        logout/
        signup/

      blog/
        [slug]/
        page.tsx

      dashboard/
        history/
        settings/
        upload/
        layout.tsx
        page.tsx

      features/
      login/
      pricing/
      signup/

      globals.css
      layout.tsx
      page.tsx
      robots.ts
      sitemap.ts

    components/
      dashboard/
      layout/
      shared/

    lib/
      analyzer.ts
      auth.ts
      blog-data.ts
      db.ts
      file-parser.ts
      jd-matcher.ts
      quota.ts
      seo.ts

    types/

  .env.example
  package.json
  README.md
