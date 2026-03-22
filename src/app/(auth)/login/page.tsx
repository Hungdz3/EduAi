import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export const metadata = {
  title: 'Đăng Nhập | EduAI',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      
      <div className="z-10 w-full">
        <LoginForm />
        <p className="mt-6 text-center text-slate-400">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-all">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
