import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname === '/profile') {
        return NextResponse.redirect(new URL('/profile/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/profile'],
}