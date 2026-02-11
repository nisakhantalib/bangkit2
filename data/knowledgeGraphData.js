import { chaptersData } from './chaptersData'

// Generate nodes from your actual chapter data
export const generateKnowledgeGraphNodes = () => {
  const nodes = []
  const edges = []
  
  // Chapter positions (central nodes)
  const chapterPositions = [
    { x: 250, y: 300 },  // Chapter 1
    { x: 600, y: 300 },  // Chapter 2
    { x: 950, y: 300 },  // Chapter 3
  ]
  
  chaptersData.forEach((chapter, chapterIndex) => {
    const chapterPos = chapterPositions[chapterIndex]
    
    // Add main chapter node (large central node)
    nodes.push({
      id: `chapter-${chapter.id}`,
      label: `${chapter.title}`,
      icon: chapter.icon,
      type: 'chapter',
      chapterId: chapter.id,
      x: chapterPos.x,
      y: chapterPos.y
    })
    
    // Add subchapter nodes around the chapter
    const subchapterCount = chapter.subchapters.length
    const radius = 180 // Distance from chapter center
    const angleStep = (2 * Math.PI) / subchapterCount
    
    chapter.subchapters.forEach((subchapter, subIndex) => {
      const angle = angleStep * subIndex - Math.PI / 2 // Start from top
      const x = chapterPos.x + radius * Math.cos(angle)
      const y = chapterPos.y + radius * Math.sin(angle)
      
      // Add subchapter node
      const nodeId = `sub-${chapter.id}-${subchapter.id}`
      nodes.push({
        id: nodeId,
        label: subchapter.title,
        type: 'subchapter',
        chapterId: chapter.id,
        subchapterId: subchapter.id,
        x: x,
        y: y
      })
      
      // Connect subchapter to chapter
      edges.push({
        source: `chapter-${chapter.id}`,
        target: nodeId
      })
    })
  })
  
  // Add cross-chapter connections (based on content relationships)
  // Example: Kulat (Ch1) relates to Gizi (Ch2)
  edges.push({
    source: 'sub-1-1.4',  // 1.4 would be Kulat/Fungi
    target: 'sub-2-2.1',  // 2.1 Gizi Seimbang
    style: 'dashed',
    label: 'sumber makanan'
  })
  
  edges.push({
    source: 'sub-2-2.2',  // 2.2 Teknologi Makanan
    target: 'sub-3-3.1',  // 3.1 Kitaran Hayat
    style: 'dashed',
    label: 'impak'
  })
  
  return { nodes, edges }
}

// Progress levels (like the sample image)
export const progressLevels = {
  completed: { percent: 100, color: '#10b981', label: '100% Completed' },
  tested: { percent: 66, color: '#fbbf24', label: '66% Tested' },
  started: { percent: 33, color: '#fb923c', label: '33% Started' },
  notStarted: { percent: 0, color: '#94a3b8', label: '0% Not Started' }
}