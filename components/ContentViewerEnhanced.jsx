'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BookOpen, Play, Sparkles, Brain, FileQuestion, StickyNote, ArrowRight } from 'lucide-react'
import VideoPlayer from './VideoPlayer'
import QuizComponent from './QuizComponent'

export default function ContentViewerEnhanced({
  chapter,
  subchapter,
  onTextSelect,
  onExplainClick,
  onNotesClick,
  difficulty,
  rightPanelWidth = 284
}) {
  const [selectedText, setSelectedText] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quiz, setQuiz] = useState(null)
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false)
  const [highlightedText, setHighlightedText] = useState('')
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 })
  const contentRef = useRef(null)

  // Reset quiz when subchapter changes
  useEffect(() => {
    setShowQuiz(false)
  }, [subchapter?.id])

  // Handle text selection with floating indicator
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      const selectedText = selection.toString().trim()
      
      if (selectedText.length > 0 && contentRef.current?.contains(selection.anchorNode)) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        
        setHighlightedText(selectedText)
        setSelectionPosition({
          x: rect.left + (rect.width / 2),
          y: rect.top + window.scrollY
        })
        
        if (onTextSelect) {
          onTextSelect(selectedText)
        }
      } else {
        setHighlightedText('')
      }
    }

    document.addEventListener('mouseup', handleSelection)
    return () => document.removeEventListener('mouseup', handleSelection)
  }, [onTextSelect])

  const handleGenerateQuiz = async () => {
    setIsGeneratingQuiz(true)

    try {
      const content = subchapter?.content || chapter?.content || ''
      
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          chapterTitle: chapter?.title,
          subchapterTitle: subchapter?.title,
          difficulty: difficulty
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate quiz')
      }

      const data = await response.json()
      setQuiz(data.quiz)
      setShowQuiz(true)

    } catch (error) {
      console.error('Error generating quiz:', error)
      alert('Failed to generate quiz. Please try again.')
    } finally {
      setIsGeneratingQuiz(false)
    }
  }

  const getTruncatedText = (text, wordLimit = 5) => {
    const words = text.split(' ')
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ') + '...'
  }

  return (
    <div className="max-w-4xl mx-auto p-8 relative">
      {/* Breadcrumb */}
      <motion.div 
        className="mb-6 flex items-center space-x-2 text-sm text-gray-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span>{chapter?.title}</span>
        <span>/</span>
        <span className="text-primary-600 font-medium">{subchapter?.title}</span>
      </motion.div>

      {/* Content Header with AI Quiz Button */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <BookOpen className="text-primary-600" size={28} />
              <h1 className="text-3xl font-bold text-primary-900">{subchapter?.title}</h1>
            </div>
          </div>
          
          {/* AI Quiz Generation Button */}
          {/* <motion.button
            onClick={handleGenerateQuiz}
            disabled={isGeneratingQuiz}
            className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isGeneratingQuiz ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Brain size={16} />
                <span>Generate AI Quiz</span>
              </>
            )}
          </motion.button> */}
        </div>
        
        <div className="h-1 w-20 bg-primary-600 rounded-full" />
        
        
      </motion.div>

      {/* Video Section */}
      {subchapter?.videoUrl && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="text-primary-600" size={24} />
              <h2 className="text-xl font-bold text-primary-900">Penjelasan Video</h2>
            </div>
            <VideoPlayer videoUrl={subchapter.videoUrl} />
          </div>
        </motion.div>
      )}

      {/* Main Content with Markdown Rendering */}
      <motion.div
        ref={contentRef}
        className="markdown-content prose prose-lg max-w-none mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {subchapter?.content || chapter?.content || ''}
        </ReactMarkdown>
      </motion.div>

      {/* Quiz Section - Original Style with AI Generation Option */}
      {(subchapter?.quiz || quiz) && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
  {/* Left group */}
  <div className="flex items-center space-x-2">
    <FileQuestion className="text-purple-600" size={24} />
    <h2 className="text-xl font-bold text-purple-900">Uji Pengetahuan Anda</h2>
  </div>

  {/* Right element */}
  <motion.button
    onClick={handleGenerateQuiz}
    disabled={isGeneratingQuiz}
    className="ml-auto px-4 py-2 bg-blue-800 text-white rounded-lg font-medium text-sm flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {isGeneratingQuiz ? (
      <>
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
        <span>Generating...</span>
      </>
    ) : (
      <>
        <Brain size={16} />
        <span>Generate AI Quiz</span>
      </>
    )}
  </motion.button>
</div>

            
            {showQuiz ? (
              <QuizComponent 
                quiz={quiz || subchapter.quiz} 
                onClose={() => setShowQuiz(false)}
                chapter={chapter}
                subchapter={subchapter}
              />
            ) : (
              <p className="text-gray-600">
                Uji pengetahuan anda mengenai {subchapter?.title} dengan {(quiz || subchapter?.quiz)?.questions?.length || 3} soalan.
                {quiz && <span className="text-purple-600 font-medium"> (AI Generated)</span>}
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Navigation Hint */}
      <motion.div
        className="mt-12 p-4 bg-blue-50 border-l-4 border-primary-600 rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-700">
          💡 <strong>Tips:</strong> Highlight mana-mana teks untuk mendapatkan penjelasan daripada AI Assistant di panel sebelah kanan.
        </p>
      </motion.div>

      {/* Floating Notes Button - RESTORED */}
      <motion.button
        onClick={onNotesClick}
        className="fixed bottom-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-4 rounded-full shadow-lg transition-all z-30"
        style={{
          right: `${rightPanelWidth + 32}px`,
          transition: 'right 0.15s ease-out'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        title="Buka Nota"
      >
        <StickyNote size={24} />
      </motion.button>

     {/* Selection Popup - FIXED: Changed selectedText to highlightedText */}
           <AnimatePresence>
  {highlightedText && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        left: `${selectionPosition.x}px`,
        top: `${selectionPosition.y - 80}px`, // adjust offset as needed
        transform: 'translateX(-50%)',
        zIndex: 50
      }}
      className="bg-white rounded-lg shadow-xl p-4 flex items-center space-x-3 border-2 border-primary-200"
    >
      {/* <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Sparkles size={16} className="text-primary-600" />
        <span className="font-medium">Text selected</span>
      </div> */}
      <div className="flex space-x-2">
        <motion.button
          onClick={() => {
            onExplainClick()
            setHighlightedText('')
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explain with AI
        </motion.button>
        <motion.button
          onClick={() => {
            onNotesClick()
            setHighlightedText('')
          }}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add to Notes
        </motion.button>
        {/* <motion.button
          onClick={() => setHighlightedText('')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button> */}
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  )
}