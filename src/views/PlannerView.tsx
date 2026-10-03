import React from 'react'
import { AlertCircle, Clock, Calendar } from 'lucide-react'
import { useApp } from '@/context/useApp'

export const PlannerView: React.FC = () => {
  const { state } = useApp()
  const conflicts = state.commitments.filter((c) => Boolean(c.conflictWarning))

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200/60">
        <div>
          <h2 className="text-xl font-semibold text-stone-900 tracking-tight">
            Priority & Conflict Planner
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Evaluates deadlines, commitments, and hidden schedule conflicts.
          </p>
        </div>
      </div>

      {/* Conflict Warnings Section */}
      {conflicts.length > 0 && (
        <div className="space-y-3">
          {conflicts.map((item) => (
            <div
              key={item.id}
              className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs"
            >
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
                    Conflict Detected
                  </span>
                  <span className="text-xs text-amber-800">· {item.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                  {item.conflictWarning}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Commitments Schedule */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Upcoming Commitments
        </h3>

        <div className="space-y-2.5">
          {state.commitments.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl border p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.conflictWarning ? 'border-amber-200/80 bg-amber-50/10' : 'border-stone-200/80'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    {item.scheduledFor}
                  </span>
                  <span className="text-xs font-medium text-stone-400">·</span>
                  <span className="text-xs font-medium text-stone-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {item.timeRange}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-stone-900">{item.title}</h4>
                {item.notes && <p className="text-xs text-stone-500">{item.notes}</p>}
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                    item.priority === 'high'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  {item.priority} attention
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
