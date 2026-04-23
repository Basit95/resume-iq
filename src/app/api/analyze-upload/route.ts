import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { analyzeResume } from "@/lib/analyzer"
import { analyzeJobDescription } from "@/lib/jd-matcher"
import { canUseAnalysis, incrementUsage } from "@/lib/quota"
import { db } from "@/lib/db"
import { extractTextFromFile } from "@/lib/file-parser"
import { error } from "console"

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await request.formData()

        const resumeTitle = String(formData.get('resumeTitle') || '').trim()
        const jdText = String(formData.get('jdText') || '').trim()
        const resumeFile = formData.get('resumeFile')

        if (!resumeTitle) {
            return NextResponse.json({ error: 'Resume title is required.' }, { status: 400 })
        }

        if (!(resumeFile instanceof File)) { 
            return NextResponse.json({ error: 'Resume file is required.' }, { status: 400 })
        }

        const quota = await canUseAnalysis(user.id)

        if (!quota.allowed) {
            return NextResponse.json(
                { error: 'Monthly quota exceeded. Upgrade required.' },
                { status: 403 }
            )
        }

        const resumeText = await extractTextFromFile(resumeFile)

        if (!resumeText || resumeText.trim().length < 50) {
            return NextResponse.json(
                { error: 'Could not extract enough text from the uploaded file.' },
                { status: 400 }
            )
        }

        const baseResult = analyzeResume(resumeText)

        const jdResult = jdText ? analyzeJobDescription(resumeText, jdText) : {
            jdMatchScore: null,
            missingKeywords: [],
            matchedKeywords: [],
        }

        const suggestions = [
            ...baseResult.suggestions.split(' | ').filter(Boolean),
            ...(jdResult.missingKeywords.length
                ? [`Add or naturally include these missing job keywords: ${jdResult.missingKeywords.join(', ')}`]
                : []),
            ].join(' | ')

        const analysis = await db.analysis.create({
            data: {
                userId: user.id,
                resumeTitle,
                resumeText,
                score: baseResult.score,
                atsScore: baseResult.atsScore,
                summary: baseResult.summary,
                suggestions,
                jdText: jdText || null,
                jdMatchScore: jdResult.jdMatchScore,
                missingKeywords: jdResult.missingKeywords.join(' | '),
                matchedKeywords: jdResult.matchedKeywords.join(' | '),
            },
        })

        const updatedUsage = await incrementUsage(user.id)

        return NextResponse.json({ 
            success: true,
            analysis, 
            usage: updatedUsage,
            detectedSections: baseResult.detectedSections,
            jdMatchScore: jdResult.jdMatchScore,
            missingKeywords: jdResult.missingKeywords,
            matchedKeywords: jdResult.matchedKeywords, 
        })
    } catch (error) {
        console.error('ANALYZE_UPLOAD_ERROR', error)

        return NextResponse.json({ error: 'Something went wrong during upload analysis.' }, { status: 500 })
    }
} 