const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  
  // Login
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'admin@eduai.vn',
    password: 'admin123'
  });
  if (authErr) {
    console.error('Login error:', authErr.message);
    return;
  }
  
  console.log('Logged in as:', authData.session.user.id);

  // Send request to API
  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `sb-mgmenuzamkwrctcfxait-auth-token=${JSON.stringify(authData.session)}` // mock nextjs cookie
    },
    body: JSON.stringify({
      message: 'test message',
      grade: 'Lớp 1',
      subject: 'Toán'
    })
  });
  
  const text = await res.text();
  console.log('API Response Status:', res.status);
  console.log('API Response Body:', text);
})();
