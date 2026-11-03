import {
  BuildingData,
  ProjectItem,
  SkillCategory,
  Quest,
  InventoryItem,
  NPC,
  WeaponSkill,
  ActiveBuff,
  PlayerStats
} from '../types';

export const ARYAN_STATS: PlayerStats = {
  hp: 100,
  maxHp: 100,
  energy: 80,
  maxEnergy: 100,
  focus: 70,
  maxFocus: 100,
  level: 18,
  xp: 1280,
  maxXp: 2000,
  careerTitle: 'Data Explorer',
  questsCompleted: 12,
  projectsBuilt: 8,
  skillsUnlocked: 15,
  coffeeCups: 24
};

export const INITIAL_BUFFS: ActiveBuff[] = [
  {
    id: 'coffee_lover',
    name: 'Coffee Lover',
    icon: '☕',
    description: 'Freshly brewed roast increases concentration during complex algorithm design.',
    statBonus: '+5 Focus'
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    icon: '📖',
    description: 'Late night coding sessions grant heightened clarity and bonus quest experience.',
    statBonus: '+10 XP from quests'
  }
];

export const BUILDINGS: BuildingData[] = [
  {
    id: 'coffee_shop',
    name: 'Coffee Shop',
    subtitle: 'Take a Break',
    district: 'Town North-West',
    x: 620,
    y: 520,
    width: 250,
    height: 210,
    doorX: 745,
    doorY: 710,
    interactionRadius: 80,
    collisionBox: { x: 630, y: 550, w: 230, h: 160 },
    iconName: 'Coffee',
    themeColor: '#eab308',
    bannerColor: '#ca8a04',
    description: 'Cozy hearthside café run by the Barista. Grab a warm brew for focus buffs and read personal reflections.'
  },
  {
    id: 'guild_hall',
    name: 'Guild Hall',
    subtitle: 'View Quests',
    district: 'Town North-Center',
    x: 1140,
    y: 480,
    width: 320,
    height: 250,
    doorX: 1300,
    doorY: 710,
    interactionRadius: 85,
    collisionBox: { x: 1150, y: 520, w: 300, h: 180 },
    iconName: 'Shield',
    themeColor: '#a855f7',
    bannerColor: '#7e22ce',
    description: 'Grand timber citadel with the guild banner. Inspect active quests, side challenges, and legendary boss battles.'
  },
  {
    id: 'python_cave',
    name: 'Python Cave',
    subtitle: 'Explore Python',
    district: 'Town North-East',
    x: 1720,
    y: 520,
    width: 260,
    height: 220,
    doorX: 1850,
    doorY: 720,
    interactionRadius: 85,
    collisionBox: { x: 1730, y: 560, w: 240, h: 160 },
    iconName: 'Code',
    themeColor: '#38bdf8',
    bannerColor: '#0284c7',
    description: 'Mysterious cavern adorned with glowing blue crystals and the golden-cyan Python emblem. Home of the Cave Sage.'
  },
  {
    id: 'garden',
    name: 'Garden',
    subtitle: 'Random Facts',
    district: 'Town West',
    x: 620,
    y: 920,
    width: 240,
    height: 200,
    doorX: 740,
    doorY: 1100,
    interactionRadius: 80,
    collisionBox: { x: 630, y: 950, w: 220, h: 150 },
    iconName: 'Flower2',
    themeColor: '#22c55e',
    bannerColor: '#16a34a',
    description: 'Peaceful fenced patch of carrots, cabbages, and blossoms where the Gardener shares fun facts about Aryan.'
  },
  {
    id: 'sql_mines',
    name: 'SQL Mines',
    subtitle: 'Explore SQL',
    district: 'Town East',
    x: 1720,
    y: 920,
    width: 260,
    height: 220,
    doorX: 1850,
    doorY: 1120,
    interactionRadius: 85,
    collisionBox: { x: 1730, y: 960, w: 240, h: 160 },
    iconName: 'Database',
    themeColor: '#f59e0b',
    bannerColor: '#d97706',
    description: 'Subterranean mine shaft fortified with heavy timbers. Unearth relational schemas, window queries, and ETL pipelines.'
  },
  {
    id: 'blacksmith',
    name: 'Blacksmith',
    subtitle: 'Upgrade Skills',
    district: 'Crafting District',
    x: 2180,
    y: 900,
    width: 260,
    height: 230,
    doorX: 2300,
    doorY: 1110,
    interactionRadius: 85,
    collisionBox: { x: 2190, y: 940, w: 240, h: 170 },
    iconName: 'Hammer',
    themeColor: '#f97316',
    bannerColor: '#ea580c',
    description: 'Fiery forge with smoking chimney and giant stone hammer. Technical skills are forged as RPG weapons and gear.'
  },
  {
    id: 'library',
    name: 'Library',
    subtitle: 'Certificates & Blogs',
    district: 'Knowledge District',
    x: 620,
    y: 1320,
    width: 270,
    height: 240,
    doorX: 755,
    doorY: 1540,
    interactionRadius: 85,
    collisionBox: { x: 630, y: 1360, w: 250, h: 180 },
    iconName: 'BookOpen',
    themeColor: '#3b82f6',
    bannerColor: '#1d4ed8',
    description: 'Stone academy with cobalt-blue slate roof. Houses MCA & BCA degrees, verified certifications, and published articles.'
  },
  {
    id: 'home',
    name: 'Your Home',
    subtitle: 'View Stats',
    district: 'Town South-Center',
    x: 1160,
    y: 1320,
    width: 270,
    height: 230,
    doorX: 1295,
    doorY: 1530,
    interactionRadius: 85,
    collisionBox: { x: 1170, y: 1360, w: 250, h: 170 },
    iconName: 'Home',
    themeColor: '#ef4444',
    bannerColor: '#b91c1c',
    description: "Aryan's personal bedroom sanctuary with red shingle roof, mailbox, terminal computer, bookshelf, and career achievements."
  },
  {
    id: 'analytics_tower',
    name: 'Analytics Tower',
    subtitle: 'View Insights',
    district: 'Analytics District',
    x: 1720,
    y: 1320,
    width: 240,
    height: 260,
    doorX: 1840,
    doorY: 1560,
    interactionRadius: 85,
    collisionBox: { x: 1730, y: 1380, w: 220, h: 180 },
    iconName: 'BarChart2',
    themeColor: '#06b6d4',
    bannerColor: '#0891b2',
    description: 'Towering cylindrical stone battlement bearing the blue data banner. Features interactive project metrics and analytics.'
  },
  {
    id: 'ml_lab',
    name: 'ML Laboratory',
    subtitle: 'AI & Neural Nets',
    district: 'Science District',
    x: 2180,
    y: 520,
    width: 250,
    height: 220,
    doorX: 2300,
    doorY: 720,
    interactionRadius: 85,
    collisionBox: { x: 2190, y: 560, w: 230, h: 160 },
    iconName: 'Cpu',
    themeColor: '#ec4899',
    bannerColor: '#db2777',
    description: 'Arcane cyber-laboratory where neural embeddings, computer vision models, and transformer pipelines are fine-tuned.'
  },
  {
    id: 'boss_arena',
    name: 'Boss Arena',
    subtitle: 'Major Project Battles',
    district: 'Champions Valley',
    x: 2180,
    y: 1320,
    width: 260,
    height: 230,
    doorX: 2300,
    doorY: 1530,
    interactionRadius: 85,
    collisionBox: { x: 2190, y: 1360, w: 240, h: 170 },
    iconName: 'Swords',
    themeColor: '#f43f5e',
    bannerColor: '#e11d48',
    description: 'Colosseum where major completed projects are challenged as boss encounters with architectural breakdowns and live demos.'
  },
  {
    id: 'post_office',
    name: 'Contact Post Office',
    subtitle: 'Send Message & Resume',
    district: 'Town South',
    x: 1160,
    y: 1680,
    width: 260,
    height: 200,
    doorX: 1290,
    doorY: 1860,
    interactionRadius: 85,
    collisionBox: { x: 1170, y: 1710, w: 240, h: 150 },
    iconName: 'Mail',
    themeColor: '#14b8a6',
    bannerColor: '#0d9488',
    description: 'Town courier hub. Dispatch messages directly to Aryan, grab his resume, or connect via GitHub and LinkedIn.'
  }
];

