import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";
import { error } from "console";
import { create } from "domain";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters.' },
                { status: 400 }
            )
        }

        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists with this email' },
                { status: 409 }
            )
        }

        const hashedPassword = await hashPassword(password)

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                usage: {
                    create: {
                        usedCount: 0,
                        limitCount: 5,
                        monthKey: getMonthKey(),
                    },
                },
            },
        })

        await createSession(user.id)

        return NextResponse.json({
            success: true,
            message: 'Account created successfully.',
        })
    } catch (error) {
        console.error('SIGNUP_ERROR', error)

        return NextResponse.json(
            { error: 'Something went wrong during signup.' },
            { status: 500 }
        )
    }
}

function getMonthKey() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
}