import { initializeDatabase } from './dbClient';
import { CommissionRepository } from './repositories/commissionRepository';

// Initialize database on first import
initializeDatabase();

// Export repositories for use throughout the app
export {
  CommissionRepository
};

// For convenience, export types
export * from './models/types';