// Technical Skills as RPG Weapons & Equipment
export const WEAPON_SKILLS: WeaponSkill[] = [
  {
    id: 'python_sword',
    name: 'Python Greatsword',
    type: 'Sword',
    level: 92,
    masteryLevel: 92,
    techStack: 'Python 3.12 · FastAPI · Pandas',
    category: 'Core Language',
    enchantments: ['FastAPI Async +20', 'NumPy Vectorization', 'Clean PEP-8 Syntax'],
    proficiency: 'Master Artisan (92%)',
    experience: '3+ Years Intensive Production',
    description: 'Forged in clean object-oriented architecture and asynchronous pipelines. Slices through data processing and backend challenges with FastAPI, NumPy, and Pandas.',
    icon: 'Sword',
    relatedProjects: ['MindPulse AI', 'Lost & Found AI', 'Sales Analytics Engine'],
    stats: [
      { label: 'Damage (Execution Speed)', value: 'High (Vectorized NumPy)' },
      { label: 'Versatility', value: 'Backend / Data / ML' },
      { label: 'Weight (Code Cleanliness)', value: 'Lightweight & Modular' }
    ]
  },
  {
    id: 'sql_hammer',
    name: 'SQL War Hammer',
    type: 'Hammer',
    level: 88,
    masteryLevel: 88,
    techStack: 'PostgreSQL · MySQL · BigQuery',
    category: 'Database Architecture',
    enchantments: ['Window Partitioning', 'B-Tree Index Slicing', 'ACID Resilient'],
    proficiency: 'Expert Blacksmith (88%)',
    experience: '2.5 Years Complex Querying',
    description: 'Crushes massive datasets with sub-second execution. Mastered CTEs, window functions, indexing strategies, and automated ETL staging in PostgreSQL and MySQL.',
    icon: 'Hammer',
    relatedProjects: ['Sales Analytics Engine', 'CONNEXA Database', 'Retail Warehouse Mart'],
    stats: [
      { label: 'Impact (Query Efficiency)', value: 'Sub-second Indexing' },
      { label: 'Durability', value: 'ACID Compliant' },
      { label: 'Range', value: 'Complex Multi-Join Aggregations' }
    ]
  },
  {
    id: 'stats_staff',
    name: 'Statistics Staff',
    type: 'Staff',
    level: 85,
    masteryLevel: 85,
    techStack: 'Probability · Bayesian · Hypotheses',
    category: 'Applied Mathematics',
    enchantments: ['P-Value Proofing', 'Normal Distribution Ward', 'Bayesian Inference'],
    proficiency: 'Arcane Scholar (85%)',
    experience: 'MCA Foundations & Rigor',
    description: 'Channels probability distributions, hypothesis testing, Bayesian inference, and feature correlation to ground AI heuristics in rigorous mathematical truth.',
    icon: 'Wand',
    relatedProjects: ['MindPulse AI', 'Predictive Attrition Model', 'Sentiment Correlation Engine'],
    stats: [
      { label: 'Spell Power', value: 'Hypothesis Testing & A/B' },
      { label: 'Mana Efficiency', value: 'P-Values & Confidence Intervals' },
      { label: 'Clarity', value: 'Mathematical Proofs' }
    ]
  },
  {
    id: 'powerbi_shield',
    name: 'Power BI Shield',
    type: 'Shield',
    level: 80,
    masteryLevel: 80,
    techStack: 'DAX · Power Query · DirectQuery',
    category: 'Business Intelligence',
    enchantments: ['DAX Optimization', 'Drill-Through Analytics', 'Executive Clarity'],
    proficiency: 'Guardian of Insights (80%)',
    experience: '2 Years Executive Reporting',
    description: 'Transforms dense relational tables into clear, interactive executive dashboards with DAX measures, drill-through cards, and automated KPI tracking.',
    icon: 'Shield',
    relatedProjects: ['Sales Performance Dashboard', 'Supply Chain Monitor', 'Academic KPI Portal'],
    stats: [
      { label: 'Defense (Clarity)', value: 'Noise Reduction' },
      { label: 'Readability', value: 'Executive KPI Visuals' },
      { label: 'Reaction Time', value: 'Live DirectQuery Refresh' }
    ]
  },
  {
    id: 'ml_bow',
    name: 'Machine Learning Bow',
    type: 'Bow',
    level: 86,
    masteryLevel: 86,
    techStack: 'PyTorch · HuggingFace · CLIP',
    category: 'Deep Learning',
    enchantments: ['Cross-Attention Aim', 'Vector Embedding Quiver', 'Sub-20ms ONNX'],
    proficiency: 'Deadeye Sniper (86%)',
    experience: '2 Years Deep Learning & NLP',
    description: 'Strikes targets at extreme range using Scikit-Learn, PyTorch, Hugging Face transformers, and CLIP multimodal vector search.',
    icon: 'Crosshair',
    relatedProjects: ['MindPulse AI', 'Lost & Found AI', 'Vector Search Engine'],
    stats: [
      { label: 'Accuracy', value: '94.2% Validation Precision' },
      { label: 'Draw Speed', value: 'ONNX Runtime Optimized' },
      { label: 'Arrow Type', value: 'Dense Vector Embeddings' }
    ]
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'quest_sales_dashboard',
    title: 'Analyze Sales Dashboard',
    description: 'Collect retail transaction logs, model dimensional schema, and deliver executive dashboard insights.',
    buildingId: 'analytics_tower',
    completed: false,
    rewardXp: 350,
    progress: 60,
    difficulty: 'Intermediate',
    category: 'Main',
    technologies: ['Power BI', 'SQL', 'DAX', 'Python']
  },
  {
    id: 'quest_python_cave',
    title: 'Master Python Cave',
    description: 'Inspect asynchronous microservices, data scraping scripts, and CLI automation tools.',
    buildingId: 'python_cave',
    completed: true,
    rewardXp: 250,
    progress: 100,
    difficulty: 'Beginner',
    category: 'Main',
    technologies: ['Python', 'FastAPI', 'NumPy']
  },
  {
    id: 'quest_sql_mines',
    title: 'Forge SQL Hammer',
    description: 'Explore optimized query execution plans, recursive CTEs, and warehouse normalization.',
    buildingId: 'sql_mines',
    completed: true,
    rewardXp: 300,
    progress: 100,
    difficulty: 'Intermediate',
    category: 'Main',
    technologies: ['PostgreSQL', 'Query Profiling', 'Database Normalization']
  },
  {
    id: 'quest_mindpulse_boss',
    title: 'Defeat MindPulse AI Boss',
    description: 'Challenge the multimodal mental health diagnostic boss by reviewing its acoustic-linguistic transformer architecture.',
    buildingId: 'boss_arena',
    completed: false,
    rewardXp: 600,
    progress: 80,
    difficulty: 'Boss',
    category: 'Boss',
    technologies: ['PyTorch', 'Transformers', 'FastAPI', 'Acoustic Processing']
  },
  {
    id: 'quest_lost_found_boss',
    title: 'Defeat Lost & Found AI Boss',
    description: 'Inspect zero-shot CLIP vision search engine and vector indexing across lost property archives.',
    buildingId: 'boss_arena',
    completed: false,
    rewardXp: 500,
    progress: 75,
    difficulty: 'Boss',
    category: 'Boss',
    technologies: ['CLIP', 'Vector DB', 'React', 'Python']
  },
  {
    id: 'quest_garden_facts',
    title: 'Visit the Village Garden',
    description: 'Talk to the old Gardener to learn about Aryan’s favorite hobbies, chess games, and coding rituals.',
    buildingId: 'garden',
    completed: false,
    rewardXp: 150,
    progress: 0,
    difficulty: 'Beginner',
    category: 'Side'
  },
  {
    id: 'quest_coffee_buff',
    title: 'Enjoy a Cup at the Coffee Shop',
    description: 'Take a break from coding, speak with the Barista, and acquire the Coffee Lover focus buff.',
    buildingId: 'coffee_shop',
    completed: false,
    rewardXp: 150,
    progress: 0,
    difficulty: 'Beginner',
    category: 'Side'
  }
];

