CREATE TABLE prompts_library (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  category    TEXT NOT NULL,
  subject     TEXT,
  grade       TEXT,
  tags        TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  use_count   INTEGER DEFAULT 0,
  created_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
