import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'
 
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl

  // If user is logged in and tries to access auth pages, redirect to dashboard
  if (token && (
    url.pathname.startsWith('/sign-in') ||
    url.pathname.startsWith('/sign-up') ||
    url.pathname.startsWith('/verify')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is NOT logged in and tries to access protected pages, redirect to home
  if (!token && (
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/verify')
  )) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next() // ✅ Allow normal request flow
}

export const config = {
  matcher: [
    '/sign-in', 
    '/sign-up',
    '/dashboard/:path*', 
    '/verify/:path*' 
  ]
};
