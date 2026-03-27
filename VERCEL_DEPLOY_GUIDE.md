# Hướng dẫn Deploy EduAI lên Vercel

Dưới đây là cách nhanh nhất để đưa dự án của bạn lên mạng:

## Cách 1: Sử dụng Link Clone (Nhanh nhất)

Click vào link dưới đây để Vercel tự động tạo Project từ GitHub của bạn:

[**Deploy to Vercel**](https://vercel.com/new/clone?repository-url=https://github.com/Hungdz3/EduAichatbot)

---

## Cách 2: Các bước thủ công

Nếu bạn muốn tự tạo Project trên Dashboard của Vercel:

1.  Truy cập [Vercel New Project](https://vercel.com/new).
2.  Chọn repository **Hungdz3/EduAichatbot**.
3.  **QUAN TRỌNG:** Ở mục **Environment Variables**, hãy copy-paste toàn bộ các biến từ file `.env.local` vào:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `SUPABASE_SERVICE_ROLE_KEY`
    - `OPENROUTER_API_KEY`
    - `OPENROUTER_BASE_URL`
    - `NEXT_PUBLIC_APP_URL` (Sử dụng URL Vercel của bạn sau khi deploy)
4.  Nhấn **Deploy**.

## Lưu ý về lỗi build
Nếu bạn gặp lỗi `npm warn deprecated`, đó chỉ là cảnh báo, **không phải nguyên nhân gây lỗi build**. Nguyên nhân chính thường là:
- Thiếu Biến môi trường (Environment Variables).
- Kết nối tới Supabase bị chặn (Check lại IP allowlist trên Supabase nếu có).

Chúc bạn thành công! 🚀
