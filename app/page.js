'use client'

import { useState, useRef, useEffect } from 'react'
import ChapterNavigation from '@/components/ChapterNavigation'
import ContentViewer from '@/components/ContentViewer'
import AIToolsPanel from '@/components/AIToolsPanel'
import NotesDrawer from '@/components/NotesDrawer'
import { chaptersData } from '@/data/chaptersData'
import { GripVertical } from 'lucide-react'

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(chaptersData[0])
  const [activeSubchapter, setActiveSubchapter] = useState(chaptersData[0].subchapters[0])
  const [selectedText, setSelectedText] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner')
  const [activeAITab, setActiveAITab] = useState('assistant')
  const [notesSheetOpen, setNotesSheetOpen] = useState(false)
  const [triggerExplanation, setTriggerExplanation] = useState(0)
  const [rightPanelWidth, setRightPanelWidth] = useState(384)
  const [isResizing, setIsResizing] = useState(false)
  const aiPanelRef = useRef(null)

  const handleTextSelection = (text) => {
    setSelectedText(text)
  }

  const handleExplainClick = () => {
    setActiveAITab('assistant')
    setTriggerExplanation(prev => prev + 1)
    
    if (aiPanelRef.current) {
      aiPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const handleNotesClick = () => {
    setNotesSheetOpen(true)
  }

  const handleChapterChange = (chapter) => {
    setActiveChapter(chapter)
    setActiveSubchapter(chapter.subchapters[0])
  }

  const handleSubchapterChange = (subchapter) => {
    setActiveSubchapter(subchapter)
  }

  // Resize handlers
  const handleMouseDown = (e) => {
    setIsResizing(true)
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isResizing) return

    const newWidth = window.innerWidth - e.clientX
    if (newWidth >= 280 && newWidth <= 600) {
      setRightPanelWidth(newWidth)
    }
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }
  }, [isResizing])

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
        {/* Left Panel - VERY NARROW Chapter Navigation */}
        <aside className="w-56 bg-gray-50 border-r border-gray-200 overflow-y-auto custom-scrollbar flex-shrink-0">
          <ChapterNavigation
            chapters={chaptersData}
            activeChapter={activeChapter}
            activeSubchapter={activeSubchapter}
            onChapterChange={handleChapterChange}
            onSubchapterChange={handleSubchapterChange}
          />
        </aside>

        {/* Middle Panel - WIDE Content Viewer */}
        <section className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <ContentViewer
            chapter={activeChapter}
            subchapter={activeSubchapter}
            onTextSelection={handleTextSelection}
            onExplainClick={handleExplainClick}
            onNotesClick={handleNotesClick}
            rightPanelWidth={rightPanelWidth}
          />
        </section>

        {/* Resize Handle */}
        <div
          onMouseDown={handleMouseDown}
          className={`w-1.5 bg-gray-300 hover:bg-primary-500 cursor-col-resize relative group transition-colors flex-shrink-0 ${
            isResizing ? 'bg-primary-500' : ''
          }`}
        >
          {/* Visual grip indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-primary-600 rounded-full p-1.5 shadow-lg">
              <GripVertical size={16} className="text-white" />
            </div>
          </div>
        </div>

        {/* Right Panel - RESIZABLE AI Tools */}
        <aside 
          ref={aiPanelRef} 
          style={{ width: `${rightPanelWidth}px` }}
          className="bg-gray-50 border-l border-gray-200 overflow-y-auto custom-scrollbar flex-shrink-0"
        >
          <AIToolsPanel
            selectedText={selectedText}
            difficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            activeTab={activeAITab}
            onTabChange={setActiveAITab}
            triggerExplanation={triggerExplanation}
          />
        </aside>
      </div>

      {/* Notes Drawer */}
      <NotesDrawer
        isOpen={notesSheetOpen}
        onClose={() => setNotesSheetOpen(false)}
        chapter={activeChapter}
        subchapter={activeSubchapter}
      />
    </main>
  )
}