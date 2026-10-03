import { useReducer, useEffect, type ReactNode } from 'react'
import {
  INITIAL_ATTENTION_ITEMS,
  INITIAL_MEETINGS,
  INITIAL_MEMORIES,
  INITIAL_COMMITMENTS,
} from '@/data/mockData'
import { AppContext } from './context'
import type { AppState, AppAction } from './types'

const STORAGE_KEY = 'personal_ai_memory_state_v1'

const initialDefaultState: AppState = {
  activeTab: 'attention',
  attentionItems: INITIAL_ATTENTION_ITEMS,
  meetings: INITIAL_MEETINGS,
  memories: INITIAL_MEMORIES,
  commitments: INITIAL_COMMITMENTS,
  isRecording: false,
  recordingDuration: 0,
}

function loadInitialState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        ...initialDefaultState,
        ...parsed,
        isRecording: false, // Never restore in recording mode
        recordingDuration: 0,
      }
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage, using default:', e)
  }
  return initialDefaultState
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.payload }

    case 'RESOLVE_ATTENTION_ITEM':
      return {
        ...state,
        attentionItems: state.attentionItems.map((item) =>
          item.id === action.payload ? { ...item, status: 'resolved' as const } : item
        ),
      }

    case 'UNRESOLVE_ATTENTION_ITEM':
      return {
        ...state,
        attentionItems: state.attentionItems.map((item) =>
          item.id === action.payload ? { ...item, status: 'pending' as const } : item
        ),
      }

    case 'DISMISS_ATTENTION_ITEM':
      return {
        ...state,
        attentionItems: state.attentionItems.map((item) =>
          item.id === action.payload ? { ...item, status: 'dismissed' as const } : item
        ),
      }

    case 'MARK_ITEM_SAVED_TO_MEMORY':
      return {
        ...state,
        attentionItems: state.attentionItems.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, savedToMemory: true, savedMemoryId: action.payload.memoryId }
            : item
        ),
      }

    case 'ADD_ATTENTION_ITEM':
      return {
        ...state,
        attentionItems: [action.payload, ...state.attentionItems],
      }

    case 'DELETE_MEMORY': {
      const memoryToDelete = state.memories.find((mem) => mem.id === action.payload)
      return {
        ...state,
        memories: state.memories.filter((mem) => mem.id !== action.payload),
        attentionItems: state.attentionItems.map((item) => {
          const isLinkedById = item.savedMemoryId === action.payload
          const isLinkedByTitle =
            Boolean(memoryToDelete) &&
            item.title.trim().toLowerCase() === memoryToDelete?.title.trim().toLowerCase()
          if (isLinkedById || isLinkedByTitle) {
            return { ...item, savedToMemory: false, savedMemoryId: undefined }
          }
          return item
        }),
      }
    }


    case 'ADD_MEMORY':
      return {
        ...state,
        memories: [action.payload, ...state.memories],
      }

    case 'TOGGLE_RECORDING':
      return {
        ...state,
        isRecording: !state.isRecording,
        recordingDuration: !state.isRecording ? 0 : state.recordingDuration,
      }

    case 'STOP_RECORDING':
      return {
        ...state,
        isRecording: false,
        recordingDuration: 0,
      }

    case 'SET_RECORDING_DURATION':
      return {
        ...state,
        recordingDuration: action.payload,
      }

    case 'RESET_DEMO':
      localStorage.removeItem(STORAGE_KEY)
      return { ...initialDefaultState }

    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, loadInitialState)

  useEffect(() => {
    try {
      const stateToPersist = {
        activeTab: state.activeTab,
        attentionItems: state.attentionItems,
        meetings: state.meetings,
        memories: state.memories,
        commitments: state.commitments,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist))
    } catch (e) {
      console.warn('Failed to persist state to localStorage:', e)
    }
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
