import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Database file path for storing commissions
const DB_PATH = path.join(process.cwd(), 'data', 'app.db');

// Ensure data directory exists
const ensureDbDirectory = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Get database connection
export function getDbConnection() {
  ensureDbDirectory();
  return new Database(DB_PATH);
}

// Initialize database with tables if they don't exist
export function initializeDatabase() {
  const db = getDbConnection();


  // Create commissions table for service requests
  db.exec(`
    CREATE TABLE IF NOT EXISTS commissions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      details TEXT NOT NULL,
      budget TEXT,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
  `);

  db.close();
}
