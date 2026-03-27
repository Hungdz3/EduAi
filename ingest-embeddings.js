const { pipeline } = require('@xenova/transformers');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function generateEmbeddings() {
  console.log('Loading embedding model (this may take a moment on first run)...');
  // Initialize the specific 384-dimensional feature extraction pipeline
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
    quantized: true // Keep it fast and lightweight
  });

  console.log('Model loaded! Fetching documents from knowledge_base...');

  // Lấy các bản ghi chưa có embedding
  const { data: documents, error: fetchError } = await supabase
    .from('knowledge_base')
    .select('*')
    .is('embedding', null);

  if (fetchError) {
    console.error('Lỗi khi tải tài liệu:', fetchError);
    return;
  }

  if (!documents || documents.length === 0) {
    console.log('Tất cả tài liệu đã có embedding! Không cần làm gì thêm.');
    return;
  }

  console.log(`Tìm thấy ${documents.length} tài liệu cần xử lý. Bắt đầu...`);

  let successCount = 0;
  // Xử lý từng lô để tránh quá tải bộ nhớ và Supabase API
  const BATCH_SIZE = 50;

  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batch = documents.slice(i, i + BATCH_SIZE);
    
    // Tạo embeddings đồng thời cho từng lô
    const batchData = await Promise.all(
      batch.map(async (doc) => {
        // Gộp câu hỏi và câu trả lời để AI hiểu được toàn diện ngữ cảnh
        const content = `${doc.question || ''}\n${doc.answer || ''}`.trim();
        
        // Sinh vector
        const output = await extractor(content, { pooling: 'mean', normalize: true });
        // `output.data` là một mảng Float32Array chứa 384 con số
        const embeddingArray = Array.from(output.data);

        return {
          ...doc,
          embedding: embeddingArray
        };
      })
    );

    // Cập nhật lô lên Supabase
    const { error: updateError } = await supabase
      .from('knowledge_base')
      .upsert(batchData);

    if (updateError) {
      console.error(`Lỗi khi cập nhật từ vị trí ${i}:`, updateError);
    } else {
      successCount += batch.length;
      process.stdout.write(`\rTiến độ: ${successCount} / ${documents.length}`);
    }
  }

  console.log('\nHoàn tất nạp Vector Embeddings!');
}

generateEmbeddings().catch(console.error);
