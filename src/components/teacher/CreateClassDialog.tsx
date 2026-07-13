'use client'

import { useActionState, useState } from 'react'
import { Loader2, Plus } from 'lucide-react'
import { createClassAction, type CreateClassState } from '@/app/teacher/actions'
import { Button } from '@/components/ui/button'
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

export function CreateClassDialog() {
  const [open, setOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (nextOpen && !open) setFormKey((value) => value + 1)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <span className="inline-flex h-10 items-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
          <Plus className="size-4" /> Create class
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <CreateClassForm key={formKey} />
      </DialogContent>
    </Dialog>
  )
}

function CreateClassForm() {
  const initialState: CreateClassState = { status: 'idle', message: '' }
  const [state, action, pending] = useActionState(createClassAction, initialState)

  return (
    <form action={action}>
          <DialogHeader>
            <DialogTitle className="text-xl text-slate-950">Create a class</DialogTitle>
            <DialogDescription>
              Cramit will generate a unique six-character code for your students.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-5">
            <div className="grid gap-2">
              <Label htmlFor="class-name">Class name</Label>
              <Input id="class-name" name="name" maxLength={80} placeholder="JEE Physics — Batch A" required className="h-10" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="class-description">Description <span className="font-normal text-slate-400">(optional)</span></Label>
              <Textarea id="class-description" name="description" maxLength={240} placeholder="Morning batch, 2027 aspirants" />
            </div>
            {state.status === 'error' && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {state.message}
              </p>
            )}
            {state.status === 'success' && (
              <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {state.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending || state.status === 'success'} className="h-9 bg-violet-600 px-4 text-white hover:bg-violet-700">
              {pending && <Loader2 className="animate-spin" />}
              Create class
            </Button>
          </DialogFooter>
    </form>
  )
}
