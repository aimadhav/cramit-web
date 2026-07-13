import Link from 'next/link'
import { Activity, ArrowLeft, Brain, Clock3, Layers3, ListTodo, Target } from 'lucide-react'
import { ActivityChart } from '@/components/teacher/ActivityChart'
import { MetricCard } from '@/components/teacher/MetricCard'
import { RangeSelector } from '@/components/teacher/RangeSelector'
import { getTeacherStudentDashboard, parseTeacherRange } from '@/lib/teacher-data'

function percentage(value: number | null) {
  return value === null ? '—' : `${value.toFixed(1)}%`
}

function minutes(value: number) {
  if (value < 60) return `${Math.round(value)}m`
  return `${Math.floor(value / 60)}h ${Math.round(value % 60)}m`
}

export default async function StudentDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ roomId: string; studentId: string }>
  searchParams: Promise<{ range?: string }>
}) {
  const { roomId, studentId } = await params
  const query = await searchParams
  const range = parseTeacherRange(query.range)
  const dashboard = await getTeacherStudentDashboard(roomId, studentId, range)
  const pathname = `/teacher/classes/${roomId}/students/${studentId}`

  return (
    <div className="space-y-8">
      <section>
        <Link href={`/teacher/classes/${roomId}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-violet-700"><ArrowLeft className="size-4" /> {dashboard.room.name}</Link>
        <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-violet-700">Student progress</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{dashboard.student.name}</h1>
            <p className="mt-1 text-sm text-slate-500">{dashboard.student.email}</p>
          </div>
          <RangeSelector range={range} pathname={pathname} />
        </div>
      </section>

      <section aria-label="Student metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Reviews" value={dashboard.summary.reviews.toLocaleString()} helper="Selected period" icon={Activity} />
        <MetricCard label="Recall" value={percentage(dashboard.summary.recallRate)} helper="Ratings recalled" icon={Brain} tone="emerald" />
        <MetricCard label="Active days" value={dashboard.summary.activeDays.toLocaleString()} helper="Local calendar days" icon={Clock3} tone="blue" />
        <MetricCard label="Backlog" value={dashboard.summary.backlog.toLocaleString()} helper="Currently due" icon={ListTodo} tone="amber" />
        <MetricCard label="Focused time" value={minutes(dashboard.summary.focusedTimeMinutes)} helper="Valid response time" icon={Clock3} tone="blue" />
        <MetricCard label="Cards covered" value={dashboard.summary.uniqueCards.toLocaleString()} helper="Unique reviewed cards" icon={Layers3} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-slate-950">Review trend</h2><p className="mt-1 text-sm text-slate-500">The student&apos;s review activity in this period.</p><div className="mt-4"><ActivityChart data={dashboard.activity} /></div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-slate-950">Subject performance</h2><p className="mt-1 text-sm text-slate-500">Recall and current workload by subject.</p>
          {dashboard.subjects.length === 0 ? <div className="mt-6 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">Not enough activity yet</div> : (
            <div className="mt-5 space-y-4">{dashboard.subjects.map((subject) => <div key={subject.subject}><div className="flex justify-between text-sm"><span className="font-semibold text-slate-800">{subject.subject}</span><span className="font-bold text-slate-900">{percentage(subject.recallRate)}</span></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-violet-500" style={{ width: `${subject.recallRate ?? 0}%` }} /></div><div className="mt-1.5 flex justify-between text-xs text-slate-400"><span>{subject.reviews} reviews</span><span>{subject.backlog} due</span></div></div>)}</div>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3"><span className="rounded-lg bg-amber-50 p-2 text-amber-700"><Target className="size-5" /></span><div><h2 className="text-lg font-bold text-slate-950">Needs attention</h2><p className="mt-1 text-sm text-slate-500">Decks with at least three reviews and recall below 70%.</p></div></div>
        {dashboard.strugglingDecks.length === 0 ? <div className="mt-5 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center"><p className="font-semibold text-slate-700">No reliable concern yet</p><p className="mt-1 text-sm text-slate-500">Performance is healthy or the student needs more reviews before comparison.</p></div> : (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{dashboard.strugglingDecks.map((deck) => <article key={deck.deckId} className="rounded-xl border border-amber-200 bg-amber-50/40 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{deck.subject}</p><h3 className="mt-1 font-bold text-slate-900">{deck.chapter}</h3><p className="mt-1 text-xs text-slate-500">{deck.name}</p><dl className="mt-4 grid grid-cols-3 gap-2 text-center"><div><dt className="text-[10px] text-slate-400">Recall</dt><dd className="font-bold text-red-700">{percentage(deck.recallRate)}</dd></div><div><dt className="text-[10px] text-slate-400">Misses</dt><dd className="font-bold text-slate-800">{deck.misses}</dd></div><div><dt className="text-[10px] text-slate-400">Backlog</dt><dd className="font-bold text-slate-800">{deck.backlog}</dd></div></dl></article>)}</div>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-slate-950">Deck and chapter performance</h2><p className="mt-1 text-sm text-slate-500">Detailed recall, backlog, and content coverage.</p>
        {dashboard.decks.length === 0 ? <div className="mt-5 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">No deck activity in this range.</div> : (
          <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Chapter / deck</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Reviews</th><th className="px-4 py-3">Recall</th><th className="px-4 py-3">Backlog</th><th className="px-4 py-3">Coverage</th></tr></thead><tbody className="divide-y divide-slate-100">{dashboard.decks.map((deck) => <tr key={deck.deckId}><td className="px-4 py-3"><p className="font-semibold text-slate-900">{deck.chapter}</p><p className="text-xs text-slate-400">{deck.name}</p></td><td className="px-4 py-3 text-slate-600">{deck.subject}</td><td className="px-4 py-3">{deck.reviews}</td><td className="px-4 py-3 font-semibold">{percentage(deck.recallRate)}</td><td className="px-4 py-3">{deck.backlog}</td><td className="px-4 py-3">{percentage(deck.coverage)}</td></tr>)}</tbody></table></div>
        )}
      </section>
    </div>
  )
}
