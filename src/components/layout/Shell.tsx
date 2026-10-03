import React, { type ReactNode } from 'react'
import { Header } from './Header'
import { Navigation } from './Navigation'

interface ShellProps {
  children: ReactNode
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-50/60 text-stone-900 flex flex-col font-sans antialiased selection:bg-stone-200">
      <Header />
      <Navigation />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
      <footer className="border-t border-stone-200/60 py-4 text-center text-xs text-stone-400">
        <p>Personal AI · Privacy First · Local Attention & Long-Term Memory</p>
      </footer>
    </div>
  )
}
