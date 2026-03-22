CREATE TABLE knowledge_base (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  category    TEXT,
  tags        TEXT[],
  subject     TEXT,
  grade       TEXT,
  hit_count   INTEGER DEFAULT 0,
  created_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX knowledge_base_fts ON knowledge_base
  USING gin(to_tsvector('simple', question || ' ' || answer));
