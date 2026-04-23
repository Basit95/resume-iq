import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

const SESSION_COOKIE_NAME = 'resumeiq_session'

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
}

export async function createSession(userId: string) {
    const cookieStore = await cookies()

    cookieStore.set(SESSION_COOKIE_NAME, userId, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    })
}

export async function destroySession() {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getCurrentUser() {
    const cookieStore = await cookies()
    const userId = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!userId) return null

    const user = await db.user.findUnique({
        where: { id: userId },
    })

    return user
}

export async function requireUser() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return user
}