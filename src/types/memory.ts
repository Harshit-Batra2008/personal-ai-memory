export type MemoryCategory = 'person' | 'preference' | 'commitment' | 'fact' | 'decision'

export interface MemoryItem {
  id: string
  title: string
  details: string
  category: MemoryCategory
  source: string
  createdAt: string
  confidence?: number
}
