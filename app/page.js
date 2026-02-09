'use client'

import { useState, useRef } from 'react'
import ChapterNavigation from '@/components/ChapterNavigation'
import ContentViewer from '@/components/ContentViewer'
import AIToolsPanel from '@/components/AIToolsPanel'
import { chaptersData } from '@/data/chaptersData'

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(chaptersData[0])
  const [activeSubchapter, setActiveSubchapter] = useState(chaptersData[0].subchapters[0])
  const [selectedText, setSelectedText] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner')
  const [activeAITab, setActiveAITab] = useState('chat')
  const aiPanelRef = useRef(null)

  const handleTextSelection = (text) => {
    setSelectedText(text)
  }

  const handleExplainClick = () => {
    // Switch to Explain Text tab
    setActiveAITab('explain')
    
    // Optional: Scroll AI panel into view (for smaller screens)
    if (aiPanelRef.current) {
      aiPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const handleChapterChange = (chapter) => {
    setActiveChapter(chapter)
    setActiveSubchapter(chapter.subchapters[0])
  }

  const handleSubchapterChange = (subchapter) => {
    setActiveSubchapter(subchapter)
  }

  return (
    <main className="h-screen overflow-hidden bg-white">
      {/* Header */}
      <header className="bg-primary-700 text-white shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-700 font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Bangkit</h1>
              <p className="text-primary-200 text-sm">Science Form 5 - AI-Powered Learning</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">Welcome back!</p>
              <p className="text-xs text-primary-200">Continue your learning journey</p>
            </div>
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center font-semibold">
              MR
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - 3 Panels */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Chapter Navigation */}
        <aside className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto custom-scrollbar">
          <ChapterNavigation
            chapters={chaptersData}
            activeChapter={activeChapter}
            activeSubchapter={activeSubchapter}
            onChapterChange={handleChapterChange}
            onSubchapterChange={handleSubchapterChange}
          />
        </aside>

        {/* Middle Panel - Content Viewer */}
        <section className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <ContentViewer
            chapter={activeChapter}
            subchapter={activeSubchapter}
            onTextSelection={handleTextSelection}
            onExplainClick={handleExplainClick}
          />
        </section>

        {/* Right Panel - AI Tools */}
        <aside ref={aiPanelRef} className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto custom-scrollbar">
          <AIToolsPanel
            selectedText={selectedText}
            difficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            activeTab={activeAITab}
            onTabChange={setActiveAITab}
          />
        </aside>
      </div>
    </main>
  )
}