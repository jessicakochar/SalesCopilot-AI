// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'sales_user',
  host: 'localhost',
  database: "salesdb",
  password: "sales123",
  port: 5432,
});

export default pool; // ✅ default export