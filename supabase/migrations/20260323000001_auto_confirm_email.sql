-- Tự động xác nhận email cho user mới khi đăng ký (dành cho môi trường dev)
CREATE OR REPLACE FUNCTION public.auto_confirm_new_user_email()
RETURNS trigger AS $$
BEGIN
  -- Đánh dấu email đã được xác nhận ngay trước khi row được insert vào auth.users
  NEW.email_confirmed_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Xóa trigger cũ nếu có để tránh trùng lặp
DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;

-- Tạo trigger BEFORE INSERT để thay đổi dữ liệu NEW
CREATE TRIGGER on_auth_user_created_auto_confirm
BEFORE INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.auto_confirm_new_user_email();
