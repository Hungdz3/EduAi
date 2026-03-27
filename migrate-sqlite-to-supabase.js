const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local
const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
for (const k in envConfig) process.env[k] = envConfig[k];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrate() {
  console.log('--- Starting Migration ---');
  
  // 1. Load data
  const qaBank = JSON.parse(fs.readFileSync('qa-bank-export.json', 'utf8'));
  const grades = JSON.parse(fs.readFileSync('grades-export.json', 'utf8'));
  const subjects = JSON.parse(fs.readFileSync('subjects-export.json', 'utf8'));
  
  // 2. Build maps
  const gradeMap = {};
  grades.forEach(g => gradeMap[g.id] = g.name);
  
  const subjectMap = {};
  subjects.forEach(s => subjectMap[s.id] = s.name);
  
  console.log(`Mapping loaded: ${Object.keys(gradeMap).length} grades, ${Object.keys(subjectMap).length} subjects.`);
  
  // 3. Prepare items
  const items = qaBank.map(row => ({
    grade: gradeMap[row.grade_id] || 'Lớp 1',
    subject: subjectMap[row.subject_id] || 'Khác',
    question: row.question,
    answer: row.answer,
    // Note: Our Supabase schema doesn't have keywords, but we can prepend to answer or just ignore
    // For now, let's keep it clean or add it if needed.
  }));
  
  console.log(`Prepared ${items.length} items for migration.`);
  
  // 4. Batch Insert
  const BATCH_SIZE = 500;
  let successCount = 0;
  
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    console.log(`Inserting batch ${Math.floor(i/BATCH_SIZE) + 1} (${batch.length} items)...`);
    
    const { error } = await supabase.from('knowledge_base').insert(batch);
    
    if (error) {
      console.error('Error inserting batch:', error);
      // Optional: Continue or stop? Let's continue for other batches.
    } else {
      successCount += batch.length;
    }
  }
  
  console.log(`--- Migration Finished! ---`);
  console.log(`Successfully migrated ${successCount} out of ${items.length} items.`);
}

migrate();
