'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CopyCodeButton({ code, compact = false }: { code: string; compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
    window.setTimeout(() => setStatus('idle'), 1800)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size={compact ? 'sm' : 'default'}
      onClick={copyCode}
      aria-label={`Copy class code ${code}`}
      className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
    >
      {status === 'copied' ? <Check className="text-emerald-600" /> : <Copy />}
      {compact
        ? status === 'copied' ? 'Copied' : status === 'error' ? 'Copy failed' : 'Copy'
        : status === 'copied' ? 'Code copied' : status === 'error' ? 'Copy failed' : 'Copy code'}
    </Button>
  )
}
