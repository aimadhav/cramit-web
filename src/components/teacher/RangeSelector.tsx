import Link from 'next/link'
import type { TeacherRange } from '@/lib/teacher-types'
import { cn } from '@/lib/utils'

const ranges: { value: TeacherRange; label: string; query: string }[] = [
  { value: 7, label: '7D', query: '7' },
  { value: 30, label: '30D', query: '30' },
  { value: 90, label: '90D', query: '90' },
  { value: 0, label: 'All', query: 'all' },
]

export function RangeSelector({ range, pathname }: { range: TeacherRange; pathname: string }) {
  return (
    <nav aria-label="Analytics date range" className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
      {ranges.map((item) => (
        <Link
          key={item.value}
          href={`${pathname}?range=${item.query}`}
          aria-current={range === item.value ? 'page' : undefined}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
            range === item.value ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
