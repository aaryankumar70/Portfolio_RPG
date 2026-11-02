export type TimeOfDay = 'morning' | 'afternoon' | 'sunset' | 'night';

export type BuildingId =
  | 'guild_hall'
  | 'library'
  | 'blacksmith'
  | 'project_bazaar'
  | 'coffee_shop'
  | 'academy'
  | 'observatory'
  | 'arena'
  | 'adventurers_inn'
  | 'royal_archive';

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
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'artifact' | 'gear' | 'tome' | 'consumable';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  icon: string;
  obtainedAt?: string;
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
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  status: 'Completed' | 'Active Development' | 'Prototype';
  featured?: boolean;
  imageAccent: string;
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
