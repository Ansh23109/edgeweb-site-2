import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { saveSiteConfig } from '../../../../lib/siteConfig';

export async function POST(request) {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get('edgeweb_admin_auth')?.value === 'true';
  if (!isAuthed) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }

  const form = await request.formData();
  const payload = Object.fromEntries(form.entries());
  await saveSiteConfig(payload);

  return NextResponse.redirect(new URL('/admin?message=Content+updated', request.url), 303);
}
