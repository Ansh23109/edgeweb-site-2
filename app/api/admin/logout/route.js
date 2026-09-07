import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.redirect(new URL('/admin', request.url), 303);
  response.cookies.set('edgeweb_admin_auth', '', { path: '/', maxAge: 0 });
  return response;
}
