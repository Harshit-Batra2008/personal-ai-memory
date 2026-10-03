import React from 'react'
import { RotateCcw, Shield, Mic, Radio } from 'lucide-react'
import { useApp } from '@/context/useApp'

export const Header: React.FC = () => {
  const { state, dispatch } = useApp()

  return (
    <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white shadow-xs">
            <span className="font-semibold text-sm tracking-tight">AI</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-stone-900 tracking-tight">Personal AI</h1>
              <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200/60">
                Memory & Attention
              </span>
            </div>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          {/* Privacy & Recording Indicator */}
          {state.isRecording ? (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-medium animate-pulse">
              <Radio className="w-3.5 h-3.5 text-red-600 animate-spin" />
              <span>Recording Active</span>
              <button
                type="button"
                onClick={() => dispatch({ type: 'STOP_RECORDING' })}
                className="ml-1 text-[11px] underline hover:text-red-900 cursor-pointer"
              >
                Stop
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 text-stone-400 text-xs px-2.5 py-1 rounded-full border border-stone-100 bg-stone-50/50">
              <Shield className="w-3 h-3 text-stone-400" />
              <span>Mic Idle · Privacy Safe</span>
            </div>
          )}

          {/* Quick Mic Toggle (Explicit Consent Trigger) */}
          <button
            type="button"
            onClick={() => {
              if (state.isRecording) {
                dispatch({ type: 'STOP_RECORDING' })
              } else {
                dispatch({ type: 'SET_TAB', payload: 'meetings' })
                dispatch({ type: 'START_RECORDING' })
              }
            }}
            title={state.isRecording ? 'Stop Recording' : 'Start Explicit Recording'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              state.isRecording
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{state.isRecording ? 'Stop' : 'Capture'}</span>
          </button>


          {/* Reset Demo button */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all attention items and memories to demo state?')) {
                dispatch({ type: 'RESET_DEMO' })
              }
            }}
            title="Reset to clean demo scenario"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  )
}
