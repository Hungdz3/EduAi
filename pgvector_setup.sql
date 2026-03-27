-- Kích hoạt extension pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Thêm cột 'embedding' vào bảng knowledge_base để lưu trữ vector 384 chiều
-- (Tương ứng với model nhúng cục bộ Xenova/all-MiniLM-L6-v2)
ALTER TABLE public.knowledge_base 
ADD COLUMN IF NOT EXISTS embedding vector(384);

-- Xóa function cũ nếu có để tránh lỗi
DROP FUNCTION IF EXISTS match_documents;

-- Tạo function tìm kiếm tài liệu tương đồng ngữ nghĩa bằng Cosine Similarity
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(384),
  match_threshold float,
  match_count int,
  filter_grade varchar DEFAULT NULL,
  filter_subject varchar DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  question text,
  answer text,
  grade varchar,
  subject varchar,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    kb.id,
    kb.question,
    kb.answer,
    kb.grade,
    kb.subject,
    1 - (kb.embedding <=> query_embedding) AS similarity
  FROM public.knowledge_base kb
  WHERE 1 - (kb.embedding <=> query_embedding) > match_threshold
    AND (filter_grade IS NULL OR filter_grade = '' OR filter_grade = 'Chung' OR kb.grade = filter_grade)
    AND (filter_subject IS NULL OR filter_subject = '' OR filter_subject = 'Chung' OR kb.subject = filter_subject)
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
$$;
