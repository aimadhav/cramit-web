import Link from 'next/link'
import { ArrowRight, BookOpenCheck, Clock3, GraduationCap, Users } from 'lucide-react'
import { CreateClassDialog } from '@/components/teacher/CreateClassDialog'
import { CopyCodeButton } from '@/components/teacher/CopyCodeButton'
import { MetricCard } from '@/components/teacher/MetricCard'
import { getTeacherClasses } from '@/lib/teacher-data'

function formatRecall(value: number | null) {
  return value === null ? '—' : `${value.toFixed(1)}%`
}

export default async function TeacherHomePage() {
  const classes = await getTeacherClasses()
  const totals = classes.reduce((result, item) => ({
    students: result.students + item.studentCount,
    active: result.active + item.activeStudents,
    reviews: result.reviews + item.reviews,
  }), { students: 0, active: 0, reviews: 0 })

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-violet-700">Teaching overview</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Your classes</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            See where students are progressing, where revision is building up, and what needs your attention next.
          </p>
        </div>
        <CreateClassDialog />
      </section>

      <section aria-label="Class overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Classes" value={classes.length.toLocaleString()} helper="Active class codes" icon={GraduationCap} />
        <MetricCard label="Students" value={totals.students.toLocaleString()} helper="Current enrollments" icon={Users} tone="blue" />
        <MetricCard label="Active students" value={totals.active.toLocaleString()} helper="Reviewed in the last 30 days" icon={Clock3} tone="emerald" />
        <MetricCard label="Reviews" value={totals.reviews.toLocaleString()} helper="Completed in the last 30 days" icon={BookOpenCheck} tone="amber" />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Class performance</h2>
            <p className="mt-1 text-sm text-slate-500">Each class has one code you can share with students.</p>
          </div>
        </div>

        {classes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-violet-50 text-violet-700"><GraduationCap /></span>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Create your first class</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You will receive a join code immediately. Students enter it in the Cramit app, and their progress appears here.
            </p>
            <div className="mt-6"><CreateClassDialog /></div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {classes.map((item) => (
              <article key={item.room.id} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Class</p>
                    <h3 className="mt-1 truncate text-lg font-bold text-slate-950">{item.room.name}</h3>
                    <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{item.room.description || 'Student revision and retention analytics.'}</p>
                  </div>
                  <span className="rounded-lg bg-violet-50 px-2.5 py-1.5 font-mono text-sm font-bold tracking-widest text-violet-700">{item.room.code}</span>
                </div>
                <dl className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50 py-3 text-center">
                  <div><dt className="text-[11px] font-medium text-slate-400">Students</dt><dd className="mt-1 font-bold text-slate-900">{item.studentCount}</dd></div>
                  <div><dt className="text-[11px] font-medium text-slate-400">30D reviews</dt><dd className="mt-1 font-bold text-slate-900">{item.reviews}</dd></div>
                  <div><dt className="text-[11px] font-medium text-slate-400">Recall</dt><dd className="mt-1 font-bold text-slate-900">{formatRecall(item.recallRate)}</dd></div>
                </dl>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <CopyCodeButton code={item.room.code} compact />
                  <Link href={`/teacher/classes/${item.room.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
                    View analytics <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
