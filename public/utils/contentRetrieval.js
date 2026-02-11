/**
 * Content Retrieval Service
 * Implements SocratiQ's "Bounded Learning" strategy using fuzzy matching
 * Based on Algorithm 1 from the paper: Fingerprinting + Levenshtein Distance
 */

// Calculate fingerprint (average ASCII value)
function calculateFingerprint(text) {
  if (!text || text.length === 0) return 0
  
  let sum = 0
  for (let i = 0; i < text.length; i++) {
    sum += text.charCodeAt(i)
  }
  return sum / text.length
}

// Preprocess text: remove punctuation, convert to lowercase
function preprocessText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
}

// Calculate Levenshtein distance (edit distance)
function levenshteinDistance(str1, str2) {
  const m = str1.length
  const n = str2.length
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1,     // insertion
          dp[i - 1][j - 1] + 1  // substitution
        )
      }
    }
  }

  return dp[m][n]
}

// Calculate similarity score
function calculateSimilarity(query, candidate) {
  const distance = levenshteinDistance(query, candidate)
  const maxLength = Math.max(query.length, candidate.length)
  return 1 - (distance / maxLength)
}

// Create text map with fingerprints from chapter content
export function createTextMap(chapter) {
  const textMap = []
  
  // Process main content
  if (chapter.content) {
    const paragraphs = chapter.content.split('\n\n').filter(p => p.trim().length > 0)
    
    paragraphs.forEach((paragraph, index) => {
      const processed = preprocessText(paragraph)
      if (processed.length > 20) { // Only include substantial paragraphs
        textMap.push({
          id: `ch${chapter.id}-p${index}`,
          text: paragraph,
          processedText: processed,
          fingerprint: calculateFingerprint(processed),
          type: 'paragraph'
        })
      }
    })
  }

  // Process subchapters
  if (chapter.subchapters) {
    chapter.subchapters.forEach((subchapter) => {
      if (subchapter.content) {
        const paragraphs = subchapter.content.split('\n\n').filter(p => p.trim().length > 0)
        
        paragraphs.forEach((paragraph, index) => {
          const processed = preprocessText(paragraph)
          if (processed.length > 20) {
            textMap.push({
              id: `ch${chapter.id}-sub${subchapter.id}-p${index}`,
              text: paragraph,
              processedText: processed,
              fingerprint: calculateFingerprint(processed),
              type: 'subchapter',
              subchapterTitle: subchapter.title
            })
          }
        })
      }
    })
  }

  // Sort by fingerprint for binary search optimization
  return textMap.sort((a, b) => a.fingerprint - b.fingerprint)
}

// Find most similar paragraphs to query
export function findRelevantContent(query, textMap, topK = 3) {
  const processedQuery = preprocessText(query)
  const queryFingerprint = calculateFingerprint(processedQuery)

  // Find candidates with similar fingerprints (binary search neighbors)
  const candidates = []
  
  // Simple approach: calculate similarity with all entries
  // In production, you'd optimize with binary search + neighbors
  textMap.forEach(entry => {
    const similarity = calculateSimilarity(processedQuery, entry.processedText)
    candidates.push({
      ...entry,
      similarity
    })
  })

  // Sort by similarity and return top K
  return candidates
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
}

// Create context from relevant content for AI prompt
export function buildContextForAI(relevantContent) {
  if (!relevantContent || relevantContent.length === 0) {
    return ''
  }

  let context = '\n\n=== RELEVANT TEXTBOOK CONTENT ===\n'
  
  relevantContent.forEach((content, index) => {
    context += `\n[${index + 1}] ${content.subchapterTitle ? `(${content.subchapterTitle})` : ''}\n`
    context += `${content.text}\n`
  })
  
  context += '\n=== END TEXTBOOK CONTENT ===\n\n'
  context += 'Use the above textbook content as your primary source when answering questions. '
  context += 'If the information is in the textbook, cite it. '
  context += 'If not, you may use your general knowledge but indicate this clearly.\n'
  
  return context
}

// All-in-one function for content retrieval
export function retrieveContextForQuery(query, chapter, topK = 3) {
  const textMap = createTextMap(chapter)
  const relevantContent = findRelevantContent(query, textMap, topK)
  return buildContextForAI(relevantContent)
}