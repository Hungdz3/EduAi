import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Role = 'admin' | 'teacher'

export async function requireRole(requiredRole: Role) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', session.user.id)
    .single()

  if (!profile?.is_active) redirect('/login?error=account_disabled')
  if (profile.role !== requiredRole) redirect('/unauthorized')

  return { session, role: profile.role as Role }
}
