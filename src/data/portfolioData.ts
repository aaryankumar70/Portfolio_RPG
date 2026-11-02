import { BuildingData, ProjectItem, SkillCategory, Quest, InventoryItem, NPC } from '../types';

export const BUILDINGS: BuildingData[] = [
  {
    id: 'guild_hall',
    name: 'Guild Hall',
    subtitle: 'About Me & Journey',
    district: 'Guild District',
    x: 1200,
    y: 620,
    width: 320,
    height: 260,
    doorX: 1360,
    doorY: 860,
    interactionRadius: 85,
    collisionBox: { x: 1210, y: 680, w: 300, h: 180 },
    iconName: 'Shield',
    themeColor: '#e6b55c',
    bannerColor: '#9e2a2b',
    description: 'Civic cathedral hall where the developer profiles origin, MCA Data Science background, and personal journey.'
  },
  {
    id: 'blacksmith',
    name: 'Blacksmith',
    subtitle: 'Skills & Arsenal',
    district: 'Crafting District',
    x: 1750,
    y: 800,
    width: 260,
    height: 220,
    doorX: 1840,
    doorY: 1000,
    interactionRadius: 85,
    collisionBox: { x: 1760, y: 840, w: 240, h: 160 },
    iconName: 'Hammer',
    themeColor: '#f97316',
    bannerColor: '#ea580c',
    description: 'Fiery forge where skills in Python, SQL, Machine Learning, and Modern Web are tempered.'
  },
  {
    id: 'project_bazaar',
    name: 'Project Bazaar',
    subtitle: 'Featured Projects',
    district: 'Market District',
    x: 1720,
    y: 1180,
    width: 290,
    height: 220,
    doorX: 1820,
    doorY: 1380,
    interactionRadius: 85,
    collisionBox: { x: 1730, y: 1220, w: 270, h: 160 },
    iconName: 'Store',
    themeColor: '#ec4899',
    bannerColor: '#be185d',
    description: 'Lively marketplace with merchant stalls showcasing MindPulse AI, Lost & Found AI, CONNEXA, and live demos.'
  },
  {
    id: 'library',
    name: 'Ancient Library',
    subtitle: 'Knowledge & Learning',
    district: 'Knowledge District',
    x: 720,
    y: 700,
    width: 270,
    height: 250,
    doorX: 850,
    doorY: 930,
    interactionRadius: 85,
    collisionBox: { x: 730, y: 740, w: 250, h: 190 },
    iconName: 'BookOpen',
    themeColor: '#60a5fa',
    bannerColor: '#2563eb',
    description: 'Gothic scholarly sanctum filled with tomes on Data Science, Machine Learning, Certifications, and curated study notes.'
  },
  {
    id: 'coffee_shop',
    name: 'Coffee Shop & Tavern',
    subtitle: 'Blog & Personality',
    district: 'Market District',
    x: 640,
    y: 1080,
    width: 270,
    height: 220,
    doorX: 780,
    doorY: 1280,
    interactionRadius: 85,
    collisionBox: { x: 650, y: 1120, w: 250, h: 160 },
    iconName: 'Coffee',
    themeColor: '#eab308',
    bannerColor: '#ca8a04',
    description: 'Cozy hearthside tavern with freshly brewed coffee, engineering reflections, reading lists, and philosophy.'
  },
  {
    id: 'observatory',
    name: 'Observatory',
    subtitle: 'Future & Research',
    district: 'Knowledge District',
    x: 820,
    y: 340,
    width: 220,
    height: 200,
    doorX: 920,
    doorY: 520,
    interactionRadius: 80,
    collisionBox: { x: 830, y: 380, w: 200, h: 140 },
    iconName: 'Compass',
    themeColor: '#a855f7',
    bannerColor: '#7e22ce',
    description: 'Starlit high dome peering into the future of Artificial General Intelligence, generative models, and research horizons.'
  },
  {
    id: 'academy',
    name: 'Grand Academy',
    subtitle: 'Education & Honors',
    district: 'Knowledge District',
    x: 1780,
    y: 420,
    width: 250,
    height: 230,
    doorX: 1880,
    doorY: 630,
    interactionRadius: 80,
    collisionBox: { x: 1790, y: 460, w: 230, h: 170 },
    iconName: 'GraduationCap',
    themeColor: '#38bdf8',
    bannerColor: '#0284c7',
    description: 'Prestigious academic towers detailing BCA, MCA in Data Science, coursework, honors, and thesis research.'
  },
  {
    id: 'arena',
    name: 'Achievement Arena',
    subtitle: 'Hackathons & Trophies',
    district: 'Guild District',
    x: 1680,
    y: 1540,
    width: 260,
    height: 210,
    doorX: 1780,
    doorY: 1720,
    interactionRadius: 85,
    collisionBox: { x: 1690, y: 1580, w: 240, h: 140 },
    iconName: 'Trophy',
    themeColor: '#fbbf24',
    bannerColor: '#d97706',
    description: 'Coliseum of triumphs showcasing competitive hackathons, innovation prizes, coding contests, and badges.'
  },
  {
    id: 'adventurers_inn',
    name: 'Adventurer\'s Inn',
    subtitle: 'Contact & Guestbook',
    district: 'Residential District',
    x: 680,
    y: 1500,
    width: 260,
    height: 210,
    doorX: 810,
    doorY: 1690,
    interactionRadius: 85,
    collisionBox: { x: 690, y: 1540, w: 240, h: 150 },
    iconName: 'Mail',
    themeColor: '#34d399',
    bannerColor: '#059669',
    description: 'Warm lodge where fellow travelers, recruiters, and collaborators can leave a parchment dispatch or connect on socials.'
  },
  {
    id: 'royal_archive',
    name: 'Royal Archive',
    subtitle: 'Official Resume',
    district: 'Guild District',
    x: 1320,
    y: 280,
    width: 230,
    height: 190,
    doorX: 1420,
    doorY: 450,
    interactionRadius: 80,
    collisionBox: { x: 1330, y: 320, w: 210, h: 130 },
    iconName: 'Scroll',
    themeColor: '#fb7185',
    bannerColor: '#e11d48',
    description: 'Venerated chamber preserving the illuminated parchment resume, credential transcripts, and direct PDF downloads.'
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q_guild',
    title: 'Visit the Guild Hall',
    description: 'Seek the Grand Guild Hall to learn about the developer\'s background, MCA Data Science journey, and vision.',
    buildingId: 'guild_hall',
    completed: false,
    rewardXp: 350
  },
  {
    id: 'q_blacksmith',
    title: 'Inspect the Blacksmith Forge',
    description: 'Witness the anvil of knowledge where Python, SQL, and ML skills are forged.',
    buildingId: 'blacksmith',
    completed: false,
    rewardXp: 300
  },
  {
    id: 'q_bazaar',
    title: 'Check the Project Bazaar',
    description: 'Browse the stalls showcasing MindPulse AI, Lost & Found AI, and CONNEXA.',
    buildingId: 'project_bazaar',
    completed: false,
    rewardXp: 400
  },
  {
    id: 'q_library',
    title: 'Talk to the Librarian',
    description: 'Uncover ancient tomes of learning, courses, and technical certifications.',
    buildingId: 'library',
    completed: false,
    rewardXp: 250
  },
  {
    id: 'q_coffee',
    title: 'Order a Brew at the Tavern',
    description: 'Relax at the coffee shop and read developer thoughts, tech reflections, and creative pursuits.',
    buildingId: 'coffee_shop',
    completed: false,
    rewardXp: 200
  },
  {
    id: 'q_archive',
    title: 'Get your Resume',
    description: 'Visit the Royal Archive to inspect or download the official developer credentials.',
    buildingId: 'royal_archive',
    completed: false,
    rewardXp: 300
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'mindpulse-ai',
    title: 'MindPulse AI',
    category: 'AI/ML',
    badge: 'AI + Mental Health',
    shortDesc: 'Intelligent real-time emotional and mental well-being evaluation system combining acoustic biomarkers and semantic NLP.',
    fullDesc: 'MindPulse AI was engineered to bridge accessibility gaps in mental health screenings. Using fine-tuned transformer models and speech-to-intent analysis, it detects subtle markers of stress, anxiety, and fatigue while strictly honoring zero-knowledge local encryption.',
    problem: 'Traditional mental wellness assessments are periodic, stigmatized, and fail to catch early markers of burnout or distress before escalation.',
    solution: 'Engineered an accessible companion application that ingests multimodal inputs (voice journals and short reflections) to generate actionable resilience insights, mood trajectories, and clinical-grade summarization without violating user privacy.',
    technologies: ['Python', 'FastAPI', 'PyTorch', 'HuggingFace', 'Transformers', 'Librosa', 'React'],
    githubUrl: 'https://github.com/thedevnomad/mindpulse-ai',
    liveUrl: 'https://mindpulse-ai.demo.app',
    status: 'Completed',
    featured: true,
    imageAccent: '#3b82f6'
  },
  {
    id: 'lost-and-found-ai',
    title: 'Lost & Found AI',
    category: 'AI/ML',
    badge: 'Vision + Retrieval',
    shortDesc: 'Cross-modal image-to-text semantic discovery system matching lost personal belongings with high-dimensional vector search.',
    fullDesc: 'Lost & Found AI transforms chaotic campus and community lost item boards into an automated visual retrieval engine. Using OpenAI\'s CLIP embeddings and HNSW vector indexing, users can search via messy cell phone photos or natural text descriptions like "black leather wallet with brass crest".',
    problem: 'Lost item repositories are notoriously disorganized, relying on ambiguous keyword searches that fail when items are categorized under differing nomenclature.',
    solution: 'Employed dual-encoder CLIP vision models to project photos and free-form natural language queries into a unified latent metric space, yielding 94.6% top-5 retrieval precision.',
    technologies: ['Python', 'CLIP', 'FAISS', 'MongoDB', 'FastAPI', 'Docker', 'OpenCV'],
    githubUrl: 'https://github.com/thedevnomad/lost-and-found-ai',
    liveUrl: 'https://lostfound-ai.demo.app',
    status: 'Completed',
    featured: true,
    imageAccent: '#a855f7'
  },
  {
    id: 'connexa',
    title: 'CONNEXA',
    category: 'Web',
    badge: 'Interest-based Matching',
    shortDesc: 'Dynamic peer discovery and hackathon team generation platform powered by skill graph embeddings and real-time collaboration.',
    fullDesc: 'CONNEXA revolutionizes how student developers and researchers form high-performing multidisciplinary squads for hackathons, capstones, and open-source projects. It analyzes complementary skill matrices, availability schedules, and behavioral preferences.',
    problem: 'Solo builders and students struggle to find complementary teammates with aligned ambition and matching tech stacks under tight hackathon deadlines.',
    solution: 'Designed an interactive matchmaking platform featuring bipartite graph optimization, live WebRTC audio/chat rooms, and intelligent squad recommendation heuristics.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Socket.io', 'Neo4j', 'TailwindCSS'],
    githubUrl: 'https://github.com/thedevnomad/connexa',
    liveUrl: 'https://connexa-network.demo.app',
    status: 'Completed',
    featured: true,
    imageAccent: '#ec4899'
  },
  {
    id: 'datavanguard',
    title: 'DataVanguard Analytics',
    category: 'Data',
    badge: 'Predictive BI Suite',
    shortDesc: 'End-to-end telemetry and automated statistical anomaly detection pipeline with executive Power BI & Streamlit dashboards.',
    fullDesc: 'High-throughput time-series analysis framework that processes supply-chain logistics records, flags out-of-distribution trends with seasonal ARIMA and Isolation Forests, and publishes live executive dashboards.',
    problem: 'Enterprise supply-chain teams often detect inventory bottlenecks 48 hours too late due to batch processing delays and lack of automated predictive warnings.',
    solution: 'Constructed an automated ETL pipeline with pandas and SQL, integrated machine learning anomaly alerts, and deployed self-service interactive visuals with Power BI.',
    technologies: ['Python', 'SQL', 'Pandas', 'Power BI', 'Scikit-Learn', 'Streamlit'],
    githubUrl: 'https://github.com/thedevnomad/datavanguard',
    liveUrl: 'https://datavanguard.demo.app',
    status: 'Completed',
    featured: false,
    imageAccent: '#10b981'
  },
  {
    id: 'ethereumnomad-zk',
    title: 'VeriShield Zero-Knowledge',
    category: 'Hackathon',
    badge: '1st Place Hackathon Winner',
    shortDesc: 'ZK-SNARK identity verification bridge enabling privacy-preserving credential authentication for student developers.',
    fullDesc: 'Built in 36 sleepless hours at HackOdyssey 2024. Enables students to cryptographically prove university enrollment and GPA thresholds to recruiters without exposing personal identifying records.',
    problem: 'Traditional identity verification forces candidates to surrender unredacted transcripts and identity numbers, creating massive data privacy vulnerabilities.',
    solution: 'Used Circom circuits and Groth16 zero-knowledge proofs to authenticate candidate claims on-chain with sub-second browser verification.',
    technologies: ['TypeScript', 'Circom', 'Solidity', 'Next.js', 'Ethers.js'],
    githubUrl: 'https://github.com/thedevnomad/verishield-zk',
    liveUrl: 'https://verishield.demo.app',
    status: 'Completed',
    featured: false,
    imageAccent: '#f59e0b'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages',
    icon: 'Code2',
    skills: [
      { name: 'Python', level: 90, experience: '3+ Years', description: 'Primary language for Data Science, ML pipelines, FastAPI backends, and algorithmic scripts.' },
      { name: 'SQL', level: 85, experience: '3 Years', description: 'Advanced window functions, complex joins, CTEs, indexing, and relational schema optimization.' },
      { name: 'Pandas & NumPy', level: 85, experience: '2.5 Years', description: 'High-performance vector operations, tabular wrangling, feature engineering, and data cleaning.' },
      { name: 'Power BI / BI Tools', level: 80, experience: '2 Years', description: 'DAX expressions, semantic modeling, star schemas, and interactive executive reporting.' },
      { name: 'C / C++', level: 70, experience: '2 Years', description: 'Core data structures, object-oriented principles, memory management, and competitive programming.' },
      { name: 'JavaScript / TypeScript', level: 75, experience: '2 Years', description: 'Modern asynchronous web applications, typed React components, and Node.js microservices.' }
    ]
  },
  {
    id: 'data_ai',
    name: 'Data & AI',
    icon: 'BrainCircuit',
    skills: [
      { name: 'Machine Learning', level: 85, experience: '2.5 Years', description: 'Supervised & unsupervised algorithms: XGBoost, Random Forests, SVMs, clustering, and cross-validation.' },
      { name: 'Deep Learning (PyTorch)', level: 80, experience: '2 Years', description: 'CNNs for vision, RNNs/Transformers for sequences, loss optimization, and transfer learning.' },
      { name: 'Natural Language Processing', level: 82, experience: '2 Years', description: 'Tokenization, embeddings, HuggingFace transformers, BERT, text classification, and sentiment models.' },
      { name: 'Computer Vision', level: 78, experience: '1.5 Years', description: 'OpenCV image preprocessing, object detection, feature extractors, and multimodal CLIP.' },
      { name: 'Statistical Analysis & EDA', level: 88, experience: '3 Years', description: 'Hypothesis testing, A/B experiments, probability distributions, regression, and variance analysis.' }
    ]
  },
  {
    id: 'tools',
    name: 'Tools & DevOps',
    icon: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 90, experience: '3 Years', description: 'Branch management, pull requests, semantic commit conventions, and collaborative workflows.' },
      { name: 'Docker & Containers', level: 78, experience: '1.5 Years', description: 'Containerizing ML inference APIs, multi-stage Dockerfiles, and compose environments.' },
      { name: 'FastAPI & REST APIs', level: 85, experience: '2 Years', description: 'Asynchronous Python endpoints, Pydantic data schemas, automatic Swagger docs, and JWT auth.' },
      { name: 'Jupyter & Google Colab', level: 92, experience: '3 Years', description: 'Reproducible research notebooks, GPU acceleration, and interactive visualization.' },
      { name: 'PostgreSQL & MongoDB', level: 80, experience: '2 Years', description: 'Relational data integrity alongside flexible JSON document storage and vector indexing.' }
    ]
  },
  {
    id: 'other',
    name: 'Core & Soft Skills',
    icon: 'Sparkles',
    skills: [
      { name: 'Problem Solving & DSA', level: 84, experience: '3 Years', description: 'Algorithmic efficiency, graph traversals, dynamic programming, and complexity optimization.' },
      { name: 'Data Storytelling', level: 88, experience: '2.5 Years', description: 'Translating complex quantitative metrics into concise executive takeaways and visual narratives.' },
      { name: 'Collaborative Teamwork', level: 92, experience: 'All Years', description: 'Cross-functional leadership in collegiate hackathons, agile sprints, and peer mentorship.' }
    ]
  }
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'nomad_quill',
    name: 'Enchanted Data Quill',
    type: 'artifact',
    rarity: 'legendary',
    description: 'A magical writing instrument infused with Python and statistical rigor. It writes code that compiles without warnings.',
    icon: 'Feather',
    obtainedAt: 'Guild Hall Entrance'
  },
  {
    id: 'sacred_mug',
    name: 'Hearthstone Tavern Coffee Mug',
    type: 'consumable',
    rarity: 'rare',
    description: 'Freshly brewed dark roast. Grants +50 Concentration and banishes bugs in asynchronous routines.',
    icon: 'Coffee',
    obtainedAt: 'Coffee Shop Bar'
  },
  {
    id: 'datascience_grimoire',
    name: 'Tome of Machine Learning',
    type: 'tome',
    rarity: 'epic',
    description: 'Bound in embossed leather with runes of Gradient Descent and Backpropagation.',
    icon: 'Book',
    obtainedAt: 'Ancient Library Shelf 4'
  },
  {
    id: 'master_hammer',
    name: 'Blacksmith\'s Code Mallet',
    type: 'gear',
    rarity: 'rare',
    description: 'Forged from tempered iron and Git commits. Strikes down race conditions with decisive force.',
    icon: 'Hammer',
    obtainedAt: 'Town Anvil'
  },
  {
    id: 'royal_seal',
    name: 'Wax-Sealed Archive Transcript',
    type: 'artifact',
    rarity: 'epic',
    description: 'Official academic transcript certifying Master of Computer Applications in Data Science.',
    icon: 'Scroll',
    obtainedAt: 'Royal Archive Vault'
  }
];

