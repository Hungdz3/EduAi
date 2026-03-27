-- Tạo function tìm kiếm từ khóa trong knowledge_base
-- Ưu tiên tìm chính xác theo từ vựng (Full-Text Search)
CREATE OR REPLACE FUNCTION search_knowledge_base(
  query_text TEXT,
  match_count INT DEFAULT 3,
  filter_grade VARCHAR DEFAULT NULL,
  filter_subject VARCHAR DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  question TEXT,
  answer TEXT,
  grade VARCHAR,
  subject VARCHAR,
  rank REAL
)
LANGUAGE sql STABLE
AS $$
  SELECT
    kb.id,
    kb.question,
    kb.answer,
    kb.grade,
    kb.subject,
    ts_rank_cd(to_tsvector('simple', kb.question || ' ' || kb.answer), plainto_tsquery('simple', query_text)) AS rank
  FROM public.knowledge_base kb
  WHERE to_tsvector('simple', kb.question || ' ' || kb.answer) @@ plainto_tsquery('simple', query_text)
    AND (filter_grade IS NULL OR filter_grade = '' OR filter_grade = 'Chung' OR kb.grade = filter_grade)
    AND (filter_subject IS NULL OR filter_subject = '' OR filter_subject = 'Chung' OR kb.subject = filter_subject)
  ORDER BY rank DESC
  LIMIT match_count;
$$;
