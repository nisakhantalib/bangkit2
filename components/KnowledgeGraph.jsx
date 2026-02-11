'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, Home, TrendingUp, AlertCircle } from 'lucide-react'
import { generateKnowledgeGraphNodes, progressLevels } from '@/data/knowledgeGraphData'

export default function KnowledgeGraph({ 
  isOpen, 
  onClose, 
  onNavigate, 
  currentChapter, 
  currentSubchapter 
}) {
  const [zoom, setZoom] = useState(0.8)
  const [pan, setPan] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hoveredNode, setHoveredNode] = useState(null)
  const [progress, setProgress] = useState({})
  const svgRef = useRef(null)
  
  const { nodes, edges } = generateKnowledgeGraphNodes()

  // Load progress from localStorage
  useEffect(() => {
    if (isOpen) {
      const savedProgress = localStorage.getItem('knowledgeGraphProgress')
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress))
      }
    }
  }, [isOpen])

  // Save progress
  const saveProgress = (newProgress) => {
    setProgress(newProgress)
    localStorage.setItem('knowledgeGraphProgress', JSON.stringify(newProgress))
  }

  // Reset view
  const resetView = () => {
    setZoom(0.8)
    setPan({ x: 100, y: 100 })
  }

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.4))

  // Pan with mouse drag
  const handleMouseDown = (e) => {
    if (e.target === svgRef.current || e.target.tagName === 'svg') {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart])

  // Handle node click
  const handleNodeClick = (node) => {
    if (node.type === 'chapter') {
      // Navigate to chapter
      onNavigate?.(node.chapterId, null)
    } else if (node.type === 'subchapter') {
      // Mark as visited
      const newProgress = {
        ...progress,
        [node.id]: {
          ...progress[node.id],
          visited: true,
          visitedAt: new Date().toISOString()
        }
      }
      saveProgress(newProgress)
      
      // Navigate to subchapter
      onNavigate?.(node.chapterId, node.subchapterId)
    }
    onClose()
  }

  // Calculate stats for insights
  const getStats = () => {
    const subchapters = nodes.filter(n => n.type === 'subchapter')
    const completed = subchapters.filter(n => progress[n.id]?.quizPassed).length
    const needsReview = subchapters.filter(n => {
      const p = progress[n.id]
      return p?.quizAttempted && !p?.quizPassed && p?.quizScore < 60
    }).length
    const notStarted = subchapters.filter(n => !progress[n.id]?.visited).length
    
    return { total: subchapters.length, completed, needsReview, notStarted }
  }

  if (!isOpen) return null

  const stats = getStats()
  const overallProgress = Math.round((stats.completed / stats.total) * 100)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full max-w-[1400px] max-h-[900px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🗺️</div>
                <div>
                  <h2 className="text-xl font-bold">Knowledge Graph - Sains Tingkatan 5</h2>
                  <p className="text-sm text-blue-100">Track Your Learning Progress & Identify Focus Areas</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Stats */}
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 backdrop-blur px-3 py-2 rounded-lg text-center">
                    <div className="text-lg font-bold">{overallProgress}%</div>
                    <p className="text-xs text-blue-100">Complete</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur px-3 py-2 rounded-lg text-center">
                    <div className="text-lg font-bold">{stats.needsReview}</div>
                    <p className="text-xs text-blue-100">Need Focus</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-2 border-l border-white/20 pl-4">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <span className="text-sm px-3 py-1 bg-white/20 rounded-lg">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <button
                    onClick={resetView}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Reset View"
                  >
                    <Home size={20} />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors ml-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Graph Area */}
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            <svg
              ref={svgRef}
              className="w-full h-full"
              viewBox="0 0 1200 700"
              onMouseDown={handleMouseDown}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                {/* Edges */}
                {edges.map((edge, index) => {
                  const sourceNode = nodes.find(n => n.id === edge.source)
                  const targetNode = nodes.find(n => n.id === edge.target)
                  
                  if (!sourceNode || !targetNode) return null

                  return (
                    <line
                      key={index}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={edge.style === 'dashed' ? '#94a3b8' : '#cbd5e1'}
                      strokeWidth="2"
                      strokeDasharray={edge.style === 'dashed' ? '8,4' : '0'}
                      opacity="0.6"
                    />
                  )
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isHovered = hoveredNode === node.id
                  const isCurrent = currentChapter?.id === node.chapterId && 
                                   (node.type === 'chapter' || currentSubchapter?.id === node.subchapterId)
                  
                  let radius, progressStatus, color, displayText
                  const nodeProgress = progress[node.id] || {}
                  
                  if (node.type === 'chapter') {
                    radius = 70
                    // Calculate chapter status based on subchapters
                    const chapterNodes = nodes.filter(n => 
                      n.type === 'subchapter' && n.chapterId === node.chapterId
                    )
                    const completedCount = chapterNodes.filter(n => {
                      const np = progress[n.id]
                      return np?.quizPassed
                    }).length
                    const testedCount = chapterNodes.filter(n => {
                      const np = progress[n.id]
                      return np?.quizAttempted && !np?.quizPassed
                    }).length
                    const visitedCount = chapterNodes.filter(n => {
                      const np = progress[n.id]
                      return np?.visited && !np?.quizAttempted
                    }).length
                    
                    // Chapter color based on majority status
                    if (completedCount === chapterNodes.length) {
                      color = progressLevels.completed.color
                    } else if (completedCount + testedCount >= chapterNodes.length / 2) {
                      color = progressLevels.tested.color
                    } else if (visitedCount > 0) {
                      color = progressLevels.started.color
                    } else {
                      color = progressLevels.notStarted.color
                    }
                    
                    // Chapter shows overall progress percentage
                    const avgProgress = Math.round(
                      (completedCount * 100 + testedCount * 66 + visitedCount * 33) / chapterNodes.length
                    )
                    displayText = `${avgProgress}%`
                    
                  } else {
                    radius = 45
                    
                    // Determine status
                    if (nodeProgress.quizPassed) {
                      progressStatus = 'completed'
                      color = progressLevels.completed.color
                      displayText = `${nodeProgress.quizScore}%` // Show actual quiz score
                    } else if (nodeProgress.quizAttempted) {
                      progressStatus = 'tested'
                      color = progressLevels.tested.color
                      displayText = `${nodeProgress.quizScore}%` // Show actual quiz score
                    } else if (nodeProgress.visited) {
                      progressStatus = 'started'
                      color = progressLevels.started.color
                      displayText = null // No text, just color
                    } else {
                      progressStatus = 'notStarted'
                      color = progressLevels.notStarted.color
                      displayText = null // No text, just color
                    }
                  }

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer transition-transform"
                      style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)', transformOrigin: `${node.x}px ${node.y}px` }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => handleNodeClick(node)}
                    >
                      {/* Current topic pulse */}
                      {isCurrent && node.type === 'subchapter' && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={radius + 8}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                        >
                          <animate
                            attributeName="r"
                            values={`${radius + 5};${radius + 12};${radius + 5}`}
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}

                      {/* Warning indicator for low scores */}
                      {node.type === 'subchapter' && nodeProgress.quizAttempted && !nodeProgress.quizPassed && nodeProgress.quizScore < 60 && (
                        <circle
                          cx={node.x + radius - 12}
                          cy={node.y - radius + 12}
                          r="12"
                          fill="#ef4444"
                          stroke="#fff"
                          strokeWidth="2"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0.5;1"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                      {node.type === 'subchapter' && nodeProgress.quizAttempted && !nodeProgress.quizPassed && nodeProgress.quizScore < 60 && (
                        <text
                          x={node.x + radius - 12}
                          y={node.y - radius + 16}
                          fill="white"
                          fontSize="14"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none"
                        >
                          !
                        </text>
                      )}

                      {/* Node circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius}
                        fill={color}
                        stroke={isHovered ? '#1e40af' : '#fff'}
                        strokeWidth={isHovered ? 4 : 3}
                        className="transition-all"
                      />

                      {/* Icon for chapter nodes */}
                      {node.type === 'chapter' && (
                        <text
                          x={node.x}
                          y={node.y - 15}
                          fontSize="32"
                          textAnchor="middle"
                          className="pointer-events-none"
                        >
                          {node.icon}
                        </text>
                      )}

                      {/* Display text (quiz score or chapter %) */}
                      {displayText && (
                        <text
                          x={node.x}
                          y={node.y + (node.type === 'chapter' ? 20 : 6)}
                          fill={color === progressLevels.notStarted.color || color === progressLevels.started.color ? '#1f2937' : '#fff'}
                          fontSize={node.type === 'chapter' ? '18' : '15'}
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none"
                        >
                          {displayText}
                        </text>
                      )}

                      {/* Label below node */}
                      <text
                        x={node.x}
                        y={node.y + radius + 20}
                        fill="#1f2937"
                        fontSize={node.type === 'chapter' ? '14' : '11'}
                        fontWeight={node.type === 'chapter' ? 'bold' : '600'}
                        textAnchor="middle"
                        className="pointer-events-none"
                        style={{ textShadow: '0 0 4px white, 0 0 4px white' }}
                      >
                        {node.label.length > 30 
                          ? node.label.substring(0, 27) + '...' 
                          : node.label}
                      </text>

                      {/* Hover tooltip */}
                      {isHovered && (
                        <g>
                          <rect
                            x={node.x - 85}
                            y={node.y - radius - 60}
                            width="170"
                            height={nodeProgress.quizScore !== undefined ? '55' : '42'}
                            fill="#1e40af"
                            rx="6"
                            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                          />
                          <text
                            x={node.x}
                            y={node.y - radius - 42}
                            fill="white"
                            fontSize="11"
                            textAnchor="middle"
                            fontWeight="bold"
                          >
                            {node.type === 'chapter' ? `Chapter ${node.chapterId} Overview` : 
                             progressStatus === 'completed' ? '✅ Quiz Passed!' :
                             progressStatus === 'tested' ? (nodeProgress.quizScore < 60 ? '⚠️ Needs Focus!' : '📝 Quiz Attempted') :
                             progressStatus === 'started' ? '👀 Content Viewed' :
                             '🆕 Not Started Yet'}
                          </text>
                          {nodeProgress.quizScore !== undefined && node.type === 'subchapter' && (
                            <text
                              x={node.x}
                              y={node.y - radius - 28}
                              fill="white"
                              fontSize="10"
                              textAnchor="middle"
                            >
                              Quiz Score: {nodeProgress.quizScore}%
                            </text>
                          )}
                          <text
                            x={node.x}
                            y={node.y - radius - (nodeProgress.quizScore !== undefined ? 14 : 24)}
                            fill="white"
                            fontSize="10"
                            textAnchor="middle"
                          >
                            Click to {progressStatus === 'notStarted' ? 'start learning' : progressStatus === 'tested' && nodeProgress.quizScore < 60 ? 'review & retry' : 'continue'}
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </g>
            </svg>

            {/* Focus Areas Alert */}
            {stats.needsReview > 0 && (
              <div className="absolute top-4 left-4 bg-red-50 border-2 border-red-200 rounded-lg p-3 shadow-lg max-w-xs">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-bold text-red-800">Focus Areas Detected!</p>
                    <p className="text-xs text-red-700 mt-1">
                      {stats.needsReview} subchapter{stats.needsReview > 1 ? 's' : ''} need{stats.needsReview === 1 ? 's' : ''} review (score &lt; 60%)
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      Look for nodes with <span className="font-bold">!</span> icon
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg text-sm">
              <p className="font-bold text-gray-800 mb-3">📊 Progress Legend:</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white shadow" style={{ backgroundColor: progressLevels.completed.color }} />
                  <span className="text-gray-700">100% Completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white shadow flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: progressLevels.tested.color }}>
                    72
                  </div>
                  <span className="text-gray-700">66% Quiz Attempted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white shadow" style={{ backgroundColor: progressLevels.started.color }} />
                  <span className="text-gray-700">33% Content Viewed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white shadow" style={{ backgroundColor: progressLevels.notStarted.color }} />
                  <span className="text-gray-700">0% Not Started</span>
                </div>
                <div className="flex items-center space-x-3 pt-2 border-t border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white shadow flex items-center justify-center text-white text-sm font-bold">
                    !
                  </div>
                  <span className="text-gray-700">Needs Focus (&lt;60%)</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur p-3 rounded-lg shadow-lg text-xs max-w-xs">
              <p className="font-semibold text-gray-800 mb-2">💡 How to Use:</p>
              <ul className="text-gray-600 space-y-1">
                <li>• <strong>Large nodes</strong> = Chapters (overall %)</li>
                <li>• <strong>Small nodes</strong> = Subchapters</li>
                <li>• <strong>! icon</strong> = Low score, needs focus</li>
                <li>• <strong>Click</strong> any node to study/review</li>
                <li>• Complete quizzes to turn nodes green!</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}