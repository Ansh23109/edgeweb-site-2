import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

async function isValidPassword(password) {
  const plain = process.env.ADMIN_PASSWORD || 'edgewebadmin';
  const hash = process.env.ADMIN_PASSWORD_HASH || '';
  if (hash) return bcrypt.compare(password, hash);
  return password === plain;
}

export async function POST(request) {
  const form = await request.formData();
  const password = String(form.get('password') || '');

  if (!(await isValidPassword(password))) {
    return NextResponse.redirect(new URL('/admin?error=1', request.url), 303);
  }

  const response = NextResponse.redirect(new URL('/admin', request.url), 303);
  response.cookies.set('edgeweb_admin_auth', 'true', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 12,
    sameSite: 'lax',
  });
  return response;
}
