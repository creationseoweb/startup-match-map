
import { FounderUser, Industry, Skill, StartupStage, UserRole } from '@/types';

// Generate a set of mock founders for our application
export const mockFounders: FounderUser[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'founder',
    avatar: '/placeholder.svg',
    location: {
      longitude: -122.4194,
      latitude: 37.7749,
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    },
    skills: ['engineering', 'product'],
    industries: ['ai', 'software'],
    bio: 'Ex-Google engineer with 8 years of experience in ML and AI. Looking for co-founders for my AI startup focusing on healthcare diagnostics.',
    startupName: 'MediScan AI',
    startupDescription: 'Using AI to revolutionize early disease detection through medical imaging analysis.',
    startupStage: 'mvp',
    lookingFor: ['marketing', 'sales', 'finance'],
    website: 'https://mediscanai.example.com',
    linkedIn: 'sarahchen',
    twitter: 'sarahchen_ai',
    github: 'sarahchendev'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'founder',
    avatar: '/placeholder.svg',
    location: {
      longitude: -74.0060,
      latitude: 40.7128,
      city: 'New York',
      state: 'NY',
      country: 'USA'
    },
    skills: ['finance', 'operations'],
    industries: ['fintech'],
    bio: 'Former investment banker with a passion for democratizing financial services. Building a platform to help underserved communities access banking.',
    startupName: 'EquiBank',
    startupDescription: 'Banking platform designed to serve underbanked communities with fair and transparent services.',
    startupStage: 'seed',
    lookingFor: ['engineering', 'product', 'design'],
    website: 'https://equibank.example.com',
    linkedIn: 'michaelrodriguez',
    twitter: 'mrodriguez_fin'
  },
  {
    id: '3',
    name: 'Aisha Patel',
    role: 'founder',
    avatar: '/placeholder.svg',
    location: {
      longitude: -0.1278,
      latitude: 51.5074,
      city: 'London',
      country: 'UK'
    },
    skills: ['product', 'design'],
    industries: ['edtech'],
    bio: 'Product designer with a teaching background. Building an adaptive learning platform for K-12 students.',
    startupName: 'AdaptiveLearn',
    startupDescription: 'Personalized education platform that adapts to each student\'s learning style and pace.',
    startupStage: 'pre-seed',
    lookingFor: ['engineering', 'marketing', 'sales'],
    website: 'https://adaptivelearn.example.com',
    linkedIn: 'aishapatel',
    twitter: 'aisha_edtech'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'investor',
    avatar: '/placeholder.svg',
    location: {
      longitude: -118.2437,
      latitude: 34.0522,
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    },
    skills: ['finance', 'operations'],
    industries: ['software', 'ai', 'healthtech'],
    bio: 'Angel investor with exits in SaaS and healthtech. Looking to invest in early-stage startups with strong technical teams.',
    lookingFor: ['engineering', 'product'],
    linkedIn: 'davidkim',
    twitter: 'davidkim_vc'
  },
  {
    id: '5',
    name: 'Elena Kowalski',
    role: 'advisor',
    avatar: '/placeholder.svg',
    location: {
      longitude: -79.3832,
      latitude: 43.6532,
      city: 'Toronto',
      country: 'Canada'
    },
    skills: ['marketing', 'sales'],
    industries: ['ecommerce', 'software'],
    bio: 'Marketing executive with experience scaling DTC brands from zero to $100M+. Offering advisory for growth strategies.',
    lookingFor: ['product', 'operations'],
    linkedIn: 'elenakowalski',
    twitter: 'elena_marketing'
  },
  {
    id: '6',
    name: 'Carlos Mendoza',
    role: 'founder',
    avatar: '/placeholder.svg',
    location: {
      longitude: -99.1332,
      latitude: 19.4326,
      city: 'Mexico City',
      country: 'Mexico'
    },
    skills: ['engineering', 'operations'],
    industries: ['cleantech'],
    bio: 'Environmental engineer focused on developing sustainable water purification technologies for underserved regions.',
    startupName: 'AquaPura',
    startupDescription: 'Low-cost, solar-powered water purification systems for rural communities.',
    startupStage: 'mvp',
    lookingFor: ['finance', 'sales', 'marketing'],
    website: 'https://aquapura.example.com',
    linkedIn: 'carlosmendoza',
    github: 'carlosmtech'
  },
  {
    id: '7',
    name: 'Lisa Wang',
    role: 'founder',
    avatar: '/placeholder.svg',
    location: {
      longitude: 121.4737,
      latitude: 31.2304,
      city: 'Shanghai',
      country: 'China'
    },
    skills: ['product', 'design', 'marketing'],
    industries: ['ecommerce'],
    bio: 'Serial entrepreneur with previous exits in the e-commerce space. Building a platform for sustainable fashion.',
    startupName: 'GreenCloset',
    startupDescription: 'Marketplace connecting sustainable fashion brands with environmentally-conscious consumers.',
    startupStage: 'series-a',
    lookingFor: ['engineering', 'operations'],
    website: 'https://greencloset.example.com',
    linkedIn: 'lisawang',
    twitter: 'lisa_ecommerce'
  },
  {
    id: '8',
    name: 'Ahmed Hassan',
    role: 'founder',
    avatar: '/placeholder.svg',
    location: {
      longitude: 55.2708,
      latitude: 25.2048,
      city: 'Dubai',
      country: 'UAE'
    },
    skills: ['engineering', 'finance'],
    industries: ['fintech'],
    bio: 'Fintech entrepreneur building a blockchain-based payment system for cross-border transactions in emerging markets.',
    startupName: 'BorderPay',
    startupDescription: 'Blockchain payment infrastructure reducing costs and friction for international money transfers.',
    startupStage: 'seed',
    lookingFor: ['legal', 'product', 'sales'],
    website: 'https://borderpay.example.com',
    linkedIn: 'ahmedhassan',
    github: 'ahassantech'
  }
];

// Skill options with display labels
export const skillOptions: {value: Skill, label: string}[] = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'finance', label: 'Finance' },
  { value: 'operations', label: 'Operations' },
  { value: 'product', label: 'Product' },
  { value: 'data', label: 'Data Science' },
  { value: 'legal', label: 'Legal' },
  { value: 'hr', label: 'Human Resources' }
];

// Industry options with display labels
export const industryOptions: {value: Industry, label: string}[] = [
  { value: 'software', label: 'Software' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'ai', label: 'AI / Machine Learning' },
  { value: 'biotech', label: 'Biotech' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'edtech', label: 'Edtech' },
  { value: 'healthtech', label: 'Healthtech' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'cleantech', label: 'Cleantech' },
  { value: 'other', label: 'Other' }
];

// Startup stage options with display labels
export const stageOptions: {value: StartupStage, label: string}[] = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'mvp', label: 'MVP' },
  { value: 'pre-seed', label: 'Pre-seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b', label: 'Series B+' },
  { value: 'growth', label: 'Growth Stage' }
];

// Role options with display labels
export const roleOptions: {value: UserRole, label: string}[] = [
  { value: 'founder', label: 'Founder' },
  { value: 'advisor', label: 'Advisor' },
  { value: 'investor', label: 'Investor' }
];
