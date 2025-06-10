// Types for database models


export interface Commission {
  id: string;
  name: string;
  email: string;
  details: string;
  budget?: string | null;
  created_at: number;
  updated_at: number;
}
