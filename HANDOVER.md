# 🚀 Tài Liệu Bàn Giao & Triển Khai EduAI

Chúc mừng! Source code của dự án **EduAI** đã hoàn thiện phần khung MVP. Dưới đây là các bước cuối cùng để đưa ứng dụng của bạn ra mắt người dùng toàn cầu.

---

## 1. Triển Khai Backend (Supabase)
Vì bạn đã có file cấu hình (`supabase/migrations`), việc triển khai Database rất đơn giản:

1. Mở Terminal tại thư mục `c:\antigravity\eduai`.
2. Đăng nhập Supabase CLI:
   ```bash
   npx supabase login
   ```
3. Liên kết với Project thật của bạn trên Supabase Dashboard:
   ```bash
   npx supabase link --project-ref <your-project-ref-id>
   ```
4. Đẩy schema và RLS policies lên Cloud:
   ```bash
   npx supabase db push
   ```
5. Đừng quên vào trang Supabase Dashboard **> Authentication > Providers** và bật **Email Sign-Up** cũng như **Google OAuth**.
6. Thêm URL của Vercel (khi có) vào **Redirect URLs** của Supabase Auth.

---

## 2. Triển Khai Frontend (Vercel)
Next.js và Vercel là bộ đôi tốt nhất để triển khai.

1. Đẩy toàn bộ thư mục `eduai` lên một Github Repository.
2. Truy cập [Vercel.com](https://vercel.com) và tạo một Project mới bằng cách kết nối với Github Repo đó.
3. Trong bước **Configure Project** trên Vercel, hãy copy toàn bộ biến trong file `.env.local` và paste vào mục **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENROUTER_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (Sửa thành URL thật của Vercel sau khi có)
4. Bấm **Deploy**. Vercel sẽ tự động build ứng dụng và cung cấp cho bạn một đường link `.vercel.app`.

---

## 3. Hoạt Động Của Admin
Hệ thống sử dụng Supabase để xác thực. Để tạo tài khoản Admin:
1. Đăng ký thông thường trên giao diện Login/Register của web.
2. Vào **Supabase Dashboard > Table Editor > profiles**.
3. Sửa trường `role` của bạn từ `teacher` sang `admin`.
4. Đăng nhập lại trên web, ứng dụng sẽ tự động điều hướng bạn về trang `/admin`.

---

## 4. Mở Rộng Tính Năng Tương Lai
Mã nguồn đã được xây dựng theo chuẩn Next.js 14 App Router, bạn hoàn toàn có thể tiếp tục phát triển hệ thống mà không gặp khó khăn về kiến trúc:
- Các thao tác với cơ sở dữ liệu có thể xem thêm trong thư mục `src/lib/supabase/`.
- Cấu trúc gọi AI có thể tinh chỉnh tại `src/lib/ai/openrouter.ts` (ví dụ đổi Model, thay Prompt mặc định).

✨ Cảm ơn bạn đã hợp tác cùng tôi trong việc khởi tạo EduAI! ✨
