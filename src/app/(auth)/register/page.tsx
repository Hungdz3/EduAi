import RegisterForm from '@/components/auth/RegisterForm'
import Link from 'next/link'

export const metadata = {
  title: 'Đăng Ký | EduAI',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      
      <div className="z-10 w-full">
        <RegisterForm />
        <p className="mt-6 text-center text-slate-400">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-all">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
