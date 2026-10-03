import React from 'react'
import {
  CheckCircle2,
  X,
  Clock,
  Sparkles,
  Brain,
  Mail,
  Calendar,
  CheckSquare,
  MessageSquare,
  BookmarkCheck,
} from 'lucide-react'

import type { AttentionItem, AttentionSource } from '@/types/attention'
import { getPriorityStyle } from '@/utils/priorityUtils'

interface AttentionCardProps {
  item: AttentionItem
  onDone: (id: string) => void
  onDismiss: (id: string) => void
  onSaveToMemory: (item: AttentionItem) => void
}

function getSourceIcon(source: AttentionSource) {
  switch (source) {
    case 'email':
      return <Mail className="w-3 h-3 text-stone-500" />
    case 'task':
      return <CheckSquare className="w-3 h-3 text-stone-500" />
    case 'meeting':
      return <Calendar className="w-3 h-3 text-stone-500" />
    case 'calendar':
      return <Calendar className="w-3 h-3 text-stone-500" />
    case 'message':
      return <MessageSquare className="w-3 h-3 text-stone-500" />
  }
}

export const AttentionCard: React.FC<AttentionCardProps> = ({
  item,
  onDone,
  onDismiss,
  onSaveToMemory,
}) => {
  const priorityStyle = getPriorityStyle(item.priority)

  return (
    <article
      className={`bg-white rounded-xl border p-4 sm:p-5 shadow-xs transition hover:shadow-sm space-y-3.5 ${priorityStyle.container}`}
    >
      {/* Top Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Priority Pill */}
          <span
            className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded border ${priorityStyle.badge}`}
          >
            {priorityStyle.label}
          </span>

          {/* Action Required Flag */}
          {item.isActionRequired ? (
            <span className="flex items-center gap-1 text-[11px] font-medium text-stone-700 bg-stone-100/90 border border-stone-200 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
              Action Required
            </span>
          ) : (
            <span className="text-[11px] text-stone-400 font-normal px-1.5 py-0.5">
              Informational
            </span>
          )}

          {/* Source Tag */}
          <span className="flex items-center gap-1 text-[11px] text-stone-500 bg-stone-50 border border-stone-200/70 px-2 py-0.5 rounded">
            {getSourceIcon(item.source)}
            <span className="capitalize">{item.source}</span>
          </span>
        </div>

        {/* Deadline Indicator */}
        {item.deadline && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-700 bg-amber-50/80 border border-amber-200/80 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>{item.deadline}</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-stone-900 tracking-tight leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{item.snippet}</p>
      </div>

      {/* Visible Reasoning Callout (Answers "Why it matters") */}
      <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3 text-xs text-stone-800 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-stone-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Why this needs your attention:</span>
        </div>
        <p className="text-stone-600 leading-relaxed pl-5">{item.reason}</p>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Mark as Done */}
          <button
            type="button"
            onClick={() => onDone(item.id)}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-emerald-800 bg-stone-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-stone-200/80 hover:border-emerald-200 transition cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-stone-500 hover:text-emerald-700" />
            <span>Mark as Done</span>
          </button>

          {/* Dismiss */}
          <button
            type="button"
            onClick={() => onDismiss(item.id)}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Dismiss</span>
          </button>
        </div>

        {/* Save to Memory */}
        <div>
          {item.savedToMemory ? (
            <span className="flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md font-medium">
              <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved to Memory</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onSaveToMemory(item)}
              title="Save relevant details into Personal Memory"
              className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80 transition cursor-pointer"
            >
              <Brain className="w-3.5 h-3.5 text-stone-500" />
              <span>Save to Memory</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
