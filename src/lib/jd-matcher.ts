const COMMON_IGNORE_WORDS = new Set([
    'the',
    'and',
    'for',
    'with',
    'you',
    'your',
    'are',
    'our',
    'this',
    'that',
    'will',
    'have',
    'has',
    'from',
    'into',
    'they',
    'their',
    'about',
    'through',
    'using',
    'use',
    'used',
    'user',
    'users',
    'work',
    'works',
    'working',
    'role',
    'team',
    'years',
    'year',
    'good',
    'strong',
    'ability',
    'experience',
    'developer',
    'development',
    'skills',
    'skill',
    'knowledge',
    'understanding',
    'required',
    'preferred',
    'etc',
])

const PHRASE_KEYWORDS = [
    'next.js',
    'react',
    'typescript',
    'javascript',
    'tailwind css',
    'node.js',
    'api integration',
    'rest api',
    'graphql',
    'responsive design',
    'seo',
    'performance optimization',
    'wordpress',
    'shopify',
    'woocommerce',
    'prisma',
    'postgresql',
    'sqlite',
    'authentication',
    'middleware',
    'server components',
    'client components',
]

function normalizeText(text: string) {
    return text
    .toLowerCase()
    .replace(/[^\w\s.+#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractSingleWordKeywords(text: string) {
    return Array.from(
        new Set(
            normalizeText(text)
            .split(' ')
            .map((word) => word.trim())
            .filter((word) => word.length >= 4 && !COMMON_IGNORE_WORDS.has(word))
        )
    )
}

export function analyzeJobDescription(resumeText: string, jdText: string) {
    const resume = normalizeText(resumeText)
    const jd = normalizeText(jdText)

    const matched = new Set<string>()
    const missing = new Set<string>()

    for (const phrase of PHRASE_KEYWORDS) {
        const normalizedPhrase = normalizeText(phrase)
        const inJd = jd.includes(normalizedPhrase)
        const inResume = resume.includes(normalizedPhrase)

        if (inJd && inResume) matched.add(phrase)
        if (inJd && !inResume) missing.add(phrase)
    }

    const jdWords = extractSingleWordKeywords(jd)

    for (const word of jdWords) {
        if (PHRASE_KEYWORDS.includes(word)) continue

        if (resume.includes(word)) {
            matched.add(word)
        } else {
            missing.add(word)
        }
    }

    const totalRelevant = matched.size + missing.size
    const jdMatchScore = totalRelevant === 0 ? 0 : Math.round((matched.size / totalRelevant) * 100)

    return {
        jdMatchScore,
        matchedKeywords: Array.from(matched).slice(0, 20),
        missingKeywords: Array.from(missing).slice(0, 20),
    }
}