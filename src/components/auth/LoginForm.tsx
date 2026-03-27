'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorObj, setErrorObj] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorObj(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErrorObj(error.message)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl overflow-hidden">
      <CardHeader className="space-y-3 pb-6 border-b border-white/5 bg-white/5">
        <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent text-center">Đăng Nhập EduAI</CardTitle>
        <CardDescription className="text-slate-400 text-center">Hệ thống trợ lý AI cho giáo viên</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleLogin} className="space-y-5">
          {errorObj && <div className="p-3 text-sm text-red-200 bg-red-500/20 border border-red-500/30 rounded-lg">{errorObj}</div>}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input id="email" type="email" placeholder="name@school.edu.vn" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 transition-all h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Mật khẩu</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-slate-900 border-white/10 text-white focus-visible:ring-indigo-500 transition-all h-11" />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-11 mt-2 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02]">
            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
