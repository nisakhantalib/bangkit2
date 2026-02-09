'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function VideoPlayer({ url }) {
  // Extract video ID from YouTube URL if needed
  const getEmbedUrl = (url) => {
    if (url.includes('embed')) return url
    
    const videoId = url.split('v=')[1] || url.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden shadow-lg bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={getEmbedUrl(url)}
          title="Educational Video"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      {/* Video Info Overlay */}
      <div className="p-3 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="flex items-center space-x-2 text-white text-sm">
          <Play size={16} />
          <span>Watch to reinforce your understanding</span>
        </div>
      </div>
    </motion.div>
  )
}
