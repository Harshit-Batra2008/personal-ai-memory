import type { MeetingRecord } from '@/types/meeting'

export function formatMeetingDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function createSyntheticMeetingDraft(durationSeconds: number): MeetingRecord {
  // If the user recorded for just a few seconds during testing, ensure a sensible demo duration or use the real time
  const effectiveDuration = durationSeconds > 0 ? durationSeconds : 84 // fallback 1m 24s if stopped instantly

  return {
    id: `meet-${Date.now()}`,
    title: 'Sprint Planning & Privacy Architecture Sync',
    date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    durationSeconds: effectiveDuration,
    rawTranscript: `Sarah: Thanks for joining on time. Let's do a quick alignment on this week's milestones. First, we need the privacy-first local storage caching finalized before the Friday demo.

Mark: I've wrapped up the state serializer. It keeps personal memory and attention scores isolated on device without sending raw personal data over the wire.

Sarah: Excellent. Alex, what's the status on meeting capture?

Alex: The recording flow is in place. Recording only activates after explicit user click with continuous visible indicators. Audio never runs silently in the background.

Sarah: Exactly what we need. Decision 1: We mandate explicit consent and continuous visible indicators across the entire app. Decision 2: We keep memory extraction local-first.

Mark: I'll prepare the demo walkthrough slides.

Alex: I will finalize the security and privacy audit report by tomorrow at 5:00 PM.`,
    summary:
      'Reviewed sprint deliverables and privacy architecture. Confirmed that personal memory caching operates locally without unauthorized transmission. Decided to mandate explicit user consent and persistent visual indicators for all meeting recordings. Assigned security audit report to Alex due tomorrow at 5:00 PM.',
    decisions: [
      'Enforce explicit user consent and persistent visual indicators for all audio capture.',
      'Maintain local-first architecture for sensitive personal memory and commitments.',
    ],
    actionItems: [
      {
        id: `act-${Date.now()}-1`,
        task: 'Finalize privacy and security audit checklist',
        assignee: 'Alex',
        deadline: 'Tomorrow, 5:00 PM',
        completed: false,
      },
      {
        id: `act-${Date.now()}-2`,
        task: 'Prepare sprint demo walkthrough slides',
        assignee: 'Mark',
        deadline: 'Friday, 12:00 PM',
        completed: false,
      },
    ],
    savedToMemory: false,
  }
}
