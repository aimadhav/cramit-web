'use server'

import { revalidatePath } from 'next/cache'
import { requireTeacher } from '@/lib/access'
import { createClient } from '@/utils/supabase-server'

export type CreateClassState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function createClassAction(
  _previousState: CreateClassState,
  formData: FormData,
): Promise<CreateClassState> {
  await requireTeacher()
  const name = String(formData.get('name') || '').trim()
  const description = String(formData.get('description') || '').trim()

  if (name.length < 3 || name.length > 80) {
    return { status: 'error', message: 'Class name must be between 3 and 80 characters.' }
  }
  if (description.length > 240) {
    return { status: 'error', message: 'Description must be 240 characters or fewer.' }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.rpc('create_teacher_room', {
    p_name: name,
    p_description: description || null,
  })

  if (error || !data) {
    return {
      status: 'error',
      message: error?.message || 'The class could not be created. Please try again.',
    }
  }

  revalidatePath('/teacher')
  return { status: 'success', message: 'Class created. Its join code is ready to share.' }
}
