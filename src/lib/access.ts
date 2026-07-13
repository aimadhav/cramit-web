import 'server-only'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase-server'

export interface PortalProfile {
  id: string
  email: string
  name: string | null
  role: 'student' | 'teacher' | null
  isAdmin: boolean
  isPremium: boolean
}

type ProfileRow = {
  id: string
  email: string
  name: string | null
  role: 'student' | 'teacher' | null
  is_admin: boolean
  is_premium: boolean
}

export function portalHome(profile: PortalProfile | null) {
  if (!profile) return '/login'
  if (profile.isAdmin) return '/dashboard'
  if (profile.role === 'teacher' && profile.isPremium) return '/teacher'
  if (profile.role === 'teacher') return '/access-pending'
  return '/mobile-app'
}

export async function getPortalProfile(): Promise<PortalProfile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('users')
    .select('id,email,name,role,is_admin,is_premium')
    .eq('id', user.id)
    .maybeSingle()

  if (error || !data) return null
  const row = data as ProfileRow
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    isAdmin: row.is_admin,
    isPremium: row.is_premium,
  }
}

export async function requireAdmin(): Promise<PortalProfile> {
  const profile = await getPortalProfile()
  if (!profile) redirect('/login')
  if (!profile.isAdmin) redirect(portalHome(profile))
  return profile
}

export async function requireTeacher(): Promise<PortalProfile> {
  const profile = await getPortalProfile()
  if (!profile) redirect('/login')
  if (!profile.isAdmin && !(profile.role === 'teacher' && profile.isPremium)) {
    redirect(portalHome(profile))
  }
  return profile
}
