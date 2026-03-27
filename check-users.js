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

async function checkUsers() {
  console.log('Checking Auth Users...');
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.error('Error listing auth users:', authError);
    return;
  }
  
  console.log(`Found ${users.length} auth users.`);
  
  console.log('\nChecking Profiles...');
  const { data: profiles, error: profError } = await supabase.from('profiles').select('*');
  if (profError) {
    console.error('Error fetching profiles:', profError);
    return;
  }
  
  users.forEach(u => {
    const p = profiles.find(p => p.id === u.id);
    console.log(`User: ${u.email} (${u.id}) -> Profile: ${p ? 'Found (' + p.role + ')' : 'NOT FOUND'}`);
  });
}

checkUsers();
