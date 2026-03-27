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
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkKB() {
  console.log('Checking knowledge_base...');
  const { data: kb, error: kbError } = await supabase.from('knowledge_base').select('*');
  if (kbError) console.error('Error fetching KB:', kbError);
  else console.log('KB Content:', JSON.stringify(kb, null, 2));

  console.log('\nChecking recent messages...');
  const { data: msgs, error: msgError } = await supabase
    .from('messages')
    .select('role, content, original_input, source')
    .order('created_at', { ascending: false })
    .limit(5);
  if (msgError) console.error('Error fetching messages:', msgError);
  else console.log('Recent Messages:', JSON.stringify(msgs, null, 2));
}

checkKB();
