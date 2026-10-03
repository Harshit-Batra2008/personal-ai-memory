import React, { useState } from 'react'
import {
  Mic,
  ShieldCheck,
  CheckSquare,
  Calendar,
  Sparkles,
  Clock,
  Square,
  Check,
  FileText,
  Users,
} from 'lucide-react'

import { useApp } from '@/context/useApp'
import type { MeetingRecord } from '@/types/meeting'
import { formatMeetingDuration, createSyntheticMeetingDraft } from '@/utils/meetingPresets'

export const MeetingsView: React.FC = () => {
  const { state, dispatch } = useApp()
  const [draftMeeting, setDraftMeeting] = useState<MeetingRecord | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current))
    }, 3500)
  }

  // Determine current effective view state
  const isRecordingActive = state.isRecording
  const isReviewMode = !isRecordingActive && draftMeeting !== null

  // 1. Start Meeting Action
  const handleStartMeeting = () => {
    setDraftMeeting(null)
    dispatch({ type: 'START_RECORDING' })
  }

  // 2. Stop Meeting Action -> opens Review state
  const handleStopMeeting = () => {
    const recordedSeconds = state.recordingDuration
    dispatch({ type: 'STOP_RECORDING' })
    const draft = createSyntheticMeetingDraft(recordedSeconds)
    setDraftMeeting(draft)
  }

  // 3. Save Meeting to State / localStorage
  const handleSaveMeeting = () => {
    if (!draftMeeting) return
    dispatch({ type: 'ADD_MEETING', payload: draftMeeting })
    setDraftMeeting(null)
    showToast('Meeting saved successfully to vault')
  }

  // 4. Discard Review Draft
  const handleDiscardDraft = () => {
    setDraftMeeting(null)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-40 bg-stone-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-stone-800 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/80">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">Meeting Capture</h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Explicitly start and stop audio capture. Transform spoken conversations into decisions and tasks.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STATE A: ACTIVE RECORDING STATE (Privacy-First) */}
      {/* ------------------------------------------------------------- */}
      {isRecordingActive && (
        <div className="bg-red-50/50 border-2 border-red-500/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          {/* Header pill & Privacy guarantee */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                Recording Active
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-red-800 bg-red-100/80 border border-red-200 px-3 py-1 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>Explicit Consent Granted · No Background Capture</span>
            </div>
          </div>

          {/* Central Timer & Visualizer */}
          <div className="text-center py-4 space-y-3">
            <div className="text-4xl sm:text-5xl font-mono font-bold text-stone-900 tracking-tight">
              {formatMeetingDuration(state.recordingDuration)}
            </div>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Audio is actively recording with your explicit permission. Click stop when your conversation concludes to review the generated summary and decisions.
            </p>

            {/* Subtle waveform pulse */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <span className="w-1.5 h-6 bg-red-400 rounded-full animate-pulse" />
              <span className="w-1.5 h-10 bg-red-600 rounded-full animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-4 bg-red-300 rounded-full animate-pulse [animation-delay:300ms]" />
              <span className="w-1.5 h-8 bg-red-500 rounded-full animate-pulse [animation-delay:75ms]" />
              <span className="w-1.5 h-5 bg-red-400 rounded-full animate-pulse [animation-delay:200ms]" />
            </div>
          </div>

          {/* Stop Action */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleStopMeeting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md transition cursor-pointer"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>Stop Recording & Review</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STATE B: REVIEW STATE (After Stopping Recording) */}
      {/* ------------------------------------------------------------- */}
      {isReviewMode && draftMeeting && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in">
          {/* Review Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                  Review Meeting
                </span>
                <span className="text-xs text-stone-500">· Ready to save to personal archive</span>
              </div>
              <input
                type="text"
                value={draftMeeting.title}
                onChange={(e) =>
                  setDraftMeeting({ ...draftMeeting, title: e.target.value })
                }
                className="text-lg sm:text-xl font-bold text-stone-900 w-full bg-transparent border-b border-transparent hover:border-stone-300 focus:border-stone-500 focus:outline-hidden transition"
                placeholder="Meeting Title"
              />
            </div>

            {/* Quick Metadata */}
            <div className="flex items-center gap-3 text-xs text-stone-500 shrink-0">
              <span className="flex items-center gap-1 font-mono bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {formatMeetingDuration(draftMeeting.durationSeconds)} duration
              </span>
              <span className="flex items-center gap-1 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-md">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                3 Speakers
              </span>
            </div>
          </div>

          {/* Section 1: Raw Transcript */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-stone-400" />
                Transcribed Dialogue
              </h3>
              <span className="text-[11px] text-stone-400 font-mono">Simulated Web Audio</span>
            </div>
            <div className="bg-stone-50/90 rounded-xl p-4 border border-stone-200/80 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans max-h-48 overflow-y-auto whitespace-pre-line space-y-2">
              {draftMeeting.rawTranscript}
            </div>
          </div>

          {/* Section 2: Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Executive Summary
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 bg-amber-50/30 border border-amber-200/60 p-4 rounded-xl leading-relaxed">
              {draftMeeting.summary}
            </p>
          </div>

          {/* Section 3: Decisions & Action Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Decisions */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-stone-500" />
                Extracted Decisions ({draftMeeting.decisions.length})
              </h3>
              <div className="space-y-2">
                {draftMeeting.decisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl text-xs text-stone-800 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-md bg-stone-200/70 text-stone-700 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="leading-snug">{decision}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-stone-500" />
                Action Items ({draftMeeting.actionItems.length})
              </h3>
              <div className="space-y-2">
                {draftMeeting.actionItems.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl text-xs text-stone-800 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-stone-900 leading-snug">{act.task}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      {act.assignee && (
                        <span className="bg-stone-200/60 px-1.5 py-0.5 rounded text-stone-700 font-mono">
                          @{act.assignee}
                        </span>
                      )}
                      {act.deadline && (
                        <span className="flex items-center gap-1 text-amber-800">
                          <Clock className="w-3 h-3 text-amber-600" />
                          {act.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Action Buttons */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="text-xs font-medium text-stone-500 hover:text-stone-800 px-3 py-2 rounded-lg hover:bg-stone-100 transition cursor-pointer"
            >
              Discard Draft
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveMeeting}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 shadow-xs transition cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Meeting</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STATE C: IDLE STATE & CAPTURE TRIGGER */}
      {/* ------------------------------------------------------------- */}
      {!isRecordingActive && !isReviewMode && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Ready to Record
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Privacy-First · Explicit Activation Only
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-stone-900">
                Start a New Meeting
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
                Click to begin recording. The app will never record silently in the background or access your microphone without direct initiation.
              </p>
            </div>

            <button
              type="button"
              onClick={handleStartMeeting}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 shadow-xs transition cursor-pointer self-start sm:self-auto shrink-0"
            >
              <Mic className="w-4 h-4" />
              <span>Start Meeting</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SAVED MEETINGS LIST (Shown in Idle mode) */}
      {/* ------------------------------------------------------------- */}
      {!isRecordingActive && !isReviewMode && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Captured Meetings ({state.meetings.length})
            </h3>
          </div>

          {state.meetings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-8 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-stone-800">No meetings captured yet</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Click &ldquo;Start Meeting&rdquo; above when your conversation begins. Transcripts and action items will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-2xs space-y-4 hover:border-stone-300 transition"
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
                    <span className="text-xs font-semibold text-stone-700">Executive Summary</span>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/70 p-3.5 rounded-xl border border-stone-100">
                      {meeting.summary}
                    </p>
                  </div>

                  {/* Decisions & Action items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Key Decisions ({meeting.decisions.length})
                      </span>
                      <ul className="space-y-1.5 text-xs text-stone-600">
                        {meeting.decisions.map((decision, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100"
                          >
                            <span className="text-stone-400 font-mono text-[10px] mt-0.5">
                              0{idx + 1}
                            </span>
                            <span>{decision}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-stone-500" />
                        Action Items ({meeting.actionItems.length})
                      </span>
                      <ul className="space-y-1.5 text-xs text-stone-600">
                        {meeting.actionItems.map((act) => (
                          <li
                            key={act.id}
                            className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                            <div className="flex-1">
                              <span
                                className={act.completed ? 'line-through text-stone-400' : ''}
                              >
                                {act.task}
                              </span>
                              {act.assignee && (
                                <span className="ml-1 text-[11px] text-stone-400 font-mono">
                                  (@{act.assignee})
                                </span>
                              )}
                              {act.deadline && (
                                <span className="ml-2 text-[11px] text-amber-800">
                                  · {act.deadline}
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
          )}
        </div>
      )}
    </div>
  )
}
