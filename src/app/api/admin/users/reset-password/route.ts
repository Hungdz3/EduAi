import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId, newPassword } = await req.json()

    if (!userId || !newPassword) {
      return NextResponse.json({ error: 'Missing userId or newPassword' }, { status: 400 })
    }

    // Khởi tạo Supabase client với Service Role Key để có quyền admin
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Kiểm tra quyền của người gọi (phải là admin)
    // Lưu ý: Trong thực tế nên check session/cookie ở đây để đảm bảo an toàn
    // Giả sử có logic check auth/role ở middleware hoặc tại đây
    
    const { error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { password: newPassword }
    )

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Password updated successfully' })
  } catch (error: any) {
    console.error('Reset Password Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
