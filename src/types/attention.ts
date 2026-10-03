export type PriorityLevel = 'high' | 'medium' | 'low'

export type AttentionSource = 'email' | 'meeting' | 'message' | 'calendar' | 'task'

export type AttentionStatus = 'pending' | 'resolved' | 'dismissed'

export interface AttentionItem {
  id: string
  title: string
  snippet: string
  source: AttentionSource
  priority: PriorityLevel
  reason: string
  deadline?: string
  createdAt: string
  isActionRequired: boolean
  status: AttentionStatus
  tags?: string[]
  savedToMemory?: boolean
  savedMemoryId?: string
}


