// src/game/interiorConfig.ts
// Comprehensive configuration for all 12 explorable RPG building interiors

export interface InteriorFurniture {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  solid: boolean;
  collisionBox?: { x: number; y: number; w: number; h: number };
  draw: (ctx: CanvasRenderingContext2D, timer: number) => void;
}

export interface InteriorHotspot {
  id: string;
  name: string;
  prompt: string;
  x: number;
  y: number;
  radius: number;
  action: string;
  icon?: string;
}

export interface InteriorNPC {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  facing: 'down' | 'up' | 'left' | 'right';
  spritePath: string;
  dialogues: string[];
  choices?: { text: string; action: string }[];
}

export interface InteriorConfig {
  id: string;
  name: string;
  subtitle: string;
  district: string;
  themeColor: string;
  roomWidth: number;
  roomHeight: number;
  floorType: 'wood' | 'stone' | 'cave' | 'forge' | 'garden' | 'cyber';
  entrySpawn: { x: number; y: number; facing: 'up' | 'down' | 'left' | 'right' };
  exitDoor: { x: number; y: number; w: number; h: number; prompt: string };
  collisionBoxes: { x: number; y: number; w: number; h: number }[];
  furniture: InteriorFurniture[];
  hotspots: InteriorHotspot[];
  npc?: InteriorNPC;
}