export const GARDEN_FACTS = [
  {
    title: 'Gaming & Indie RPGs',
    category: 'Gaming & RPGs',
    icon: '🎮',
    fact: 'Aryan has loved top-down and isometric 16-bit RPGs since childhood, inspiring the handcrafted architecture of this portfolio world.'
  },
  {
    title: 'Chess Tactics',
    category: 'Chess Tactics',
    icon: '♟️',
    fact: 'Plays rapid and blitz chess daily (favorite opening: Sicilian Defense). Believes positional board strategy directly sharpens algorithmic problem-solving.'
  },
  {
    title: 'Endurance Hackathons',
    category: 'Endurance Coding',
    icon: '⚡',
    fact: 'Thrives during 36-hour hackathons where rapid prototyping, zero-fluff MVP design, and empathetic UI deliver winning projects.'
  },
  {
    title: 'Deep Tech arXiv Research',
    category: 'Deep Tech Curiosity',
    icon: '🔬',
    fact: 'Loves reading cutting-edge arXiv preprint papers on multimodal transformers, agentic reasoning loops, and zero-shot retrieval.'
  },
  {
    title: 'Mechanical Keyboards & Coffee',
    category: 'Mechanical Keyboards',
    icon: '⌨️',
    fact: 'Obsessed with tactile mechanical switches and clean desk ergonomics. Codes best with a cup of hot espresso and lofi game soundtracks.'
  }
];

