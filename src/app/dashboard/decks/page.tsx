import { createClient } from '@/utils/supabase-server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

type DeckSummary = {
  id: string
  name: string
  description: string | null
  prep_category: string | null
  subject: string | null
  is_public: boolean
  flashcards: { count: number }[]
}

export default async function DecksListPage() {
  const supabase = await createClient()
  
  const { data: decks, error } = await supabase
    .from('decks')
    .select('*, flashcards(count)')
    .order('created_at', { ascending: false })

  const rows = (decks || []) as DeckSummary[]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">My Decks</h3>
        <p className="text-gray-500">Manage all your created flashcard decks here.</p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700">Decks could not be loaded: {error.message}</div>
      ) : rows.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
           {rows.map((deck) => (
              <Link key={deck.id} href={`/dashboard/decks/${deck.id}`}>
                <Card className="hover:border-[#5e6ad2] hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                   <CardHeader>
                      <CardTitle className="text-lg">{deck.name}</CardTitle>
                      <CardDescription className="flex gap-2 mt-1">
                         <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{deck.prep_category}</span>
                         <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">{deck.subject}</span>
                      </CardDescription>
                   </CardHeader>
                   <CardContent className="flex-1 flex flex-col justify-end">
                      <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">{deck.description || 'No description provided.'}</p>
                      <div className="text-xs font-medium text-gray-400">
                         {deck.flashcards?.[0]?.count || 0} Cards • {deck.is_public ? 'Public' : 'Private'}
                      </div>
                   </CardContent>
                </Card>
              </Link>
           ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
           <p className="text-gray-500">No decks yet. Use New Deck to create one.</p>
        </div>
      )}
    </div>
  )
}
