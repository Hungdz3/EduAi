-- ========== profiles ==========
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teacher_own_profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "admin_all_profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========== chat_sessions ==========
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teacher_own_sessions" ON chat_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "admin_all_sessions" ON chat_sessions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========== messages ==========
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teacher_own_messages" ON messages
  FOR ALL USING (
    session_id IN (
      SELECT id FROM chat_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "admin_all_messages" ON messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========== knowledge_base ==========
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_kb" ON knowledge_base
  FOR SELECT USING (TRUE);

CREATE POLICY "admin_write_kb" ON knowledge_base
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========== abbreviations ==========
ALTER TABLE abbreviations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_abbr" ON abbreviations
  FOR SELECT USING (TRUE);
CREATE POLICY "admin_write_abbr" ON abbreviations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ========== ai_config ==========
ALTER TABLE ai_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_ai_config" ON ai_config
  FOR SELECT USING (TRUE);
CREATE POLICY "admin_write_ai_config" ON ai_config
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
