import { create } from 'zustand'
import { Session } from '@supabase/supabase-js'

interface AuthState {
  session: Session | null
  role: 'admin' | 'teacher' | null
  setSession: (session: Session | null) => void
  setRole: (role: 'admin' | 'teacher' | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  role: null,
  setSession: (session) => set({ session }),
  setRole: (role) => set({ role }),
  clearAuth: () => set({ session: null, role: null }),
}))
