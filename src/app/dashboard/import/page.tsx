import { createClient } from '@/utils/supabase-server'
import { BulkImporter } from '@/components/BulkImporter'

export default async function ImportPage() {
  const supabase = await createClient()
  
  // Fetch decks so the teacher can choose which deck to import into
  const { data: { user } } = await supabase.auth.getUser()
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

      <BulkImporter decks={decks || []} />
    </div>
  )
}
