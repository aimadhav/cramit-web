'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ActivityBucket } from '@/lib/teacher-types'

export function ActivityChart({ data }: { data: ActivityBucket[] }) {
  if (!data.some((bucket) => bucket.reviews > 0)) {
    return (
      <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center">
        <div>
          <p className="font-semibold text-slate-700">No review activity in this range</p>
          <p className="mt-1 text-sm text-slate-500">Activity will appear after students complete reviews.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-72 w-full" role="img" aria-label="Reviews completed over time">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 6, left: -22, bottom: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} minTickGap={24} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            cursor={{ fill: '#f1f5f9' }}
            contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15,23,42,.08)' }}
            formatter={(value) => [`${value} reviews`, 'Completed']}
            labelFormatter={(label) => `Starting ${label}`}
          />
          <Bar dataKey="reviews" fill="#7c3aed" radius={[5, 5, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