// NPCs with autonomous state schedules and realistic districts
export const NPCS: NPC[] = [
  {
    id: 'npc_blacksmith',
    name: 'Torvald the Smith',
    role: 'Master Craftsman',
    district: 'Crafting District',
    x: 1810,
    y: 970,
    direction: 'down',
    state: 'working',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [
      { x: 1810, y: 970, state: 'working', duration: 12, facing: 'down' },
      { x: 1780, y: 990, state: 'idle', duration: 4, facing: 'right' },
      { x: 1840, y: 960, state: 'working', duration: 8, facing: 'left' }
    ],
    icon: 'Hammer',
    currentDialogIndex: 0,
    dialog: [
      'Greetings traveler! I shape raw logic into unbreakable algorithms here at the forge.',
      'Check my anvil inside to examine TheDevNomad\'s mastery over Python, SQL, and Machine Learning!',
      'May your data pipelines never leak!'
    ]
  },
  {
    id: 'npc_librarian',
    name: 'Archivist Elenora',
    role: 'Keeper of Knowledge',
    district: 'Knowledge District',
    x: 820,
    y: 910,
    direction: 'down',
    state: 'working',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [
      { x: 820, y: 910, state: 'working', duration: 10, facing: 'down' },
      { x: 860, y: 920, state: 'walking', duration: 4, facing: 'right' },
      { x: 860, y: 920, state: 'idle', duration: 6, facing: 'up' },
      { x: 820, y: 910, state: 'walking', duration: 4, facing: 'left' }
    ],
    icon: 'BookOpen',
    currentDialogIndex: 0,
    dialog: [
      'Welcome to the Sanctuary of Learning. Knowledge is the greatest spell a developer can cast.',
      'Within our library shelves you will find verified certificates, curated coursework, and deep notes.',
      'Take your time; wisdom requires quiet contemplation.'
    ]
  },
  {
    id: 'npc_merchant',
    name: 'Bazaar Merchant Kaelen',
    role: 'Tech Trader',
    district: 'Market District',
    x: 1790,
    y: 1350,
    direction: 'down',
    state: 'working',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [
      { x: 1790, y: 1350, state: 'working', duration: 8, facing: 'down' },
      { x: 1760, y: 1360, state: 'idle', duration: 5, facing: 'right' },
      { x: 1820, y: 1350, state: 'working', duration: 7, facing: 'left' }
    ],
    icon: 'ShoppingBag',
    currentDialogIndex: 0,
    dialog: [
      'Step right up! The freshest AI solutions in the realm are on display here at the Bazaar!',
      'MindPulse AI, Lost & Found AI, CONNEXA—every project is crafted with care and live source code.',
      'Come inside the stall to inspect the blueprints!'
    ]
  },
  {
    id: 'npc_barista',
    name: 'Aria the Tavern Keeper',
    role: 'Hostess & Barista',
    district: 'Market District',
    x: 750,
    y: 1250,
    direction: 'right',
    state: 'working',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [
      { x: 750, y: 1250, state: 'working', duration: 10, facing: 'right' },
      { x: 720, y: 1240, state: 'idle', duration: 5, facing: 'down' },
      { x: 750, y: 1250, state: 'walking', duration: 4, facing: 'right' }
    ],
    icon: 'Coffee',
    currentDialogIndex: 0,
    dialog: [
      'Warm greetings! Sit by our hearth, grab a hot espresso, and peruse our engineering journal.',
      'Great thoughts happen over great coffee. Feel free to stay as long as you wish!'
    ]
  },
  {
    id: 'npc_cat',
    name: 'Mochi the White Cat',
    role: 'Town Familiar',
    district: 'Central Plaza',
    x: 1140,
    y: 1180,
    direction: 'right',
    state: 'idle',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [
      { x: 1140, y: 1180, state: 'idle', duration: 6, facing: 'right' },
      { x: 1190, y: 1170, state: 'walking', duration: 4, facing: 'right' },
      { x: 1190, y: 1170, state: 'idle', duration: 8, facing: 'down' },
      { x: 1140, y: 1180, state: 'walking', duration: 4, facing: 'left' }
    ],
    icon: 'Sparkles',
    currentDialogIndex: 0,
    dialog: [
      '*Purrrr*... Mochi rubs against your boots happily!',
      '*Meow!* Mochi glances toward the glowing mana crystal fountain.',
      'Mochi seems to believe you are destined for great coding achievements!'
    ]
  },
  {
    id: 'npc_guildmaster',
    name: 'Guildmaster Valerius',
    role: 'Guild Master',
    district: 'Guild District',
    x: 1360,
    y: 910,
    direction: 'down',
    state: 'idle',
    stateTimer: 0,
    scheduleIndex: 0,
    schedule: [
      { x: 1360, y: 910, state: 'idle', duration: 10, facing: 'down' },
      { x: 1380, y: 900, state: 'idle', duration: 6, facing: 'left' }
    ],
    icon: 'Shield',
    currentDialogIndex: 0,
    dialog: [
      'Welcome adventurer to our fellowship. The Guild Hall holds all records of TheDevNomad\'s quest.',
      'Step through the grand cathedral doors to review their career roadmap and education!'
    ]
  }
];
