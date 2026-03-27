# Tài Liệu Dự Án EduAI

Dưới đây là tóm tắt chi tiết về dự án **EduAI** - Hệ thống Chatbot AI hỗ trợ giáo viên tiểu học.

---

## 1. Product Requirement Document (PRD)

### 1.1. Tổng Quan Dự Án
- **Tên dự án:** EduAI
- **Tầm nhìn:** Trở thành người trợ lý số đắc lực nhất cho mỗi giáo viên tiểu học tại Việt Nam, giúp giảm tải công việc hành chính và nâng cao chất lượng giảng dạy thông qua trí tuệ nhân tạo.
- **Sứ mệnh:** Cung cấp thông tin chính xác, đúng chương trình giáo dục phổ thông và hỗ trợ soạn thảo nội dung sư phạm nhanh chóng.

### 1.2. Vấn Đề (Problem Statement)
- Giáo viên tiểu học dành quá nhiều thời gian cho việc soạn giáo án, tìm kiếm học liệu và thiết kế bài kiểm tra.
- Các công cụ AI phổ thông thường không có ngữ cảnh chuyên sâu về chương trình giáo dục tiểu học tại Việt Nam.
- Khó khăn trong việc quản lý và hệ thống hóa các tài liệu giảng dạy số.

### 1.3. Giải Pháp (Solution)
- Một chatbot chuyên biệt được huấn luyện với phong cách sư phạm thân thiện.
- Tích hợp công nghệ RAG (Retrieval-Augmented Generation) để truy xuất kiến thức từ kho học liệu chuẩn.
- Cung cấp các công cụ hỗ trợ nhanh (Prompt Library) cho các tác vụ thường ngày của giáo viên.

### 1.4. Đối Tượng Sử Dụng
- **Giáo viên tiểu học:** Người sử dụng chính để hỗ trợ giảng dạy.
- **Quản trị viên (Admin):** Cán bộ quản lý nội dung kiến thức và hệ thống.

---

## 2. Tính Năng MVP (Minimum Viable Product)

Để đạt được mục tiêu ban đầu, EduAI tập trung vào các tính năng cốt lõi sau:

### 2.1. Quản Lý Tài Khoản
- Đăng ký, đăng nhập bằng Email hoặc Google (thông qua Supabase Auth).
- Phân quyền người dùng: `Teacher` (Giáo viên) và `Admin` (Quản trị viên).

### 2.2. Trò Chuyện Trí Tuệ Nhân Tạo (AI Chat)
- Chatbot hỗ trợ trả lời các câu hỏi về chuyên môn, nghiệp vụ sư phạm.
- Hỗ trợ lọc ngữ cảnh theo **Khối lớp** và **Môn học** để tăng độ chính xác.
- Lưu lịch sử trò chuyện theo từng phiên (Sessions).

### 2.3. Thư Viện Prompt (Prompt Library)
- Cung cấp các mẫu yêu cầu có sẵn:
    - Soạn giáo án theo chủ đề.
    - Tạo đề kiểm tra 15p, 1 tiết.
    - Viết lời phê học sinh.
    - Tư vấn xử lý tình huống sư phạm.

### 2.4. Tra Cứu Kiến Thức (Knowledge Base & RAG)
- Tìm kiếm thông tin dựa trên kho dữ liệu giáo dục đã được upload.
- Sử dụng tìm kiếm kết hợp (Hybrid Search): Keyword + Vector Search để đảm bảo thông tin liên quan nhất.

### 2.5. Hệ Thống Đánh Giá & Phản Hồi
- Giáo viên có thể đánh giá mức độ hài lòng về câu trả lời của AI (Rating).
- Gửi yêu cầu bổ sung tính năng trực tiếp cho quản trị viên.

### 2.6. Trang Quản Trị (Admin Dashboard)
- Thống kê số lượng người dùng và phiên làm việc.
- Quản lý kho tri thức (Thêm/Sửa/Xóa tài liệu).
- Quản lý danh mục Prompt mẫu.
- Xem phản hồi và yêu cầu từ giáo viên.

---

## 3. Tài Liệu SRS (Software Requirement Specification)

### 3.1. Yêu Cầu Chức Năng (Functional Requirements)
- **F-01: Hệ thống hội thoại:** AI phải phản hồi dựa trên tài liệu có sẵn trong Knowledge Base nếu có.
- **F-02: Quản lý ngữ cảnh:** Hệ thống phải ghi nhớ các lựa chọn về Khối lớp và Môn học của người dùng trong phiên chat.
- **F-03: Tìm kiếm thông tin:** Cần có chức năng tìm kiếm toàn cục trong kho tri thức.
- **F-04: Phân quyền RLS:** Đảm bảo giáo viên chỉ xem được dữ liệu của chính mình, Admin có quyền xem toàn bộ.

### 3.2. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)
- **Hiệu năng:** Thời gian phản hồi của AI (sau khi có stream) không quá 2 giây cho câu đầu tiên.
- **Tính bảo mật:** Dữ liệu người dùng phải được mã hóa và bảo vệ qua Supabase RLS policies.
- **Giao diện (UI/UX):** Hiện đại, trực quan, hỗ trợ Dark Mode và tương thích tốt trên nhiều thiết bị (Responsive).
- **Độ tin cậy:** AI cần có cơ chế fallback nếu model chính gặp sự cố (Sử dụng OpenRouter để chuyển đổi model linh hoạt).

### 3.3. Kiến Trúc Công Nghệ (Tech Stack)
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Lucide Icons, Shadcn UI.
- **Backend:** Supabase (Database, Auth, Storage, Edge Functions).
- **AI Engine:** OpenRouter (GPT-4o, Claude 3.5 Sonnet hoặc các model tương đương).
- **Database Search:** pgvector cho Vector Search trong PostgreSQL.

---

*Tài liệu được cập nhật ngày: 27/03/2026*
