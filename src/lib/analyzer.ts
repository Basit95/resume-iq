type AnalysisResult = {
  score: number
  atsScore: number
  summary: string
  suggestions: string
  detectedSections: string[]
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword))
}

export function analyzeResume(resumeText: string): AnalysisResult {
  const text = resumeText.toLowerCase().trim()

  let score = 0
  let atsScore = 0
  const suggestions: string[] = []
  const detectedSections: string[] = []

  const hasEmail = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(resumeText)
  const hasPhone = /(\+?\d[\d\s\-()]{7,})/.test(resumeText)

  if (hasEmail) {
    score += 10
    atsScore += 10
  } else {
    suggestions.push('Add a professional email address.')
  }

  if (hasPhone) {
    score += 10
    atsScore += 10
  } else {
    suggestions.push('Add a contact number for recruiters.')
  }

  if (includesAny(text, ['summary', 'profile', 'objective', 'professional summary'])) {
    score += 15
    atsScore += 10
    detectedSections.push('Summary')
  } else {
    suggestions.push('Add a short professional summary at the top.')
  }

  if (includesAny(text, ['skills', 'technical skills', 'core skills', 'expertise'])) {
    score += 15
    atsScore += 15
    detectedSections.push('Skills')
  } else {
    suggestions.push('Add a clear skills section with relevant tools and technologies.')
  }

  if (includesAny(text, ['experience', 'work experience', 'employment', 'professional experience'])) {
    score += 20
    atsScore += 20
    detectedSections.push('Experience')
  } else {
    suggestions.push('Add a work experience section with achievements.')
  }

  if (includesAny(text, ['education', 'qualification', 'academic', 'degree'])) {
    score += 10
    atsScore += 10
    detectedSections.push('Education')
  } else {
    suggestions.push('Add an education section.')
  }

  if (includesAny(text, ['project', 'projects'])) {
    score += 10
    atsScore += 5
    detectedSections.push('Projects')
  } else {
    suggestions.push('Add 1 to 3 relevant projects to strengthen your profile.')
  }

  const actionVerbs = [
    'developed',
    'built',
    'designed',
    'implemented',
    'led',
    'improved',
    'optimized',
    'created',
    'managed',
    'delivered',
  ]

  const hasActionVerbs = includesAny(text, actionVerbs)
  if (hasActionVerbs) {
    score += 10
    atsScore += 10
  } else {
    suggestions.push('Use action-driven bullet points like Developed, Built, Improved, or Led.')
  }

  const hasMetrics = /(\d+%|\d+\+|\$\d+|\d+\s?(years|months|users|projects|clients))/i.test(resumeText)
  if (hasMetrics) {
    score += 10
    atsScore += 10
  } else {
    suggestions.push('Add measurable achievements such as percentages, numbers, or results.')
  }

  const wordCount = resumeText.split(/\s+/).filter(Boolean).length

  if (wordCount >= 150 && wordCount <= 900) {
    score += 10
    atsScore += 10
  } else if (wordCount < 150) {
    suggestions.push('Your resume looks too short. Add more detail about experience and projects.')
  } else {
    suggestions.push('Your resume may be too long. Keep it concise and focused.')
  }

  score = Math.min(score, 100)
  atsScore = Math.min(atsScore, 100)

  let summary = 'Your resume has a decent foundation but still has room for improvement.'

  if (score >= 80) {
    summary = 'Strong resume overall. It looks structured, relevant, and ATS-friendly.'
  } else if (score >= 60) {
    summary = 'Your resume is good, but a few missing sections or weak bullets are reducing its impact.'
  } else if (score >= 40) {
    summary = 'Your resume needs improvement in structure, clarity, and keyword relevance.'
  }

  return {
    score,
    atsScore,
    summary,
    suggestions: suggestions.join(' | '),
    detectedSections,
  }
}