// -------------------------------------------------------------------
// 1. COFFEE SHOP INTERIOR CONFIG
// -------------------------------------------------------------------
export const COFFEE_SHOP_CONFIG: InteriorConfig = {
  id: 'coffee_shop',
  name: 'Cozy Coffee Tavern',
  subtitle: 'Take a Break & Sip Fresh Roast',
  district: 'Town North-West',
  themeColor: '#eab308',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'wood',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    // Outer Walls
    { x: 0, y: 0, w: 800, h: 120 },    // North Wall
    { x: 0, y: 0, w: 50, h: 560 },     // West Wall
    { x: 750, y: 0, w: 50, h: 560 },   // East Wall
    { x: 0, y: 530, w: 350, h: 30 },   // South Wall (Left of door)
    { x: 450, y: 530, w: 350, h: 30 }, // South Wall (Right of door)

    // L-Shaped Service Counter
    { x: 260, y: 220, w: 280, h: 44 },  // Main Counter
    { x: 500, y: 150, w: 40, h: 114 },  // Counter Return

    // Dining Tables
    { x: 120, y: 320, w: 90, h: 64 },   // West Table
    { x: 590, y: 320, w: 90, h: 64 }    // East Table
  ],
  hotspots: [
    {
      id: 'barista_order',
      name: 'Barista Marco',
      prompt: 'Talk to Barista Marco',
      x: 400,
      y: 250,
      radius: 65,
      action: 'talk_barista',
      icon: 'Coffee'
    },
    {
      id: 'espresso_machine',
      name: 'Espresso Machine',
      prompt: 'Order Fresh Espresso (Coffee Lover Buff)',
      x: 320,
      y: 240,
      radius: 60,
      action: 'buy_coffee',
      icon: 'Coffee'
    },
    {
      id: 'menu_board',
      name: 'Chalkboard Menu',
      prompt: 'Read Tech Musings & Menu',
      x: 400,
      y: 130,
      radius: 70,
      action: 'inspect_menu',
      icon: 'BookOpen'
    },
    {
      id: 'table_west',
      name: 'Hearthside Table',
      prompt: 'Sit at Table & Reflect',
      x: 165,
      y: 360,
      radius: 55,
      action: 'sit_table',
      icon: 'Coffee'
    },
    {
      id: 'table_east',
      name: 'Window Table',
      prompt: 'Sit by Window',
      x: 635,
      y: 360,
      radius: 55,
      action: 'sit_table',
      icon: 'Coffee'
    },
    {
      id: 'exit_door',
      name: 'Tavern Exit',
      prompt: 'Exit to Town Square',
      x: 400,
      y: 520,
      radius: 55,
      action: 'exit_town',
      icon: 'ArrowRight'
    }
  ],
  npc: {
    id: 'barista_marco',
    name: 'Barista Marco',
    role: 'Tavern Host & Master Roaster',
    x: 400,
    y: 180,
    facing: 'down',
    spritePath: '/assets/npcs/barista_idle.png',
    dialogues: [
      'Welcome to the Cozy Coffee Tavern, Aryan! Long hours designing architectures and tuning transformers?',
      'A fresh dark roast restores focus and activates the Coffee Lover buff!',
      'Check the chalkboard on the north wall for Aryan’s latest essays on multimodal AI and rapid prototyping.'
    ],
    choices: [
      { text: 'Order Espresso (+5 Focus Buff)', action: 'buy_coffee' },
      { text: 'Read Aryan’s Tech Musings', action: 'inspect_menu' },
      { text: 'Thanks, just passing through!', action: 'close_dialogue' }
    ]
  },
  furniture: [
    // 1. Service Counter
    {
      id: 'counter',
      name: 'Oak Service Counter',
      type: 'counter',
      x: 260,
      y: 220,
      w: 280,
      h: 44,
      solid: true,
      draw: (c) => {
        // Counter drop shadow
        c.fillStyle = 'rgba(0,0,0,0.35)';
        c.fillRect(260, 260, 280, 10);
        // Polished oak counter top
        c.fillStyle = '#8b5e3c';
        c.fillRect(260, 220, 280, 16);
        c.fillStyle = '#a67c52';
        c.fillRect(262, 222, 276, 4); // glossy highlight
        // Front wood paneling
        c.fillStyle = '#5c3a21';
        c.fillRect(262, 236, 276, 28);
        for (let px = 270; px < 530; px += 24) {
          c.fillStyle = '#422814';
          c.fillRect(px, 238, 20, 24);
          c.fillStyle = '#6b4224';
          c.fillRect(px + 1, 239, 18, 22);
        }
      }
    },
    // 2. Espresso Machine
    {
      id: 'espresso_machine',
      name: 'Chrome Espresso Machine',
      type: 'appliance',
      x: 300,
      y: 195,
      w: 48,
      h: 32,
      solid: false,
      draw: (c, timer) => {
        // Chrome body
        c.fillStyle = '#94a3b8';
        c.fillRect(300, 195, 48, 28);
        c.fillStyle = '#e2e8f0';
        c.fillRect(302, 197, 44, 4); // shine
        // Brass portafilter & gauges
        c.fillStyle = '#f59e0b';
        c.fillRect(310, 212, 10, 8);
        c.fillRect(328, 212, 10, 8);
        // Animated steam puffs
        const steam = Math.sin(timer * 5) * 3;
        c.fillStyle = 'rgba(255,255,255,0.7)';
        c.fillRect(313, 185 + steam, 3, 5);
        c.fillRect(331, 183 - steam, 3, 6);
      }
    },
    // 3. Wall Chalkboard Menu
    {
      id: 'menu_board',
      name: 'Chalkboard Menu',
      type: 'wall_decor',
      x: 340,
      y: 35,
      w: 120,
      h: 60,
      solid: false,
      draw: (c) => {
        // Wooden frame
        c.fillStyle = '#78350f';
        c.fillRect(340, 35, 120, 60);
        // Slate board
        c.fillStyle = '#1e293b';
        c.fillRect(344, 39, 112, 52);
        // Golden title
        c.fillStyle = '#fde047';
        c.font = '700 7px "Press Start 2P", monospace';
        c.fillText('CAFE MENU', 362, 54);
        // White chalk items
        c.fillStyle = '#e2e8f0';
        c.font = '500 5px "Press Start 2P", monospace';
        c.fillText('• ESPRESSO  +5 FOCUS', 352, 68);
        c.fillText('• TECH ESSAYS [READ]', 352, 80);
      }
    },
    // 4. Dining Table West with Chairs
    {
      id: 'table_west',
      name: 'West Table',
      type: 'furniture',
      x: 120,
      y: 320,
      w: 90,
      h: 64,
      solid: true,
      draw: (c) => {
        // Chairs
        c.fillStyle = '#5c3a21';
        c.fillRect(100, 336, 16, 24); // West chair
        c.fillRect(214, 336, 16, 24); // East chair
        // Table surface
        c.fillStyle = '#8b5e3c';
        c.fillRect(120, 320, 90, 48);
        c.fillStyle = '#a67c52';
        c.fillRect(122, 322, 86, 4);
        c.fillStyle = '#5c3a21';
        c.fillRect(124, 354, 82, 14);
        // Coffee mug on table
        c.fillStyle = '#f8fafc';
        c.fillRect(158, 330, 8, 8);
        c.fillStyle = '#451a03';
        c.fillRect(160, 332, 4, 4);
      }
    },
    // 5. Dining Table East with Chairs
    {
      id: 'table_east',
      name: 'East Table',
      type: 'furniture',
      x: 590,
      y: 320,
      w: 90,
      h: 64,
      solid: true,
      draw: (c) => {
        // Chairs
        c.fillStyle = '#5c3a21';
        c.fillRect(570, 336, 16, 24);
        c.fillRect(684, 336, 16, 24);
        // Table surface
        c.fillStyle = '#8b5e3c';
        c.fillRect(590, 320, 90, 48);
        c.fillStyle = '#a67c52';
        c.fillRect(592, 322, 86, 4);
        c.fillStyle = '#5c3a21';
        c.fillRect(594, 354, 82, 14);
        // Potted flower center
        c.fillStyle = '#ea580c';
        c.fillRect(630, 328, 8, 8);
        c.fillStyle = '#22c55e';
        c.fillRect(632, 324, 4, 4);
      }
    },
    // 6. Tall Shelf with Coffee Jars & Mugs (North East)
    {
      id: 'coffee_shelf',
      name: 'Supply Shelf',
      type: 'furniture',
      x: 640,
      y: 80,
      w: 80,
      h: 110,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#45200c';
        c.fillRect(640, 80, 80, 110);
        for (let sy = 105; sy < 185; sy += 26) {
          c.fillStyle = '#78350f';
          c.fillRect(642, sy, 76, 4);
          // Colorful jars
          c.fillStyle = '#38bdf8';
          c.fillRect(648, sy - 14, 10, 14);
          c.fillStyle = '#f59e0b';
          c.fillRect(664, sy - 14, 12, 14);
          c.fillStyle = '#f8fafc';
          c.fillRect(682, sy - 10, 8, 10); // cup
          c.fillStyle = '#ec4899';
          c.fillRect(696, sy - 14, 10, 14);
        }
      }
    },
    // 7. Potted Fiddle-Leaf Fig Tree (North West)
    {
      id: 'potted_plant',
      name: 'Potted Ficus',
      type: 'plant',
      x: 80,
      y: 110,
      w: 36,
      h: 60,
      solid: true,
      draw: (c) => {
        // Ceramic pot
        c.fillStyle = '#b45309';
        c.fillRect(86, 145, 24, 25);
        c.fillStyle = '#d97706';
        c.fillRect(84, 142, 28, 5);
        // Lush green leaves
        c.fillStyle = '#15803d';
        c.fillRect(80, 110, 36, 34);
        c.fillStyle = '#22c55e';
        c.fillRect(84, 114, 28, 26);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 2. ARYAN'S HOME INTERIOR CONFIG
// -------------------------------------------------------------------
export const HOME_CONFIG: InteriorConfig = {
  id: 'home',
  name: "Aryan's Sanctuary",
  subtitle: 'Personal Quarters, Terminal & Achievements',
  district: 'Town South-Center',
  themeColor: '#ef4444',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'wood',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    // Outer Walls
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },

    // Bed (North West)
    { x: 80, y: 130, w: 100, h: 130 },

    // Workstation Desk & PC (North East)
    { x: 540, y: 140, w: 160, h: 80 },

    // Bookshelf (East Wall)
    { x: 670, y: 240, w: 70, h: 130 },

    // Wardrobe (West Wall)
    { x: 60, y: 280, w: 80, h: 130 },

    // Couch & Coffee Table (Center)
    { x: 300, y: 260, w: 180, h: 70 }
  ],
  hotspots: [
    {
      id: 'terminal_pc',
      name: 'Workstation Terminal',
      prompt: 'Inspect Terminal (GitHub & Active Projects)',
      x: 620,
      y: 190,
      radius: 65,
      action: 'open_github',
      icon: 'Code'
    },
    {
      id: 'bookshelf_degrees',
      name: 'Scholar Bookshelf',
      prompt: 'Read Bookshelf (Education, MCA & BCA Degrees)',
      x: 690,
      y: 310,
      radius: 65,
      action: 'open_education',
      icon: 'BookOpen'
    },
    {
      id: 'wardrobe_resume',
      name: 'Wardrobe Closet',
      prompt: 'Open Wardrobe (Resume & Career Summary)',
      x: 100,
      y: 350,
      radius: 65,
      action: 'open_resume',
      icon: 'FileText'
    },
    {
      id: 'wall_achievements',
      name: 'Achievement Corkboard',
      prompt: 'Inspect Achievements & Hackathons',
      x: 390,
      y: 110,
      radius: 65,
      action: 'open_achievements',
      icon: 'Award'
    },
    {
      id: 'bed_rest',
      name: 'Cozy Bed',
      prompt: 'Rest & Recover Energy',
      x: 130,
      y: 200,
      radius: 65,
      action: 'rest_bed',
      icon: 'Heart'
    },
    {
      id: 'home_exit',
      name: 'Front Door',
      prompt: 'Exit to Town Square',
      x: 400,
      y: 520,
      radius: 55,
      action: 'exit_town',
      icon: 'ArrowRight'
    }
  ],
  furniture: [
    // 1. Bed with Blue Quilt
    {
      id: 'bed',
      name: 'Comfortable Bed',
      type: 'furniture',
      x: 80,
      y: 130,
      w: 100,
      h: 130,
      solid: true,
      draw: (c) => {
        // Wooden headboard
        c.fillStyle = '#5c3a21';
        c.fillRect(80, 130, 100, 24);
        // Bed mattress & blue quilt
        c.fillStyle = '#1e3a8a';
        c.fillRect(84, 150, 92, 106);
        c.fillStyle = '#3b82f6';
        c.fillRect(88, 154, 84, 98);
        // Checkered pattern
        for (let qy = 160; qy < 240; qy += 18) {
          c.fillStyle = '#60a5fa';
          c.fillRect(88, qy, 84, 2);
        }
        // White Pillows
        c.fillStyle = '#f8fafc';
        c.fillRect(94, 142, 34, 18);
        c.fillRect(134, 142, 34, 18);
      }
    },
    // 2. Workstation Desk with Terminal PC
    {
      id: 'desk_pc',
      name: 'Workstation Desk',
      type: 'furniture',
      x: 540,
      y: 140,
      w: 160,
      h: 80,
      solid: true,
      draw: (c, timer) => {
        // Wooden desk surface
        c.fillStyle = '#78350f';
        c.fillRect(540, 150, 160, 50);
        c.fillStyle = '#92400e';
        c.fillRect(542, 152, 156, 4);
        // Desk drawers
        c.fillStyle = '#5c2d13';
        c.fillRect(546, 170, 36, 26);
        c.fillRect(658, 170, 36, 26);
        // CRT Terminal Monitor with glowing cyan screen
        c.fillStyle = '#1e293b';
        c.fillRect(590, 126, 46, 36);
        const glow = Math.sin(timer * 4) * 0.2 + 0.8;
        c.fillStyle = `rgba(56, 189, 248, ${glow})`;
        c.fillRect(594, 130, 38, 28);
        // Code lines on screen
        c.fillStyle = '#ffffff';
        c.fillRect(598, 135, 16, 2);
        c.fillRect(598, 140, 24, 2);
        c.fillRect(598, 145, 20, 2);
        c.fillRect(598, 150, 12, 2);
        // Keyboard
        c.fillStyle = '#334155';
        c.fillRect(596, 166, 34, 10);
      }
    },
    // 3. Tall Bookshelf with Degrees
    {
      id: 'bookshelf',
      name: 'Tall Bookshelf',
      type: 'furniture',
      x: 670,
      y: 240,
      w: 70,
      h: 130,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#45200c';
        c.fillRect(670, 240, 70, 130);
        for (let by = 265; by < 360; by += 30) {
          c.fillStyle = '#78350f';
          c.fillRect(672, by, 66, 4);
          // Colorful books
          c.fillStyle = '#dc2626';
          c.fillRect(676, by - 20, 8, 20);
          c.fillStyle = '#2563eb';
          c.fillRect(686, by - 22, 10, 22);
          c.fillStyle = '#eab308';
          c.fillRect(698, by - 18, 8, 18);
          c.fillStyle = '#16a34a';
          c.fillRect(708, by - 22, 10, 22);
          c.fillStyle = '#9333ea';
          c.fillRect(720, by - 19, 8, 19);
        }
      }
    },
    // 4. Wardrobe Closet
    {
      id: 'wardrobe',
      name: 'Oak Wardrobe',
      type: 'furniture',
      x: 60,
      y: 280,
      w: 80,
      h: 130,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#3d1c06';
        c.fillRect(60, 280, 80, 130);
        c.fillStyle = '#5c2d13';
        c.fillRect(64, 284, 34, 120);
        c.fillRect(102, 284, 34, 120);
        // Brass handles
        c.fillStyle = '#f59e0b';
        c.fillRect(94, 340, 3, 8);
        c.fillRect(103, 340, 3, 8);
      }
    },
    // 5. Living Room Couch & Persian Rug
    {
      id: 'living_couch',
      name: 'Leather Couch',
      type: 'furniture',
      x: 300,
      y: 260,
      w: 180,
      h: 70,
      solid: true,
      draw: (c) => {
        // Persian rug under table
        c.fillStyle = '#7f1d1d';
        c.fillRect(280, 280, 220, 80);
        c.strokeStyle = '#facc15';
        c.lineWidth = 2;
        c.strokeRect(284, 284, 212, 72);
        // Navy blue sofa
        c.fillStyle = '#1e3a8a';
        c.fillRect(300, 250, 180, 48);
        c.fillStyle = '#2563eb';
        c.fillRect(304, 254, 172, 38);
        // Cushions
        c.fillStyle = '#1d4ed8';
        c.fillRect(310, 260, 50, 26);
        c.fillRect(365, 260, 50, 26);
        c.fillRect(420, 260, 50, 26);
      }
    },
    // 6. Corkboard with Achievement Certificates (North Wall)
    {
      id: 'corkboard',
      name: 'Achievement Board',
      type: 'wall_decor',
      x: 340,
      y: 35,
      w: 120,
      h: 55,
      solid: false,
      draw: (c) => {
        c.fillStyle = '#78350f';
        c.fillRect(340, 35, 120, 55);
        c.fillStyle = '#d4a373';
        c.fillRect(344, 39, 112, 47);
        // Pinned Certificates
        c.fillStyle = '#f8fafc';
        c.fillRect(350, 44, 28, 20); // Hackathon Winner
        c.fillStyle = '#ef4444';
        c.fillRect(362, 42, 4, 4); // red pin
        c.fillStyle = '#eab308';
        c.fillRect(354, 48, 20, 2);

        c.fillStyle = '#f8fafc';
        c.fillRect(386, 44, 32, 22); // Degree
        c.fillStyle = '#3b82f6';
        c.fillRect(400, 42, 4, 4); // blue pin

        c.fillStyle = '#f8fafc';
        c.fillRect(426, 46, 24, 18);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 3. PYTHON CAVE INTERIOR CONFIG
// -------------------------------------------------------------------
export const PYTHON_CAVE_CONFIG: InteriorConfig = {
  id: 'python_cave',
  name: "Python Sorcerer's Grotto",
  subtitle: 'Cavern of Asynchronous Automation & Data Sorcery',
  district: 'Town North-East',
  themeColor: '#38bdf8',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'cave',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },

    // Central Altar & Python Totem
    { x: 340, y: 160, w: 120, h: 70 },

    // Research Spell Desk (West)
    { x: 120, y: 240, w: 140, h: 70 },

    // Giant Crystal Formations (East)
    { x: 580, y: 180, w: 120, h: 120 }
  ],
  hotspots: [
    {
      id: 'cave_sage',
      name: 'Cave Sage Aldous',
      prompt: 'Consult Cave Sage Aldous',
      x: 400,
      y: 190,
      radius: 65,
      action: 'talk_sage',
      icon: 'Sparkles'
    },
    {
      id: 'altar_python',
      name: 'Altar of Python',
      prompt: 'Inspect Python Libraries & Microservices',
      x: 400,
      y: 240,
      radius: 65,
      action: 'open_python_libs',
      icon: 'Code'
    },
    {
      id: 'research_desk',
      name: 'Sorcerer Research Desk',
      prompt: 'Inspect Automation Scripts & FastAPI Pipelines',
      x: 190,
      y: 280,
      radius: 65,
      action: 'open_python_scripts',
      icon: 'BookOpen'
    },
    {
      id: 'crystals_cluster',
      name: 'Resonant Azure Crystals',
      prompt: 'Attune to Data Embeddings & PyTorch Weights',
      x: 640,
      y: 250,
      radius: 65,
      action: 'open_python_ml',
      icon: 'Sparkles'
    },
    {
      id: 'cave_exit',
      name: 'Cavern Exit',
      prompt: 'Return to Overworld',
      x: 400,
      y: 520,
      radius: 55,
      action: 'exit_town',
      icon: 'ArrowRight'
    }
  ],
  npc: {
    id: 'cave_sage_aldous',
    name: 'Cave Sage Aldous',
    role: 'Python Sorcerer & Grand Archivist',
    x: 400,
    y: 150,
    facing: 'down',
    spritePath: '/assets/npcs/sage.png',
    dialogues: [
      'Python is a language of elegance and power. In this grotto, code flows like underground rivers.',
      'Aryan wields asynchronous FastAPI microservices and NumPy vectorization like high-tier incantations.',
      'Touch the glowing crystals on the altar to inspect Aryan’s automated pipelines and algorithmic repositories!'
    ],
    choices: [
      { text: 'Inspect Python Microservices', action: 'open_python_libs' },
      { text: 'Read Automation Scripts', action: 'open_python_scripts' },
      { text: 'Farewell, Sage Aldous', action: 'close_dialogue' }
    ]
  },
  furniture: [
    // 1. Central Altar with Giant Python Emblem
    {
      id: 'altar',
      name: 'Stone Altar',
      type: 'altar',
      x: 340,
      y: 160,
      w: 120,
      h: 70,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#1e293b';
        c.fillRect(340, 160, 120, 70);
        c.fillStyle = '#334155';
        c.fillRect(342, 162, 116, 12);
        // Python Emblem in Stone
        c.fillStyle = '#38bdf8';
        c.fillRect(386, 185, 14, 18);
        c.fillStyle = '#facc15';
        c.fillRect(400, 195, 14, 18);
      }
    },
    // 2. Giant Blue Crystals (East)
    {
      id: 'crystals',
      name: 'Crystal Spire',
      type: 'crystals',
      x: 580,
      y: 180,
      w: 120,
      h: 120,
      solid: true,
      draw: (c, timer) => {
        const pulse = Math.sin(timer * 4) * 3;
        c.fillStyle = '#0284c7';
        c.fillRect(620, 180, 24, 90);
        c.fillStyle = '#38bdf8';
        c.fillRect(624, 184 + pulse, 16, 80);
        c.fillStyle = '#e0f2fe';
        c.fillRect(628, 190, 8, 60);

        // Side crystals
        c.fillStyle = '#0369a1';
        c.fillRect(590, 210, 18, 60);
        c.fillStyle = '#38bdf8';
        c.fillRect(594, 214, 10, 50);

        c.fillStyle = '#0369a1';
        c.fillRect(655, 205, 20, 65);
        c.fillStyle = '#7dd3fc';
        c.fillRect(659, 210, 12, 55);
      }
    },
    // 3. Research Table with Open Grimoire
    {
      id: 'research_table',
      name: 'Research Table',
      type: 'furniture',
      x: 120,
      y: 240,
      w: 140,
      h: 70,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#3b1d08';
        c.fillRect(120, 240, 140, 70);
        c.fillStyle = '#5c2d13';
        c.fillRect(124, 244, 132, 10);
        // Open Grimoire
        c.fillStyle = '#f8fafc';
        c.fillRect(150, 255, 36, 24);
        c.fillStyle = '#334155';
        c.fillRect(167, 255, 2, 24);
        // Glowing magic flask
        c.fillStyle = '#38bdf8';
        c.fillRect(210, 252, 12, 18);
        c.fillStyle = '#ffffff';
        c.fillRect(212, 254, 4, 4);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 4. SQL MINES INTERIOR CONFIG
// -------------------------------------------------------------------
export const SQL_MINES_CONFIG: InteriorConfig = {
  id: 'sql_mines',
  name: 'SQL Relational Mines',
  subtitle: 'Subterranean Relational Schemas & Mining Blueprints',
  district: 'Town East',
  themeColor: '#f59e0b',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'cave',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },

    // Mining Railcart & Gold Crystals (Center)
    { x: 340, y: 220, w: 120, h: 70 },

    // Schema Blueprint Table (West)
    { x: 120, y: 220, w: 140, h: 70 },

    // Dynamite Crate & Tool Rack (East)
    { x: 590, y: 220, w: 100, h: 70 }
  ],
  hotspots: [
    {
      id: 'foreman_npc',
      name: 'Foreman Ironclad',
      prompt: 'Talk to Foreman Ironclad',
      x: 400,
      y: 190,
      radius: 65,
      action: 'talk_foreman',
      icon: 'Hammer'
    },
    {
      id: 'minecart_schemas',
      name: 'Ore Cart of Schemas',
      prompt: 'Inspect Relational Databases & Indexing',
      x: 400,
      y: 260,
      radius: 65,
      action: 'open_sql_schemas',
      icon: 'Database'
    },
    {
      id: 'blueprint_table',
      name: 'Database Architecture Table',
      prompt: 'Inspect Window Functions & Complex Queries',
      x: 190,
      y: 260,
      radius: 65,
      action: 'open_sql_queries',
      icon: 'BookOpen'
    },
    {
      id: 'sql_exit',
      name: 'Mine Shaft Exit',
      prompt: 'Exit to Town Square',
      x: 400,
      y: 520,
      radius: 55,
      action: 'exit_town',
      icon: 'ArrowRight'
    }
  ],
  npc: {
    id: 'foreman_ironclad',
    name: 'Foreman Ironclad',
    role: 'Chief Relational Engineer',
    x: 400,
    y: 150,
    facing: 'down',
    spritePath: '/assets/npcs/foreman.png',
    dialogues: [
      'Mind the tracks, traveler! We quarry raw relational data and sub-second execution plans down here.',
      'Aryan crafts clean SQL schemas with third-normal-form integrity and optimized b-tree indexes.',
      'Check the blueprint table on the west side for performance benchmarks and recursive query structures!'
    ],
    choices: [
      { text: 'Inspect Relational Schemas', action: 'open_sql_schemas' },
      { text: 'View Complex Query Blueprints', action: 'open_sql_queries' },
      { text: 'Watch your step, Foreman!', action: 'close_dialogue' }
    ]
  },
  furniture: [
    // 1. Minecart with Golden Ore
    {
      id: 'minecart',
      name: 'Loaded Minecart',
      type: 'minecart',
      x: 340,
      y: 220,
      w: 120,
      h: 70,
      solid: true,
      draw: (c) => {
        // Wooden ties & tracks
        c.fillStyle = '#451a03';
        c.fillRect(320, 270, 160, 4);
        c.fillRect(320, 280, 160, 4);
        // Cart box
        c.fillStyle = '#78350f';
        c.fillRect(340, 220, 120, 50);
        c.strokeStyle = '#291407';
        c.lineWidth = 2;
        c.strokeRect(340, 220, 120, 50);
        // Golden Ore inside
        c.fillStyle = '#facc15';
        c.fillRect(350, 210, 30, 20);
        c.fillRect(385, 205, 35, 25);
        c.fillRect(425, 212, 25, 18);
        c.fillStyle = '#fef08a';
        c.fillRect(354, 212, 10, 8);
        c.fillRect(390, 208, 14, 10);
      }
    },
    // 2. Blueprint Drafting Table
    {
      id: 'blueprint_table',
      name: 'Drafting Table',
      type: 'furniture',
      x: 120,
      y: 220,
      w: 140,
      h: 70,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#5c2d13';
        c.fillRect(120, 220, 140, 70);
        // Cyan Blueprint on table
        c.fillStyle = '#0284c7';
        c.fillRect(130, 230, 120, 50);
        c.fillStyle = '#38bdf8';
        c.fillRect(132, 232, 116, 2);
        // Schema relation lines
        c.fillStyle = '#ffffff';
        c.fillRect(140, 240, 28, 14);
        c.fillRect(180, 245, 30, 14);
        c.fillRect(220, 240, 24, 14);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 5. BLACKSMITH INTERIOR CONFIG
// -------------------------------------------------------------------
export const BLACKSMITH_CONFIG: InteriorConfig = {
  id: 'blacksmith',
  name: "Torvald's Armory & Forge",
  subtitle: 'Technical Skills Tempered as RPG Weapons & Gear',
  district: 'Crafting District',
  themeColor: '#f97316',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'forge',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },

    // Forge Furnace (North Center)
    { x: 320, y: 120, w: 160, h: 100 },

    // Anvil (Center)
    { x: 370, y: 260, w: 60, h: 40 },

    // Weapon Display Racks (West Wall)
    { x: 70, y: 180, w: 80, h: 140 },

    // Water Quench Trough & Tool Bins (East Wall)
    { x: 630, y: 200, w: 100, h: 80 }
  ],
  hotspots: [
    {
      id: 'blacksmith_torvald',
      name: 'Blacksmith Torvald',
      prompt: 'Talk to Blacksmith Torvald',
      x: 340,
      y: 200,
      radius: 65,
      action: 'talk_smith',
      icon: 'Hammer'
    },
    {
      id: 'forge_anvil',
      name: 'Legendary Anvil',
      prompt: 'Strike Anvil (Hammer Resonance)',
      x: 400,
      y: 280,
      radius: 65,
      action: 'strike_anvil',
      icon: 'Flame'
    },
    {
      id: 'weapon_racks',
      name: 'Weapon Mastery Racks',
      prompt: 'Inspect Technical Weapons (Skills & Mastery)',
      x: 110,
      y: 250,
      radius: 70,
      action: 'open_weapons',
      icon: 'Sword'
    },
    {
      id: 'blacksmith_exit',
      name: 'Forge Exit',
      prompt: 'Exit to Town Square',
      x: 400,
      y: 520,
      radius: 55,
      action: 'exit_town',
      icon: 'ArrowRight'
    }
  ],
  npc: {
    id: 'blacksmith_torvald',
    name: 'Blacksmith Torvald',
    role: 'Master Weaponsmith & Armorer',
    x: 340,
    y: 170,
    facing: 'down',
    spritePath: '/assets/npcs/blacksmith.png',
    dialogues: [
      'The anvil never lies! Every skill Aryan claims has been tempered in production fires.',
      'Inspect the weapon racks on the west wall. The Python Greatsword, SQL War Hammer, and Docker Shield await inspection.',
      'Give the anvil a strike! Hear the sound of genuine craftsmanship.'
    ],
    choices: [
      { text: 'Inspect Weapon Skills Arsenal', action: 'open_weapons' },
      { text: 'Strike the Anvil!', action: 'strike_anvil' },
      { text: 'Keep the fire hot, Torvald!', action: 'close_dialogue' }
    ]
  },
  furniture: [
    // 1. Massive Stone Forge Hearth
    {
      id: 'forge_furnace',
      name: 'Roaring Forge',
      type: 'furnace',
      x: 320,
      y: 120,
      w: 160,
      h: 100,
      solid: true,
      draw: (c, timer) => {
        // Stone chimney structure
        c.fillStyle = '#334155';
        c.fillRect(320, 120, 160, 100);
        c.fillStyle = '#475569';
        c.fillRect(324, 124, 152, 20);
        // Roaring hearth flame
        c.fillStyle = '#0f172a';
        c.fillRect(350, 160, 100, 60);
        const flicker = Math.sin(timer * 8) * 4;
        c.fillStyle = '#dc2626';
        c.fillRect(355, 175 + flicker, 90, 45 - flicker);
        c.fillStyle = '#f97316';
        c.fillRect(365, 185 + flicker, 70, 35 - flicker);
        c.fillStyle = '#fde047';
        c.fillRect(380, 195, 40, 25);
      }
    },
    // 2. Anvil on Stump
    {
      id: 'anvil',
      name: 'Master Anvil',
      type: 'anvil',
      x: 370,
      y: 260,
      w: 60,
      h: 40,
      solid: true,
      draw: (c) => {
        // Stump
        c.fillStyle = '#78350f';
        c.fillRect(380, 275, 40, 25);
        // Steel Anvil Horn
        c.fillStyle = '#1c1917';
        c.fillRect(370, 260, 60, 16);
        c.fillStyle = '#475569';
        c.fillRect(372, 262, 56, 4);
      }
    },
    // 3. Weapon Racks
    {
      id: 'weapon_rack',
      name: 'Armory Rack',
      type: 'rack',
      x: 70,
      y: 180,
      w: 80,
      h: 140,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#451a03';
        c.fillRect(70, 180, 80, 140);
        // Python Sword (Glowing Cyan Blade)
        c.fillStyle = '#38bdf8';
        c.fillRect(85, 195, 6, 80);
        c.fillStyle = '#f59e0b';
        c.fillRect(80, 275, 16, 4); // crossguard
        // SQL Hammer (Heavy Iron Head)
        c.fillStyle = '#78350f';
        c.fillRect(115, 195, 6, 85);
        c.fillStyle = '#64748b';
        c.fillRect(105, 195, 26, 16);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 6. GUILD HALL INTERIOR CONFIG
// -------------------------------------------------------------------
export const GUILD_HALL_CONFIG: InteriorConfig = {
  id: 'guild_hall',
  name: 'Adventurers Guild Hall',
  subtitle: 'Inspect Active Quests & Heroic Bounties',
  district: 'Town North-Center',
  themeColor: '#a855f7',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'wood',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },    // North Wall
    { x: 0, y: 0, w: 50, h: 560 },     // West Wall
    { x: 750, y: 0, w: 50, h: 560 },   // East Wall
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },
    // Noticeboard
    { x: 330, y: 110, w: 140, h: 50 },
    // Fireplace & Hearth
    { x: 620, y: 110, w: 120, h: 70 },
    // Feast Table
    { x: 260, y: 310, w: 280, h: 60 }
  ],
  hotspots: [
    {
      id: 'quest_board',
      name: 'Guild Noticeboard',
      prompt: 'Inspect Active Quests & Bounties',
      x: 400,
      y: 160,
      radius: 65,
      action: 'inspect_quests',
      icon: 'Shield'
    },
    {
      id: 'guild_hearth',
      name: 'Roaring Hearth',
      prompt: 'Warm Hands at Hearth',
      x: 680,
      y: 180,
      radius: 60,
      action: 'warm_hearth',
      icon: 'Flame'
    },
    {
      id: 'guild_master_talk',
      name: 'Guild Master Alden',
      prompt: 'Talk to Guild Master Alden',
      x: 180,
      y: 220,
      radius: 65,
      action: 'talk_guildmaster',
      icon: 'Award'
    }
  ],
  npc: {
    id: 'npc_guildmaster',
    name: 'Guild Master Alden',
    role: 'Quests Marshall',
    x: 180,
    y: 200,
    facing: 'down',
    spritePath: 'characters/npc_mage.png',
    dialogues: [
      'Welcome to the Grand Adventurers Guild, Aryan!',
      'Our board is pinned with bounties: from analyzing enterprise sales data to conquering multimodal neural architectures.',
      'Complete quests to gain XP, unlock new titles, and level up your career stats!'
    ],
    choices: [
      { text: 'View Available Quests', action: 'inspect_quests' },
      { text: 'Warm hands by the fire', action: 'warm_hearth' }
    ]
  },
  furniture: [
    // 1. Grand Quest Noticeboard
    {
      id: 'noticeboard',
      name: 'Bounty Board',
      type: 'board',
      x: 320,
      y: 110,
      w: 160,
      h: 56,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#78350f';
        c.fillRect(320, 110, 160, 56);
        c.fillStyle = '#ca8a04';
        c.fillRect(326, 114, 148, 48);
        // Parchment Quest Notices
        c.fillStyle = '#fef08a';
        c.fillRect(334, 120, 26, 20);
        c.fillRect(370, 122, 28, 22);
        c.fillRect(408, 118, 24, 24);
        c.fillRect(442, 122, 22, 18);
        // Heraldic purple header ribbon
        c.fillStyle = '#7e22ce';
        c.fillRect(330, 106, 140, 8);
      }
    },
    // 2. Roaring Fireplace
    {
      id: 'fireplace',
      name: 'Guild Hearth',
      type: 'hearth',
      x: 620,
      y: 110,
      w: 120,
      h: 70,
      solid: true,
      draw: (c, timer) => {
        c.fillStyle = '#334155';
        c.fillRect(620, 110, 120, 70);
        c.fillStyle = '#0f172a';
        c.fillRect(640, 135, 80, 45);
        const flicker = Math.sin(timer * 7) * 3;
        c.fillStyle = '#dc2626';
        c.fillRect(648, 145 + flicker, 64, 35 - flicker);
        c.fillStyle = '#f97316';
        c.fillRect(656, 153 + flicker, 48, 27 - flicker);
        c.fillStyle = '#fde047';
        c.fillRect(668, 162, 24, 18);
      }
    },
    // 3. Feast Table with Benches
    {
      id: 'feast_table',
      name: 'Guild Dining Table',
      type: 'table',
      x: 260,
      y: 310,
      w: 280,
      h: 60,
      solid: true,
      draw: (c) => {
        // Table top
        c.fillStyle = '#78350f';
        c.fillRect(260, 310, 280, 60);
        c.fillStyle = '#92400e';
        c.fillRect(264, 314, 272, 52);
        // Purple velvet table runner
        c.fillStyle = '#7e22ce';
        c.fillRect(260, 332, 280, 16);
        c.fillStyle = '#fbbf24';
        c.fillRect(260, 332, 280, 2);
        c.fillRect(260, 346, 280, 2);
        // Tankards
        c.fillStyle = '#ca8a04';
        c.fillRect(300, 320, 8, 10);
        c.fillRect(480, 320, 8, 10);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 7. LIBRARY INTERIOR CONFIG
// -------------------------------------------------------------------
export const LIBRARY_CONFIG: InteriorConfig = {
  id: 'library',
  name: 'Arcane Grand Library',
  subtitle: 'Degrees, Research Publications & Certifications',
  district: 'Knowledge District',
  themeColor: '#3b82f6',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'wood',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },
    // Center Academic Pedestal
    { x: 340, y: 130, w: 120, h: 50 },
    // Bookshelves East & West
    { x: 70, y: 120, w: 110, h: 140 },
    { x: 620, y: 120, w: 110, h: 140 },
    // Study Table
    { x: 300, y: 310, w: 200, h: 64 }
  ],
  hotspots: [
    {
      id: 'degree_pedestal',
      name: 'Degree Scrolls (MCA & BCA)',
      prompt: 'Inspect Academic Degrees',
      x: 400,
      y: 160,
      radius: 65,
      action: 'inspect_education',
      icon: 'BookOpen'
    },
    {
      id: 'cert_archive',
      name: 'Certifications Showcase',
      prompt: 'Inspect Verified Certifications',
      x: 650,
      y: 220,
      radius: 65,
      action: 'inspect_certifications',
      icon: 'Award'
    },
    {
      id: 'talk_librarian',
      name: 'High Scholar Elenora',
      prompt: 'Talk to High Scholar Elenora',
      x: 180,
      y: 220,
      radius: 65,
      action: 'talk_librarian',
      icon: 'User'
    }
  ],
  npc: {
    id: 'npc_librarian',
    name: 'High Scholar Elenora',
    role: 'Grand Archivist',
    x: 180,
    y: 200,
    facing: 'down',
    spritePath: 'characters/npc_mage.png',
    dialogues: [
      'Silence and focus, traveler. You stand within the repository of Aryan’s academic journey.',
      'Here rest his MCA in Data Science and BCA in Software Engineering from Apex University, with an 8.8 CGPA.',
      'Inspect the illuminated manuscripts on the center pedestals to verify his credentials.'
    ],
    choices: [
      { text: 'View Academic Degrees', action: 'inspect_education' },
      { text: 'Inspect Certifications', action: 'inspect_certifications' }
    ]
  },
  furniture: [
    // 1. Academic Pedestal
    {
      id: 'degree_pedestal',
      name: 'Degree Dais',
      type: 'pedestal',
      x: 340,
      y: 130,
      w: 120,
      h: 50,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#334155';
        c.fillRect(340, 130, 120, 50);
        c.fillStyle = '#1e3a8a';
        c.fillRect(344, 134, 112, 42);
        // Two Gold Degree Rolls with Wax Seals
        c.fillStyle = '#fef08a';
        c.fillRect(355, 142, 38, 12);
        c.fillRect(405, 142, 38, 12);
        c.fillStyle = '#dc2626';
        c.fillRect(370, 145, 6, 6);
        c.fillRect(420, 145, 6, 6);
      }
    },
    // 2. West Bookshelf
    {
      id: 'bookshelf_west',
      name: 'Archive Shelf I',
      type: 'shelf',
      x: 70,
      y: 120,
      w: 110,
      h: 140,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#451a03';
        c.fillRect(70, 120, 110, 140);
        c.fillStyle = '#78350f';
        for (let sy = 135; sy < 250; sy += 32) {
          c.fillRect(74, sy, 102, 6);
          // Books
          const bColors = ['#1d4ed8', '#047857', '#b91c1c', '#d97706'];
          for (let bx = 78; bx < 170; bx += 9) {
            c.fillStyle = bColors[(bx + sy) % bColors.length];
            c.fillRect(bx, sy - 20, 7, 20);
          }
        }
      }
    },
    // 3. East Bookshelf
    {
      id: 'bookshelf_east',
      name: 'Archive Shelf II',
      type: 'shelf',
      x: 620,
      y: 120,
      w: 110,
      h: 140,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#451a03';
        c.fillRect(620, 120, 110, 140);
        c.fillStyle = '#78350f';
        for (let sy = 135; sy < 250; sy += 32) {
          c.fillRect(624, sy, 102, 6);
          const bColors = ['#7e22ce', '#0369a1', '#c2410c', '#15803d'];
          for (let bx = 628; bx < 720; bx += 9) {
            c.fillStyle = bColors[(bx + sy) % bColors.length];
            c.fillRect(bx, sy - 20, 7, 20);
          }
        }
      }
    },
    // 4. Study Reading Table with Green Banker Lamp
    {
      id: 'study_table',
      name: 'Scholar Table',
      type: 'table',
      x: 300,
      y: 310,
      w: 200,
      h: 64,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#542d15';
        c.fillRect(300, 310, 200, 64);
        c.fillStyle = '#6b3e1b';
        c.fillRect(304, 314, 192, 56);
        // Green Banker Lamp
        c.fillStyle = '#15803d';
        c.fillRect(390, 318, 20, 8);
        c.fillStyle = '#fef08a';
        c.fillRect(392, 326, 16, 4);
        c.fillStyle = '#b45309';
        c.fillRect(398, 330, 4, 10);
        // Open Manuscript
        c.fillStyle = '#fef3c7';
        c.fillRect(330, 326, 34, 22);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 8. ANALYTICS TOWER INTERIOR CONFIG
// -------------------------------------------------------------------
export const ANALYTICS_TOWER_CONFIG: InteriorConfig = {
  id: 'analytics_tower',
  name: 'Telemetry Spire Observatory',
  subtitle: 'Real-time Business Intelligence & Forecasting',
  district: 'Analytics District',
  themeColor: '#06b6d4',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'cyber',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },
    // Central Holographic Projector
    { x: 340, y: 150, w: 120, h: 60 },
    // Telemetry Server Racks
    { x: 630, y: 160, w: 100, h: 120 },
    // Executive DAX Console
    { x: 280, y: 310, w: 240, h: 60 }
  ],
  hotspots: [
    {
      id: 'telemetry_console',
      name: 'Holographic BI Core',
      prompt: 'Inspect Live Telemetry & BI Dashboard',
      x: 400,
      y: 190,
      radius: 70,
      action: 'inspect_telemetry',
      icon: 'BarChart2'
    },
    {
      id: 'dax_terminal',
      name: 'Executive DAX Console',
      prompt: 'Examine Data Warehouse & DirectQuery',
      x: 400,
      y: 330,
      radius: 65,
      action: 'inspect_etl',
      icon: 'Database'
    },
    {
      id: 'talk_cynthia',
      name: 'Data Archon Cynthia',
      prompt: 'Talk to Data Archon Cynthia',
      x: 180,
      y: 220,
      radius: 65,
      action: 'talk_cynthia',
      icon: 'Cpu'
    }
  ],
  npc: {
    id: 'npc_cynthia',
    name: 'Data Archon Cynthia',
    role: 'Lead Telemetry Specialist',
    x: 180,
    y: 200,
    facing: 'down',
    spritePath: 'characters/npc_mage.png',
    dialogues: [
      'Welcome to the Spire. We monitor transactional streams and model predictive horizons.',
      'Aryan’s Sales Analytics pipeline synthesizes 500K+ transactional events with sub-second DAX measures.',
      'Gaze into the central holographic projector to inspect the live executive dashboards.'
    ],
    choices: [
      { text: 'Inspect Live Telemetry Dashboard', action: 'inspect_telemetry' },
      { text: 'View ETL Architecture', action: 'inspect_etl' }
    ]
  },
  furniture: [
    // 1. Central Holographic Projector
    {
      id: 'holo_projector',
      name: 'Hologram Core',
      type: 'projector',
      x: 340,
      y: 150,
      w: 120,
      h: 60,
      solid: true,
      draw: (c, timer) => {
        // Base
        c.fillStyle = '#1e293b';
        c.fillRect(340, 180, 120, 30);
        c.strokeStyle = '#06b6d4';
        c.lineWidth = 2;
        c.strokeRect(340, 180, 120, 30);
        // Holographic Beam
        const beamAlpha = 0.25 + Math.sin(timer * 4) * 0.1;
        c.fillStyle = `rgba(6, 182, 212, ${beamAlpha})`;
        c.beginPath();
        c.moveTo(350, 180);
        c.lineTo(400, 110);
        c.lineTo(450, 180);
        c.closePath();
        c.fill();
        // Floating 3D Bar Chart
        c.fillStyle = '#38bdf8';
        c.fillRect(380, 130, 8, 30);
        c.fillStyle = '#06b6d4';
        c.fillRect(392, 120, 8, 40);
        c.fillStyle = '#67e8f9';
        c.fillRect(404, 115, 8, 45);
        c.fillStyle = '#0284c7';
        c.fillRect(416, 135, 8, 25);
      }
    },
    // 2. Telemetry Server Racks
    {
      id: 'server_racks',
      name: 'Data Racks',
      type: 'rack',
      x: 630,
      y: 160,
      w: 100,
      h: 120,
      solid: true,
      draw: (c, timer) => {
        c.fillStyle = '#0f172a';
        c.fillRect(630, 160, 100, 120);
        c.strokeStyle = '#334155';
        c.lineWidth = 2;
        c.strokeRect(630, 160, 100, 120);
        // Blinking indicator LEDs
        for (let ry = 175; ry < 270; ry += 18) {
          c.fillStyle = '#1e293b';
          c.fillRect(638, ry, 84, 12);
          c.fillStyle = Math.sin(timer * 6 + ry) > 0 ? '#10b981' : '#06b6d4';
          c.fillRect(644, ry + 4, 4, 4);
          c.fillRect(652, ry + 4, 4, 4);
        }
      }
    },
    // 3. Executive DAX Console
    {
      id: 'dax_console',
      name: 'Executive Console',
      type: 'console',
      x: 280,
      y: 310,
      w: 240,
      h: 60,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#0f172a';
        c.fillRect(280, 310, 240, 60);
        c.strokeStyle = '#0891b2';
        c.lineWidth = 2;
        c.strokeRect(280, 310, 240, 60);
        // Glowing Neon Screen
        c.fillStyle = '#0284c7';
        c.fillRect(300, 320, 200, 25);
        c.fillStyle = '#f8fafc';
        c.font = '700 7px "Press Start 2P", monospace';
        c.textAlign = 'center';
        c.fillText('POWER BI // DIRECTQUERY', 400, 336);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 9. ML LABORATORY INTERIOR CONFIG
// -------------------------------------------------------------------
export const ML_LAB_CONFIG: InteriorConfig = {
  id: 'ml_lab',
  name: 'Cyber Neural Laboratory',
  subtitle: 'Transformers, CLIP & Acoustic Deep Learning',
  district: 'Science District',
  themeColor: '#ec4899',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'cyber',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },
    // Cryo-Chamber Neural Core
    { x: 350, y: 130, w: 100, h: 70 },
    // GPU Supercluster
    { x: 620, y: 140, w: 110, h: 120 },
    // Transformer Chalkboard
    { x: 80, y: 130, w: 120, h: 60 },
    // Research Workbench
    { x: 280, y: 310, w: 240, h: 60 }
  ],
  hotspots: [
    {
      id: 'neural_core',
      name: 'Neural Embedding Matrix',
      prompt: 'Inspect Multimodal Transformer Architecture',
      x: 400,
      y: 170,
      radius: 65,
      action: 'inspect_ml_models',
      icon: 'Cpu'
    },
    {
      id: 'gpu_supercluster',
      name: 'PyTorch Supercluster',
      prompt: 'Examine GPU Training Pipeline',
      x: 670,
      y: 200,
      radius: 65,
      action: 'inspect_gpu',
      icon: 'Sparkles'
    },
    {
      id: 'talk_drtensor',
      name: 'Dr. Tensor',
      prompt: 'Talk to Dr. Tensor',
      x: 230,
      y: 220,
      radius: 65,
      action: 'talk_drtensor',
      icon: 'User'
    }
  ],
  npc: {
    id: 'npc_drtensor',
    name: 'Dr. Tensor',
    role: 'Chief AI Researcher',
    x: 230,
    y: 200,
    facing: 'down',
    spritePath: 'characters/npc_mage.png',
    dialogues: [
      'Ah, an inquisitive mind! You’ve entered the heart of Aryan’s deep learning laboratory.',
      'Here we train vision-language models like OpenAI CLIP for zero-shot image search and acoustic RoBERTa transformers for mental health biomarkers.',
      'Every weight tensor in this room is calibrated for low latency and mathematical precision.'
    ],
    choices: [
      { text: 'Inspect Neural Embedding Models', action: 'inspect_ml_models' },
      { text: 'Review ONNX Inference Benchmarks', action: 'inspect_gpu' }
    ]
  },
  furniture: [
    // 1. Cryo-Chamber Neural Core
    {
      id: 'neural_core_pod',
      name: 'Neural Pod',
      type: 'core',
      x: 350,
      y: 130,
      w: 100,
      h: 70,
      solid: true,
      draw: (c, timer) => {
        c.fillStyle = '#0f172a';
        c.fillRect(350, 130, 100, 70);
        c.strokeStyle = '#db2777';
        c.lineWidth = 2;
        c.strokeRect(350, 130, 100, 70);
        // Swirling plasma
        const pulse = 0.5 + Math.sin(timer * 5) * 0.3;
        c.fillStyle = `rgba(236, 72, 153, ${pulse})`;
        c.fillRect(358, 138, 84, 54);
        c.fillStyle = '#fbcfe8';
        c.beginPath();
        c.arc(400, 165, 14, 0, Math.PI * 2);
        c.fill();
      }
    },
    // 2. GPU Supercluster
    {
      id: 'gpu_cluster',
      name: 'GPU Cluster',
      type: 'cluster',
      x: 620,
      y: 140,
      w: 110,
      h: 120,
      solid: true,
      draw: (c, timer) => {
        c.fillStyle = '#1e1b4b';
        c.fillRect(620, 140, 110, 120);
        c.strokeStyle = '#9333ea';
        c.lineWidth = 2;
        c.strokeRect(620, 140, 110, 120);
        for (let gy = 155; gy < 250; gy += 20) {
          c.fillStyle = '#312e81';
          c.fillRect(628, gy, 94, 14);
          c.fillStyle = Math.sin(timer * 7 + gy) > 0 ? '#ec4899' : '#38bdf8';
          c.fillRect(634, gy + 5, 4, 4);
          c.fillRect(642, gy + 5, 4, 4);
        }
      }
    },
    // 3. Transformer Math Board
    {
      id: 'transformer_board',
      name: 'Equations Board',
      type: 'board',
      x: 80,
      y: 130,
      w: 120,
      h: 60,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#064e3b';
        c.fillRect(80, 130, 120, 60);
        c.strokeStyle = '#78350f';
        c.lineWidth = 3;
        c.strokeRect(80, 130, 120, 60);
        c.fillStyle = '#fef3c7';
        c.font = '600 6px monospace';
        c.fillText('Attention(Q,K,V) =', 88, 150);
        c.fillText('softmax(QK^T/√d)V', 88, 165);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 10. GARDEN INTERIOR CONFIG
// -------------------------------------------------------------------
export const GARDEN_CONFIG: InteriorConfig = {
  id: 'garden',
  name: 'Zen Arboretum & Herb Garden',
  subtitle: 'Aryan’s Hobbies, Chess Tactics & Coding Rituals',
  district: 'Town West',
  themeColor: '#22c55e',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'garden',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },
    // Timber Gazebo
    { x: 590, y: 150, w: 130, h: 110 },
    // Stone Birdbath
    { x: 375, y: 190, w: 50, h: 50 },
    // Raised Vegetable Beds
    { x: 90, y: 150, w: 130, h: 60 }
  ],
  hotspots: [
    {
      id: 'talk_gardener',
      name: 'Old Gardener Barnaby',
      prompt: 'Chat with Old Gardener Barnaby',
      x: 250,
      y: 220,
      radius: 65,
      action: 'talk_gardener',
      icon: 'Flower2'
    },
    {
      id: 'garden_trivia',
      name: 'Stone Trivia Tablet',
      prompt: 'Discover Aryan’s Personal Quirks & Chess Passion',
      x: 400,
      y: 220,
      radius: 65,
      action: 'inspect_garden_facts',
      icon: 'Sparkles'
    },
    {
      id: 'relax_gazebo',
      name: 'Sunlit Gazebo',
      prompt: 'Rest at the Wooden Gazebo',
      x: 650,
      y: 200,
      radius: 70,
      action: 'rest_gazebo',
      icon: 'Heart'
    }
  ],
  npc: {
    id: 'npc_gardener',
    name: 'Old Gardener Barnaby',
    role: 'Village Elder & Storyteller',
    x: 250,
    y: 200,
    facing: 'down',
    spritePath: 'characters/npc_mage.png',
    dialogues: [
      'Welcome to my peaceful garden, traveler! Slow your steps and smell the mint.',
      'Did you know Aryan plays rapid chess every day to train his tactical intuition?',
      'Take a seat in the gazebo or read through the stone tablets to discover what makes Aryan tick outside of code!'
    ],
    choices: [
      { text: 'Tell me about Aryan’s hobbies!', action: 'inspect_garden_facts' },
      { text: 'Rest by the birdbath', action: 'rest_gazebo' }
    ]
  },
  furniture: [
    // 1. Sunlit Gazebo
    {
      id: 'gazebo',
      name: 'Timber Gazebo',
      type: 'gazebo',
      x: 590,
      y: 150,
      w: 130,
      h: 110,
      solid: true,
      draw: (c) => {
        // Wooden floor
        c.fillStyle = '#78350f';
        c.fillRect(590, 150, 130, 110);
        c.fillStyle = '#92400e';
        c.fillRect(594, 154, 122, 102);
        // Gazebo timber pillars
        c.fillStyle = '#451a03';
        c.fillRect(590, 150, 10, 110);
        c.fillRect(710, 150, 10, 110);
        // Roof awning
        c.fillStyle = '#15803d';
        c.fillRect(580, 140, 150, 20);
      }
    },
    // 2. Stone Birdbath
    {
      id: 'birdbath',
      name: 'Stone Birdbath',
      type: 'birdbath',
      x: 375,
      y: 190,
      w: 50,
      h: 50,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#64748b';
        c.beginPath();
        c.arc(400, 215, 24, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#38bdf8';
        c.beginPath();
        c.arc(400, 215, 18, 0, Math.PI * 2);
        c.fill();
      }
    },
    // 3. Vegetable Beds
    {
      id: 'veg_beds',
      name: 'Raised Garden Beds',
      type: 'beds',
      x: 90,
      y: 150,
      w: 130,
      h: 60,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#451a03';
        c.fillRect(90, 150, 130, 60);
        c.fillStyle = '#713f12';
        c.fillRect(94, 154, 122, 52);
        // Carrots & Cabbages
        for (let cx = 104; cx < 210; cx += 22) {
          c.fillStyle = '#ea580c';
          c.fillRect(cx, 160, 6, 12);
          c.fillStyle = '#22c55e';
          c.fillRect(cx - 2, 156, 10, 6);
          // Cabbage
          c.fillStyle = '#4ade80';
          c.fillRect(cx, 185, 12, 10);
        }
      }
    }
  ]
};

// -------------------------------------------------------------------
// 11. BOSS ARENA INTERIOR CONFIG
// -------------------------------------------------------------------
export const BOSS_ARENA_CONFIG: InteriorConfig = {
  id: 'boss_arena',
  name: 'Champions Colosseum',
  subtitle: 'Flagship Projects & Architectural Showcases',
  district: 'Champions Valley',
  themeColor: '#f43f5e',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'stone',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },
    // Champion Dais & Podium
    { x: 320, y: 130, w: 160, h: 60 },
    // War Map Council Table
    { x: 600, y: 160, w: 130, h: 80 },
    // Weapon Staging Racks
    { x: 80, y: 150, w: 90, h: 110 }
  ],
  hotspots: [
    {
      id: 'boss_podium',
      name: 'Champion’s Trophy Dais',
      prompt: 'Challenge Flagship Projects (MindPulse AI & Lost & Found AI)',
      x: 400,
      y: 170,
      radius: 70,
      action: 'inspect_bosses',
      icon: 'Swords'
    },
    {
      id: 'war_table',
      name: 'War Council Table',
      prompt: 'Inspect Hackathon Strategy & Tactics',
      x: 660,
      y: 200,
      radius: 65,
      action: 'inspect_tactics',
      icon: 'Shield'
    },
    {
      id: 'talk_thorne',
      name: 'Arena Master Thorne',
      prompt: 'Speak with Arena Master Thorne',
      x: 230,
      y: 220,
      radius: 65,
      action: 'talk_thorne',
      icon: 'User'
    }
  ],
  npc: {
    id: 'npc_thorne',
    name: 'Arena Master Thorne',
    role: 'Trials Proctor',
    x: 230,
    y: 200,
    facing: 'down',
    spritePath: 'characters/npc_mage.png',
    dialogues: [
      'Halt, adventurer! You stand in the proving grounds where Aryan’s flagship systems were forged.',
      'Here lie MindPulse AI—winner of grueling 36-hour hackathons—and Lost & Found AI, conqueror of multimodal vision search.',
      'Step up to the Champion’s Podium to review project architectures, live demos, and GitHub repositories!'
    ],
    choices: [
      { text: 'Inspect Boss Projects & Live Demos', action: 'inspect_bosses' },
      { text: 'Review Hackathon Chronicles', action: 'inspect_tactics' }
    ]
  },
  furniture: [
    // 1. Champion Podium
    {
      id: 'champion_podium',
      name: 'Victory Dais',
      type: 'podium',
      x: 320,
      y: 130,
      w: 160,
      h: 60,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#334155';
        c.fillRect(320, 130, 160, 60);
        c.fillStyle = '#be123c';
        c.fillRect(324, 134, 152, 52);
        // Golden Laurel & Cup
        c.fillStyle = '#fde047';
        c.fillRect(390, 142, 20, 24);
        c.fillRect(384, 146, 32, 6);
      }
    },
    // 2. War Council Map Table
    {
      id: 'war_table',
      name: 'War Table',
      type: 'table',
      x: 600,
      y: 160,
      w: 130,
      h: 80,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#451a03';
        c.fillRect(600, 160, 130, 80);
        c.fillStyle = '#78350f';
        c.fillRect(604, 164, 122, 72);
        // Map parchment with territory markers
        c.fillStyle = '#fef3c7';
        c.fillRect(620, 175, 90, 50);
        c.fillStyle = '#dc2626';
        c.fillRect(640, 190, 8, 8);
        c.fillStyle = '#2563eb';
        c.fillRect(680, 200, 8, 8);
      }
    }
  ]
};