export const NPCS: NPC[] = [
  {
    id: 'npc_barista',
    name: 'Barista Marco',
    role: 'Tavern Host',
    district: 'Coffee Shop',
    x: 745,
    y: 715,
    direction: 'down',
    state: 'idle',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [{ x: 745, y: 715, state: 'idle', duration: 10, facing: 'down' }],
    dialog: [
      'Hey Aryan! Long day of coding? Would you like a fresh coffee?',
      'A fresh espresso restores focus and grants the Coffee Lover buff!',
      'Check out the essays on the hearthside table while you sip!'
    ],
    currentDialogIndex: 0,
    icon: 'Coffee'
  },
  {
    id: 'npc_gardener',
    name: 'Old Gardener Barnaby',
    role: 'Village Elder & Storyteller',
    district: 'Garden',
    x: 740,
    y: 1090,
    direction: 'down',
    state: 'idle',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [{ x: 740, y: 1090, state: 'idle', duration: 10, facing: 'down' }],
    dialog: [
      'Welcome to my garden, traveler! These cabbages grow almost as fast as Aryan learns new algorithms.',
      'Did you know Aryan plays rapid chess to sharpen his algorithmic intuition?',
      'Aryan believes clean code is just like tending soil—consistent care prevents weeds from choking the system!'
    ],
    currentDialogIndex: 0,
    icon: 'Flower2'
  },
  {
    id: 'npc_sage',
    name: 'Cave Sage Aldous',
    role: 'Python Sorcerer',
    district: 'Python Cave',
    x: 1850,
    y: 725,
    direction: 'down',
    state: 'idle',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [{ x: 1850, y: 725, state: 'idle', duration: 10, facing: 'down' }],
    dialog: [
      'Python is a powerful language. It is simple, yet limitless.',
      'Within these crystals lie scripts that automate thousands of tasks and orchestrate microservices.',
      'Step forward to inspect Aryan’s libraries, data pipelines, and automation repositories!'
    ],
    currentDialogIndex: 0,
    icon: 'Sparkles'
  },
  {
    id: 'npc_foreman',
    name: 'Foreman Ironclad',
    role: 'Chief Mining Engineer',
    district: 'SQL Mines',
    x: 1850,
    y: 1125,
    direction: 'down',
    state: 'idle',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [{ x: 1850, y: 1125, state: 'idle', duration: 10, facing: 'down' }],
    dialog: [
      'Careful on the rails, visitor! We quarry raw relational data down here.',
      'Aryan wields window functions and sub-second indexing like a master miner.',
      'Take a look at the database schema blueprints displayed along the mine walls!'
    ],
    currentDialogIndex: 0,
    icon: 'Hammer'
  },
  {
    id: 'npc_smith',
    name: 'Blacksmith Torvald',
    role: 'Master Armorer',
    district: 'Blacksmith',
    x: 2300,
    y: 1115,
    direction: 'down',
    state: 'working',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [{ x: 2300, y: 1115, state: 'working', duration: 10, facing: 'down' }],
    dialog: [
      'The anvil never lies! Every line of code is tempered in real-world projects.',
      'Looking to upgrade your arsenal? Inspect the Python Sword and SQL Hammer on the rack.',
      'Click the anvil to strike hot steel and hear the resonance of craftsmanship!'
    ],
    currentDialogIndex: 0,
    icon: 'Flame'
  },
  {
    id: 'npc_companion',
    name: 'Grand Wizard Eldrin',
    role: 'Wizard Guide',
    district: 'Town Center',
    x: 1200,
    y: 930,
    direction: 'down',
    state: 'idle',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [{ x: 1200, y: 930, state: 'idle', duration: 10, facing: 'down' }],
    dialog: [
      'Greetings, noble traveler! I am Grand Wizard Eldrin, guardian of Aryan’s lore and your mystical guide through this realm.',
      'By the arcane sciences of Machine Learning and Data Sorcery, I can illuminate any question you harbor about Aryan’s career and spells.',
      'Speak with me anytime, or consult the Wizard Guide orb at the top-right of your screen to seek ancient wisdom!'
    ],
    currentDialogIndex: 0,
    icon: 'Sparkles'
  }
];

