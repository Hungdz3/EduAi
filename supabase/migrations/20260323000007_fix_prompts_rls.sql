-- Kích hoạt RLS cho bảng prompts_library
ALTER TABLE public.prompts_library ENABLE ROW LEVEL SECURITY;

-- Cho phép Admin thực hiện tất cả các thao tác
DROP POLICY IF EXISTS "admin_all_prompts" ON public.prompts_library;
CREATE POLICY "admin_all_prompts" ON public.prompts_library FOR ALL USING (public.is_admin());

-- Cho phép mọi người dùng (đã đăng nhập) xem thư viện prompt
DROP POLICY IF EXISTS "public_read_prompts" ON public.prompts_library;
CREATE POLICY "public_read_prompts" ON public.prompts_library FOR SELECT USING (auth.uid() IS NOT NULL);
