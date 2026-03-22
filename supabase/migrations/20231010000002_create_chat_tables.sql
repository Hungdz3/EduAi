CREATE TABLE chat_sessions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title      TEXT NOT NULL DEFAULT 'Cuộc hội thoại mới',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role           TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content        TEXT NOT NULL,
  original_input TEXT,
  source         TEXT CHECK (source IN ('database', 'ai', 'system')),
  model_used     TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
