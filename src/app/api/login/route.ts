import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, createSession } from "@/lib/auth";
import { error } from "console";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required.' },
                { status: 400 }
            )
        }

        const user = await db.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password.' },
                { status: 401 }
            )
        }

        const isPasswordValid = await comparePassword(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password.' },
                { status: 401 }
            )
        }

        await createSession(user.id)

        return NextResponse.json({
            success: true,
            message: 'Login successful.',
        })
    } catch (error) {
        console.error('LOGIN_ERROR', error)

        return NextResponse.json(
            { error: 'Something went wrong during login.' },
            { status: 500 }
        )
    }
}