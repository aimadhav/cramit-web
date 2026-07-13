import { createClient } from '@/utils/supabase-server'
import { FlashcardEditor } from '@/components/FlashcardEditor'
import { notFound } from 'next/navigation'

export default async function DeckEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const resolvedParams = await params
  
  const { data: deck, error } = await supabase
    .from('decks')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !deck) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{deck.name}</h2>
          <p className="text-gray-500">
             {deck.prep_category} • {deck.subject} {deck.is_public ? '• Public' : ''}
          </p>
        </div>
      </div>

      <FlashcardEditor deckId={deck.id} />
    </div>
  )
}
