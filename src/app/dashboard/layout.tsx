import Link from 'next/link'
import { BarChart3, Layers, LayoutDashboard, LogOut, UploadCloud } from 'lucide-react'
import { requireAdmin } from '@/lib/access'
import { Button } from '@/components/ui/button'
import { NewDeckButton } from '@/components/NewDeckButton'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireAdmin()

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="hidden w-64 flex-col border-r bg-white md:flex">
        <div className="flex h-16 items-center border-b px-6"><h1 className="text-xl font-bold text-[#5e6ad2]">Cramit Creator</h1></div>
        <nav className="flex-1 space-y-2 p-4" aria-label="Creator portal">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><LayoutDashboard size={18} /> Dashboard</Link>
          <Link href="/dashboard/decks" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Layers size={18} /> Decks</Link>
          <Link href="/dashboard/import" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><UploadCloud size={18} /> Bulk Import JSON</Link>
          <Link href="/teacher" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50"><BarChart3 size={18} /> Teacher Analytics</Link>
        </nav>
        <div className="border-t p-4">
          <div className="mb-4"><p className="text-sm font-medium">{profile.name || 'Content admin'}</p><p className="truncate text-xs text-gray-500">{profile.email}</p></div>
          <form action="/auth/signout" method="post"><Button variant="outline" className="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900"><LogOut size={16} className="mr-2" /> Sign Out</Button></form>
        </div>
      </aside>
      <main className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b bg-white px-4 py-3 sm:px-8">
          <div><h2 className="text-lg font-semibold text-gray-800">Content administration</h2><p className="text-xs text-gray-400">Internal Cramit access only</p></div>
          <NewDeckButton userId={profile.id} />
        </header>
        <div className="flex-1 overflow-auto p-4 sm:p-8">{children}</div>
      </main>
    </div>
  )
}
