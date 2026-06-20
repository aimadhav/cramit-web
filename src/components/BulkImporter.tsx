'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase-client'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Loader2, UploadCloud, AlertCircle, CheckCircle2, ArrowRight, Plus, RefreshCw } from 'lucide-react'

type Deck = { id: string; name: string }

type PrepCategory = 'JEE' | 'NEET' | 'CS'

type DeckResolution =
  | { action: 'map'; targetDeckId: string }
  | { action: 'create'; newName: string; prepCategory: PrepCategory; subject: string }

interface UnknownDeckEntry {
  originalName: string
  cardCount: number
  resolution: DeckResolution
}

type Step = 'paste' | 'resolve' | 'importing' | 'done'

// Categories configuration mapped out dynamically based on your request
const PREP_OPTIONS: { value: PrepCategory; label: string; subjects: string[] }[] = [
  { value: 'JEE', label: 'JEE', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
  { value: 'NEET', label: 'NEET', subjects: ['Physics', 'Chemistry', 'Biology'] },
  { value: 'CS', label: 'Computer Science', subjects: ['CS', 'Data Structures & Algorithms (DSA)', 'Object-Oriented Programming (OOP)', 'DBMS'] }
]

export function BulkImporter({ decks: initialDecks }: { decks: Deck[] }) {
  const [step, setStep] = useState<Step>('paste')
  const [jsonInput, setJsonInput] = useState('')
  const [publishImmediately, setPublishImmediately] = useState('draft')
  const [parsedCards, setParsedCards] = useState<any[]>([])
  const [unknownEntries, setUnknownEntries] = useState<UnknownDeckEntry[]>([])
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] } | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [decks, setDecks] = useState<Deck[]>(initialDecks)

  const supabase = createClient()

  // ─── Step 1: Parse & Analyse ────────────────────────────────────────────────

  const handleAnalyse = () => {
    setParseError(null)
    let parsed: any[] = []

    try {
      parsed = JSON.parse(jsonInput)
      if (!Array.isArray(parsed)) throw new Error('JSON must be an array of card objects.')
    } catch (e: any) {
      setParseError(e.message)
      return
    }

    const deckNamesInJson = [...new Set(
      parsed.map(c => String(c.deck || '').trim()).filter(Boolean)
    )]

    const existingLower = new Map(decks.map(d => [d.name.toLowerCase(), d]))

    const unknowns: UnknownDeckEntry[] = []
    for (const name of deckNamesInJson) {
      if (!existingLower.has(name.toLowerCase())) {
        unknowns.push({
          originalName: name,
          cardCount: parsed.filter(c => String(c.deck || '').trim() === name).length,
          resolution: { 
            action: 'create', 
            newName: name, 
            prepCategory: 'JEE', 
            subject: 'Physics' 
          },
        })
      }
    }

    setParsedCards(parsed)

    if (unknowns.length > 0) {
      setUnknownEntries(unknowns)
      setStep('resolve')
    } else {
      runImport(parsed, [])
    }
  }

  // ─── Step 2: Resolution helpers ─────────────────────────────────────────────

  const updateResolution = (originalName: string, res: DeckResolution) => {
    setUnknownEntries(prev =>
      prev.map(e => e.originalName === originalName ? { ...e, resolution: res } : e)
    )
  }

  // ─── Step 3: Import ──────────────────────────────────────────────────────────

  const handleConfirmAndImport = () => runImport(parsedCards, unknownEntries)

  const runImport = async (cards: any[], unknowns: UnknownDeckEntry[]) => {
    setStep('importing')
    setResults(null)

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      setResults({ 
        success: 0, 
        failed: cards.length, 
        errors: [`Authentication error: You must be logged in to import decks and flashcards.`] 
      })
      setStep('done')
      return
    }

    const existingLower = new Map(decks.map(d => [d.name.toLowerCase(), d]))
    const deckIdMap = new Map<string, string>()

    // 1. Create any new decks first
    for (const entry of unknowns) {
      if (entry.resolution.action === 'map') {
        deckIdMap.set(entry.originalName, entry.resolution.targetDeckId)
      } else {
        const newDeckName = entry.resolution.newName
        const newDeckId = uuidv4()
        
        const { error } = await supabase.from('decks').insert({
          id: newDeckId,
          name: newDeckName,
          user_id: user.id,
          tags_json: JSON.stringify([]),
          is_premium: false,
          is_public: true,
          version: 1,
          prep_category: entry.resolution.prepCategory,
          subject: entry.resolution.subject,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        
        if (error) {
          setResults({ 
            success: 0, 
            failed: cards.length, 
            errors: [`Failed to create deck "${newDeckName}": ${error.message}`] 
          })
          setStep('done')
          return
        }
        
        deckIdMap.set(entry.originalName, newDeckId)
        setDecks(prev => [...prev, { id: newDeckId, name: newDeckName }])
      }
    }

    // 2. Map all existing deck names
    for (const card of cards) {
      const name = String(card.deck || '').trim()
      if (name && !deckIdMap.has(name)) {
        const existing = existingLower.get(name.toLowerCase())
        if (existing) deckIdMap.set(name, existing.id)
      }
    }

    // 3. Insert flashcards
    let successCount = 0
    let failedCount = 0
    const errors: string[] = []

    const BATCH_SIZE = 50
    for (let i = 0; i < cards.length; i += BATCH_SIZE) {
      const batch = cards.slice(i, i + BATCH_SIZE)

      const formattedBatch = batch.flatMap((item) => {
        const deckName = String(item.deck || '').trim()
        const deckId = deckIdMap.get(deckName)

        if (!deckId) {
          failedCount++
          errors.push(`Card skipped — unknown deck: "${deckName}"`)
          return []
        }

        const frontText = item.front || item.question || item.q || ''
        const backText = item.back || item.answer || item.a || ''

        if (!frontText && !backText) {
          failedCount++
          errors.push(`Row ${i + 1} was completely empty.`)
          return []
        }

        const frontContent = JSON.stringify([{ type: 'mixed', value: String(frontText) }])
        const backContent = JSON.stringify([{ type: 'mixed', value: String(backText) }])

        const tags = (
          Array.isArray(item.tags)
            ? item.tags
            : typeof item.tags === 'string'
            ? [item.tags]
            : []
        ).filter(Boolean).map((t: string) => t.trim().toLowerCase())

        const mediaUrls: string[] = []
        const frontImage = item.frontImage || item.front_image || item.image || item.imageUrl
        const backImage = item.backImage || item.back_image
        if (frontImage) mediaUrls[0] = frontImage
        if (backImage) { if (!frontImage) mediaUrls[0] = ''; mediaUrls[1] = backImage }

        return [{
          id: uuidv4(),
          deck_id: deckId,
          front: frontText,
          back: backText,
          front_content: frontContent,
          back_content: backContent,
          tags_json: JSON.stringify([...new Set(tags)]),
          media_urls_json: JSON.stringify(mediaUrls),
          starting_stability: item.startingStability || item.initial_stability || 2.5,
          status: publishImmediately,
          content_type: 'mixed',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }]
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
    setStep('done')
  }

  const reset = () => {
    setStep('paste')
    setJsonInput('')
    setParsedCards([])
    setUnknownEntries([])
    setResults(null)
    setParseError(null)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ── STEP 1: Paste JSON ── */}
      {step === 'paste' && (
        <Card>
          <CardHeader>
            <CardTitle>Bulk Import Flashcards</CardTitle>
            <CardDescription>
              Paste a JSON array. Each card needs a <code className="bg-gray-100 px-1 rounded text-xs">deck</code> field
              matching your deck name, plus <code className="bg-gray-100 px-1 rounded text-xs">front</code> and{' '}
              <code className="bg-gray-100 px-1 rounded text-xs">back</code>. Unknown decks can be created or remapped before import.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              className="min-h-[360px] font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg"
              placeholder={`[\n  {\n    "deck": "kinematics",\n    "front": "What is Newton's 1st law?",\n    "back": "An object in motion stays in motion..."\n  }\n]`}
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
            />

            <div className="flex items-center gap-4">
              <div className="space-y-1 flex-1">
                <Label>Import Status</Label>
                <Select value={publishImmediately} onValueChange={v => setPublishImmediately(v || 'draft')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Save as Drafts</SelectItem>
                    <SelectItem value="published">Publish Immediately</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {parseError && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2">
                <AlertCircle size={15} />
                <span>{parseError}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#5e6ad2] hover:bg-[#4b54a8]"
              onClick={handleAnalyse}
              disabled={!jsonInput.trim()}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Analyse & Continue
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* ── STEP 2: Resolve Unknown Decks ── */}
      {step === 'resolve' && (
        <div className="space-y-4">
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-base flex items-center gap-2">
                <AlertCircle size={16} />
                {unknownEntries.length} unknown deck{unknownEntries.length > 1 ? 's' : ''} found
              </CardTitle>
              <CardDescription className="text-amber-700">
                These deck names in your JSON don't match any existing deck. Set up their target categorization maps below.
              </CardDescription>
            </CardHeader>
          </Card>

          {unknownEntries.map(entry => (
            <UnknownDeckResolver
              key={entry.originalName}
              entry={entry}
              existingDecks={decks}
              onChange={res => updateResolution(entry.originalName, res)}
            />
          ))}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setStep('paste')} className="flex-1">
              ← Back
            </Button>
            <Button
              className="flex-1 bg-[#5e6ad2] hover:bg-[#4b54a8]"
              onClick={handleConfirmAndImport}
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              Confirm & Import {parsedCards.length} cards
            </Button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Importing ── */}
      {step === 'importing' && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-[#5e6ad2]" />
            <p className="text-sm text-gray-500">Importing {parsedCards.length} cards…</p>
          </CardContent>
        </Card>
      )}

      {/* ── STEP 4: Done ── */}
      {step === 'done' && results && (
        <Card className={results.failed > 0 ? 'border-red-200' : 'border-green-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${results.failed > 0 ? 'text-red-700' : 'text-green-700'}`}>
              {results.failed > 0 ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              Import Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium text-green-700">✓ {results.success} cards imported successfully</p>
            {results.failed > 0 && (
              <p className="font-medium text-red-600">✗ {results.failed} cards failed</p>
            )}
            {results.errors.length > 0 && (
              <div className="mt-3 pt-3 border-t max-h-40 overflow-y-auto space-y-1">
                {results.errors.map((err, i) => (
                  <p key={i} className="text-xs text-red-600">{err}</p>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Import Another Batch
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

// ── Sub-component: resolver for a single unknown deck ────────────────────────

function UnknownDeckResolver({
  entry,
  existingDecks,
  onChange,
}: {
  entry: UnknownDeckEntry
  existingDecks: Deck[]
  onChange: (res: DeckResolution) => void
}) {
  const [mode, setMode] = useState<'create' | 'map'>('create')
  const [newName, setNewName] = useState(entry.originalName)
  const [prepCategory, setPrepCategory] = useState<PrepCategory>('JEE')
  const [subject, setSubject] = useState('Physics')
  const [targetDeckId, setTargetDeckId] = useState('')

  // Dynamically extract accessible subjects for current category context
  const currentPrepOption = PREP_OPTIONS.find(p => p.value === prepCategory)
  const availableSubjects = currentPrepOption ? currentPrepOption.subjects : []

  const handleModeChange = (val: string | null) => {
    if (!val) return
    const m = val as 'create' | 'map'
    setMode(m)
    if (m === 'create') {
      onChange({ action: 'create', newName, prepCategory, subject })
    } else if (targetDeckId) {
      onChange({ action: 'map', targetDeckId })
    }
  }

  const handleNewNameChange = (val: string) => {
    setNewName(val)
    onChange({ action: 'create', newName: val, prepCategory, subject })
  }

  const handlePrepCategoryChange = (val: PrepCategory | null) => {
    if (!val) return // Guard against null values
    setPrepCategory(val)
    const options = PREP_OPTIONS.find(p => p.value === val)
    const fallbackSubject = options ? options.subjects[0] : ''
    setSubject(fallbackSubject)
    onChange({ action: 'create', newName, prepCategory: val, subject: fallbackSubject })
  }

  const handleSubjectChange = (val: string | null) => {
    if (!val) return // Guard against null values
    setSubject(val)
    onChange({ action: 'create', newName, prepCategory, subject: val })
  }

  const handleTargetChange = (val: string | null) => {
    if (!val) return
    setTargetDeckId(val)
    onChange({ action: 'map', targetDeckId: val })
  }

  return (
    <Card className="border-gray-200">
      <CardContent className="pt-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Unknown deck: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#5e6ad2]">{entry.originalName}</code>
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{entry.cardCount} card{entry.cardCount !== 1 ? 's' : ''} use this deck name</p>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-gray-500">Action</Label>
          <Select value={mode} onValueChange={handleModeChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="create">
                <span className="flex items-center gap-2"><Plus size={13} /> Create new deck</span>
              </SelectItem>
              <SelectItem value="map">
                <span className="flex items-center gap-2"><ArrowRight size={13} /> Use an existing deck instead</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {mode === 'create' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label className="text-xs text-gray-500">New deck name</Label>
              <Input
                value={newName}
                onChange={e => handleNewNameChange(e.target.value)}
                placeholder="e.g. kinematics"
                className="text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-gray-500">Prep Category</Label>
              <Select value={prepCategory} onValueChange={handlePrepCategoryChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PREP_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-gray-500">Subject Field</Label>
              <Select value={subject} onValueChange={handleSubjectChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableSubjects.map(sub => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {mode === 'map' && (
          <div className="space-y-1">
            <Label className="text-xs text-gray-500">Map to existing deck</Label>
            <Select value={targetDeckId} onValueChange={handleTargetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a deck…" />
              </SelectTrigger>
              <SelectContent>
                {existingDecks.map(d => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  )
}