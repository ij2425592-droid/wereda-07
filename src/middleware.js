import { NextResponse } from 'next/server';

export function middleware(request) {
    const session = request.cookies.get('admin_session');
    const { pathname } = request.nextUrl;

    // Protect /admin routes except /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!session || session.value !== 'authenticated') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Redirect away from login if already authenticated
    if (pathname === '/admin/login' && session?.value === 'authenticated') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};