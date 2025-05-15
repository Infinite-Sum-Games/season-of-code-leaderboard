// Badge Interface
export interface Badge {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  progress?: number;
  category: string;
  position: number;
  requires?: number[];
}

// Category Interface
export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Connection Interface for badge connections
export interface Connection {
  from: number;
  to: number;
  unlocked: boolean;
}

// Tier Styles Interface
export interface TierStyles {
  bronze: string;
  silver: string;
  gold: string;
  diamond: string;
}
