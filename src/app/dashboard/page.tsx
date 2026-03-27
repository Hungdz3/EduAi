'use client'
import Link from 'next/link'
import { MessageSquare, BookOpen, Sparkles, ArrowRight } from 'lucide-react'

export default function DashboardIndex() {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-12 py-10">
        
        {/* Welcome Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100 mb-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Trợ lý AI đồng hành cùng giáo viên
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Chào mừng bạn đến với <span className="text-blue-600">EduAi</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
            Hệ thống trí tuệ nhân tạo chuyên biệt giúp bạn soạn giáo án, tạo đề kiểm tra 
            và tra cứu kiến thức tiểu học một cách nhanh chóng và chính xác nhất.
          </p>
        </section>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/dashboard/chat" className="group">
            <div className="h-full p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden flex flex-col items-start text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform"></div>
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Hỏi Trợ Lý AI</h3>
              <p className="text-slate-500 leading-relaxed mb-6 font-medium">Bắt đầu trò chuyện để soạn bài, giải đáp kiến thức hoặc thảo luận ý tưởng dạy học mới.</p>
              <div className="mt-auto flex items-center text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                Bắt đầu ngay <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </Link>

          <Link href="/dashboard/prompts" className="group">
            <div className="h-full p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 relative overflow-hidden flex flex-col items-start text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform"></div>
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Thư Viện Prompt</h3>
              <p className="text-slate-500 leading-relaxed mb-6 font-medium">Khám phá các câu lệnh mẫu được tối ưu sẵn để tạo ra kết quả tốt nhất từ AI.</p>
              <div className="mt-auto flex items-center text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">
                Xem thư viện <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>

        {/* Stats / Info Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-1">
             <h4 className="text-lg font-bold text-slate-800 italic">"Cá nhân hóa trải nghiệm giảng dạy với EduAi"</h4>
             <p className="text-slate-400 text-sm">Hơn 8000+ kiến thức tiểu học đã sẵn sàng hỗ trợ bạn.</p>
          </div>
          <div className="flex -space-x-3">
             <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
             </div>
             <div className="w-12 h-12 rounded-full border-4 border-white bg-green-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
             </div>
             <div className="w-12 h-12 rounded-full border-4 border-white bg-purple-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
