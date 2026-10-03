import type { AttentionItem, PriorityLevel, AttentionSource } from '@/types/attention'

export interface AnalysisPreset {
  id: string
  label: string
  source: AttentionSource
  content: string
}

export const DEMO_PRESETS: AnalysisPreset[] = [
  {
    id: 'advisor-email',
    label: 'Urgent Advisor Email',
    source: 'email',
    content:
      "Subject: Urgent: Symposium Slide Draft Needed\n\nHi Alex, please review and send me your final slide deck for tomorrow morning's 8:30 AM symposium prep. The organizing committee needs the abstract and deck submitted before our standup.",
  },
  {
    id: 'assignment-deadline',
    label: 'Hard Lab Deadline',
    source: 'task',
    content:
      'CS302 Assignment 3: Distributed Systems Lab submission closes tonight at 11:59 PM on Gradescope. Late submissions incur a 20% penalty per late hour.',
  },
  {
    id: 'optional-social',
    label: 'Department Social Event',
    source: 'message',
    content:
      'Hey everyone! Computer Science student lounge pizza party and board game night this Friday at 6:30 PM. Totally optional, drop by whenever you take a break!',
  },
]

export function analyzeTextToAttentionItem(
  rawText: string,
  userSelectedSource?: AttentionSource
): AttentionItem {
  const text = rawText.trim()
  const lowerText = text.toLowerCase()

  // 1. Detect Source
  let source: AttentionSource = userSelectedSource || 'task'
  if (!userSelectedSource) {
    if (lowerText.includes('subject:') || lowerText.includes('regards') || lowerText.includes('hi ') || lowerText.includes('dear ')) {
      source = 'email'
    } else if (lowerText.includes('assignment') || lowerText.includes('gradescope') || lowerText.includes('due') || lowerText.includes('lab') || lowerText.includes('problem set')) {
      source = 'task'
    } else if (lowerText.includes('hey ') || lowerText.includes('discord') || lowerText.includes('slack')) {
      source = 'message'
    } else if (lowerText.includes('meeting') || lowerText.includes('standup') || lowerText.includes('sync') || lowerText.includes('calendar')) {
      source = 'calendar'
    }
  }

  // 2. Extract Deadline
  let deadline: string | undefined = undefined
  const deadlineMatch = text.match(/(?:by|before|at|closes|due)\s+([0-9]{1,2}(?::[0-9]{2})?\s*(?:am|pm)?(?:\s+(?:tonight|today|tomorrow|friday|monday|saturday|sunday))?)/i)
    || text.match(/(tonight(?:\s+at\s+[0-9]{1,2}(?::[0-9]{2})?\s*(?:am|pm)?)?)/i)
    || text.match(/(tomorrow(?:\s+morning|\s+at\s+[0-9]{1,2}(?::[0-9]{2})?\s*(?:am|pm)?)?)/i)
    || text.match(/(this\s+(?:friday|thursday|monday|weekend)(?:\s+at\s+[0-9]{1,2}(?::[0-9]{2})?\s*(?:am|pm)?)?)/i)

  if (deadlineMatch) {
    deadline = deadlineMatch[1] || deadlineMatch[0]
    // Clean up capitalization
    deadline = deadline.charAt(0).toUpperCase() + deadline.slice(1)
  }

  // 3. Detect Priority Level
  const highKeywords = ['urgent', 'critical', 'mandatory', 'required', 'deadline', 'tonight', 'closes', 'asap', 'penalty', 'blocker', 'immediately']
  const lowKeywords = ['optional', 'newsletter', 'discount', 'pizza', 'social', 'whenever', 'drop by', 'fyi', 'announcement', 'promo']

  const hasHigh = highKeywords.some((kw) => lowerText.includes(kw))
  const hasLow = lowKeywords.some((kw) => lowerText.includes(kw))

  let priority: PriorityLevel = 'medium'
  if (hasHigh) {
    priority = 'high'
  } else if (hasLow) {
    priority = 'low'
  }

  // 4. Action Required determination
  const actionVerbs = ['submit', 'send', 'review', 'prepare', 'finish', 'complete', 'reply', 'respond', 'confirm', 'revise']
  const hasActionVerb = actionVerbs.some((verb) => lowerText.includes(verb))
  const isActionRequired = priority === 'high' || (hasActionVerb && priority !== 'low')

  // 5. Title Extraction
  let title: string
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)

  const subjectLine = lines.find((l) => l.toLowerCase().startsWith('subject:'))
  if (subjectLine) {
    title = subjectLine.replace(/^subject:\s*/i, '')
  } else if (lines.length > 0 && lines[0].length < 75) {
    title = lines[0].replace(/^[#*-]\s*/, '')
  } else {
    // Generate from first clause
    const firstSentence = text.split(/[.?!]/)[0]
    title = firstSentence.length > 60 ? `${firstSentence.slice(0, 57)}...` : firstSentence
  }

  // 6. Snippet (trimmed clean body)
  const snippet = text.length > 160 ? `${text.slice(0, 157)}...` : text

  // 7. Visible Transparent Reasoning
  let reason: string
  if (priority === 'high') {
    if (deadline) {
      reason = `Strict deadline detected (${deadline}). Action is required promptly to prevent late penalties or blocking collaborators.`
    } else {
      reason = 'High urgency detected: Message contains critical action keywords requiring immediate response.'
    }
  } else if (priority === 'medium') {
    if (deadline) {
      reason = `Upcoming commitment detected with target timeframe (${deadline}). Action required before schedule conflicts arise.`
    } else {
      reason = 'Action requested by sender. Moderate urgency; schedule time today to address.'
    }
  } else {
    reason = 'Low attention: Identified as promotional, informational, or optional social event. No mandatory deadline or blocker.'
  }

  return {
    id: `att-${Date.now()}`,
    title,
    snippet,
    source,
    priority,
    reason,
    deadline,
    createdAt: new Date().toISOString(),
    isActionRequired,
    status: 'pending',
    tags: [source.toUpperCase(), priority === 'high' ? 'High Impact' : 'Standard'],
  }
}
