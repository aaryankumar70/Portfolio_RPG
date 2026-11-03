export type TimeOfDay = 'morning' | 'afternoon' | 'sunset' | 'night' | 'day';

export type BuildingId =
  | 'coffee_shop'
  | 'guild_hall'
  | 'python_cave'
  | 'garden'
  | 'sql_mines'
  | 'blacksmith'
  | 'library'
  | 'home'
  | 'analytics_tower'
  | 'ml_lab'
  | 'boss_arena'
  | 'post_office';

export interface CollisionBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BuildingData {
  id: BuildingId;
  name: string;
  subtitle: string;
  district: string;
  x: number;
  y: number;
  width: number;
  height: number;
  doorX: number;
  doorY: number;
  interactionRadius: number;
  collisionBox: CollisionBox;
  iconName: string;
  themeColor: string;
  bannerColor: string;
  description: string;
}

export type PlayerAnimState = 'idle' | 'walking' | 'running' | 'interacting' | 'sitting';

export interface ActiveBuff {
  id: string;
  name: string;
  icon: string;
  description: string;
  statBonus: string;
}

export interface PlayerStats {
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  focus: number;
  maxFocus: number;
  level: number;
  xp: number;
  maxXp: number;
  careerTitle: string;
  questsCompleted: number;
  projectsBuilt: number;
  skillsUnlocked: number;
  coffeeCups: number;
}

export interface PlayerState {
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  path?: { x: number; y: number }[];
  direction: 'down' | 'up' | 'left' | 'right';
  animState: PlayerAnimState;
  isMoving: boolean;
  speed: number;
  level: number;
  xp: number;
  maxHp: number;
  hp: number;
  name: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  buildingId?: BuildingId;
  completed: boolean;
  rewardXp: number;
  progress?: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Boss';
  technologies?: string[];
  githubUrl?: string;
  demoUrl?: string;
  category?: 'Main' | 'Side' | 'Boss';
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'artifact' | 'gear' | 'tome' | 'consumable' | 'weapon';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  icon: string;
  obtainedAt?: string;
}

export interface WeaponSkill {
  id: string;
  name: string;
  type: 'Sword' | 'Hammer' | 'Staff' | 'Shield' | 'Bow';
  level: number; // percentage
  proficiency: string;
  experience: string;
  description: string;
  icon: string;
  relatedProjects: string[];
  stats: { label: string; value: string }[];
  masteryLevel?: number;
  techStack?: string;
  category?: string;
  enchantments?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI/ML' | 'Web' | 'Data' | 'Hackathon';
  badge: string;
  shortDesc: string;
  fullDesc: string;
  problem: string;
  solution: string;
  architecture?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  status: 'Completed' | 'Active Development' | 'Prototype';
  featured?: boolean;
  imageAccent: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;
  tags?: string[];
  demoUrl?: string;
  difficulty?: string;
  aiReview?: {
    strengths: string[];
    improvements: string[];
    chronicle: string;
  };
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: {
    name: string;
    level: number;
    experience: string;
    description: string;
    icon?: string;
  }[];
}

export type NPCState = 'idle' | 'walking' | 'working' | 'interacting';

export interface NPCSchedulePoint {
  x: number;
  y: number;
  state: NPCState;
  duration: number; // in seconds
  facing?: 'down' | 'up' | 'left' | 'right';
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  district: string;
  x: number;
  y: number;
  direction: 'down' | 'up' | 'left' | 'right';
  state: NPCState;
  stateTimer: number;
  scheduleIndex: number;
  schedule: NPCSchedulePoint[];
  dialog: string[];
  currentDialogIndex: number;
  icon: string;
}

export interface DepthObject {
  y: number; // base Y position for Y-sorting
  render: (ctx: CanvasRenderingContext2D) => void;
}
