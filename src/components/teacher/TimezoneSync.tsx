'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function TimezoneSync() {
  const router = useRouter()

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (!timezone) return
    const current = document.cookie
      .split('; ')
      .find((entry) => entry.startsWith('cramit-timezone='))
      ?.split('=')[1]
    if (decodeURIComponent(current || '') === timezone) return
    document.cookie = `cramit-timezone=${encodeURIComponent(timezone)}; path=/; max-age=31536000; samesite=lax`
    router.refresh()
  }, [router])

  return null
}
