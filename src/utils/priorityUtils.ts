import type { AttentionItem, PriorityLevel, AttentionSource } from '@/types/attention'

export function calculateUrgencyScore(item: AttentionItem): number {
  let score = 0

  // Base priority score
  switch (item.priority) {
    case 'high':
      score += 300
      break
    case 'medium':
      score += 200
      break
    case 'low':
      score += 100
      break
  }

  // Action required bonus
  if (item.isActionRequired) {
    score += 60
  }

  // Deadline proximity heuristic
  const deadlineLower = (item.deadline || '').toLowerCase()
  if (deadlineLower.includes('today') || deadlineLower.includes('tonight') || deadlineLower.includes('hour')) {
    score += 40
  } else if (deadlineLower.includes('tomorrow') || deadlineLower.includes('am')) {
    score += 20
  }

  return score
}

export function sortAttentionItems(items: AttentionItem[]): AttentionItem[] {
  return [...items].sort((a, b) => {
    // 1. Sort by calculated urgency score
    const scoreDiff = calculateUrgencyScore(b) - calculateUrgencyScore(a)
    if (scoreDiff !== 0) return scoreDiff

    // 2. Newer items first if score identical
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export function getPriorityStyle(priority: PriorityLevel): {
  container: string
  badge: string
  label: string
} {
  switch (priority) {
    case 'high':
      return {
        container: 'border-l-4 border-l-amber-500 border-stone-200/90',
        badge: 'bg-amber-100/90 text-amber-900 border-amber-300/80 font-semibold',
        label: 'High Attention',
      }
    case 'medium':
      return {
        container: 'border-l-4 border-l-sky-500 border-stone-200/90',
        badge: 'bg-sky-50 text-sky-800 border-sky-200/80 font-medium',
        label: 'Medium Attention',
      }
    case 'low':
      return {
        container: 'border-l-4 border-l-stone-300 border-stone-200/80',
        badge: 'bg-stone-100 text-stone-600 border-stone-200 font-medium',
        label: 'Low Attention',
      }
  }
}

export function getSourceInfo(source: AttentionSource): { label: string } {
  switch (source) {
    case 'email':
      return { label: 'Email' }
    case 'task':
      return { label: 'Assignment / Task' }
    case 'meeting':
      return { label: 'Meeting Note' }
    case 'calendar':
      return { label: 'Calendar Event' }
    case 'message':
      return { label: 'Direct Message' }
  }
}
