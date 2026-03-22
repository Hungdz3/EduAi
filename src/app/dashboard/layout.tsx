import { ReactNode } from 'react'
import Link from 'next/link'
import { BookOpen, MessageSquare, Layers, User } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <aside className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 flex items-center">
          <Layers className="w-6 h-6 mr-2 text-blue-600" />
          EduAI
        </div>
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard/chat" className="flex items-center p-3 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors">
            <MessageSquare className="w-5 h-5 mr-3 text-slate-500" />
            <span className="font-medium">Hỏi Trợ Lý AI</span>
          </Link>
          <Link href="/dashboard/prompts" className="flex items-center p-3 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors">
            <BookOpen className="w-5 h-5 mr-3 text-slate-500" />
            <span className="font-medium">Thư Viện Prompt</span>
          </Link>
        </nav>
        
        <div className="border-t border-slate-200 pt-4 mt-auto">
          <div className="flex items-center p-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Giáo viên</div>
              <div className="text-xs text-slate-500">Cài đặt tài khoản</div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
        {children}
      </main>
    </div>
  )
}
