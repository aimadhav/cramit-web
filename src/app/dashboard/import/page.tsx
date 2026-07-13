import { createClient } from '@/utils/supabase-server'
import { BulkImporter } from '@/components/BulkImporter'

export default async function ImportPage() {
  const supabase = await createClient()
  
  const { data: decks, error } = await supabase
    .from('decks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Bulk Import</h3>
        <p className="text-gray-500">Upload a JSON array to mass-create flashcards in your decks.</p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700">Decks could not be loaded: {error.message}</div>
      ) : (
        <BulkImporter decks={decks || []} />
      )}
    </div>
  )
}
