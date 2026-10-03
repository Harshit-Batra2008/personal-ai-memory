export interface MeetingActionItem {
  id: string
  task: string
  assignee?: string
  deadline?: string
  completed: boolean
}

export interface MeetingRecord {
  id: string
  title: string
  date: string
  durationSeconds: number
  rawTranscript: string
  summary: string
  decisions: string[]
  actionItems: MeetingActionItem[]
  savedToMemory: boolean
}
