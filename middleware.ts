import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('resumeiq_session')?.value
    const { pathname } = request.nextUrl

    const isDashboardRoute = pathname.startsWith('/dashboard')
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup')

    if (isDashboardRoute && !sessionCookie) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAuthRoute && sessionCookie) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup'],
}