export const MAJOR_PROJECTS: ProjectItem[] = [
  {
    id: 'mindpulse_ai',
    title: 'MindPulse AI',
    subtitle: 'Multimodal Emotion & Acoustic Diagnostic System',
    category: 'AI/ML',
    badge: '🏆 Hackathon Winner',
    shortDesc: 'Multimodal mental wellness diagnostic system analyzing vocal acoustic biomarkers and textual sentiment.',
    description: 'Multimodal mental wellness diagnostic system analyzing vocal acoustic biomarkers and textual sentiment.',
    fullDesc: 'MindPulse AI addresses the critical delay in early clinical depression and anxiety detection. By combining acoustic pitch/jitter analysis with fine-tuned RoBERTa text embeddings, it achieves 94.2% diagnostic accuracy while preserving patient confidentiality with on-device edge scoring.',
    longDescription: 'MindPulse AI addresses the critical delay in early clinical depression and anxiety detection. By combining acoustic pitch/jitter analysis with fine-tuned RoBERTa text embeddings, it achieves 94.2% diagnostic accuracy while preserving patient confidentiality with on-device edge scoring.',
    problem: 'Mental health assessment often suffers from patient recall bias and delayed diagnostic intervals in clinical outpatient settings.',
    solution: 'Designed a dual-branch neural architecture processing asynchronous audio streams (pitch, MFCC, jitter) and contextual journal transcripts.',
    architecture: 'FastAPI microservices orchestrating PyTorch transformer pipelines with Web Audio front-end and PostgreSQL storage.',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'RoBERTa', 'Web Audio API', 'PostgreSQL'],
    tags: ['Python', 'PyTorch', 'FastAPI', 'RoBERTa', 'PostgreSQL'],
    githubUrl: 'https://github.com/aryan/mindpulse-ai',
    liveUrl: 'https://mindpulse-demo.vercel.app',
    demoUrl: 'https://mindpulse-demo.vercel.app',
    difficulty: 'Epic Boss Encounter',
    status: 'Completed',
    featured: true,
    imageAccent: '#38bdf8',
    aiReview: {
      strengths: ['High multi-modal fusion accuracy', 'Zero-latency edge acoustic feature extraction', 'Empathetic UX'],
      improvements: ['Implement quantization for mobile CPU execution', 'Add longitudinal patient trend tracking'],
      chronicle: 'Defeated after a grueling 36-hour sprint. The acoustic transformer core unlocked the legendary Python Sword mastery!'
    }
  },
  {
    id: 'lost_found_ai',
    title: 'Lost & Found AI',
    subtitle: 'Multimodal Vision-Language Semantic Retrieval Engine',
    category: 'AI/ML',
    badge: '🌟 AI Vision Search',
    shortDesc: 'Multimodal image-text semantic retrieval engine using OpenAI CLIP and vector similarity.',
    description: 'Multimodal image-text semantic retrieval engine using OpenAI CLIP and vector similarity.',
    fullDesc: 'An enterprise lost-and-found matching system allowing users to search missing items using natural language queries ("blue canvas backpack with cat keychain") matched against unlabelled user-submitted photos.',
    longDescription: 'An enterprise lost-and-found matching system allowing users to search missing items using natural language queries ("blue canvas backpack with cat keychain") matched against unlabelled user-submitted photos.',
    problem: 'Traditional lost-and-found catalogs rely on manual keyword tagging which suffers from vocabulary mismatch and human error.',
    solution: 'Embedded multimodal vision-language representations with OpenAI CLIP ViT-B/32 into a high-dimensional vector index for sub-50ms retrieval.',
    architecture: 'Next.js frontend communicating with Python FastAPI vector search worker and Qdrant database.',
    technologies: ['Python', 'CLIP', 'FastAPI', 'Qdrant', 'React', 'TypeScript'],
    tags: ['Python', 'CLIP', 'FastAPI', 'Qdrant', 'Vector Search'],
    githubUrl: 'https://github.com/aryan/lost-found-ai',
    liveUrl: 'https://lostfound-ai.vercel.app',
    demoUrl: 'https://lostfound-ai.vercel.app',
    difficulty: 'Rare Boss Encounter',
    status: 'Completed',
    featured: true,
    imageAccent: '#a855f7',
    aiReview: {
      strengths: ['Zero-shot cross-modal retrieval', 'Robust against varied lighting and angles'],
      improvements: ['Add temporal bounding box object segmentation'],
      chronicle: 'Tamed the vector beast in the depths of the Vision Mines, proving semantic similarity surpasses keyword matching!'
    }
  },
  {
    id: 'sales_analytics_engine',
    title: 'Sales Analytics Engine',
    subtitle: 'High-Throughput BI & Time-Series Forecasting Pipeline',
    category: 'Data',
    badge: '📊 Predictive BI Pipeline',
    shortDesc: 'Automated retail analytics pipeline processing 500K+ transactional events with predictive revenue forecasting.',
    description: 'Automated retail analytics pipeline processing 500K+ transactional events with predictive revenue forecasting.',
    fullDesc: 'End-to-end data engineering platform that extracts transaction logs from distributed endpoints, cleanses anomalies via automated SQL staging jobs, and outputs dynamic Power BI dashboards with Prophet sales forecasting.',
    longDescription: 'End-to-end data engineering platform that extracts transaction logs from distributed endpoints, cleanses anomalies via automated SQL staging jobs, and outputs dynamic Power BI dashboards with Prophet sales forecasting.',
    problem: 'Siloed transaction records caused weekly reporting lag and prevented store managers from predicting inventory stockouts.',
    solution: 'Constructed an idempotent ETL pipeline using PostgreSQL windowed staging tables and Python Pandas orchestrators connected to live Power BI DirectQuery visuals.',
    architecture: 'Python ingestion cron -> PostgreSQL staging star schema -> Power BI interactive reporting layer.',
    technologies: ['SQL', 'Python', 'Pandas', 'Power BI', 'PostgreSQL', 'Prophet'],
    tags: ['SQL', 'Python', 'Pandas', 'Power BI', 'ETL Pipeline'],
    githubUrl: 'https://github.com/aryan/sales-analytics-engine',
    liveUrl: 'https://sales-engine-demo.vercel.app',
    demoUrl: 'https://sales-engine-demo.vercel.app',
    difficulty: 'Strategic Boss Encounter',
    status: 'Completed',
    featured: true,
    imageAccent: '#f59e0b',
    aiReview: {
      strengths: ['Idempotent pipeline design', 'Clear DAX measures and executive KPI summaries'],
      improvements: ['Migrate batch cron jobs to streaming Apache Kafka events'],
      chronicle: 'Formed the foundation of Aryan’s current Active Quest: Analyze Sales Dashboard!'
    }
  },
  {
    id: 'connexa_collab',
    title: 'CONNEXA',
    subtitle: 'Peer Collaborative Skill-Graph Matching Platform',
    category: 'Web',
    badge: '🌐 Real-time Graph Platform',
    shortDesc: 'Interest-based student collaborative platform featuring real-time socket messaging and peer discovery.',
    description: 'Interest-based student collaborative platform featuring real-time socket messaging and peer discovery.',
    fullDesc: 'Connects university students and researchers based on complementary skill graphs and shared project aspirations. Features live collaborative whiteboards and rich group workspaces.',
    longDescription: 'Connects university students and researchers based on complementary skill graphs and shared project aspirations. Features live collaborative whiteboards and rich group workspaces.',
    problem: 'Students struggled to assemble balanced cross-functional teams for hackathons and research projects.',
    solution: 'Designed an algorithmic recommendation engine matching complementary skills (e.g. backend developer with UI designer).',
    architecture: 'React TypeScript frontend with Node.js WebSocket gateway and MongoDB Atlas data layer.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'Tailwind CSS', 'MongoDB'],
    tags: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/aryan/connexa',
    liveUrl: 'https://connexa.vercel.app',
    demoUrl: 'https://connexa.vercel.app',
    difficulty: 'Colosseum Champion',
    status: 'Completed',
    featured: true,
    imageAccent: '#10b981',
    aiReview: {
      strengths: ['Instant sub-30ms socket latency', 'Clean component hierarchy'],
      improvements: ['Add automated peer rating verification'],
      chronicle: 'Forged in the fires of teamwork to unite adventurers across academic domains!'
    }
  }
];

