require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
  try {
    const { data: userData, error } = await supabase.auth.admin.createUser({
      email: 'admin@eduai.vn',
      password: 'admin123',
      email_confirm: true,
      user_metadata: { full_name: 'Quản trị viên Hệ thống' }
    });
    
    if (error) {
      if (error.message.includes('already registered')) {
        console.log("Admin account already exists!");
        // Just ensure it is admin
        const { data: existingUser } = await supabase.auth.admin.listUsers();
        const adminUser = existingUser.users.find(u => u.email === 'admin@eduai.vn');
        if (adminUser) {
           await supabase.from('profiles').upsert({ id: adminUser.id, full_name: 'Quản trị viên Hệ thống', role: 'admin' });
        }
      } else {
        throw error;
      }
    } else {
      await supabase.from('profiles').upsert({
        id: userData.user.id,
        full_name: 'Quản trị viên Hệ thống',
        role: 'admin'
      });
      console.log("Admin account created successfully!");
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
