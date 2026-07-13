import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.startsWith('/dashboard')
  const isTeacherRoute = pathname.startsWith('/teacher')
  // The root route is the public product landing page. Only the login page
  // should route an already authenticated user straight to their portal.
  const isEntryRoute = pathname === '/login'

  if (!user && (isAdminRoute || isTeacherRoute)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role,is_admin,is_premium')
      .eq('id', user.id)
      .maybeSingle()

    const isAdmin = profile?.is_admin === true
    const isPaidTeacher = profile?.role === 'teacher' && profile?.is_premium === true
    const destination = isAdmin
      ? '/dashboard'
      : isPaidTeacher
        ? '/teacher'
        : profile?.role === 'teacher'
          ? '/access-pending'
          : '/mobile-app'

    if ((isAdminRoute && !isAdmin) || (isTeacherRoute && !isAdmin && !isPaidTeacher) || isEntryRoute) {
      const url = request.nextUrl.clone()
      url.pathname = destination
      url.search = ''
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