// -------------------------------------------------------------------
// 12. POST OFFICE INTERIOR CONFIG
// -------------------------------------------------------------------
export const POST_OFFICE_CONFIG: InteriorConfig = {
  id: 'post_office',
  name: 'Royal Courier & Dispatch Hub',
  subtitle: 'Send a Direct Message or Download Resume',
  district: 'Town South',
  themeColor: '#14b8a6',
  roomWidth: 800,
  roomHeight: 560,
  floorType: 'wood',
  entrySpawn: { x: 400, y: 490, facing: 'up' },
  exitDoor: { x: 360, y: 520, w: 80, h: 40, prompt: 'Exit to Town' },
  collisionBoxes: [
    { x: 0, y: 0, w: 800, h: 120 },
    { x: 0, y: 0, w: 50, h: 560 },
    { x: 750, y: 0, w: 50, h: 560 },
    { x: 0, y: 530, w: 350, h: 30 },
    { x: 450, y: 530, w: 350, h: 30 },
    // Dispatch Counter
    { x: 260, y: 220, w: 280, h: 44 },
    // Mail Sorting Rack
    { x: 610, y: 130, w: 120, h: 110 },
    // Resume Drop Box
    { x: 90, y: 150, w: 100, h: 70 }
  ],
  hotspots: [
    {
      id: 'dispatch_counter',
      name: 'Mail Dispatch Counter',
      prompt: 'Send a Direct Message to Aryan',
      x: 400,
      y: 250,
      radius: 65,
      action: 'open_contact',
      icon: 'Mail'
    },
    {
      id: 'resume_dropbox',
      name: 'Official Resume Box',
      prompt: 'Download Official Resume PDF',
      x: 140,
      y: 190,
      radius: 65,
      action: 'download_resume',
      icon: 'FileText'
    },
    {
      id: 'talk_walter',
      name: 'Postmaster Walter',
      prompt: 'Speak with Postmaster Walter',
      x: 400,
      y: 180,
      radius: 65,
      action: 'talk_walter',
      icon: 'User'
    }
  ],
  npc: {
    id: 'npc_walter',
    name: 'Postmaster Walter',
    role: 'Chief Dispatcher',
    x: 400,
    y: 170,
    facing: 'down',
    spritePath: 'characters/npc_mage.png',
    dialogues: [
      'Good day, traveler! Whether you seek to hire Aryan, collaborate on an AI project, or send warm regards, you’re in the right place.',
      'Our dispatch counter routes messages straight to Aryan’s inbox with highest priority.',
      'You can also pick up a sealed copy of his official resume at the drop box to your left!'
    ],
    choices: [
      { text: 'Send Message to Aryan', action: 'open_contact' },
      { text: 'Download Resume PDF', action: 'download_resume' }
    ]
  },
  furniture: [
    // 1. Dispatch Counter
    {
      id: 'dispatch_counter',
      name: 'Front Counter',
      type: 'counter',
      x: 260,
      y: 220,
      w: 280,
      h: 44,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#78350f';
        c.fillRect(260, 220, 280, 44);
        c.fillStyle = '#0f766e';
        c.fillRect(264, 224, 272, 36);
        // Brass postal scale
        c.fillStyle = '#fde047';
        c.fillRect(310, 212, 16, 12);
        // Stamped letters
        c.fillStyle = '#fef08a';
        c.fillRect(440, 214, 22, 14);
      }
    },
    // 2. Mail Sorting Rack
    {
      id: 'sorting_rack',
      name: 'Mail Cubbies',
      type: 'rack',
      x: 610,
      y: 130,
      w: 120,
      h: 110,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#451a03';
        c.fillRect(610, 130, 120, 110);
        // Grid cubbies
        for (let ry = 140; ry < 230; ry += 24) {
          for (let rx = 620; rx < 720; rx += 22) {
            c.fillStyle = '#78350f';
            c.fillRect(rx, ry, 18, 18);
            c.fillStyle = '#fef3c7';
            c.fillRect(rx + 2, ry + 4, 14, 10);
          }
        }
      }
    },
    // 3. Resume Drop Box
    {
      id: 'resume_box',
      name: 'Resume Dispatch Box',
      type: 'box',
      x: 90,
      y: 150,
      w: 100,
      h: 70,
      solid: true,
      draw: (c) => {
        c.fillStyle = '#0f766e';
        c.fillRect(90, 150, 100, 70);
        c.strokeStyle = '#14b8a6';
        c.lineWidth = 2;
        c.strokeRect(90, 150, 100, 70);
        c.fillStyle = '#fef08a';
        c.fillRect(110, 160, 60, 10);
        c.fillStyle = '#042f2e';
        c.font = '700 6px "Press Start 2P", monospace';
        c.textAlign = 'center';
        c.fillText('RESUMES', 140, 190);
      }
    }
  ]
};

// -------------------------------------------------------------------
// MAP OF ALL 12 INTERIORS
// -------------------------------------------------------------------
export const INTERIOR_CONFIGS: Record<string, InteriorConfig> = {
  coffee_shop: COFFEE_SHOP_CONFIG,
  home: HOME_CONFIG,
  python_cave: PYTHON_CAVE_CONFIG,
  sql_mines: SQL_MINES_CONFIG,
  blacksmith: BLACKSMITH_CONFIG,
  guild_hall: GUILD_HALL_CONFIG,
  library: LIBRARY_CONFIG,
  analytics_tower: ANALYTICS_TOWER_CONFIG,
  ml_lab: ML_LAB_CONFIG,
  garden: GARDEN_CONFIG,
  boss_arena: BOSS_ARENA_CONFIG,
  post_office: POST_OFFICE_CONFIG
};
