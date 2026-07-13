export type TeacherRange = 0 | 7 | 30 | 90

export interface TeacherRoom {
  id: string
  name: string
  code: string
  description: string | null
}

export interface ActivityBucket {
  date: string
  label: string
  reviews: number
  activeStudents?: number
}

export interface SubjectPerformance {
  subject: string
  reviews: number
  recallRate: number | null
  activeStudents?: number
  uniqueCardsReviewed?: number
  backlog: number
}

export interface DeckPerformance {
  deckId: string
  name: string
  subject: string
  chapter: string
  reviews: number
  recallRate: number | null
  misses: number
  backlog: number
  participatingStudents?: number
  uniqueCardsReviewed?: number
  publishedCards?: number
  coverage: number | null
}

export interface StudentRosterRow {
  studentId: string
  name: string
  email: string
  reviews: number
  recallRate: number | null
  activeDays: number
  backlog: number
  focusedTimeMinutes: number
  lastActiveAt: string | null
}

export interface ClassDashboard {
  room: TeacherRoom
  rangeDays: TeacherRange
  timezone: string
  generatedAt: string
  summary: {
    studentCount: number
    activeStudents: number
    reviews: number
    recallRate: number | null
    backlog: number
    focusedTimeMinutes: number
  }
  activity: ActivityBucket[]
  subjects: SubjectPerformance[]
  decks: DeckPerformance[]
  strugglingDecks: DeckPerformance[]
  roster: StudentRosterRow[]
  leaderboards: {
    recall: StudentRosterRow[]
    activity: StudentRosterRow[]
    consistency: StudentRosterRow[]
  }
}

export interface StudentDashboard {
  room: Pick<TeacherRoom, 'id' | 'name' | 'code'>
  student: { id: string; name: string; email: string }
  rangeDays: TeacherRange
  timezone: string
  generatedAt: string
  summary: {
    reviews: number
    recallRate: number | null
    activeDays: number
    backlog: number
    focusedTimeMinutes: number
    uniqueCards: number
  }
  activity: ActivityBucket[]
  subjects: SubjectPerformance[]
  decks: DeckPerformance[]
  strugglingDecks: DeckPerformance[]
}

export interface TeacherClassSummary {
  room: TeacherRoom
  studentCount: number
  activeStudents: number
  reviews: number
  recallRate: number | null
  backlog: number
}
