import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/old')) {
        return NextResponse.redirect(new URL('/new' + pathname.slice(4), request.url));
    }

    if (pathname.startsWith('/admin') && !request.cookies.has('token')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/old/:path*']
};