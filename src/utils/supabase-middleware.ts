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
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
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

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard')

  // Safely extract and normalize the role
  let rawRole = 'none'
  
  if (user) {
    // Check the public.users table first
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
      
    if (profile && profile.role) {
      rawRole = profile.role
    } else {
      // Fallback to auth metadata
      rawRole = user.user_metadata?.role || user.app_metadata?.role || 'none'
    }
  }

  const role = String(rawRole).toLowerCase().trim()

  if (isProtected && (!user || role !== 'teacher')) {
    // If not logged in OR not a teacher, redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    
    if (user && role !== 'teacher') {
       url.searchParams.set('error', `Access denied. Found role: "${rawRole}". You must have the "teacher" role.`)
    }
    
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && user && role === 'teacher') {
     // If logged in as teacher and trying to access login page, redirect to dashboard
     const url = request.nextUrl.clone()
     url.pathname = '/dashboard'
     return NextResponse.redirect(url)
  }

  // Redirect root to dashboard if logged in
  if (request.nextUrl.pathname === '/' && user && role === 'teacher') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
