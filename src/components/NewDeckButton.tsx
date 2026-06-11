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

export function NewDeckButton({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [prepCategory, setPrepCategory] = useState('JEE')
  const [subject, setSubject] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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
      alert('Failed to create deck')
    } else {
      setOpen(false)
      // Redirect to the new deck's editor
      router.push(`/dashboard/decks/${deckId}`)
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#5e6ad2] hover:bg-[#4b54a8]">
          <PlusCircle size={16} className="mr-2" />
          New Deck
        </Button>
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
                <Select value={prepCategory} onValueChange={setPrepCategory}>
                  <SelectTrigger id="prep">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JEE">JEE</SelectItem>
                    <SelectItem value="NEET">NEET</SelectItem>
                    <SelectItem value="CS">CS / Tech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="e.g. Physics" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
            </div>
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
