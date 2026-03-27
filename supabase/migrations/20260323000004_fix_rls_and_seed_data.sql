-- Sửa lỗi Infinite Recursion trong RLS Policy của bảng profiles
-- Lỗi xảy ra khi Policy của bảng profiles lại thực hiện SELECT chính bảng profiles

DROP POLICY IF EXISTS "admin_all_profiles" ON public.profiles;
DROP POLICY IF EXISTS "admin_all_sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "admin_all_messages" ON public.messages;
DROP POLICY IF EXISTS "admin_write_kb" ON public.knowledge_base;
DROP POLICY IF EXISTS "admin_write_abbr" ON public.abbreviations;
DROP POLICY IF EXISTS "admin_write_ai_config" ON public.ai_config;

-- Tạo function is_admin để kiểm tra role mà không gây đệ quy
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT (role = 'admin')
    FROM public.profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Áp dụng lại các policy sử dụng function
CREATE POLICY "admin_all_profiles" ON public.profiles FOR ALL USING (public.is_admin());
CREATE POLICY "admin_all_sessions" ON public.chat_sessions FOR ALL USING (public.is_admin());
CREATE POLICY "admin_all_messages" ON public.messages FOR ALL USING (public.is_admin());
CREATE POLICY "admin_write_kb" ON public.knowledge_base FOR ALL USING (public.is_admin());
CREATE POLICY "admin_write_abbr" ON public.abbreviations FOR ALL USING (public.is_admin());
CREATE POLICY "admin_write_ai_config" ON public.ai_config FOR ALL USING (public.is_admin());

-- Thêm dữ liệu mẫu vào Knowledge Base
INSERT INTO public.knowledge_base (question, answer, category, subject, grade)
VALUES 
('Cách tính diện tích hình chữ nhật lớp 3', 'Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng (cùng đơn vị đo). S = a x b', 'Kiến thức', 'Toán', 'Lớp 3'),
('Quy trình soạn giáo án chuẩn 5 bước', '1. Xác định mục tiêu. 2. Chuẩn bị thiết bị. 3. Tiến trình dạy học. 4. Củng cố. 5. Dặn dò.', 'Nghiệp vụ', 'Chung', 'Chung'),
('Lịch sử Đảng Cộng sản Việt Nam ra đời khi nào?', 'Đảng Cộng sản Việt Nam ra đời vào ngày 3/2/1930.', 'Kiến thức', 'Lịch sử & Địa lý', 'Lớp 5');

-- Thêm dữ liệu mẫu vào Prompt Library
INSERT INTO public.prompts_library (title, content, category, subject, grade)
VALUES 
('Gợi ý trò chơi khởi động môn Toán', 'Hãy gợi ý 3 trò chơi khởi động nhanh trong 5 phút cho tiết học Toán về phép cộng có nhớ cho học sinh lớp 2.', 'Bài tập', 'Toán', 'Lớp 2'),
('Soạn kịch bản đóng vai môn Tiếng Việt', 'Viết một kịch bản ngắn 3 nhân vật cho học sinh đóng vai kể lại câu chuyện Bài học đường đời đầu tiên.', 'Giáo án', 'Tiếng Việt', 'Lớp 4');
