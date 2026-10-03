import React from 'react'
import { AppProvider } from '@/context/AppContext'
import { useApp } from '@/context/useApp'
import { Shell } from '@/components/layout/Shell'
import { AttentionView } from '@/views/AttentionView'
import { MeetingsView } from '@/views/MeetingsView'
import { MemoryView } from '@/views/MemoryView'
import { PlannerView } from '@/views/PlannerView'

const AppContent: React.FC = () => {
  const { state } = useApp()

  return (
    <Shell>
      {state.activeTab === 'attention' && <AttentionView />}
      {state.activeTab === 'meetings' && <MeetingsView />}
      {state.activeTab === 'memory' && <MemoryView />}
      {state.activeTab === 'planner' && <PlannerView />}
    </Shell>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
