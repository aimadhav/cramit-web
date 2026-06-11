import { createClient } from '@/utils/supabase-server'
import { redirect } from 'next/navigation'
import { LogOut, LayoutDashboard, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NewDeckButton } from '@/components/NewDeckButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let rawRole = 'none'
  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
    rawRole = profile?.role || user.user_metadata?.role || user.app_metadata?.role || 'none'
  }

  const role = String(rawRole).toLowerCase().trim()

  if (!user || role !== 'teacher') {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-[#5e6ad2]">Cramit Creator</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
           <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-900">
              <LayoutDashboard size={18} />
              Dashboard
           </a>
           <a href="/dashboard/decks" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md text-sm font-medium text-gray-700">
              <Layers size={18} />
              My Decks
           </a>
        </nav>
        <div className="p-4 border-t">
           <div className="mb-4">
              <p className="text-sm font-medium">{user.user_metadata?.name || 'Teacher'}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
           </div>
           <form action="/auth/signout" method="post">
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                 <LogOut size={16} className="mr-2" />
                 Sign Out
              </Button>
           </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
           <h2 className="text-lg font-semibold text-gray-800">Teacher Dashboard</h2>
           <NewDeckButton userId={user.id} />
        </header>
        <div className="flex-1 overflow-auto p-8">
           {children}
        </div>
      </main>
    </div>
  )
}
