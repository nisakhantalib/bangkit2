import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

// Difficulty level prompts 
const DIFFICULTY_PROMPTS = {
  beginner: `You are conversing with a Beginner learner: Focus on foundational concepts, definitions, and straightforward applications in science, suitable for Form 5 Malaysian students with basic prior knowledge. Use simple language and clear examples from everyday life.`,
  
  intermediate: `You are conversing with an Intermediate learner: Emphasize problem-solving, practical applications, and connections between concepts, targeting Form 5 Malaysian students with a solid understanding of basic science principles. Use moderate technical language and real-world Malaysian contexts.`,
  
  advanced: `You are conversing with an Advanced learner: Challenge learners to analyze, synthesize, and apply complex scientific concepts, requiring deeper expertise and critical thinking. Use advanced scientific terminology and expect students to make connections across topics.`,
  
  expert: `You are an expert science teacher using Bloom's Taxonomy: Create responses that progress through Bloom's levels: remember, understand, apply, analyze, evaluate, and create. Guide learning by asking thought-provoking questions and encouraging higher-order thinking.`
}

// Model selection based on availability (SocratiQ strategy from Section 5.1)
const GROQ_MODELS = [
  'mixtral-8x7b-32768', 
  'llama-3.3-70b-versatile',      // Fallback 1
  'llama-3.1-70b-versatile',      // Fallback 2
  'gemma2-9b-it',                 // Fallback 3
]

export async function POST(request) {
  try {
    const { message, difficulty = 'beginner', context = '', conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const groqApiKey = process.env.GROQ_API_KEY

    if (!groqApiKey) {
      // Fallback to mock response for development
      console.warn('⚠️ GROQ_API_KEY not set, using mock response')
      return NextResponse.json({
        response: `[DEVELOPMENT MODE - GROQ] This is a mock response at ${difficulty} level. In production, this will use Groq AI (Mixtral-8x7b or LLaMA) to provide a personalized explanation based on the textbook content.\n\nYour question: "${message}"\n\n${context ? 'Relevant textbook content has been retrieved and would be used to answer your question.' : 'No specific textbook content was retrieved for this query.'}`
      })
    }

    // Initialize Groq client
    const groq = new Groq({
      apiKey: groqApiKey
    })

    // Build the system prompt with difficulty level and bounded learning context
    const systemPrompt = `${DIFFICULTY_PROMPTS[difficulty]}

You are an AI learning companion for "Sains Tingkatan 5" - a Form 5 Science educational platform following the Malaysian KSSM curriculum. Your role is to help students understand scientific concepts through personalized, engaging explanations.

${context ? context : 'Use your knowledge of Form 5 Science topics including respiration, biodiversity, conservation, and chemistry concepts.'}

Guidelines:
- Adapt your explanations to the student's difficulty level (currently: ${difficulty})
- Use examples relevant to Malaysian students and contexts
- Be encouraging and supportive
- Break down complex concepts into understandable parts
- If asked about topics beyond the textbook, clearly indicate you're using general knowledge
- Always aim to deepen understanding, not just provide answers
- Keep responses concise but informative (aim for 2-4 paragraphs)`

    // Build messages array with conversation history
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    // Try models in order (SocratiQ's multi-model strategy)
    let lastError = null
    
    for (const model of GROQ_MODELS) {
      try {
        console.log(`🤖 Attempting Groq model: ${model}`)
        
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            ...messages
          ],
          model: model,
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        })

        const aiMessage = chatCompletion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.'

        console.log(`✅ Success with model: ${model}`)
        
        return NextResponse.json({
          response: aiMessage,
          model: model // Return which model was used
        })

      } catch (error) {
        console.warn(`⚠️ Model ${model} failed:`, error.message)
        lastError = error
        
        // Check if it's a rate limit error
        if (error.message?.includes('rate_limit') || error.message?.includes('429')) {
          console.log('Rate limit hit, trying next model...')
          continue
        }
        
        // If it's another error, still try next model
        continue
      }
    }

    // If all models failed
    console.error('❌ All Groq models failed:', lastError)
    return NextResponse.json(
      { 
        error: 'All AI models are currently unavailable. Please try again in a moment.',
        details: lastError?.message 
      },
      { status: 503 }
    )

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}