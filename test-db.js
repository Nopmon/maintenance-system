const db = require('./db');

async function testConnection() {
  try {
    const res = await db.query('SELECT * FROM users');
    console.log('ข้อมูลจากฐานข้อมูล:', res.rows);
  } catch (err) {
    console.error('เชื่อมต่อพลาด:', err);
  }
}

testConnection();