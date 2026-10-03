import type { AttentionItem } from '@/types/attention'
import type { MeetingRecord } from '@/types/meeting'
import type { MemoryItem } from '@/types/memory'
import type { CommitmentItem } from '@/types/planner'

export const INITIAL_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-1',
    title: 'Submit Machine Learning Lab 3 (CS401)',
    snippet: 'Final code notebook and writeup submission due on CourseWorks by 11:59 PM tonight.',
    source: 'task',
    priority: 'high',
    reason: 'Deadline in under 5 hours. Hard submission cutoff with strict late penalties; required before weekend.',
    deadline: 'Today, 11:59 PM',
    createdAt: '2026-10-03T14:00:00Z',
    isActionRequired: true,
    status: 'pending',
    tags: ['Academics', 'CS401', 'Critical Deadline'],
  },
  {
    id: 'att-2',
    title: 'Review Thesis Abstract for Prof. Miller',
    snippet: 'Please review the draft workshop abstract and send revisions before tomorrow morning’s 9:00 AM lab standup.',
    source: 'email',
    priority: 'high',
    reason: 'Direct request from faculty advisor flagged as time-sensitive blocker for tomorrow morning’s sync.',
    deadline: 'Tomorrow, 8:30 AM',
    createdAt: '2026-10-03T16:30:00Z',
    isActionRequired: true,
    status: 'pending',
    tags: ['Research', 'Advisor'],
  },
  {
    id: 'att-3',
    title: 'Robotics Club Weekly Sprint',
    snippet: 'Weekly hardware sprint review on Discord and Maker Space Room 204.',
    source: 'calendar',
    priority: 'medium',
    reason: 'Lower attention because it directly conflicts with your ML Lab completion window. Consider async update.',
    deadline: 'Today, 6:30 PM',
    createdAt: '2026-10-03T12:00:00Z',
    isActionRequired: false,
    status: 'pending',
    tags: ['Clubs', 'Conflict'],
  },
  {
    id: 'att-4',
    title: 'Campus Dining Newsletter & Discount Codes',
    snippet: 'Check out this week’s campus dining specials and new weekend cafe hours.',
    source: 'message',
    priority: 'low',
    reason: 'Informational promotional broadcast; no action or deadline required.',
    deadline: 'End of week',
    createdAt: '2026-10-03T10:00:00Z',
    isActionRequired: false,
    status: 'pending',
    tags: ['General', 'Informational'],
  },
]

export const INITIAL_MEETINGS: MeetingRecord[] = [
  {
    id: 'meet-1',
    title: 'Capstone Project Architecture Sync',
    date: 'Today, 2:30 PM',
    durationSeconds: 1080,
    rawTranscript:
      'Alex: Let’s finalize the memory engine architecture. We agreed to keep the backend decoupled from the client to isolate credentials. Priya: Right, and for meeting recording, we must ensure user consent is explicit with a clear indicator on screen. Alex: Agreed. Let’s make sure all demo data is synthetic and privacy-first.',
    summary:
      'Discussed system architecture for the Personal AI memory engine. Finalized frontend decoupled design and confirmed strict privacy guidelines with explicit user recording consent.',
    decisions: [
      'Frontend decoupled from backend inference layer for key security and architecture isolation.',
      'Explicit recording confirmation with always-visible active audio badge.',
    ],
    actionItems: [
      {
        id: 'act-1',
        task: 'Finalize TypeScript schema contracts for Attention and Memory',
        assignee: 'Alex',
        deadline: 'Tonight',
        completed: true,
      },
      {
        id: 'act-2',
        task: 'Add conflict detection alert for overlapping commitments',
        assignee: 'You',
        deadline: 'Tomorrow noon',
        completed: false,
      },
    ],
    savedToMemory: true,
  },
]

export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'Prof. Miller Communication Preference',
    details: 'Prefers email subject prefixed with [CS401-Research]. Office hours are Tuesdays 2:00 PM – 4:00 PM in Room 412.',
    category: 'preference',
    source: 'Email from Prof. Miller',
    createdAt: '2 days ago',
  },
  {
    id: 'mem-2',
    title: 'Daily Deep Work Window',
    details: 'Reserved 9:00 AM – 12:00 PM weekdays for uninterrupted coding. Avoid scheduling non-critical meetings.',
    category: 'commitment',
    source: 'Personal Rule',
    createdAt: '1 week ago',
  },
  {
    id: 'mem-3',
    title: 'Nebius x NVIDIA Hackathon Deadline',
    details: 'Submissions close Sunday at 11:59 PM PST. Demo must clearly demonstrate NVIDIA Nemotron reasoning capability.',
    category: 'commitment',
    source: 'Hackathon Brief',
    createdAt: '3 days ago',
  },
  {
    id: 'mem-4',
    title: 'Priya (Capstone Partner)',
    details: 'Collaborating on Personal AI engine. Handles speech-to-text pipeline and dataset evaluation.',
    category: 'person',
    source: 'Capstone Kickoff',
    createdAt: '4 days ago',
  },
]

export const INITIAL_COMMITMENTS: CommitmentItem[] = [
  {
    id: 'com-1',
    title: 'ML Lab 3 Deep Work Block',
    timeRange: '6:00 PM – 9:00 PM',
    scheduledFor: 'Today',
    type: 'hard_deadline',
    priority: 'high',
    notes: 'Critical study block to submit assignment before 11:59 PM deadline.',
  },
  {
    id: 'com-2',
    title: 'Robotics Club Weekly Sprint',
    timeRange: '6:30 PM – 7:30 PM',
    scheduledFor: 'Today',
    type: 'meeting',
    priority: 'medium',
    conflictWarning: 'Overlaps with your ML Lab 3 study block. Recommended: Send async status update.',
    notes: 'Maker Space Room 204 or Discord voice channel.',
  },
  {
    id: 'com-3',
    title: 'Advisor Review Standup',
    timeRange: '9:00 AM – 9:30 AM',
    scheduledFor: 'Tomorrow',
    type: 'meeting',
    priority: 'high',
    notes: 'Bring revised thesis abstract draft discussed in email.',
  },
]
