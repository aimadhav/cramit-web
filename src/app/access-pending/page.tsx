import { Clock3, LogOut, ShieldCheck } from 'lucide-react'
import { getPortalProfile, portalHome } from '@/lib/access'
import { redirect } from 'next/navigation'

export default async function AccessPendingPage() {
  const profile = await getPortalProfile()
  if (!profile) redirect('/login')
  if (profile.isAdmin || (profile.role === 'teacher' && profile.isPremium) || profile.role !== 'teacher') {
    redirect(portalHome(profile))
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-violet-50 text-violet-700"><Clock3 className="size-7" /></span>
        <p className="mt-6 text-sm font-semibold text-violet-700">Teacher account recognized</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Your analytics access is pending</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">A Cramit administrator needs to activate your teacher subscription. Once enabled, sign in again and your class portal will open automatically.</p>
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-left"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" /><div><p className="text-sm font-semibold text-slate-800">No creator access is granted</p><p className="mt-1 text-xs leading-5 text-slate-500">Teacher subscriptions include classes and analytics only. Cramit&apos;s internal content tools remain private.</p></div></div>
        <p className="mt-5 text-xs text-slate-400">Signed in as {profile.email}</p>
        <form action="/auth/signout" method="post"><button className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"><LogOut className="size-4" /> Sign out</button></form>
      </section>
    </main>
  )
}
