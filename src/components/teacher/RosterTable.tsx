'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpDown, ChevronRight, Search } from 'lucide-react'
import type { StudentRosterRow } from '@/lib/teacher-types'
import { Input } from '@/components/ui/input'

type SortKey = 'name' | 'reviews' | 'recallRate' | 'activeDays' | 'backlog'

function recallLabel(value: number | null) {
  return value === null ? '—' : `${value.toFixed(1)}%`
}

export function RosterTable({ roomId, students }: { roomId: string; students: StudentRosterRow[] }) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('reviews')
  const [descending, setDescending] = useState(true)

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return students
      .filter((student) => !normalized || student.name.toLowerCase().includes(normalized) || student.email.toLowerCase().includes(normalized))
      .sort((a, b) => {
        const left = sortKey === 'name' ? a.name.toLowerCase() : (a[sortKey] ?? -1)
        const right = sortKey === 'name' ? b.name.toLowerCase() : (b[sortKey] ?? -1)
        const result = left < right ? -1 : left > right ? 1 : 0
        return descending ? -result : result
      })
  }, [descending, query, sortKey, students])

  function sortBy(key: SortKey) {
    if (key === sortKey) setDescending((value) => !value)
    else {
      setSortKey(key)
      setDescending(key !== 'name')
    }
  }

  if (students.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center">
        <p className="font-semibold text-slate-700">No students have joined yet</p>
        <p className="mt-1 text-sm text-slate-500">Share the class code to start building your roster.</p>
      </div>
    )
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Student' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'recallRate', label: 'Recall' },
    { key: 'activeDays', label: 'Active days' },
    { key: 'backlog', label: 'Backlog' },
  ]

  return (
    <div>
      <div className="relative mb-4 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search students"
          aria-label="Search students"
          className="h-10 bg-white pl-9"
        />
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  <button onClick={() => sortBy(column.key)} className="inline-flex items-center gap-1.5 hover:text-slate-900">
                    {column.label}<ArrowUpDown className="size-3.5" />
                  </button>
                </th>
              ))}
              <th className="w-12 px-4 py-3"><span className="sr-only">Open</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((student) => (
              <tr key={student.studentId} className="transition hover:bg-violet-50/40">
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-slate-900">{student.name}</p>
                  <p className="text-xs text-slate-500">{student.email}</p>
                </td>
                <td className="px-4 py-3.5 font-medium text-slate-700">{student.reviews.toLocaleString()}</td>
                <td className="px-4 py-3.5">
                  <span className={student.recallRate !== null && student.recallRate < 70 ? 'font-semibold text-amber-700' : 'font-semibold text-slate-700'}>
                    {recallLabel(student.recallRate)}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-slate-700">{student.activeDays}</td>
                <td className="px-4 py-3.5 text-slate-700">{student.backlog}</td>
                <td className="px-4 py-3.5">
                  <Link
                    href={`/teacher/classes/${roomId}/students/${student.studentId}`}
                    aria-label={`View analytics for ${student.name}`}
                    className="inline-flex size-8 items-center justify-center rounded-md text-slate-400 hover:bg-violet-100 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    <ChevronRight className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No students match that search.</p>}
    </div>
  )
}
