import { ReactNode } from 'react'
import Link from 'next/link'
import { Users, Settings, Database, ShieldCheck } from 'lucide-react'
import { UserSettings } from '@/components/UserSettings'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-col">
        <Link 
          href="/admin" 
          className="text-xl font-bold text-white mb-8 flex items-center border-b border-slate-800 pb-4 px-2 -mx-2 hover:bg-slate-900 rounded-t-lg transition-all"
        >
          <ShieldCheck className="w-5 h-5 mr-2 text-red-500" />
          EduAI Admin
        </Link>
        <nav className="flex-1 space-y-2 text-sm">
          <Link href="/admin/users" className="flex items-center p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
            <Users className="w-5 h-5 mr-3 text-slate-500" />
            Quản Lý Giáo Viên
          </Link>
          <Link href="/admin/knowledge" className="flex items-center p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
            <Database className="w-5 h-5 mr-3 text-slate-500" />
            Knowledge Base
          </Link>
          <Link href="/admin/prompts" className="flex items-center p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
            <Database className="w-5 h-5 mr-3 text-slate-500" />
            Thư Viện Prompt (Mẫu)
          </Link>
        </nav>
        <div className="border-t border-slate-800 pt-4 mt-auto">
          <UserSettings isAdmin={true} />
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-auto bg-slate-900 p-8">
        {children}
      </main>
    </div>
  )
}
