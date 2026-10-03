import React, { useState } from 'react'
import { Trash2, User, Heart, BookmarkCheck, FileText, CheckCircle } from 'lucide-react'
import { useApp } from '@/context/useApp'
import type { MemoryCategory } from '@/types/memory'

function getCategoryIcon(cat: MemoryCategory) {
  switch (cat) {
    case 'person':
      return <User className="w-3.5 h-3.5 text-indigo-600" />
    case 'preference':
      return <Heart className="w-3.5 h-3.5 text-rose-600" />
    case 'commitment':
      return <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
    case 'decision':
      return <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
    case 'fact':
    default:
      return <FileText className="w-3.5 h-3.5 text-stone-600" />
  }
}

function getCategoryBadge(cat: MemoryCategory) {
  switch (cat) {
    case 'person':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200'
    case 'preference':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    case 'commitment':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'decision':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'fact':
    default:
      return 'bg-stone-100 text-stone-700 border-stone-200'
  }
}

export const MemoryView: React.FC = () => {
  const { state, dispatch } = useApp()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Memories' },
    { id: 'person', label: 'People' },
    { id: 'preference', label: 'Preferences' },
    { id: 'commitment', label: 'Commitments' },
    { id: 'decision', label: 'Decisions' },
  ]

  const filteredMemories =
    selectedCategory === 'all'
      ? state.memories
      : state.memories.filter((m) => m.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200/60">
        <div>
          <h2 className="text-xl font-semibold text-stone-900 tracking-tight">Personal Memory Vault</h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Inspected and editable long-term facts, preferences, and commitments.
          </p>
        </div>
        <div className="text-xs font-medium text-stone-500 bg-white px-3 py-1.5 rounded-lg border border-stone-200 self-start sm:self-auto shadow-2xs">
          {state.memories.length} stored memories
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Memories Grid */}
      {filteredMemories.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200/80 p-8 text-center space-y-2">
          <p className="text-xs text-stone-500">No memories found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              className="bg-white rounded-xl border border-stone-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between space-y-3 hover:border-stone-300 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border ${getCategoryBadge(
                      mem.category
                    )}`}
                  >
                    {getCategoryIcon(mem.category)}
                    <span className="capitalize">{mem.category}</span>
                  </span>

                  <span className="text-[11px] text-stone-400">{mem.createdAt}</span>
                </div>

                <h3 className="text-sm font-semibold text-stone-900">{mem.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{mem.details}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-400">
                <span className="truncate max-w-[200px]">From: {mem.source}</span>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'DELETE_MEMORY', payload: mem.id })}
                  title="Remove from memory"
                  className="p-1 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
