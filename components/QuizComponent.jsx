'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react'

export default function QuizComponent({ quiz, onClose, chapter, subchapter }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const totalQuestions = quiz.questions.length
  const question = quiz.questions[currentQuestion]

  const handleAnswerSelect = (index) => {
    if (!showExplanation) {
      setSelectedAnswer(index)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === question.correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setIsCompleted(false)
  }

  // Save quiz results to knowledge graph progress
 // Save quiz results to knowledge graph progress
useEffect(() => {
  if (isCompleted && chapter && subchapter) {
    const finalScore = Math.round((score / totalQuestions) * 100)
    const quizPassed = finalScore >= 80

    // Get existing progress
    const savedProgress = JSON.parse(localStorage.getItem('knowledgeGraphProgress') || '{}')
    
    // Create node ID matching the knowledge graph format
    const nodeId = `sub-${chapter.id}-${subchapter.id}`
    
    // Update progress
    savedProgress[nodeId] = {
      ...savedProgress[nodeId],
      visited: true,
      quizAttempted: true,
      quizPassed: quizPassed,
      quizScore: finalScore,
      lastAttempt: new Date().toISOString()
    }
    
    // Save back to localStorage
    localStorage.setItem('knowledgeGraphProgress', JSON.stringify(savedProgress))
    
    console.log(`✅ Quiz completed for ${nodeId}: ${finalScore}% (${quizPassed ? 'PASSED' : 'NEEDS REVIEW'})`)
  } else if (isCompleted && (!chapter || !subchapter)) {
    console.warn('⚠️ Quiz completed but chapter/subchapter props missing - progress not saved')
  }
}, [isCompleted, score, totalQuestions, chapter, subchapter])
  if (isCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100)
    const passed = percentage >= 80

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 text-center"
      >
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
          passed ? 'bg-green-100' : 'bg-orange-100'
        }`}>
          {passed ? (
            <CheckCircle2 size={48} className="text-green-600" />
          ) : (
            <XCircle size={48} className="text-orange-600" />
          )}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {passed ? 'Quiz Completed! 🎉' : 'Quiz Completed'}
        </h3>
        
        <p className="text-4xl font-bold mb-2" style={{ color: passed ? '#10b981' : '#fb923c' }}>
          {percentage}%
        </p>
        
        <p className="text-gray-600 mb-6">
          You scored {score} out of {totalQuestions} questions correctly
        </p>

        {!passed && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-orange-800">
              💡 <strong>Tip:</strong> Review the content and try again to improve your score!
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <RotateCcw size={18} />
            <span>Try Again</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Close Quiz
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-600">
            Score: {score}/{totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === question.correctAnswer
            const showCorrect = showExplanation && isCorrect
            const showWrong = showExplanation && isSelected && !isCorrect

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showWrong
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showCorrect && <CheckCircle2 size={20} className="text-green-600" />}
                  {showWrong && <XCircle size={20} className="text-red-600" />}
                </div>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Explanation */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-4 ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <p className={`font-medium mb-2 ${
            selectedAnswer === question.correctAnswer ? 'text-green-800' : 'text-red-800'
          }`}>
            {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
          </p>
          <p className="text-sm text-gray-700">{question.explanation}</p>
        </motion.div>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        {!showExplanation ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <span>{currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}</span>
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  )
}