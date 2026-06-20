'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase-client'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, UploadCloud, AlertCircle, CheckCircle2 } from 'lucide-react'

export function BulkImporter({ decks }: { decks: any[] }) {
  const [jsonInput, setJsonInput] = useState('')
  const [selectedDeckId, setSelectedDeckId] = useState('')
  const [publishImmediately, setPublishImmediately] = useState('draft')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] } | null>(null)
  
  const supabase = createClient()

  const handleImport = async () => {
    if (!selectedDeckId) {
      alert('Please select a deck first.')
      return
    }

    if (!jsonInput.trim()) {
      alert('Please paste some JSON data.')
      return
    }

    let parsedData: any[] = []
    try {
      parsedData = JSON.parse(jsonInput)
      if (!Array.isArray(parsedData)) {
        throw new Error('JSON must be an array of objects.')
      }
    } catch (e: any) {
      alert(`Invalid JSON: ${e.message}`)
      return
    }

    setIsLoading(true)
    setResults(null)
    
    let successCount = 0
    let failedCount = 0
    const errors: string[] = []

    // Process in batches of 50 to avoid overloading the DB
    const BATCH_SIZE = 50
    for (let i = 0; i < parsedData.length; i += BATCH_SIZE) {
      const batch = parsedData.slice(i, i + BATCH_SIZE)
      
      const formattedBatch = batch.map((item, index) => {
        // Attempt to extract front and back intelligently
        const frontText = item.front || item.question || item.q || ''
        const backText = item.back || item.answer || item.a || ''
        
        // Ensure format matches mobile app expectations
        const frontContent = JSON.stringify([{ type: 'mixed', value: String(frontText) }])
        const backContent = JSON.stringify([{ type: 'mixed', value: String(backText) }])
        
        // Handle images if they exist
        const mediaUrls = []
        if (item.frontImage || item.image) mediaUrls[0] = item.frontImage || item.image
        if (item.backImage) {
           if (!mediaUrls[0]) mediaUrls[0] = '' 
           mediaUrls[1] = item.backImage
        }

        return {
          id: uuidv4(),
          deck_id: selectedDeckId,
          front: frontText,
          back: backText,
          front_content: frontContent,
          back_content: backContent,
          media_urls_json: JSON.stringify(mediaUrls),
          starting_stability: item.startingStability || item.initial_stability || 0,
          status: publishImmediately,
          content_type: 'mixed',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }).filter(c => {
         // Filter out completely empty rows
         const isEmpty = c.front_content.includes('""') && c.back_content.includes('""');
         if (isEmpty) {
            failedCount++;
            errors.push(`Row ${i + 1} was completely empty.`);
         }
         return !isEmpty;
      })

      if (formattedBatch.length > 0) {
        const { error } = await supabase.from('flashcards').insert(formattedBatch)
        if (error) {
          failedCount += formattedBatch.length
          errors.push(`Batch error: ${error.message}`)
        } else {
          successCount += formattedBatch.length
        }
      }
    }

    setResults({ success: successCount, failed: failedCount, errors })
    setIsLoading(false)
    if (failedCount === 0) setJsonInput('') // Clear on success
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>JSON Data</CardTitle>
            <CardDescription>
              Paste an array of JSON objects. The importer will look for keys like <code>front</code>, <code>back</code>, <code>question</code>, or <code>answer</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[400px] font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg"
              placeholder={`[\n  {\n    "front": "What is the capital of France?",\n    "back": "Paris",\n    "startingStability": 2.5\n  }\n]`}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              disabled={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Target Deck</Label>
              <Select value={selectedDeckId} onValueChange={(val) => setSelectedDeckId(val || '')} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a deck..." />
                </SelectTrigger>
                <SelectContent>
                  {decks.map(deck => (
                    <SelectItem key={deck.id} value={deck.id}>{deck.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Import Status</Label>
              <Select value={publishImmediately} onValueChange={(val) => setPublishImmediately(val || 'draft')} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Save as Drafts (Review Later)</SelectItem>
                  <SelectItem value="published">Publish Immediately (Live)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-[#5e6ad2] hover:bg-[#4b54a8]" 
              onClick={handleImport} 
              disabled={isLoading || !selectedDeckId || !jsonInput}
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Importing...</>
              ) : (
                <><UploadCloud className="mr-2 h-4 w-4" /> Import Cards</>
              )}
            </Button>
          </CardFooter>
        </Card>

        {results && (
          <Card className={results.failed > 0 ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-lg flex items-center gap-2 ${results.failed > 0 ? "text-red-700" : "text-green-700"}`}>
                {results.failed > 0 ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                Import Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="font-medium">Successfully imported: {results.success}</p>
              {results.failed > 0 && <p className="text-red-600 font-bold">Failed to import: {results.failed}</p>}
              
              {results.errors.length > 0 && (
                <div className="mt-2 pt-2 border-t border-red-200/50 max-h-32 overflow-y-auto">
                  {results.errors.map((err, i) => (
                    <p key={i} className="text-xs text-red-600">{err}</p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
