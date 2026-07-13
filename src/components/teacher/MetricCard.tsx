import type { LucideIcon } from 'lucide-react'

export function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = 'violet',
}: {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone?: 'violet' | 'emerald' | 'amber' | 'blue'
}) {
  const tones = {
    violet: 'bg-violet-50 text-violet-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-blue-50 text-blue-700',
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{helper}</p>
        </div>
        <span className={`rounded-lg p-2 ${tones[tone]}`}><Icon className="size-4" /></span>
      </div>
    </div>
  )
}
