-- Xác nhận tất cả các tài khoản hiện có trong hệ thống (những tài khoản đã đăng ký nhưng chưa xác nhận)
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Cập nhật lại trigger để đảm bảo chỉ gán email_confirmed_at
CREATE OR REPLACE FUNCTION public.auto_confirm_new_user_email()
RETURNS trigger AS $$
BEGIN
  NEW.email_confirmed_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
