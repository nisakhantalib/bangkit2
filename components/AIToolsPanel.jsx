'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  MessageSquare, 
  FileQuestion, 
  Send,
  X,
  Lightbulb
} from 'lucide-react'
import DifficultySelector from './DifficultySelector'

export default function AIToolsPanel({ selectedText, difficulty, onDifficultyChange, activeTab, onTabChange }) {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI learning companion. Highlight any text from the content to get explanations, or ask me questions about the material.'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  
  // Use props if provided, otherwise use internal state
  const [internalTab, setInternalTab] = useState('chat')
  const currentTab = activeTab || internalTab
  
  const handleTabChange = (tab) => {
    if (onTabChange) {
      onTabChange(tab)
    } else {
      setInternalTab(tab)
    }
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      content: inputMessage
    }

    setChatMessages([...chatMessages, newMessage])
    setInputMessage('')

    // Simulate AI response (will be replaced with actual API call)
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: 'assistant',
        content: 'This is a placeholder response. In the production version, this will be powered by an AI model that provides personalized explanations based on your selected difficulty level.'
      }
      setChatMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleExplainText = () => {
    if (!selectedText) return

    const explanationRequest = {
      id: chatMessages.length + 1,
      type: 'user',
      content: `Explain (${difficulty} level): "${selectedText}"`
    }

    setChatMessages([...chatMessages, explanationRequest])

    // Simulate AI explanation (will be replaced with actual API call)
    setTimeout(() => {
      const aiExplanation = {
        id: chatMessages.length + 2,
        type: 'assistant',
        content: `Here's a ${difficulty}-level explanation: This is a placeholder. The actual implementation will use AI to provide personalized explanations of the selected text based on the difficulty level you've chosen.`
      }
      setChatMessages(prev => [...prev, aiExplanation])
    }, 1000)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles size={24} />
          <h2 className="text-lg font-bold">AI Learning Assistant</h2>
        </div>
        <p className="text-sm text-primary-100">Your personalized learning companion</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => handleTabChange('chat')}
          className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
            currentTab === 'chat'
              ? 'bg-white text-primary-600 border-b-2 border-primary-600'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <MessageSquare size={16} />
            <span>Chat</span>
          </div>
        </button>
        <button
          onClick={() => handleTabChange('explain')}
          className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
            currentTab === 'explain'
              ? 'bg-white text-primary-600 border-b-2 border-primary-600'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Lightbulb size={16} />
            <span>Explain Text</span>
          </div>
        </button>
      </div>

      {/* Difficulty Selector */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <DifficultySelector 
          selectedDifficulty={difficulty}
          onDifficultyChange={onDifficultyChange}
        />
      </div>

      <AnimatePresence mode="wait">
        {currentTab === 'chat' ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputMessage.trim()}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="explain"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-4"
          >
            {selectedText ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs font-medium text-blue-900 uppercase">Selected Text</p>
                  </div>
                  <p className="text-sm text-gray-700 italic line-clamp-6">&ldquo;{selectedText}&rdquo;</p>
                </div>

                <motion.button
                  onClick={handleExplainText}
                  className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles size={18} />
                  <span>Get {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Explanation</span>
                </motion.button>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>💡 The AI will explain this concept at your selected difficulty level.</p>
                  <p>📚 Explanations will appear in the chat tab.</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Lightbulb size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No text selected</p>
                  <p className="text-xs mt-1">Highlight text in the content to get explanations</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Tips */}
      <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          <strong>Quick Tips:</strong> Ask questions, request examples, or get clarification on any topic!
        </p>
      </div>
    </div>
  )
}