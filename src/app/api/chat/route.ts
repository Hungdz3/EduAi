import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { callAI } from '@/lib/ai/openrouter'

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json()
    const supabase = createRouteHandlerClient({ cookies })
    
    // Xác thực người dùng
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // [Bước 1] Expand từ viết tắt (Sẽ gọi logic từ DB sau)
    const expandedInput = message 

    // [Bước 2] Full-text search trong knowledge_base (TBD)

    // [Bước 3] Nếu không có, gọi OpenRouter API
    const aiResponse = await callAI([{ role: 'user', content: expandedInput }])

    // [Bước 4] Lưu lịch sử vào bảng messages
    // (Bỏ qua xử lý lỗi insert để code gọn trong bản demo)
    await supabase.from('messages').insert({
      session_id: sessionId,
      role: 'user',
      content: expandedInput,
      original_input: message,
      source: 'system'
    })

    const { data: aiMsg } = await supabase.from('messages').insert({
      session_id: sessionId,
      role: 'assistant',
      content: aiResponse.content,
      model_used: aiResponse.model,
      source: 'ai'
    }).select().single()

    return NextResponse.json({
      reply: aiResponse.content,
      source: 'ai',
      modelUsed: aiResponse.model,
      messageId: aiMsg?.id,
      expandedInput,
      sessionId
    })
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
