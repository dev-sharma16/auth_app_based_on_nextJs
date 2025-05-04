import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname

   const isPublicPath = path === '/login' || path === '/signUp';

   const token = request.cookies.get('token')?.value || '';

   if (isPublicPath && token) {
    //   return NextResponse.redirect('/profile') // we can also redirect like that
      return NextResponse.redirect(new URL('/profile', request.nextUrl));  // but this is better
   }
   if (!isPublicPath && !token) {
       return NextResponse.redirect(new URL('/login', request.nextUrl));
   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signUp',
  ]
}