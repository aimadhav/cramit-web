'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TeacherError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-white px-6 py-16 text-center shadow-sm">
      <span className="mx-auto grid size-12 place-items-center rounded-xl bg-amber-50 text-amber-700"><AlertTriangle /></span>
      <h1 className="mt-4 text-xl font-bold text-slate-950">Analytics are temporarily unavailable</h1>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">Your class data is safe. Retry the request, or return in a moment if Supabase is recovering.</p>
      <Button onClick={reset} className="mt-6 h-9 bg-violet-600 px-4 text-white hover:bg-violet-700"><RefreshCw /> Try again</Button>
    </div>
  )
}