export const PROJECTS: ProjectItem[] = MAJOR_PROJECTS;

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages & Core Systems',
    icon: 'Code2',
    skills: [
      { name: 'Python 3.12', level: 92, experience: '3+ yrs', description: 'Advanced asynchronous, scientific, and backend architectures' },
      { name: 'SQL (PostgreSQL / MySQL)', level: 88, experience: '2.5 yrs', description: 'Window queries, indexing, CTEs, schema optimization' },
      { name: 'C / C++', level: 75, experience: '2 yrs', description: 'Memory management, pointers, and DSA foundational rigor' },
      { name: 'TypeScript / JavaScript', level: 82, experience: '2 yrs', description: 'Modern type-safe frontend and Node.js microservices' }
    ]
  },
  {
    id: 'ai_data',
    name: 'AI, ML & Data Science',
    icon: 'BrainCircuit',
    skills: [
      { name: 'PyTorch & Transformers', level: 86, experience: '2 yrs', description: 'Hugging Face, vision-language CLIP, acoustic embeddings' },
      { name: 'Pandas & NumPy', level: 90, experience: '3 yrs', description: 'High-throughput data wrangling and vector math' },
      { name: 'Scikit-Learn', level: 85, experience: '2 yrs', description: 'Classification, clustering, ensembles, hyperparameter tuning' },
      { name: 'Power BI & DAX', level: 80, experience: '2 yrs', description: 'Interactive executive KPI boards, data modeling' }
    ]
  },
  {
    id: 'tools',
    name: 'Backend & Infrastructure',
    icon: 'Wrench',
    skills: [
      { name: 'FastAPI & REST', level: 90, experience: '2.5 yrs', description: 'Sub-15ms endpoints, Pydantic validation, JWT security' },
      { name: 'Docker & Containers', level: 78, experience: '1.5 yrs', description: 'Multi-stage builds, container isolation, compose' },
      { name: 'Git & Linux Shell', level: 85, experience: '3 yrs', description: 'Version control, bash scripting, CI/CD automation' }
    ]
  }
];

