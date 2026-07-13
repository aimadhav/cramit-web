import Link from 'next/link'
import {
  Activity,
  ArrowLeft,
  BookOpenCheck,
  Brain,
  Clock3,
  Layers3,
  ListTodo,
  Target,
  Users,
} from 'lucide-react'
import { ActivityChart } from '@/components/teacher/ActivityChart'
import { CopyCodeButton } from '@/components/teacher/CopyCodeButton'
import { MetricCard } from '@/components/teacher/MetricCard'
import { RangeSelector } from '@/components/teacher/RangeSelector'
import { RosterTable } from '@/components/teacher/RosterTable'
import { getTeacherClassDashboard, parseTeacherRange } from '@/lib/teacher-data'
import type { StudentRosterRow } from '@/lib/teacher-types'

function percentage(value: number | null) {
  return value === null ? '—' : `${value.toFixed(1)}%`
}

function minutes(value: number) {
  if (value < 60) return `${Math.round(value)}m`
  const hours = Math.floor(value / 60)
  const remainder = Math.round(value % 60)
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`
}

function Leaderboard({
  title,
  description,
  rows,
  metric,
}: {
  title: string
  description: string
  rows: StudentRosterRow[]
  metric: (student: StudentRosterRow) => string
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      {rows.length === 0 ? (
        <div className="mt-5 rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">Not enough activity yet</div>
      ) : (
        <ol className="mt-4 space-y-2">
          {rows.map((student, index) => (
            <li key={student.studentId} className="flex items-center gap-3 rounded-lg border border-slate-100 px-3 py-2.5">
              <span className={index === 0 ? 'grid size-7 place-items-center rounded-full bg-amber-100 text-xs font-bold text-amber-800' : 'grid size-7 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-500'}>{index + 1}</span>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{student.name}</p><p className="truncate text-xs text-slate-400">{student.email}</p></div>
              <span className="text-sm font-bold text-slate-900">{metric(student)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default async function ClassDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ roomId: string }>
  searchParams: Promise<{ range?: string }>
}) {
  const { roomId } = await params
  const query = await searchParams
  const range = parseTeacherRange(query.range)
  const dashboard = await getTeacherClassDashboard(roomId, range)
  const pathname = `/teacher/classes/${roomId}`

  return (
    <div className="space-y-8">
      <section>
        <Link href="/teacher" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-violet-700"><ArrowLeft className="size-4" /> All classes</Link>
        <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">{dashboard.room.name}</h1>
              <span className="rounded-lg bg-violet-50 px-2.5 py-1 font-mono text-sm font-bold tracking-widest text-violet-700">{dashboard.room.code}</span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{dashboard.room.description || 'Class-wide revision, retention, and workload analytics.'}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3"><CopyCodeButton code={dashboard.room.code} /><RangeSelector range={range} pathname={pathname} /></div>
        </div>
      </section>

      <section aria-label="Class metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        <MetricCard label="Students" value={dashboard.summary.studentCount.toLocaleString()} helper="Current members" icon={Users} />
        <MetricCard label="Active" value={dashboard.summary.activeStudents.toLocaleString()} helper="In selected range" icon={Activity} tone="emerald" />
        <MetricCard label="Reviews" value={dashboard.summary.reviews.toLocaleString()} helper="Completed reviews" icon={BookOpenCheck} tone="blue" />
        <MetricCard label="Recall" value={percentage(dashboard.summary.recallRate)} helper="Ratings recalled" icon={Brain} tone="emerald" />
        <MetricCard label="Backlog" value={dashboard.summary.backlog.toLocaleString()} helper="Currently due cards" icon={ListTodo} tone="amber" />
        <MetricCard label="Focused time" value={minutes(dashboard.summary.focusedTimeMinutes)} helper="Valid response time" icon={Clock3} tone="blue" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5"><h2 className="text-lg font-bold text-slate-950">Review activity</h2><p className="mt-1 text-sm text-slate-500">Completed reviews across the selected period.</p></div>
          <ActivityChart data={dashboard.activity} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-slate-950">Subject performance</h2>
          <p className="mt-1 text-sm text-slate-500">Recall and current revision load.</p>
          {dashboard.subjects.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">Subject insights appear after reviews.</div>
          ) : (
            <div className="mt-5 space-y-4">
              {dashboard.subjects.slice(0, 6).map((subject) => (
                <div key={subject.subject}>
                  <div className="flex items-center justify-between gap-3 text-sm"><span className="font-semibold text-slate-800">{subject.subject}</span><span className="font-bold text-slate-900">{percentage(subject.recallRate)}</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-violet-500" style={{ width: `${subject.recallRate ?? 0}%` }} /></div>
                  <div className="mt-1.5 flex justify-between text-xs text-slate-400"><span>{subject.reviews} reviews</span><span>{subject.backlog} due</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3"><span className="rounded-lg bg-amber-50 p-2 text-amber-700"><Target className="size-5" /></span><div><h2 className="text-lg font-bold text-slate-950">Struggling decks</h2><p className="mt-1 text-sm text-slate-500">At least five reviews with recall below 70%, ordered by urgency.</p></div></div>
        {dashboard.strugglingDecks.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center"><p className="font-semibold text-slate-700">No reliable warning yet</p><p className="mt-1 text-sm text-slate-500">Either performance is healthy or there is not enough activity to judge.</p></div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dashboard.strugglingDecks.map((deck) => (
              <article key={deck.deckId} className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{deck.subject}</p><h3 className="mt-1 font-bold text-slate-900">{deck.chapter}</h3><p className="mt-1 text-xs text-slate-500">{deck.name}</p>
                <dl className="mt-4 grid grid-cols-3 gap-2 text-center"><div><dt className="text-[10px] text-slate-400">Recall</dt><dd className="font-bold text-red-700">{percentage(deck.recallRate)}</dd></div><div><dt className="text-[10px] text-slate-400">Misses</dt><dd className="font-bold text-slate-800">{deck.misses}</dd></div><div><dt className="text-[10px] text-slate-400">Backlog</dt><dd className="font-bold text-slate-800">{deck.backlog}</dd></div></dl>
                <p className="mt-3 text-xs text-slate-500">{deck.participatingStudents ?? 0} students · {deck.coverage === null ? 'Coverage unavailable' : `${deck.coverage}% coverage`}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-4"><h2 className="text-xl font-bold text-slate-950">Private class leaderboards</h2><p className="mt-1 text-sm text-slate-500">Visible only to the class teacher. Rankings are withheld until samples are meaningful.</p></div>
        <div className="grid gap-5 lg:grid-cols-3">
          <Leaderboard title="Recall Leaders" description="Highest recall with at least 10 reviews." rows={dashboard.leaderboards.recall} metric={(student) => percentage(student.recallRate)} />
          <Leaderboard title="Most Active" description="Reviews completed, then active days." rows={dashboard.leaderboards.activity} metric={(student) => `${student.reviews} reviews`} />
          <Leaderboard title="Most Consistent" description="Active days, then recall rate." rows={dashboard.leaderboards.consistency} metric={(student) => `${student.activeDays} days`} />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-start gap-3"><span className="rounded-lg bg-blue-50 p-2 text-blue-700"><Layers3 className="size-5" /></span><div><h2 className="text-lg font-bold text-slate-950">Deck and chapter performance</h2><p className="mt-1 text-sm text-slate-500">Coverage compares unique reviewed cards with currently published cards.</p></div></div>
        {dashboard.decks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">Deck performance appears after students review cards.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Chapter / deck</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Reviews</th><th className="px-4 py-3">Recall</th><th className="px-4 py-3">Backlog</th><th className="px-4 py-3">Coverage</th></tr></thead><tbody className="divide-y divide-slate-100">{dashboard.decks.map((deck) => <tr key={deck.deckId}><td className="px-4 py-3"><p className="font-semibold text-slate-900">{deck.chapter}</p><p className="text-xs text-slate-400">{deck.name}</p></td><td className="px-4 py-3 text-slate-600">{deck.subject}</td><td className="px-4 py-3 text-slate-700">{deck.reviews}</td><td className="px-4 py-3 font-semibold text-slate-800">{percentage(deck.recallRate)}</td><td className="px-4 py-3 text-slate-700">{deck.backlog}</td><td className="px-4 py-3 text-slate-700">{percentage(deck.coverage)}</td></tr>)}</tbody></table></div>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5"><h2 className="text-lg font-bold text-slate-950">Student roster</h2><p className="mt-1 text-sm text-slate-500">Search, sort, and open an individual progress view.</p></div>
        <RosterTable roomId={roomId} students={dashboard.roster} />
      </section>
    </div>
  )
}
