const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function start() {
  const text = fs.readFileSync('../ta.md', 'utf-8');
  const lines = text.split(/\r?\n/);

  let currentGrade = 'Chung';
  let chapters = [];
  let currentChapter = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.match(/^## LỚP [12345]$/)) {
      currentGrade = `Lớp ${line.match(/\d/)[0]}`;
      continue;
    }

    if (line.startsWith('#### ')) {
      if (currentChapter) chapters.push(currentChapter);
      
      let title = line.replace('#### ', '').trim();
      title = title.replace(/^\d+\.\s*/, '');

      currentChapter = {
        grade: currentGrade,
        title: title,
        content: ''
      };
      continue;
    }

    if (currentChapter && !line.startsWith('## ')) {
      currentChapter.content += line + '\n';
    }
  }
  if (currentChapter) chapters.push(currentChapter);

  console.log(`Tìm thấy ${chapters.length} chủ đề Tiếng Anh. Parse cục bộ bằng Regex...`);

  let finalRecords = [];

  for (let idx = 0; idx < chapters.length; idx++) {
    const chap = chapters[idx];
    
    // Tìm phần ví dụ nếu có (thường bắt đầu bằng **Ví dụ:** hoặc **Ví dụ**)
    let th = chap.content;
    let vd = '';

    const viDuMatch = chap.content.match(/\*\*Ví dụ:?\*\*/i);
    if (viDuMatch) {
      const splitIndex = viDuMatch.index;
      th = chap.content.substring(0, splitIndex).trim();
      vd = chap.content.substring(splitIndex).trim();
    }

    // Nếu không có phần **Ví dụ:** rõ ràng, nhưng có block code chứa các câu ví dụ (như ✅)
    if (!viDuMatch && chap.content.includes('✅')) {
      const checkMatch = chap.content.match(/```\n.*✅[\s\S]*?```/);
      if (checkMatch) {
         vd = "Các ví dụ minh họa:\n" + checkMatch[0];
         th = chap.content.replace(checkMatch[0], '').trim();
      }
    }

    if (th && th.trim().length > 0) {
      finalRecords.push({
        question: `[Lý thuyết] ${chap.title}`,
        answer: th,
        grade: chap.grade,
        subject: 'Tiếng Anh'
      });
    }

    if (vd && vd.trim().length > 0) {
      finalRecords.push({
        question: `[Ví dụ] ${chap.title}`,
        answer: vd,
        grade: chap.grade,
        subject: 'Tiếng Anh'
      });
    }
  }

  console.log(`Tiến hành chèn ${finalRecords.length} mẩu tin vào DB...`);
  
  const BATCH_SIZE = 50;
  let successCount = 0;
  for (let i = 0; i < finalRecords.length; i += BATCH_SIZE) {
    const batch = finalRecords.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from('knowledge_base').insert(batch);
    if (error) {
      console.error('Lỗi khi chèn DB:', error);
    } else {
      successCount += batch.length;
      console.log(`Đã chèn ${successCount}/${finalRecords.length}`);
    }
  }

  console.log('Hoàn tất parse dữ liệu mộc! Đang chạy lệnh ingest-embeddings.js...');
  
  // Tự động gọi script embedding sau khi chèn xong
  const { execSync } = require('child_process');
  try {
     console.log('--- Bắt đầu vector hóa ---');
     execSync('node ingest-embeddings.js', { stdio: 'inherit' });
     console.log('--- Hoàn tất ---');
  } catch(e) {
     console.error('Lỗi khi chạy ingest-embeddings.js', e.message);
  }
}

start();