export const EDUCATION_RECORDS = [
  {
    degree: 'Master of Computer Applications (MCA)',
    specialization: 'Data Science & Machine Learning',
    institution: 'Apex University',
    duration: '2024 - 2026 (Ongoing)',
    period: '2024 - 2026 (Ongoing)',
    status: 'Current Quest',
    gpa: '8.8 / 10.0',
    cgpa: '8.8 / 10.0',
    description: 'Advanced coursework in Deep Learning, Advanced Database Systems, Statistical Inference, Distributed Computing, and Natural Language Processing.',
    courses: ['Deep Learning', 'Distributed Systems', 'Big Data Engineering', 'Optimization Algorithms'],
    highlights: ['Deep Learning', 'Distributed Systems', 'Big Data Engineering', 'Optimization Algorithms']
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    specialization: 'Computer Science & Software Development',
    institution: 'Apex University',
    duration: '2021 - 2024',
    period: '2021 - 2024',
    status: 'Completed',
    gpa: '8.6 / 10.0',
    cgpa: '8.6 / 10.0',
    description: 'Core foundations in Data Structures & Algorithms, Object-Oriented Programming (Java/Python), Relational Database Management Systems, and Web Engineering.',
    courses: ['Data Structures & Algorithms', 'Database Management Systems', 'Software Engineering', 'Computer Networks'],
    highlights: ['Data Structures & Algorithms', 'Database Management Systems', 'Software Engineering', 'Computer Networks']
  }
];

