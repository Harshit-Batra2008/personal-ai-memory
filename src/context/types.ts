import type { AttentionItem } from '@/types/attention'
import type { MeetingRecord } from '@/types/meeting'
import type { MemoryItem } from '@/types/memory'
import type { CommitmentItem } from '@/types/planner'
import type { Dispatch } from 'react'

export type TabType = 'attention' | 'meetings' | 'memory' | 'planner'

export interface AppState {
  activeTab: TabType
  attentionItems: AttentionItem[]
  meetings: MeetingRecord[]
  memories: MemoryItem[]
  commitments: CommitmentItem[]
  isRecording: boolean
  recordingDuration: number
}

export type AppAction =
  | { type: 'SET_TAB'; payload: TabType }
  | { type: 'RESOLVE_ATTENTION_ITEM'; payload: string }
  | { type: 'UNRESOLVE_ATTENTION_ITEM'; payload: string }
  | { type: 'DISMISS_ATTENTION_ITEM'; payload: string }
  | { type: 'MARK_ITEM_SAVED_TO_MEMORY'; payload: { itemId: string; memoryId: string } }
  | { type: 'ADD_ATTENTION_ITEM'; payload: AttentionItem }
  | { type: 'DELETE_MEMORY'; payload: string }
  | { type: 'ADD_MEMORY'; payload: MemoryItem }
  | { type: 'TOGGLE_RECORDING' }
  | { type: 'START_RECORDING' }
  | { type: 'STOP_RECORDING' }
  | { type: 'TICK_RECORDING' }
  | { type: 'SET_RECORDING_DURATION'; payload: number }
  | { type: 'ADD_MEETING'; payload: MeetingRecord }
  | { type: 'RESET_DEMO' }

export interface AppContextValue {
  state: AppState
  dispatch: Dispatch<AppAction>
}
