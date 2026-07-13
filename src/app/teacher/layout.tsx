import Link from 'next/link'
import { BarChart3, BookOpen, LayoutGrid, LogOut } from 'lucide-react'
import { requireTeacher } from '@/lib/access'
import { TimezoneSync } from '@/components/teacher/TimezoneSync'

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireTeacher()
  const displayName = profile.name?.trim() || profile.email.split('@')[0]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <TimezoneSync />
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/teacher" className="flex items-center gap-2.5" aria-label="Cramit teacher home">
              <span className="grid size-9 place-items-center rounded-xl bg-violet-600 text-white shadow-sm"><BookOpen className="size-5" /></span>
              <span>
                <span className="block text-lg font-bold tracking-tight">Cramit</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Teacher Analytics</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex" aria-label="Teacher portal">
              <Link href="/teacher" className="inline-flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">
                <LayoutGrid className="size-4" /> Classes
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {profile.isAdmin && (
              <Link href="/dashboard" className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:inline-flex">
                <BarChart3 className="size-4" /> Creator portal
              </Link>
            )}
            <div className="hidden text-right lg:block">
              <p className="text-sm font-semibold text-slate-800">{displayName}</p>
              <p className="max-w-48 truncate text-xs text-slate-400">{profile.email}</p>
            </div>
            <form action="/auth/signout" method="post">
              <button type="submit" aria-label="Sign out" className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">{children}</main>
    </div>
  )
}
