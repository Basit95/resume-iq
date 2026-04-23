import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { analyzeResume } from "@/lib/analyzer";
import { canUseAnalysis, incrementUsage } from "@/lib/quota";
import { db } from "@/lib/db";
import { error } from "console";

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized.' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { resumeTitle, resumeText } = body

        if (!resumeTitle || !resumeText) {
            return NextResponse.json(
                { error: 'Resume title and resume text are required.' },
                { status: 400 }
            )
        }

        const trimmedText = String(resumeText).trim()

        if (trimmedText.length < 50) {
            return NextResponse.json(
                { error: 'Resume text is too short for analysis.' },
                { status: 400 }
            )
        }

        const quota = await canUseAnalysis(user.id)

        if (!quota.allowed) {
            return NextResponse.json(
                { error: 'Monthly quota exceeded. Upgrade required.' },
                { status: 403 }
            )
        }

        const result = analyzeResume(trimmedText)

        const analysis = await db.analysis.create({
            data: {
                userId: user.id,
                resumeTitle,
                resumeText: trimmedText,
                score: result.score,
                atsScore: result.atsScore,
                summary: result.summary,
                suggestions: result.suggestions,
            },
        })

        const updatedUsage = await incrementUsage(user.id)

        return NextResponse.json({
            success: true,
            analysis,
            usage: updatedUsage,
            detectedSections: result.detectedSections, 
        })
    } catch (error) {
        console.error('ANALYZE_ERROR', error)

        return NextResponse.json(
            { error: 'Something went wrong during analysis.' },
            { status: 500 }
        )
    }
}