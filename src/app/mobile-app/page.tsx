import { LogOut, Smartphone } from 'lucide-react'
import { getPortalProfile, portalHome } from '@/lib/access'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase-server'

export default async function MobileAppPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const profile = await getPortalProfile()
  if (profile?.isAdmin || profile?.role === 'teacher') redirect(portalHome(profile))
  const email = profile?.email || user.email || 'your Google account'

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-violet-50 text-violet-700"><Smartphone className="size-7" /></span>
        <p className="mt-6 text-sm font-semibold text-violet-700">Student account</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Continue in the Cramit app</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">This web portal is for subscribed teachers and Cramit content administrators. Your study decks, reviews, and class codes are available in the mobile app.</p>
        <p className="mt-5 text-xs text-slate-400">Signed in as {email}</p>
        <form action="/auth/signout" method="post"><button className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"><LogOut className="size-4" /> Sign out</button></form>
      </section>
    </main>
  )
}
