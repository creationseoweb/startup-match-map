
// Type definitions for our application

export type UserRole = 'founder' | 'advisor' | 'investor';

export type Industry = 
  | 'software' 
  | 'hardware' 
  | 'ai' 
  | 'biotech' 
  | 'fintech' 
  | 'edtech' 
  | 'healthtech' 
  | 'ecommerce'
  | 'cleantech'
  | 'other';

export type Skill = 
  | 'engineering' 
  | 'design' 
  | 'marketing' 
  | 'sales' 
  | 'finance' 
  | 'operations' 
  | 'product' 
  | 'data'
  | 'legal'
  | 'hr';

export type StartupStage = 
  | 'idea' 
  | 'mvp' 
  | 'pre-seed' 
  | 'seed' 
  | 'series-a' 
  | 'series-b' 
  | 'growth';

export interface UserLocation {
  longitude: number;
  latitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface FounderUser {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  location: UserLocation;
  skills: Skill[];
  industries: Industry[];
  bio: string;
  startupName?: string;
  startupDescription?: string;
  startupStage?: StartupStage;
  lookingFor: Skill[];
  website?: string;
  linkedIn?: string;
  twitter?: string;
  github?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  updatedAt: Date;
  unreadCount: number;
}
