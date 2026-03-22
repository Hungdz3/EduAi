import OpenAI from 'openai'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// OpenRouter dùng cùng interface với OpenAI — chỉ đổi baseURL
const openrouter = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL,
    'X-Title': process.env.NEXT_PUBLIC_APP_NAME,
  },
})

// Lấy model đang active từ DB (Admin có thể đổi qua trang /admin/ai-config)
async function getActiveModel(): Promise<string> {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase
    .from('ai_config')
    .select('model_id')
    .eq('is_active', true)
    .single()
  return data?.model_id ?? process.env.OPENROUTER_DEFAULT_MODEL!
}

export async function callAI(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  systemPrompt?: string
): Promise<{ content: string; model: string }> {

  const model = await getActiveModel()

  const fullMessages = [
    {
      role: 'system' as const,
      content: systemPrompt ?? `Bạn là trợ lý AI chuyên hỗ trợ giáo viên tiểu học Việt Nam.
Trả lời bằng tiếng Việt, ngắn gọn, thực tế và phù hợp với chương trình GDPT 2018.`,
    },
    ...messages,
  ]

  const response = await openrouter.chat.completions.create({
    model,
    // @ts-expect-error OpenRouter specific format
    messages: fullMessages,
    max_tokens: 1500,
    temperature: 0.7,
  })

  return {
    content: response.choices[0].message.content ?? '',
    model,  // Lưu lại model nào đã dùng
  }
}
