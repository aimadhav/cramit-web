import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase-server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('role,is_admin,is_premium')
          .eq('id', user.id)
          .maybeSingle()

        const destination = profile?.is_admin
          ? '/dashboard'
          : profile?.role === 'teacher' && profile?.is_premium
            ? '/teacher'
            : profile?.role === 'teacher'
              ? '/access-pending'
              : '/mobile-app'
        return NextResponse.redirect(`${origin}${destination}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate with Google`)
}
