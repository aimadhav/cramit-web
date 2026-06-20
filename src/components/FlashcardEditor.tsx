'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase-client'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Loader2, Plus, Save, Trash2, Smartphone } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export function FlashcardEditor({ deckId }: { deckId: string }) {
  const [cards, setCards] = useState<any[]>([])
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isOverSafeZone, setIsOverSafeZone] = useState(false)
  const supabase = createClient()

  // Form State
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [frontImage, setFrontImage] = useState('')
  const [backImage, setBackImage] = useState('')
  const [showBackPreview, setShowBackPreview] = useState(false)
  const [startingStability, setStartingStability] = useState('0')
  const [status, setStatus] = useState('draft')

  useEffect(() => {
    fetchCards()
  }, [deckId])

  useEffect(() => {
    // Check if content might be too long based on rough character count / images
    // This is a heuristic approximation since we can't easily measure rendered DOM height of an iframe cross-browser
    const contentLength = showBackPreview ? back.length : front.length;
    const hasImage = showBackPreview ? !!backImage : !!frontImage;
    
    // Roughly 300 chars without image, or 100 chars with an image crosses the 380px safe zone
    const isOver = hasImage ? contentLength > 100 : contentLength > 350;
    setIsOverSafeZone(isOver);
  }, [front, back, frontImage, backImage, showBackPreview])

  const fetchCards = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('deck_id', deckId)
      .order('created_at', { ascending: true })

    if (data) {
      setCards(data)
      if (data.length > 0 && !activeCardId) {
        selectCard(data[0])
      }
    }
    setIsLoading(false)
  }

  const selectCard = (card: any) => {
    setActiveCardId(card.id)
    
    try {
      if (card.front_content) {
        const parsedFront = typeof card.front_content === 'string' ? JSON.parse(card.front_content) : card.front_content
        setFront(parsedFront?.[0]?.value || card.front || '')
      } else {
        setFront(card.front || '')
      }

      if (card.back_content) {
        const parsedBack = typeof card.back_content === 'string' ? JSON.parse(card.back_content) : card.back_content
        setBack(parsedBack?.[0]?.value || card.back || '')
      } else {
        setBack(card.back || '')
      }
    } catch {
      setFront(card.front || '')
      setBack(card.back || '')
    }

    const mediaField = card.media_urls_json || card.media_urls || '[]'
    const parsedMediaUrls = typeof mediaField === 'string' ? JSON.parse(mediaField) : mediaField
    setFrontImage(parsedMediaUrls[0] || '')
    setBackImage(parsedMediaUrls[1] || '')
    
    setStartingStability(String(card.starting_stability || 0))
    setStatus(card.status || 'draft')
  }

  const handleCreateNewCard = () => {
    setActiveCardId(null)
    setFront('')
    setBack('')
    setFrontImage('')
    setBackImage('')
    setStartingStability('0')
    setStatus('draft')
    setShowBackPreview(false)
  }

  const handleSaveCard = async (isPublishing = false) => {
    if (!front || !back) {
      alert('Front and Back content required')
      return
    }

    setIsSaving(true)
    const newStatus = isPublishing ? 'published' : status;
    
    // We store it in the JSON array format the mobile app expects
    const frontContent = JSON.stringify([{ type: 'mixed', value: front }])
    const backContent = JSON.stringify([{ type: 'mixed', value: back }])
    
    const mediaUrls = []
    if (frontImage) mediaUrls[0] = frontImage
    if (backImage) {
      if (!frontImage) mediaUrls[0] = '' // pad if only back image exists
      mediaUrls[1] = backImage
    }

    const cardData = {
      deck_id: deckId,
      front: front,
      back: back,
      front_content: frontContent,
      back_content: backContent,
      starting_stability: parseFloat(startingStability),
      media_urls_json: JSON.stringify(mediaUrls),
      content_type: 'mixed',
      status: newStatus,
      updated_at: new Date().toISOString()
    }

    if (activeCardId) {
      // Update
      const { error } = await supabase
        .from('flashcards')
        .update(cardData)
        .eq('id', activeCardId)
        
      if (!error) {
         fetchCards()
      } else {
         alert('Failed to update')
      }
    } else {
      // Insert
      const newId = uuidv4()
      const { error } = await supabase
        .from('flashcards')
        .insert({
          id: newId,
          ...cardData,
          created_at: new Date().toISOString()
        })
        
      if (!error) {
         setActiveCardId(newId)
         fetchCards()
      } else {
         alert('Failed to insert')
      }
    }
    
    setIsSaving(false)
  }

  const handleDeleteCard = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return
    const { error } = await supabase.from('flashcards').delete().eq('id', id)
    if (!error) {
      if (activeCardId === id) handleCreateNewCard()
      fetchCards()
    }
  }

  const getPreviewText = (card: any) => {
    try {
      if (card.front_content) {
        const parsed = typeof card.front_content === 'string' ? JSON.parse(card.front_content) : card.front_content;
        if (parsed?.[0]?.value) return parsed[0].value;
      }
    } catch {}
    return card.front || card.front_content || 'Empty Card';
  }

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      
      {/* Sidebar: Card List */}
      <div className="w-64 flex flex-col bg-white border rounded-lg overflow-hidden shrink-0">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center shrink-0">
          <h3 className="font-semibold">Cards ({cards.length})</h3>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleCreateNewCard}>
            <Plus size={16} />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {isLoading ? (
            <div className="flex justify-center p-4"><Loader2 className="animate-spin text-gray-400" /></div>
          ) : cards.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-4">No cards yet</p>
          ) : (
            cards.map((c, i) => (
              <div 
                key={c.id}
                onClick={() => selectCard(c)}
                className={`p-3 text-sm rounded-md cursor-pointer border flex justify-between group ${
                  activeCardId === c.id 
                    ? 'bg-[#5e6ad2]/10 border-[#5e6ad2] text-[#5e6ad2]' 
                    : 'bg-white border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="truncate">{getPreviewText(c)}</span>
                  <span className="text-[10px] text-gray-400 truncate mt-1">
                    {c.status === 'published' ? '🟢 Published' : '🟠 Draft'}
                  </span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteCard(c.id) }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 self-center ml-2"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex gap-6 min-w-0">
        
        {/* Editor Form */}
        <div className="flex-1 flex flex-col gap-4 bg-white border rounded-lg p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
               <h3 className="text-xl font-bold">{activeCardId ? 'Edit Card' : 'New Card'}</h3>
               {activeCardId && (
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                     {status.toUpperCase()}
                  </span>
               )}
            </div>
            <div className="flex gap-2">
               {status === 'published' && activeCardId ? (
                 <Button onClick={() => handleSaveCard(false)} variant="outline" disabled={isSaving} className="border-amber-300 text-amber-700 hover:bg-amber-50">
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Revert to Draft
                 </Button>
               ) : (
                 <Button onClick={() => handleSaveCard(false)} variant="outline" disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Draft
                 </Button>
               )}
               <Button onClick={() => handleSaveCard(true)} disabled={isSaving} className="bg-[#5e6ad2] hover:bg-[#4b54a8]">
                 {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                 Publish Card
               </Button>
            </div>
          </div>

          {isOverSafeZone && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
              <span className="text-lg">⚠️</span> 
              Warning: Your content likely exceeds the standard mobile view. Students will need to scroll or click to expand.
            </div>
          )}

          <div className="space-y-2 flex-1 flex flex-col">
            <Label htmlFor="front" className="font-semibold">Front (Question)</Label>
            <Textarea 
              id="front" 
              placeholder="Supports Markdown & LaTeX like $$x^2$$..." 
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className="flex-1 resize-none font-mono text-sm"
            />
            <div className="mt-2">
              <Label htmlFor="frontImage" className="text-xs text-gray-500">Front Image URL</Label>
              <Input 
                id="frontImage" 
                placeholder="https://..." 
                value={frontImage}
                onChange={(e) => setFrontImage(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="space-y-2 flex-1 flex flex-col">
            <Label htmlFor="back" className="font-semibold">Back (Answer)</Label>
            <Textarea 
              id="back" 
              placeholder="Supports Markdown & LaTeX..." 
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="flex-1 resize-none font-mono text-sm"
            />
            <div className="mt-2">
              <Label htmlFor="backImage" className="text-xs text-gray-500">Back Image URL</Label>
              <Input 
                id="backImage" 
                placeholder="https://..." 
                value={backImage}
                onChange={(e) => setBackImage(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t">
            <Label htmlFor="stability" className="font-semibold">Initial Difficulty (FSRS Starting Stability)</Label>
            <Select value={startingStability} onValueChange={(val) => setStartingStability(val || '0')}>
              <SelectTrigger id="stability" className="w-[200px]">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Default Algorithm</SelectItem>
                <SelectItem value="1">Hard (See sooner)</SelectItem>
                <SelectItem value="2.5">Medium (Standard)</SelectItem>
                <SelectItem value="5">Easy (See later)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Overrides the student's initial FSRS algorithm baseline.</p>
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="w-[390px] shrink-0 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
            <Smartphone size={16} /> Mobile Preview
          </h3>
          
          <div className="w-[390px] h-[844px] bg-black rounded-[50px] border-[14px] border-gray-900 shadow-2xl relative overflow-hidden flex flex-col shrink-0 scale-[0.85] origin-top">
            {/* Fake Mobile Header Notch */}
            <div className="absolute top-0 inset-x-0 flex justify-center z-50">
               <div className="w-40 h-7 bg-gray-900 rounded-b-3xl"></div>
            </div>

            {/* Fake App Header */}
            <div className="h-16 w-full flex items-center justify-center px-4 shrink-0 mt-8">
              <span className="text-white text-sm font-bold opacity-80">Study</span>
            </div>

            {/* Mobile Content Area */}
            <div className="flex-1 flex flex-col pb-[35px] px-[10px]">
              
              {/* Card Container (Click to flip) */}
              <div 
                onClick={() => setShowBackPreview(!showBackPreview)}
                className="flex-1 bg-[#121212] rounded-[36px] border border-[#2D2D2D] overflow-hidden flex flex-col cursor-pointer transition-transform active:scale-[0.98] relative group/card"
              >
                {/* SAFE ZONE INDICATOR */}
                <div className="absolute top-[380px] left-0 right-0 border-t-2 border-dashed border-red-500/50 z-50 pointer-events-none group-hover/card:border-red-500 transition-colors">
                  <div className="absolute right-2 -top-5 text-[10px] font-bold text-red-500/80 bg-[#121212] px-1">
                    SAFE ZONE FOLD (Approx)
                  </div>
                </div>

                {/* Scrollable Content inside Card */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                  
                  {/* Top Actions Mimic */}
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-[10px] font-bold text-[#94969a] tracking-[0.2em]">
                      {showBackPreview ? 'EXPLANATION' : 'QUESTION'}
                    </span>
                  </div>

                  {/* Main Preview Content */}
                  <div className="flex-1 flex flex-col items-center pt-2 pb-10">
                    
                    {/* Image Preview */}
                    {showBackPreview && backImage ? (
                      <img src={backImage} alt="Back" className="w-full h-[220px] object-contain rounded-[16px] mb-5 bg-[#1A1B1F]" />
                    ) : (!showBackPreview && frontImage) ? (
                      <img src={frontImage} alt="Front" className="w-full h-[220px] object-contain rounded-[16px] mb-5 bg-[#1A1B1F]" />
                    ) : null}

                    {/* Text Preview */}
                    <div className="w-full text-center text-[22px] font-semibold text-white leading-[32px] prose prose-invert prose-p:leading-[32px] prose-p:my-0 prose-pre:bg-gray-800 break-words">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {showBackPreview ? (back || 'Answer...') : (front || 'Question...')}
                      </ReactMarkdown>
                    </div>

                    <div className="mt-8 flex items-center gap-2 opacity-50">
                      <span className="text-[10px] text-[#5F6166] font-medium">Tap content to flip</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Fake Mobile Navigation */}
            <div className="h-24 w-full flex justify-center items-center gap-4 shrink-0 pb-6">
               <div className="w-[50px] h-[50px] rounded-full bg-[#ff5f57] flex justify-center items-center shadow-lg"><span className="text-[9px] text-white font-bold tracking-wider">AGAIN</span></div>
               <div className="w-[50px] h-[50px] rounded-full bg-[#ff9f0a] flex justify-center items-center shadow-lg"><span className="text-[9px] text-white font-bold tracking-wider">HARD</span></div>
               <div className="w-[50px] h-[50px] rounded-full bg-[#4cd964] flex justify-center items-center shadow-lg"><span className="text-[9px] text-white font-bold tracking-wider">GOOD</span></div>
               <div className="w-[50px] h-[50px] rounded-full bg-[#5e6ad2] flex justify-center items-center shadow-lg"><span className="text-[9px] text-white font-bold tracking-wider">EASY</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
