import { getDbConnection } from '../dbClient';
import { randomUUID } from 'crypto';

export interface Commission {
  id: string;
  name: string;
  email: string;
  details: string;
  budget?: string | null;
  created_at: number;
  updated_at: number;
}

export class CommissionRepository {
  static create(data: Omit<Commission, 'id' | 'created_at' | 'updated_at'>): Commission {
    const db = getDbConnection();
    const id = randomUUID();
    const now = Math.floor(Date.now() / 1000);
    db.prepare(
      'INSERT INTO commissions (id, name, email, details, budget, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(id, data.name, data.email, data.details, data.budget || null, now, now);
    const commission = db.prepare('SELECT * FROM commissions WHERE id = ?').get(id) as Commission;
    db.close();
    return commission;
  }

  static findAll(): Commission[] {
    const db = getDbConnection();
    const commissions = db.prepare('SELECT * FROM commissions ORDER BY created_at DESC').all() as Commission[];
    db.close();
    return commissions;
  }
}
