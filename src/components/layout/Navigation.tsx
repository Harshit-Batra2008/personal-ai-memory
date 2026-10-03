import React from 'react'
import { Inbox, Mic, Brain, Calendar } from 'lucide-react'
import { type TabType } from '@/context/types'
import { useApp } from '@/context/useApp'

interface TabConfig {
  id: TabType
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number | string
  badgeVariant?: 'danger' | 'neutral'
}

export const Navigation: React.FC = () => {
  const { state, dispatch } = useApp()

  const pendingAttentionCount = state.attentionItems.filter(
    (item) => item.status === 'pending' && item.priority === 'high'
  ).length

  const conflictCount = state.commitments.filter((c) => Boolean(c.conflictWarning)).length

  const tabs: TabConfig[] = [
    {
      id: 'attention',
      label: 'Attention',
      icon: Inbox,
      badge: pendingAttentionCount > 0 ? `${pendingAttentionCount} high` : undefined,
      badgeVariant: 'danger',
    },
    {
      id: 'meetings',
      label: 'Meetings',
      icon: Mic,
      badge: state.meetings.length > 0 ? state.meetings.length : undefined,
      badgeVariant: 'neutral',
    },
    {
      id: 'memory',
      label: 'Memory',
      icon: Brain,
      badge: state.memories.length > 0 ? state.memories.length : undefined,
      badgeVariant: 'neutral',
    },
    {
      id: 'planner',
      label: 'Planner',
      icon: Calendar,
      badge: conflictCount > 0 ? '1 conflict' : undefined,
      badgeVariant: 'danger',
    },
  ]

  return (
    <nav className="border-b border-stone-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = state.activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => dispatch({ type: 'SET_TAB', payload: tab.id })}
              className={`flex items-center gap-2 py-3.5 px-3 border-b-2 text-xs sm:text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-stone-900' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    tab.badgeVariant === 'danger'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200/60'
                      : 'bg-stone-100 text-stone-600 border border-stone-200/50'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
