'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase-client'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { PlusCircle, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

type PrepCategory = 'JEE' | 'NEET' | 'Computer Science'

const SUBJECTS: Record<PrepCategory, string[]> = {
  JEE: ['Physics', 'Chemistry', 'Mathematics'],
  NEET: ['Physics', 'Chemistry', 'Biology'],
  'Computer Science': ['DSA', 'DBMS', 'Operating Systems', 'OOP', 'Computer Networks'],
}

export function NewDeckButton({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [prepCategory, setPrepCategory] = useState<PrepCategory>('JEE')
  const [subject, setSubject] = useState('Physics')
  const [errorMessage, setErrorMessage] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    const deckId = uuidv4()

    const { error } = await supabase.from('decks').insert({
      id: deckId,
      name,
      description,
      prep_category: prepCategory,
      subject,
      user_id: userId,
      is_public: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

    setIsLoading(false)

    if (error) {
      console.error('Error creating deck:', error.message)
      setErrorMessage(`Failed to create deck: ${error.message}`)
    } else {
      setOpen(false)
      // Redirect to the new deck's editor
      router.push(`/dashboard/decks/${deckId}`)
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div role="button" tabIndex={0} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-[#5e6ad2] text-primary-foreground shadow hover:bg-[#4b54a8] text-white">
          <PlusCircle size={16} className="mr-2" />
          New Deck
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreateDeck}>
          <DialogHeader>
            <DialogTitle>Create New Deck</DialogTitle>
            <DialogDescription>
              Create a new public flashcard deck for your students.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Deck Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Thermodynamics Mastery" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="What is this deck about?" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prep">Prep Focus</Label>
                <Select value={prepCategory} onValueChange={(value) => {
                  const next = (value || 'JEE') as PrepCategory
                  setPrepCategory(next)
                  setSubject(SUBJECTS[next][0])
                }}>
                  <SelectTrigger id="prep">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JEE">JEE</SelectItem>
                    <SelectItem value="NEET">NEET</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={(value) => setSubject(value || SUBJECTS[prepCategory][0])}>
                  <SelectTrigger id="subject" className="w-full"><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>{SUBJECTS[prepCategory].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            {errorMessage && <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#5e6ad2] hover:bg-[#4b54a8]" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create Deck
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
