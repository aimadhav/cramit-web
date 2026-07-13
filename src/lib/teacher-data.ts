import 'server-only'

import { cookies } from 'next/headers'
import { requireTeacher } from '@/lib/access'
import type {
  ClassDashboard,
  StudentDashboard,
  TeacherClassSummary,
  TeacherRange,
  TeacherRoom,
} from '@/lib/teacher-types'
import { createClient } from '@/utils/supabase-server'

type RoomRow = {
  id: string
  name: string
  code: string
  description: string | null
}

export function parseTeacherRange(value: string | undefined): TeacherRange {
  if (value === '7') return 7
  if (value === '90') return 90
  if (value === 'all' || value === '0') return 0
  return 30
}

export async function getTeacherTimezone() {
  const cookieStore = await cookies()
  const candidate = cookieStore.get('cramit-timezone')?.value || 'Asia/Kolkata'
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: candidate }).format()
    return candidate
  } catch {
    return 'Asia/Kolkata'
  }
}

async function requestClassDashboard(
  roomId: string,
  range: TeacherRange,
  timezone: string,
): Promise<ClassDashboard> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('get_teacher_class_dashboard', {
    p_room_id: roomId,
    p_range_days: range,
    p_timezone: timezone,
  })
  if (error || !data) {
    throw new Error(error?.message || 'Class analytics are temporarily unavailable.')
  }
  return data as unknown as ClassDashboard
}

export async function getTeacherClasses(): Promise<TeacherClassSummary[]> {
  const profile = await requireTeacher()
  const supabase = await createClient()
  const timezone = await getTeacherTimezone()
  const { data, error } = await supabase
    .from('rooms')
    .select('id,name,code,description')
    .eq('created_by', profile.id)
    .order('created_at', { ascending: false })

  if (error) throw new Error('Classes could not be loaded. Please try again.')
  const rooms = (data || []) as RoomRow[]

  return Promise.all(rooms.map(async (room) => {
    const dashboard = await requestClassDashboard(room.id, 30, timezone)
    return {
      room: room as TeacherRoom,
      studentCount: dashboard.summary.studentCount,
      activeStudents: dashboard.summary.activeStudents,
      reviews: dashboard.summary.reviews,
      recallRate: dashboard.summary.recallRate,
      backlog: dashboard.summary.backlog,
    }
  }))
}

export async function getTeacherClassDashboard(
  roomId: string,
  range: TeacherRange,
): Promise<ClassDashboard> {
  await requireTeacher()
  const timezone = await getTeacherTimezone()
  const dashboard = await requestClassDashboard(roomId, range, timezone)
  if (!dashboard.room || dashboard.room.id !== roomId) {
    throw new Error('Class not found or you no longer have access.')
  }
  return dashboard
}

export async function getTeacherStudentDashboard(
  roomId: string,
  studentId: string,
  range: TeacherRange,
): Promise<StudentDashboard> {
  await requireTeacher()
  const timezone = await getTeacherTimezone()
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('get_teacher_student_dashboard', {
    p_room_id: roomId,
    p_student_id: studentId,
    p_range_days: range,
    p_timezone: timezone,
  })
  if (error || !data) {
    throw new Error(error?.message || 'Student analytics are temporarily unavailable.')
  }
  const dashboard = data as unknown as StudentDashboard
  if (!dashboard.room || dashboard.room.id !== roomId || dashboard.student.id !== studentId) {
    throw new Error('Student not found or no longer belongs to this class.')
  }
  return dashboard
}
