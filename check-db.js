require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
  const { data: { users } } = await supabase.auth.admin.listUsers();
  const adminUser = users.find(u => u.email === 'admin@eduai.vn');
  
  if (adminUser) {
    console.log('Admin Auth ID:', adminUser.id);
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', adminUser.id).maybeSingle();
    console.log('Admin Profile:', JSON.stringify(profile, null, 2));
  } else {
    console.log('Admin user NOT found in Auth');
  }
})();
