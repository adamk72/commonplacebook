import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { JWT_AUTH_NAME } from '@/lib/constants';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(JWT_AUTH_NAME);
  if (!cookie?.value) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/about/:path', '/upload/:path'],
};
