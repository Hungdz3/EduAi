-- Tạo lại profile cho những user đã đăng ký từ trước khi trigger profiles được sửa
INSERT INTO public.profiles (id, full_name, role)
SELECT id, COALESCE(raw_user_meta_data->>'full_name', 'Người dùng'), 'teacher'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
