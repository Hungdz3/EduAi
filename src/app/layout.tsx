import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'EduAI',
  description: 'Nền tảng AI hỗ trợ giáo viên tiểu học',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={cn('font-sans', inter.variable)}>
      <body className="antialiased font-sans flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  )
}
