import React, { useState, useMemo } from 'react'
import {
  Plus,
  CheckCircle2,
  Sparkles,
  Inbox,
  Filter,
  Check,
  Undo2,
} from 'lucide-react'
import { useApp } from '@/context/useApp'
import type { AttentionItem } from '@/types/attention'
import type { MemoryItem } from '@/types/memory'
import { AttentionCard } from '@/components/inbox/AttentionCard'
import { AnalyzeModal } from '@/components/inbox/AnalyzeModal'
import { sortAttentionItems } from '@/utils/priorityUtils'

type FilterMode = 'actionable' | 'all' | 'resolved'

export const AttentionView: React.FC = () => {
  const { state, dispatch } = useApp()
  const [filterMode, setFilterMode] = useState<FilterMode>('actionable')
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current))
    }, 3500)
  }

  // Handle Mark Done
  const handleDone = (id: string) => {
    dispatch({ type: 'RESOLVE_ATTENTION_ITEM', payload: id })
    showToast('Item marked as completed')
  }

  // Handle Undo / Restore
  const handleUnresolve = (id: string) => {
    dispatch({ type: 'UNRESOLVE_ATTENTION_ITEM', payload: id })
    showToast('Item restored to active inbox')
  }

  // Handle Dismiss
  const handleDismiss = (id: string) => {
    dispatch({ type: 'DISMISS_ATTENTION_ITEM', payload: id })
    showToast('Item dismissed')
  }

  // Handle Save to Memory
  const handleSaveToMemory = (item: AttentionItem) => {
    const newMemory: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: item.title,
      details: `${item.snippet} · Note: ${item.reason}`,
      category: item.isActionRequired ? 'commitment' : 'fact',
      source: `Attention Inbox (${item.source})`,
      createdAt: 'Just now',
    }

    dispatch({ type: 'ADD_MEMORY', payload: newMemory })
    dispatch({
      type: 'MARK_ITEM_SAVED_TO_MEMORY',
      payload: { itemId: item.id, memoryId: newMemory.id },
    })
    showToast(`Saved "${item.title}" to Personal Memory Vault`)
  }

  // Handle Add Item from Modal
  const handleAddItem = (item: AttentionItem) => {
    dispatch({ type: 'ADD_ATTENTION_ITEM', payload: item })
    showToast('New item analyzed and added to Attention Inbox')
  }

  // Filter & Sort Items
  const displayedItems = useMemo(() => {
    if (filterMode === 'resolved') {
      return state.attentionItems.filter((item) => item.status === 'resolved')
    }

    const pending = state.attentionItems.filter((item) => item.status === 'pending')

    if (filterMode === 'actionable') {
      const actionable = pending.filter((item) => item.isActionRequired)
      return sortAttentionItems(actionable)
    }

    return sortAttentionItems(pending)
  }, [state.attentionItems, filterMode])

  const pendingCount = state.attentionItems.filter((i) => i.status === 'pending').length
  const actionableCount = state.attentionItems.filter((i) => i.status === 'pending' && i.isActionRequired).length
  const resolvedCount = state.attentionItems.filter((i) => i.status === 'resolved').length

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-40 bg-stone-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-stone-800 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* View Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              What needs your attention right now?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Prioritized by urgency, deadlines, and personal context. Real reasons, no noise.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAnalyzeOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Analyze Content</span>
        </button>
      </div>

      {/* Filter Tabs & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-xl border border-stone-200/80 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setFilterMode('actionable')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              filterMode === 'actionable'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>Action Required</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filterMode === 'actionable' ? 'bg-stone-700 text-stone-200' : 'bg-stone-100 text-stone-600'
              }`}
            >
              {actionableCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>All Pending</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filterMode === 'all' ? 'bg-stone-700 text-stone-200' : 'bg-stone-100 text-stone-600'
              }`}
            >
              {pendingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('resolved')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              filterMode === 'resolved'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span>Completed</span>
            {resolvedCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filterMode === 'resolved' ? 'bg-stone-700 text-stone-200' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {resolvedCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-400 self-end sm:self-auto px-2">
          <Filter className="w-3 h-3" />
          <span>Ranked by deadline urgency</span>
        </div>
      </div>

      {/* Items Stream */}
      {displayedItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-8 sm:p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            {filterMode === 'resolved' ? <Inbox className="w-6 h-6 text-stone-400" /> : <CheckCircle2 className="w-6 h-6" />}
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-semibold text-stone-800">
              {filterMode === 'resolved' ? 'No completed items yet' : 'Nothing currently requires attention'}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              {filterMode === 'resolved'
                ? 'Items marked as done will appear here for review.'
                : 'Your attention inbox is clear. You can paste an email or message to analyze, or reset the demo data.'}
            </p>
          </div>
          {filterMode !== 'resolved' && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsAnalyzeOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Paste content to analyze</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3.5">
          {filterMode === 'resolved'
            ? displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/80 rounded-xl border border-stone-200/60 p-4 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-stone-700 line-through">{item.title}</h4>
                      <p className="text-stone-400 text-[11px]">Source: {item.source}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUnresolve(item.id)}
                    className="flex items-center gap-1 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md transition cursor-pointer"
                  >
                    <Undo2 className="w-3 h-3" />
                    <span>Restore</span>
                  </button>
                </div>
              ))
            : displayedItems.map((item) => (
                <AttentionCard
                  key={item.id}
                  item={item}
                  onDone={handleDone}
                  onDismiss={handleDismiss}
                  onSaveToMemory={handleSaveToMemory}
                />
              ))}
        </div>
      )}

      {/* Analyze Modal */}
      <AnalyzeModal
        isOpen={isAnalyzeOpen}
        onClose={() => setIsAnalyzeOpen(false)}
        onAdd={handleAddItem}
      />
    </div>
  )
}
