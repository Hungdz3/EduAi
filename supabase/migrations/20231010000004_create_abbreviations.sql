CREATE TABLE abbreviations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  short_form TEXT NOT NULL UNIQUE,
  full_form  TEXT NOT NULL,
  context    TEXT,
  is_active  BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
