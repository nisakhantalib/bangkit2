'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Target, TrendingUp, Award } from 'lucide-react'

const difficulties = [
  { id: 'beginner', label: 'Beginner', icon: GraduationCap, color: 'green' },
  { id: 'intermediate', label: 'Intermediate', icon: Target, color: 'yellow' },
  { id: 'advanced', label: 'Advanced', icon: TrendingUp, color: 'orange' },
  { id: 'expert', label: 'Expert', icon: Award, color: 'red' }
]

export default function DifficultySelector({ selectedDifficulty, onDifficultyChange }) {
  const currentIndex = difficulties.findIndex(d => d.id === selectedDifficulty)
  
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Learning Level
      </label>
      
      {/* Slider Track */}
      <div className="relative mb-6">
        <div className="h-2 bg-gray-200 rounded-full relative">
          <motion.div 
            className="h-2 bg-primary-600 rounded-full absolute"
            initial={false}
            animate={{ width: `${((currentIndex + 1) / difficulties.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Difficulty Points */}
        <div className="flex justify-between mt-4">
          {difficulties.map((diff, index) => {
            const Icon = diff.icon
            const isActive = selectedDifficulty === diff.id
            const isPassed = index <= currentIndex
            
            return (
              <motion.button
                key={diff.id}
                onClick={() => onDifficultyChange(diff.id)}
                className="flex flex-col items-center -mt-8 focus:outline-none group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                  isActive 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : isPassed
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon size={20} />
                </div>
                <span className={`text-xs font-medium ${
                  isActive ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {diff.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Current Level Description */}
      <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
        <strong>Current:</strong> {difficulties[currentIndex].label} level
      </div>
    </div>
  )
}