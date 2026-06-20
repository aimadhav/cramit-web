import { createClient } from '@/utils/supabase-server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Fetch all public decks (or all decks created by any teacher)
  const { data: { user } } = await supabase.auth.getUser()
  const { data: decks, error } = await supabase
    .from('decks')
    .select('*, flashcards(count)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Welcome back</h3>
        <p className="text-gray-500">Here's an overview of your educational content.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Decks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{decks?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Flashcards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
               {decks?.reduce((acc, deck) => acc + (deck.flashcards?.[0]?.count || 0), 0) || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4">Recent Decks</h4>
        {decks && decks.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {decks.slice(0, 6).map((deck) => (
                <Card key={deck.id} className="hover:border-[#5e6ad2] transition-colors cursor-pointer">
                   <CardHeader>
                      <CardTitle className="text-lg">{deck.name}</CardTitle>
                      <CardDescription className="flex gap-2 mt-1">
                         <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{deck.prep_category}</span>
                         <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">{deck.subject}</span>
                      </CardDescription>
                   </CardHeader>
                   <CardContent>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{deck.description || 'No description provided.'}</p>
                      <div className="text-xs font-medium text-gray-400">
                         {deck.flashcards?.[0]?.count || 0} Cards • {deck.is_public ? 'Public' : 'Private'}
                      </div>
                   </CardContent>
                </Card>
             ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
             <p className="text-gray-500">You haven't created any decks yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
