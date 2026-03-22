'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Send, Bot } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!input.trim()) return
    const newMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    setLoading(true)
    
    // Giả lập call API /api/chat
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Dưới đây là một số gợi ý cho bài giảng mà bạn yêu cầu. EduAI có thể hỗ trợ tạo chi tiết hơn nếu cần.' }])
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white max-w-4xl mx-auto w-full border-x border-slate-200 shadow-sm relative">
      <header className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="font-semibold text-lg text-slate-800 flex items-center">
          <Bot className="w-5 h-5 mr-2 text-indigo-500" />
          Trợ Lý AI Soạn Giáo Án
        </h1>
        <p className="text-xs text-slate-500">Mô hình: GPT-4o Mini</p>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-medium">Hỏi EduAI bất cứ điều gì về tài liệu giảng dạy</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <Bot className="w-5 h-5 text-indigo-600" />
              </div>
            )}
            <Card className={`max-w-[80%] p-4 leading-relaxed ${m.role === 'user' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-md' : 'bg-white text-slate-800 border-slate-200 shadow-sm'}`}>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </Card>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1">
              <Bot className="w-5 h-5 text-indigo-600" />
            </div>
            <Card className="p-4 bg-white text-slate-500 border-slate-200 shadow-sm italic">
              Đang suy nghĩ...
            </Card>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200 sticky bottom-0">
        <form onSubmit={handleSend} className="flex gap-2 relative">
          <Input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Nhập yêu cầu từ vựng, bài tập, giáo án..." 
            className="flex-1 h-12 pr-12 focus-visible:ring-indigo-500" 
          />
          <Button type="submit" disabled={loading || !input.trim()} size="icon" className="absolute right-1 top-1 h-10 w-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-2">AI có thể tạo ra thông tin không chính xác. Hãy kiểm tra lại kết quả.</p>
      </div>
    </div>
  )
}
