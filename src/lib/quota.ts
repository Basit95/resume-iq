import { db } from '@/lib/db'

function getMonthKey() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
}

export async function getOrCreateUsage(userId: string) {
    const monthKey = getMonthKey()

    let usage = await db.usage.findUnique({
        where: { userId },
    })

    if (!usage) {
        usage = await db.usage.create({
            data: {
                userId,
                usedCount: 0,
                limitCount: 5,
                monthKey,
            },
        })
        return usage
    }

    if (usage.monthKey !== monthKey) {
        usage = await db.usage.update({
            where: { userId },
            data: {
                usedCount: 0,
                monthKey,
            },
        })
    }

    return usage
}

export async function canUseAnalysis(userId: string) {
    const usage = await getOrCreateUsage(userId)

    return {
        allowed: usage.usedCount < usage.limitCount,
        usage,
    }
}

export async function incrementUsage(userId: string) {
    const usage = await getOrCreateUsage(userId)

    return db.usage.update({
        where: { userId },
        data: {
            usedCount: usage.usedCount + 1,
        },
    })
}