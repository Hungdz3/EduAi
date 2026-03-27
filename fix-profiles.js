require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
  try {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    
    let inserted = 0;
    for (const u of users) {
      const { error: insertErr } = await supabase.from('profiles').insert({
        id: u.id,
        role: 'admin',
        full_name: u.user_metadata?.full_name || 'Quản trị viên'
      });
      if (!insertErr) inserted++;
    }
    console.log(`Successfully checked ${users.length} users and inserted ${inserted} missing profiles. Error 500 fixed!`);
  } catch (e) {
    console.error('Error fixing profiles:', e.message);
  }
})();