export const CERTIFICATIONS = [
  {
    title: 'Data Science & Machine Learning Professional',
    name: 'Data Science & Machine Learning Professional',
    issuer: 'Coursera / DeepLearning.AI',
    date: '2024',
    credentialId: 'DS-ML-98214',
    skills: ['Supervised Learning', 'Feature Engineering', 'Model Evaluation'],
    skillsCovered: ['Supervised Learning', 'Feature Engineering', 'Model Evaluation']
  },
  {
    title: 'PostgreSQL Database Administration & Performance',
    name: 'PostgreSQL Database Administration & Performance',
    issuer: 'Meta / Udemy',
    date: '2024',
    credentialId: 'PG-DB-44102',
    skills: ['Indexing', 'Query Optimization', 'Partitioning'],
    skillsCovered: ['Indexing', 'Query Optimization', 'Partitioning']
  },
  {
    title: 'Microsoft Power BI Data Analyst Associate',
    name: 'Microsoft Power BI Data Analyst Associate',
    issuer: 'Microsoft Learn',
    date: '2023',
    credentialId: 'PBI-DA-11093',
    skills: ['DAX', 'Power Query', 'Dashboard Architecture'],
    skillsCovered: ['DAX', 'Power Query', 'Dashboard Architecture']
  }
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'item_coffee_thermos',
    name: 'Artisan Coffee Thermos',
    type: 'consumable',
    rarity: 'rare',
    description: 'Infused with dark roast espresso. Bestows +5 Focus and keeps coding bugs at bay.',
    icon: 'Coffee',
    obtainedAt: 'Coffee Shop & Tavern'
  },
  {
    id: 'item_python_crystal',
    name: 'Cyan Python Crystal',
    type: 'artifact',
    rarity: 'epic',
    description: 'Emits a soothing electric glow. Contains optimized syntax algorithms and vectorized matrix routines.',
    icon: 'Sparkles',
    obtainedAt: 'Python Cave'
  },
  {
    id: 'item_sql_pickaxe',
    name: 'Hardened SQL Pickaxe',
    type: 'gear',
    rarity: 'rare',
    description: 'Mined from deep relational seams. Capable of executing sub-second indexing on million-row tables.',
    icon: 'Hammer',
    obtainedAt: 'SQL Mines'
  },
  {
    id: 'item_mca_scroll',
    name: 'Ancient MCA Degree Scroll',
    type: 'tome',
    rarity: 'legendary',
    description: 'Documenting mastery over Data Science, Machine Learning, and Algorithmic Proofs.',
    icon: 'Scroll',
    obtainedAt: 'Ancient Library'
  },
  {
    id: 'item_sales_ledger',
    name: 'Executive Sales Ledger',
    type: 'artifact',
    rarity: 'rare',
    description: 'Contains cleansed transaction logs ready for Power BI dimensional visualization.',
    icon: 'BarChart2',
    obtainedAt: 'Analytics Tower'
  }
];
