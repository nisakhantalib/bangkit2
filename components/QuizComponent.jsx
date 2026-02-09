'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react'

export default function QuizComponent({ quiz, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = quiz.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quiz.questions.length - 1

  const handleAnswerSelect = (index) => {
    if (showExplanation) return
    setSelectedAnswer(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    setShowExplanation(true)
    const isCorrect = selectedAnswer === question.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    }

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        questionId: question.id,
        selectedAnswer,
        isCorrect
      }
    ])
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setAnsweredQuestions([])
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100)
    const passed = percentage >= 70

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
          passed ? 'bg-green-100' : 'bg-yellow-100'
        }`}>
          <Trophy className={passed ? 'text-green-600' : 'text-yellow-600'} size={48} />
        </div>

        <h3 className="text-2xl font-bold mb-2">
          {passed ? '🎉 Great Job!' : '👍 Good Effort!'}
        </h3>
        
        <p className="text-gray-600 mb-6">
          You scored <strong className="text-primary-600">{score}</strong> out of {quiz.questions.length}
        </p>

        <div className="mb-6">
          <div className="text-4xl font-bold text-primary-600 mb-2">{percentage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className={`h-3 rounded-full ${passed ? 'bg-green-500' : 'bg-yellow-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex space-x-3 justify-center">
          <motion.button
            onClick={handleRetakeQuiz}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={18} />
            <span>Retake Quiz</span>
          </motion.button>
          
          <motion.button
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Learning
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="py-4">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <span>{Math.round(((currentQuestion) / quiz.questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion) / quiz.questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correctAnswer
              const showCorrect = showExplanation && isCorrect
              const showIncorrect = showExplanation && isSelected && !isCorrect

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`quiz-option w-full text-left ${
                    isSelected ? 'selected' : ''
                  } ${showCorrect ? 'correct' : ''} ${showIncorrect ? 'incorrect' : ''}`}
                  whileHover={!showExplanation ? { scale: 1.02 } : {}}
                  whileTap={!showExplanation ? { scale: 0.98 } : {}}
                  disabled={showExplanation}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      showCorrect 
                        ? 'bg-green-500 border-green-500' 
                        : showIncorrect 
                        ? 'bg-red-500 border-red-500'
                        : isSelected 
                        ? 'border-primary-600 bg-primary-600' 
                        : 'border-gray-300'
                    }`}>
                      {showCorrect && <CheckCircle2 size={16} className="text-white" />}
                      {showIncorrect && <XCircle size={16} className="text-white" />}
                      {!showExplanation && isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="flex-1 text-sm">{option}</span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded"
              >
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                </p>
                <p className="text-sm text-gray-700">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {!showExplanation ? (
              <motion.button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  selectedAnswer !== null
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={selectedAnswer !== null ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer !== null ? { scale: 0.98 } : {}}
              >
                Submit Answer
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNextQuestion}
                className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLastQuestion ? 'Finish Quiz' : 'Next Question →'}
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
