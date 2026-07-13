import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase-middleware'

export async function proxy(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
    '/teacher/:path*',
    '/access-pending',
    '/mobile-app',
  ],
}
