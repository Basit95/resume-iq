import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST() {
    try {
        await destroySession()

        return NextResponse.json({
            success: true,
            message: 'Logged out successfully.',
        })
    } catch (error) {
        console.error('LOGOUT_ERROR', error)

        return NextResponse.json(
            { error: 'Something went wrong during logout.' },
            { status: 500 }
        )
    }
}