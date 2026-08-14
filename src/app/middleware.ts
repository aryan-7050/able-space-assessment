import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  
  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/'];
  const isPublicPath = publicPaths.includes(pathname);
  
  // API paths that should be protected
  const isApiPath = pathname.startsWith('/api');
  const isAuthApiPath = pathname.startsWith('/api/auth');
  
  // If trying to access protected API route without token
  if (isApiPath && !isAuthApiPath && !token) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // If authenticated and trying to access login/register
  if (token && isPublicPath && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // If not authenticated and trying to access dashboard
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/api/tasks/:path*',
    '/api/tasks',
  ],
};