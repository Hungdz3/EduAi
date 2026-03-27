const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seed() {
  console.log('Seeding Abbreviations...');
  const items = [
    { short_form: 'đc', full_form: 'được' },
    { short_form: 'bt', full_form: 'bài tập' },
    { short_form: 'gv', full_form: 'giáo viên' }, // Thêm luôn gv
    { short_form: 'oke', full_form: 'ok' },
    { short_form: 'oki', full_form: 'ok' },
    { short_form: 'uk', full_form: 'vâng' },
    { short_form: 'helo', full_form: 'xin chào' },
    { short_form: 'hilu', full_form: 'xin chào' }
  ];

  const { data, error } = await supabase.from('abbreviations').upsert(items, { onConflict: 'short_form' });
  if (error) {
    console.error('Error seeding abbreviations:', error);
  } else {
    console.log('Seeding successful!');
    
    // Kiểm tra lại
    const { data: check } = await supabase.from('abbreviations').select('*');
    console.log('Current Abbreviations:', check.length);
  }
}

seed();
