-- 1. Bảng Đánh giá dịch vụ
CREATE TABLE IF NOT EXISTS public.service_evaluations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating       INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment      TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bảng Yêu cầu bổ sung tính năng
CREATE TABLE IF NOT EXISTS public.feature_requests (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content      TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'pending' 
               CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Kích hoạt Row Level Security (RLS)
ALTER TABLE public.service_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_requests ENABLE ROW LEVEL SECURITY;

-- 4. Policies cho Admin (Xem tất cả)
DROP POLICY IF EXISTS "admin_all_evaluations" ON public.service_evaluations;
CREATE POLICY "admin_all_evaluations" ON public.service_evaluations FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "admin_all_feature_requests" ON public.feature_requests;
CREATE POLICY "admin_all_feature_requests" ON public.feature_requests FOR ALL USING (public.is_admin());

-- 5. Policies cho Người dùng (Gửi phản hồi)
DROP POLICY IF EXISTS "user_insert_evaluation" ON public.service_evaluations;
CREATE POLICY "user_insert_evaluation" ON public.service_evaluations FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_insert_request" ON public.feature_requests;
CREATE POLICY "user_insert_request" ON public.feature_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
