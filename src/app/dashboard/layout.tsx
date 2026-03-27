import { ReactNode } from 'react'
import Link from 'next/link'
import { BookOpen, MessageSquare, Layers, User, Home, Sparkles } from 'lucide-react'
import { UserSettings } from '@/components/UserSettings'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col shadow-sm z-20">
        <Link href="/dashboard" className="mb-10 flex items-center gap-3 hover:opacity-80 transition-opacity group px-2">
          <div className="w-14 h-14 relative flex-shrink-0">
             <img src="/logo-icon.png?v=1.2" alt="EduAi" className="object-contain w-full h-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black text-blue-600 tracking-tighter leading-none group-hover:text-blue-500 transition-colors">EduAi</span>
            <span className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-[0.15em] whitespace-nowrap">AI GIÚP ĐỠ GIÁO VIÊN</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-1.5">
          <Link href="/dashboard" className="flex items-center p-3 rounded-xl hover:bg-blue-50 text-slate-700 transition-all group">
            <Home className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
            <span className="font-semibold">Trang Chủ</span>
          </Link>
          <Link href="/dashboard/chat" className="flex items-center p-3 rounded-xl hover:bg-blue-50 text-slate-700 transition-all group">
            <MessageSquare className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
            <span className="font-semibold">Hỏi Trợ Lý AI</span>
          </Link>
          <Link href="/dashboard/prompts" className="flex items-center p-3 rounded-xl hover:bg-blue-50 text-slate-700 transition-all group">
            <BookOpen className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
            <span className="font-semibold">Thư Viện Prompt</span>
          </Link>
          <Link href="/dashboard/feedback" className="flex items-center p-3 rounded-xl hover:bg-blue-50 text-slate-700 transition-all group">
            <Sparkles className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
            <span className="font-semibold">Góp ý & Đánh giá</span>
          </Link>
        </nav>
        
        <div className="border-t border-slate-200 pt-4 mt-auto">
          <UserSettings />
        </div>
      </aside>
      <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
        {children}
      </main>
    </div>
  )
}
