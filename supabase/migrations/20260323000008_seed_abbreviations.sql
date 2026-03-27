INSERT INTO abbreviations (short_form, full_form) VALUES 
('đc', 'được'),
('bt', 'bài tập'),
('oke', 'ok'),
('oki', 'ok'),
('uk', 'vâng'),
('helo', 'xin chào'),
('hilu', 'xin chào')
ON CONFLICT (short_form) DO UPDATE SET full_form = EXCLUDED.full_form;
