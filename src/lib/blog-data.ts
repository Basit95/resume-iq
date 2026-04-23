export type BlogPost = {
    slug: string
    title: string
    excerpt: string
    content: string
    author: string
    publishedAt: string
    tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-improve-ats-score',
    title: 'How to Improve Your ATS Resume Score',
    excerpt:
      'Learn how to structure your resume for better ATS compatibility and recruiter visibility.',
    author: 'ResumeIQ Team',
    publishedAt: '2026-04-16',
    tags: ['ATS', 'Resume', 'Career'],
    content: `
A strong ATS-friendly resume should have clear sections, clean formatting, and relevant keywords.

Start with your contact information, followed by a professional summary. Add a skills section that includes the tools and technologies relevant to your target role.

Your work experience should use strong action verbs and measurable achievements. For example, instead of saying "worked on websites", say "Developed responsive websites and improved performance by 25%."

Also include projects, education, and certifications where relevant. Keep your resume concise, readable, and aligned with the job description.
    `,
  },
  {
    slug: 'resume-mistakes-developers-should-avoid',
    title: 'Resume Mistakes Developers Should Avoid',
    excerpt:
      'Avoid common mistakes that make technical resumes weak, unclear, or less effective.',
    author: 'ResumeIQ Team',
    publishedAt: '2026-04-15',
    tags: ['Developers', 'Resume Tips'],
    content: `
One major mistake developers make is listing too many technologies without context. Instead of only naming tools, explain what you built and what impact it created.

Another issue is weak project descriptions. Show the result of your work. Mention performance gains, business value, or user improvements.

Avoid cluttered formatting, missing contact details, and generic summaries. Tailor your resume to the specific job whenever possible.
    `,
  },
  {
    slug: 'best-resume-sections-for-frontend-developers',
    title: 'Best Resume Sections for Frontend Developers',
    excerpt:
      'These are the sections every frontend developer should include for a stronger resume.',
    author: 'ResumeIQ Team',
    publishedAt: '2026-04-14',
    tags: ['Frontend', 'Career'],
    content: `
For frontend developers, the most useful sections are Summary, Skills, Experience, Projects, and Education.

Your summary should quickly explain your experience and focus. The skills section should contain technologies like JavaScript, TypeScript, React, Next.js, CSS, and related tools.

Projects are especially important if they show UI work, performance optimization, or API integration. Use concise bullet points and highlight measurable results whenever possible.
    `,
  },
]

export function getAllPosts() {
    return blogPosts
}

export function getPostBySlug(slug: string) {
    return blogPosts.find((post) => post.slug === slug)
}