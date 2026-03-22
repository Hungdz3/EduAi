import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Admin Dashboard | EduAI',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white border-b border-slate-800 pb-4">Tổng Quan Quản Trị Hệ Thống</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-400 text-sm font-medium">Tổng số Giáo viên</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-white">1,245</div>
            <p className="text-xs text-green-400 mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              +12% so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-400 text-sm font-medium">Phiên Chat AI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-white">8,542</div>
            <p className="text-xs text-green-400 mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              +24% so với tuần trước
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700 shadow-xl border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-slate-400 text-sm font-medium">Model Đang Dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">GPT-4o Mini</div>
            <p className="text-xs text-slate-500 mt-2">Được cấp bởi OpenRouter</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
