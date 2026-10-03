import React from 'react'
import { Mic, ShieldCheck, CheckSquare, Calendar, Sparkles } from 'lucide-react'
import { useApp } from '@/context/useApp'

export const MeetingsView: React.FC = () => {
  const { state, dispatch } = useApp()

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200/60">
        <div>
          <h2 className="text-xl font-semibold text-stone-900 tracking-tight">Meeting Capture</h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Explicitly start/stop audio capture. Transform spoken conversations into decisions and tasks.
          </p>
        </div>
      </div>

      {/* Recording Control Center (Privacy-First) */}
      <div className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Capture Control
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                Explicit Consent Required
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Audio is never recorded covertly. A prominent indicator stays visible while active.
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: 'TOGGLE_RECORDING' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              state.isRecording
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-sm animate-pulse'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{state.isRecording ? 'Stop Recording' : 'Start Recording'}</span>
          </button>
        </div>

        {state.isRecording && (
          <div className="p-3 bg-red-50 border border-red-200/80 rounded-lg flex items-center justify-between text-xs text-red-800">
            <span className="font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
              Recording in progress...
            </span>
            <span className="font-mono text-red-700">Active</span>
          </div>
        )}
      </div>

      {/* Past Meetings List */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Captured Meetings ({state.meetings.length})
        </h3>

        {state.meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-stone-100 pb-3">
              <div>
                <h4 className="text-base font-semibold text-stone-900">{meeting.title}</h4>
                <div className="flex items-center gap-3 text-xs text-stone-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {meeting.date}
                  </span>
                  <span>· {Math.round(meeting.durationSeconds / 60)} min duration</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-stone-700">Summary</span>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/70 p-3 rounded-lg border border-stone-100">
                {meeting.summary}
              </p>
            </div>

            {/* Decisions & Action items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-stone-500" />
                  Key Decisions
                </span>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {meeting.decisions.map((decision, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-stone-50 p-2 rounded border border-stone-100">
                      <span className="text-stone-400 font-mono text-[10px] mt-0.5">0{idx + 1}</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-stone-500" />
                  Action Items
                </span>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {meeting.actionItems.map((act) => (
                    <li
                      key={act.id}
                      className="flex items-start gap-2 bg-stone-50 p-2 rounded border border-stone-100"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <span className={act.completed ? 'line-through text-stone-400' : ''}>
                          {act.task}
                        </span>
                        {act.assignee && (
                          <span className="ml-1 text-[11px] text-stone-400 font-mono">
                            (@{act.assignee})
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
