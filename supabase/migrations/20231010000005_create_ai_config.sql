CREATE TABLE ai_config (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id      TEXT NOT NULL,
  model_label   TEXT NOT NULL,
  max_tokens    INTEGER DEFAULT 1500,
  temperature   FLOAT DEFAULT 0.7,
  is_active     BOOLEAN DEFAULT TRUE,
  updated_by    UUID REFERENCES profiles(id),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
