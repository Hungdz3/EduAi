const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join('c:', 'antigravity', 'nckh2 (2).db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  // 1. List all tables
  db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, tables) => {
    if (err) {
      console.error('Error listing tables:', err.message);
      return;
    }
    console.log('\nTables in database:');
    tables.forEach((table) => {
      console.log(`- ${table.name}`);
    });

    // 2. For each table, show schema and first few rows
    tables.forEach((table) => {
      if (table.name === 'sqlite_sequence') return;
      
      console.log(`\n--- Inspecting Table: ${table.name} ---`);
      
      db.all(`PRAGMA table_info(${table.name});`, [], (err, info) => {
        if (err) console.error(err.message);
        console.log('Schema:', info.map(c => `${c.name} (${c.type})`).join(', '));
      });

      db.all(`SELECT * FROM ${table.name} LIMIT 5;`, [], (err, rows) => {
        if (err) {
          console.error(`Error reading ${table.name}:`, err.message);
          return;
        }
        console.log(`Data (First 5 rows):`);
        console.log(JSON.stringify(rows, null, 2));
      });
    });
    
    // Close the database after all operations
    setTimeout(() => {
      db.close((err) => {
        if (err) console.error(err.message);
        console.log('\nDatabase connection closed.');
      });
    }, 2000);
  });
});
