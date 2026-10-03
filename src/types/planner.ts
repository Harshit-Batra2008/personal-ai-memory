import type { PriorityLevel } from './attention'

export type CommitmentType = 'hard_deadline' | 'flexible_event' | 'meeting'

export interface CommitmentItem {
  id: string
  title: string
  timeRange: string
  scheduledFor: string
  type: CommitmentType
  priority: PriorityLevel
  conflictWarning?: string
  notes?: string
}
