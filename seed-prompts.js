const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
for (const k in envConfig) process.env[k] = envConfig[k];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const prompts = [
  // --- GIÁO ÁN (15) ---
  { category: 'Giáo án', title: 'Soạn giáo án Toán Lớp 1 (Phép cộng)', content: 'Hãy giúp tôi soạn một giáo án Toán lớp 1 về bài "Phép cộng trong phạm vi 10". Yêu cầu bao gồm: Mục tiêu bài học, Đồ dùng dạy học, Các hoạt động khởi động, Khám phá kiến thức mới thông qua hình ảnh trực quan, và phần Luyện tập.' },
  { category: 'Giáo án', title: 'Giáo án Tiếng Việt Lớp 2 (Tập đọc)', content: 'Soạn giáo án bài Tập đọc cho học sinh lớp 2. Tập trung vào việc rèn luyện kĩ năng phát âm, ngắt nghỉ đúng dấu câu và hiểu nội dung bài thông qua các câu hỏi gợi mở.' },
  { category: 'Giáo án', title: 'Giáo án Tiếng Anh Lớp 3 (Greetings)', content: 'Create a lesson plan for Grade 3 English on "Greetings and Introductions". Include 2 fun classroom games and a short dialogue practice for students.' },
  { category: 'Giáo án', title: 'Soạn bài Khám phá khoa học Lớp 4', content: 'Hãy soạn giáo án về chủ đề "Vòng đời của bướm" cho lớp 4. Sử dụng phương pháp 5E (Engage, Explore, Explain, Elaborate, Evaluate).' },
  { category: 'Giáo án', title: 'Giáo án Lịch sử Lớp 5 (Chiến thắng Điện Biên Phủ)', content: 'Soạn bài giảng về ý nghĩa lịch sử của chiến thắng Điện Biên Phủ lừng lẫy năm châu. Yêu cầu gợi cảm xúc tự hào dân tộc cho học sinh.' },
  { category: 'Giáo án', title: 'Giáo án giáo dục đạo đức Lớp 1', content: 'Soạn bài dạy về "Lời chào cao hơn mâm cỗ". Cách dạy trẻ biết chào hỏi người lớn tuổi một cách lễ phép.' },
  { category: 'Giáo án', title: 'Giáo án Âm nhạc Lớp 2', content: 'Thiết kế hoạt động dạy hát bài "Múa cho mẹ xem". Bao gồm phần khởi động với trò chơi âm thanh.' },
  { category: 'Giáo án', title: 'Giáo án Mỹ thuật Lớp 3', content: 'Dạy học sinh cách pha màu cơ bản và vẽ một bức tranh về chủ đề "Gia đình của em".' },
  { category: 'Giáo án', title: 'Giáo án Thể dục Lớp 4', content: 'Thiết kế bài tập thể dục giữa giờ sôi động và các động tác bổ trợ cho bài chạy bền.' },
  { category: 'Giáo án', title: 'Soạn bài Tin học Lớp 5', content: 'Hướng dẫn học sinh lớp 5 cách trình bày một slide PowerPoint đơn giản về chủ đề bảo vệ môi trường.' },
  { category: 'Giáo án', title: 'Giáo án trải nghiệm sáng tạo (Lớp 1-5)', content: 'Lên ý tưởng cho một tiết học trải nghiệm: "Làm đồ chơi từ vật liệu tái chế".' },
  { category: 'Giáo án', title: 'Soạn bài Kỹ năng sống (Chống bắt nạt học đường)', content: 'Giáo án dạy học sinh cách nhận biết và xử lý khi gặp tình huống bị bắt nạt ở trường.' },
  { category: 'Giáo án', title: 'Giáo án rèn chữ đẹp', content: 'Các bước hướng dẫn học sinh lớp 1 cách cầm bút và giữ tư thế ngồi đúng chuẩn.' },
  { category: 'Giáo án', title: 'Bài giảng về an toàn giao thông', content: 'Soạn nội dung dạy học sinh nhận biết các biển báo giao thông đường bộ cơ bản.' },
  { category: 'Giáo án', title: 'Giáo án STEM lớp 4', content: 'Thiết kế dự án "Làm bình lọc nước đơn giản" sử dụng các vật liệu tự nhiên.' },

  // --- BÀI TẬP (15) ---
  { category: 'Bài tập', title: 'Phiếu bài tập Toán Lớp 3 (Nhân số có 3 chữ số)', content: 'Tạo 5 bài toán tính và 2 bài toán có lời văn về phép nhân số có 3 chữ số với số có 1 chữ số.' },
  { category: 'Bài tập', title: 'Đề kiểm tra Tiếng Việt Lớp 4 (Giữa kỳ)', content: 'Thiết kế đề kiểm tra gồm phần đọc hiểu và phần viết văn miêu tả đồ vật.' },
  { category: 'Bài tập', title: 'Trò chơi đố vui Tiếng Anh', content: 'Hãy tạo 10 câu đố về các loài động vật bằng Tiếng Anh kèm theo gợi ý đơn giản cho học sinh tiểu học.' },
  { category: 'Bài tập', title: 'Bóng đá tri thức (Toán Lớp 2)', content: 'Biến 10 phép tính cộng trừ trong phạm vi 100 thành một trò chơi thi đua giữa các tổ.' },
  { category: 'Bài tập', title: 'Phiếu ôn tập hè (Lớp 5 lên 6)', content: 'Tổng hợp các kiến thức quan trọng nhất môn Toán và Tiếng Việt để học sinh ôn tập trong hè.' },
  { category: 'Bài tập', title: 'Bài tập rèn luyện tư duy logic', content: 'Tạo 3 bài toán đố logic cho học sinh khá giỏi lớp 4 để kích thích sự sáng tạo.' },
  { category: 'Bài tập', title: 'Luyện từ và câu (Từ đồng nghĩa)', content: 'Hãy cho 5 ví dụ về từ đồng nghĩa và yêu cầu học sinh đặt câu với chúng.' },
  { category: 'Bài tập', title: 'Bài tập viết thư (Lớp 3)', content: 'Hướng dẫn và yêu cầu học sinh viết một bức thư ngắn thăm hỏi ông bà ở quê.' },
  { category: 'Bài tập', title: 'Bài tập về số thập phân (Lớp 5)', content: 'Tạo danh sách các bài toán so sánh và sắp xếp thứ tự các số thập phân.' },
  { category: 'Bài tập', title: 'Bài tập thực hành khoa học', content: 'Yêu cầu học sinh quan sát sự nảy mầm của hạt đậu và ghi lại nhật ký trong 1 tuần.' },
  { category: 'Bài tập', title: 'Đề trắc nghiệm lịch sử Lớp 4', content: 'Tạo 10 câu hỏi trắc nghiệm về Triều đại nhà Hậu Lê.' },
  { category: 'Bài tập', title: 'Bài tập vận động tại chỗ', content: 'Hướng dẫn 3 động tác yoga đơn giản giúp học sinh thư giãn sau giờ học căng thẳng.' },
  { category: 'Bài tập', title: 'Thử thách "Mỗi ngày một từ vựng"', content: 'Tạo danh sách 7 từ vựng Tiếng Anh chủ đề "Trường học" cho 1 tuần.' },
  { category: 'Bài tập', title: 'Bài toán về diện tích (Lớp 5)', content: 'Các bài toán thực tế tính diện tích nền nhà hoặc diện tích mảnh vườn hình chữ nhật.' },
  { category: 'Bài tập', title: 'Bài tập phân biệt l/n, ch/tr', content: 'Đoạn văn có chỗ trống để học sinh điền các phụ âm dễ nhầm lẫn.' },

  // --- TRA CỨU (10) ---
  { category: 'Tra cứu', title: 'Công thức toán học tiểu học', content: 'Tổng hợp các công thức tính chu vi, diện tích các hình cơ bản: vuông, chữ nhật, tròn, tam giác.' },
  { category: 'Tra cứu', title: 'Bảng quy tắc chính tả Tiếng Việt', content: 'Các quy tắc viết hoa, quy tắc đặt dấu thanh và các trường hợp đặc biệt cần lưu ý.' },
  { category: 'Tra cứu', title: 'Danh sách 100 từ Tiếng Anh cơ bản', content: 'Liệt kê 100 từ vựng thông dụng nhất dành cho học sinh tiểu học theo chủ đề.' },
  { category: 'Tra cứu', title: 'Tóm tắt các sự kiện lịch sử Lớp 4-5', content: 'Lập bảng niên biểu các mốc lịch sử quan trọng của Việt Nam từ thời Đinh - Lê đến nay.' },
  { category: 'Tra cứu', title: 'Tra cứu đặc điểm thực vật', content: 'Phân biệt cây rễ cọc và rễ chùm kèm theo các ví dụ minh họa.' },
  { category: 'Tra cứu', title: 'Bảng đơn vị đo lường', content: 'Quy đổi giữa các đơn vị tính: m, dm, cm, mm và kg, g, tấn, tạ, yến.' },
  { category: 'Tra cứu', title: 'Quy tắc an toàn trên mạng', content: 'Danh sách 5 việc nên làm và 5 việc không nên làm khi học sinh sử dụng Internet.' },
  { category: 'Tra cứu', title: 'Công thức tính vận tốc, quãng đường', content: 'Giải thích và đưa ra ví dụ cho công thức s = v * t cho học sinh lớp 5.' },
  { category: 'Tra cứu', title: 'Từ điển mini Từ Hán Việt lớp 5', content: 'Giải nghĩa một số từ Hán Việt thông dụng xuất hiện trong chương trình học.' },
  { category: 'Tra cứu', title: 'Danh sách các tỉnh thành Việt Nam', content: 'Phân chia các tỉnh thành theo 3 miền: Bắc, Trung, Nam để học sinh dễ nhớ.' },

  // --- KỊCH BẢN (10) ---
  { category: 'Kịch bản', title: 'Kịch bản họp phụ huynh đầu năm', content: 'Hãy giúp tôi soạn nội dung buổi họp phụ huynh đầu năm: Phần chào hỏi, báo cáo kế hoạch năm học và thảo luận học phí.' },
  { category: 'Kịch bản', title: 'Xử lý tình huống học sinh mâu thuẫn', content: 'Soạn kịch bản đối thoại giữa giáo viên và 2 học sinh vừa mới xảy ra tranh cãi trong giờ ra chơi.' },
  { category: 'Kịch bản', title: 'Lời dẫn chương trình văn nghệ', content: 'Soạn kịch bản MC vui nhộn cho chương trình văn nghệ chào mừng ngày Nhà giáo Việt Nam 20/11.' },
  { category: 'Kịch bản', title: 'Kịch bản thảo luận nhóm lớp 5', content: 'Hướng dẫn giáo viên cách chia nhóm và kịch bản gợi ý giúp học sinh tự tin trình bày ý kiến.' },
  { category: 'Kịch bản', title: 'Lời chúc mừng sinh nhật học sinh', content: 'Tạo mẫu lời chúc ấm áp và một món quà tinh thần nhỏ dành cho học sinh trong lớp.' },
  { category: 'Kịch bản', title: 'Kịch bản tư vấn học sinh cá biệt', content: 'Cách tiếp cận và trò chuyện tâm lý với học sinh hay mất tập trung trong giờ học.' },
  { category: 'Kịch bản', title: 'Mẫu thư mời tham dự dã ngoại', content: 'Viết thư mời chuyên nghiệp gửi phụ huynh về kế hoạch tham quan bảo tàng của lớp.' },
  { category: 'Kịch bản', title: 'Kịch bản trò chơi khởi động tiết học', content: 'Trò chơi "Simon says" hoặc "Truyền tin" được biến tấu theo nội dung bài học.' },
  { category: 'Kịch bản', title: 'Mẫu bài phát biểu lễ bế giảng', content: 'Lời tri ân và tạm biệt học sinh cuối cấp (Lớp 5) đầy xúc động cho giáo viên chủ nhiệm.' },
  { category: 'Kịch bản', title: 'Kịch bản hướng dẫn lao động trường học', content: 'Cách phân chia công việc trực nhật lớp và dọn dẹp khuôn viên trường một cách khoa học.' }
];

async function seed() {
  console.log('Seeding Prompts...');
  
  // Need to get an admin user id to set as created_by
  const { data: profiles } = await supabase.from('profiles').select('id').eq('role', 'admin').limit(1);
  const adminId = profiles?.[0]?.id;
  
  if (!adminId) {
    console.error('No admin user found to associate prompts with.');
    return;
  }

  const itemsToInsert = prompts.map(p => ({ ...p, created_by: adminId }));

  const { error } = await supabase.from('prompts_library').insert(itemsToInsert);
  
  if (error) {
    console.error('Error seeding prompts:', error);
  } else {
    console.log(`Successfully seeded ${itemsToInsert.length} prompts!`);
  }
}

seed();
