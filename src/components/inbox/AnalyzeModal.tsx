import React, { useState, useMemo } from 'react'
import { X, Sparkles, Plus, Clock, FileText } from 'lucide-react'
import type { AttentionItem, AttentionSource } from '@/types/attention'
import { DEMO_PRESETS, analyzeTextToAttentionItem } from '@/utils/mockAnalyzer'
import { getPriorityStyle } from '@/utils/priorityUtils'

interface AnalyzeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: AttentionItem) => void
}

export const AnalyzeModal: React.FC<AnalyzeModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [rawText, setRawText] = useState('')
  const [source, setSource] = useState<AttentionSource>('email')

  // Live deterministic analysis
  const previewItem = useMemo(() => {
    if (!rawText.trim()) return null
    return analyzeTextToAttentionItem(rawText, source)
  }, [rawText, source])

  if (!isOpen) return null

  const handleApplyPreset = (content: string, presetSource: AttentionSource) => {
    setRawText(content)
    setSource(presetSource)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!previewItem) return
    onAdd(previewItem)
    setRawText('')
    onClose()
  }

  const priorityStyle = previewItem ? getPriorityStyle(previewItem.priority) : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">Analyze New Item</h3>
              <p className="text-xs text-stone-500">
                Paste any unstructured email, message, or task
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 flex-1">
          {/* Quick Presets for Demo */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
              Quick Demo Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset.content, preset.source)}
                  className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Source Selection & Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="rawText" className="text-xs font-semibold text-stone-700">
                Raw Content
              </label>
              <div className="flex items-center gap-1">
                {(['email', 'task', 'message', 'calendar'] as AttentionSource[]).map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSource(src)}
                    className={`text-[11px] capitalize px-2 py-0.5 rounded transition cursor-pointer ${
                      source === src
                        ? 'bg-stone-900 text-white font-medium'
                        : 'text-stone-500 hover:bg-stone-100'
                    }`}
                  >
                    {src}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              id="rawText"
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste email with subject line, Slack message, or assignment details..."
              className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-stone-400 focus:border-stone-400 font-sans leading-relaxed resize-none"
            />
          </div>

          {/* Live Analysis Extraction Preview */}
          {previewItem && priorityStyle && (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                  Extracted Attention Signal
                </span>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${priorityStyle.badge}`}>
                  {priorityStyle.label}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-semibold text-stone-900">
                  {previewItem.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                  {previewItem.deadline && (
                    <span className="flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {previewItem.deadline}
                    </span>
                  )}
                  <span className="text-[11px] font-medium text-stone-600">
                    {previewItem.isActionRequired ? '• Action Required' : '• Informational'}
                  </span>
                </div>
              </div>

              {/* Explainable reasoning */}
              <div className="bg-white p-2.5 rounded-lg border border-stone-200/80 text-xs text-stone-700">
                <span className="font-semibold text-stone-900">Reasoning: </span>
                <span>{previewItem.reason}</span>
              </div>
            </div>
          )}

          {!previewItem && (
            <div className="border border-dashed border-stone-200 rounded-xl p-4 text-center text-xs text-stone-400 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4 text-stone-300" />
              <span>Paste text above or choose a preset to extract attention priority</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!previewItem}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Inbox</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
