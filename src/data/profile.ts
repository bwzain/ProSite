export interface CareerItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: "creative" | "enterprise" | "leadership";
  summary: string;
  achievements: string[];
  techStack: string[];
}

export interface Accomplishment {
  id: string;
  title: string;
  category: "Award" | "Certification" | "Publication" | "Education";
  issuer: string;
  year: string;
  description: string;
  iconName: string;
  badgeText: string;
  highlightColor: string;
  link?: string;
}

export interface WebsiteLink {
  id: string;
  title: string;
  tagline: string;
  url: string;
  category: "Music" | "Book" | "Travel" | "Enterprise" | "Social";
  description: string;
  image: string;
  accentGlow: string;
  stats?: { label: string; value: string }[];
  featured?: boolean;
}

export interface BeatTrack {
  id: string;
  title: string;
  genre: string;
  duration: string;
  bpm: number;
  key: string;
  description: string;
  audioSimulationUrl?: string;
}

export const PROFILE_DATA = {
  name: "William Zain",
  handle: "@bwzain",
  heroSubtitle: "Enterprise Tech Architect turned Digital Music Producer & Published AI Author.",
  location: "Orange County, California",
  email: "bwzain@gmail.com",
  linkedIn: "https://www.linkedin.com/in/bwzain",
  
  stats: [
    { label: "Years in Enterprise Tech", value: "30+" },
    { label: "Automation Solutions Built", value: "100s" },
    { label: "Published Books", value: "1" },
    { label: "Toastmasters Distinction", value: "DTM" },
  ],

  about: {
    storyParagraphs: [
      "I built a 30+ year career inside the high-stakes world of enterprise IT, designing mission-critical process automation, cloud architectures, and multi-tier systems for global corporations and Fortune 500 partners.",
      "As a former Senior Solution Consultant at Nintex and Principal Technical Consultant at Calance for over 24 years, I mastered complex platforms—from AWS Cloud Architecture and K2 Workflow BPM to RPA automation and SAP ERP integrations.",
      "Today, I've pivoted that same precision engineering into pure creative output. I compose cinematic soundscapes and electronic beats under Zainy Beats, write accessible guides on cutting-edge Artificial Intelligence, and travel the globe documenting stories at 'I Wish You Were Here'."
    ],
    motto: "Engineering precision meets raw artistic soundscapes.",
    creativePillars: [
      {
        title: "Digital Music Production",
        subtitle: "Zainy Beats",
        description: "Designing soundscapes, electronic beats, and atmospheric music using Ableton Live and advanced digital synthesizer tech.",
        icon: "Headphones"
      },
      {
        title: "AI Author & Educator",
        subtitle: "Published Work",
        description: "Author of 'Introduction to Artificial Intelligence', demystifying generative AI, machine learning, and automation for everyday creators.",
        icon: "BookOpen"
      },
      {
        title: "Enterprise Automation",
        subtitle: "30+ Years Legacy",
        description: "Architecting cloud infrastructure, K2/Nintex workflow automation, RPA bots, and legacy-to-ERP enterprise integrations.",
        icon: "Cpu"
      },
      {
        title: "Global Storytelling",
        subtitle: "I Wish You Were Here",
        description: "Documenting hidden gems, travel guides, and cultural photography for curious explorers worldwide.",
        icon: "Compass"
      }
    ]
  },

  book: {
    title: "Introduction to Artificial Intelligence",
    subtitle: "What you need to know to get started with AI",
    author: "William Zain",
    amazonUrl: "https://www.amazon.com/dp/B0FG18QJWF",
    description: "A practical, approachable breakdown of AI for non-technical readers, executives, and curious creators looking to harness machine intelligence in everyday life.",
    features: [
      "Demystifying Large Language Models (LLMs) & Neural Networks",
      "Practical AI automation strategies for daily workflow",
      "Ethical considerations, security & the future of creative AI",
      "Actionable prompt engineering techniques & toolkits"
    ]
  },

  musicTracks: [
    {
      id: "track-1",
      title: "Cyberpunk Synapses",
      genre: "Synthwave / Cyberpunk",
      duration: "3:42",
      bpm: 124,
      key: "F minor",
      description: "Atmospheric pulse blending distorted sub-basses with futuristic arp arpeggios."
    },
    {
      id: "track-2",
      title: "Echoes of Anaheim",
      genre: "Chill Lofi Beat",
      duration: "2:55",
      bpm: 88,
      key: "C Major",
      description: "Warm tape-saturations, smooth Rhodes keys, and vinyl crackle grooves."
    },
    {
      id: "track-3",
      title: "Neural Horizon",
      genre: "Cinematic Ambient",
      duration: "4:15",
      bpm: 110,
      key: "A minor",
      description: "Expansive orchestral strings layered over analog synthesis and lush reverb tails."
    }
  ] as BeatTrack[],

  websites: [
    {
      id: "zainy-beats",
      title: "Zainy Beats",
      tagline: "Music Production & Sound Design Studio",
      url: "https://www.linkedin.com/in/bwzain",
      category: "Music",
      description: "Official music production hub producing soundscapes, beat arrangements, and electronic compositions using Ableton Live and modern digital audio workstations.",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      accentGlow: "from-purple-500 to-pink-500",
      featured: true,
      stats: [
        { label: "Primary DAW", value: "Ableton Live" },
        { label: "Focus", value: "Sound Design" }
      ]
    },
    {
      id: "ai-book",
      title: "Introduction to AI (Amazon)",
      tagline: "Published Book on Everyday Artificial Intelligence",
      url: "https://www.amazon.com/dp/B0FG18QJWF",
      category: "Book",
      description: "William Zain's published guide making AI approachable, actionable, and practical for everyday professionals and enthusiasts.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      accentGlow: "from-cyan-500 to-blue-600",
      featured: true,
      stats: [
        { label: "Platform", value: "Amazon Kindle/Print" },
        { label: "Subject", value: "Artificial Intelligence" }
      ]
    },
    {
      id: "travel-blog",
      title: "I Wish You Were Here",
      tagline: "Travel Guides, Hidden Gems & Inspiration",
      url: "https://i-wish-you-were-here.com/",
      category: "Travel",
      description: "A travel platform sharing authentic travel guides, cultural insights, and hidden gems for curious explorers around the world.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
      accentGlow: "from-emerald-400 to-teal-600",
      featured: true,
      stats: [
        { label: "Content", value: "Travel & Photo" },
        { label: "Audience", value: "Global Explorers" }
      ]
    },
    {
      id: "calance",
      title: "Calance",
      tagline: "Global Enterprise Technology & Consulting",
      url: "https://www.calanceus.com/",
      category: "Enterprise",
      description: "Enterprise IT consulting firm where William spent 24+ years building mission-critical workflow systems, SAP ERP integrations, and cloud solutions.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      accentGlow: "from-blue-600 to-indigo-800",
      featured: false,
      stats: [
        { label: "Role", value: "Technical Consultant" },
        { label: "Tenure", value: "24+ Years" }
      ]
    },
    {
      id: "linkedin",
      title: "LinkedIn Profile",
      tagline: "Professional Network & Experience",
      url: "https://www.linkedin.com/in/bwzain",
      category: "Social",
      description: "Connect with William Zain on LinkedIn for professional background, endorsements, and networking.",
      image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1200&auto=format&fit=crop",
      accentGlow: "from-sky-500 to-blue-700",
      featured: false,
      stats: [
        { label: "Location", value: "Orange County, CA" },
        { label: "Network", value: "Global Enterprise" }
      ]
    }
  ] as WebsiteLink[],

  careers: [
    {
      id: "c-author",
      role: "Published Author",
      company: "Self-employed",
      period: "June 2025 - Present",
      location: "Anaheim, California",
      type: "creative",
      summary: "Authored and published 'Introduction to Artificial Intelligence', breaking down AI concepts into clear, actionable principles for business leaders and creators.",
      achievements: [
        "Published 'Introduction to Artificial Intelligence' on Amazon (Paperback/Kindle).",
        "Developed frameworks for understanding machine learning, generative tools, and prompt workflows.",
        "Created accessible educational guides for non-technical users."
      ],
      techStack: ["Generative AI", "LLMs", "Publishing", "Content Strategy"]
    },
    {
      id: "c-zainy",
      role: "Music Producer & Sound Designer",
      company: "Zainy Beats",
      period: "April 2024 - Present",
      location: "Anaheim, California",
      type: "creative",
      summary: "Composing and producing music tracks across electronic, synthwave, ambient, and lofi genres using cutting-edge digital music tech.",
      achievements: [
        "Built studio production workflow utilizing Ableton Live and digital synths.",
        "Designed custom sample libraries, atmospheric presets, and soundscapes.",
        "Engineered audio tracks for streaming and media synchronization."
      ],
      techStack: ["Ableton Live", "MIDI", "Digital Audio Synthesis", "Sound Engineering"]
    },
    {
      id: "c-retired",
      role: "Retired Automation Expert & Creator",
      company: "ZainTech",
      period: "April 2023 - Present",
      location: "Orange County, California",
      type: "creative",
      summary: "Pivoted from 30+ years in corporate enterprise tech to personal creative endeavors, book authoring, music production, and travel media.",
      achievements: [
        "Transitioned decades of enterprise problem solving into creative mediums.",
        "Launched travel blog 'I Wish You Were Here' and creative publishing ventures."
      ],
      techStack: ["Creative Direction", "Blogging", "Strategic Consulting"]
    },
    {
      id: "c-nintex",
      role: "Solution Consultant",
      company: "Nintex",
      period: "August 2019 - April 2023 (3 yrs 9 mos)",
      location: "Bellevue, WA",
      type: "enterprise",
      summary: "Helped enterprise clients automate complex business processes using the Nintex platform, K2 Workflow, NWC, Kryon RPA, and Drawloop.",
      achievements: [
        "Advised over 10,000 public and private sector client opportunities on intelligent process automation (IPA).",
        "Designed and implemented high-ROI automated workflows using K2 and Kryon RPA technology.",
        "Led client digital transformation journeys through interactive solution architecture workshops."
      ],
      techStack: ["K2 Workflow", "Nintex Workflow Cloud (NWC)", "Kryon RPA", "Drawloop", "Process Mining"]
    },
    {
      id: "c-calance",
      role: "Technical Consultant & AWS Architect",
      company: "Calance",
      period: "June 1995 - August 2019 (24 yrs 3 mos)",
      location: "Buena Park, CA",
      type: "enterprise",
      summary: "Spent 24+ years architecting enterprise BPM solutions, managing cloud environments, and leading complex web/ERP integrations.",
      achievements: [
        "Acted as primary AWS Account Administrator, optimizing cloud costs, security policies, and resource deployment.",
        "Managed major dealer-facing website integration with SAP ERP for global automotive and manufacturing clients.",
        "Built multi-tier enterprise web applications using ASP.NET, C#, MS SQL, Drupal, and WordPress.",
        "Designed document capture solutions with Kofax Capture and custom C# plugins."
      ],
      techStack: ["AWS Cloud Architecture", "K2 BPM Workflow", "SAP ERP", "C# / ASP.NET", "MS SQL", "Drupal", "WordPress", "Kofax"]
    },
    {
      id: "c-isuzu",
      role: "Programmer / Analyst (Consultant)",
      company: "Isuzu Motors America",
      period: "October 1989 - June 1995 (5 yrs 9 mos)",
      location: "Cerritos, CA",
      type: "enterprise",
      summary: "Maintained mainframe applications and developed custom database applications to streamline operations for Isuzu Motors.",
      achievements: [
        "Maintained core mainframe business systems while introducing PC-based solutions.",
        "Built custom MS Access and Visual Basic applications connected to SQL backend databases."
      ],
      techStack: ["Mainframe COBOL", "MS Access", "Visual Basic", "SQL Backend", "DB2 / VSAM"]
    },
    {
      id: "c-forestlawn",
      role: "Programmer / Analyst",
      company: "Forest Lawn Memorial Parks",
      period: "January 1987 - October 1989 (2 yrs 10 mos)",
      location: "Glendale, CA",
      type: "enterprise",
      summary: "Mainframe programmer developing and optimizing records and operations tracking software.",
      achievements: [
        "Programmed mainframe data pipelines and records management systems."
      ],
      techStack: ["Mainframe", "COBOL", "CICS"]
    }
  ] as CareerItem[],

  accomplishments: [
    {
      id: "acc-dtm",
      title: "Distinguished Toastmaster (DTM)",
      category: "Award",
      issuer: "Toastmasters International",
      year: "Honored",
      description: "The highest accolade in Toastmasters International, recognizing ultimate mastery in public speaking, strategic leadership, and communication.",
      iconName: "Trophy",
      badgeText: "Highest Toastmasters Rank",
      highlightColor: "from-amber-400 to-yellow-600"
    },
    {
      id: "acc-div-dir",
      title: "Distinguished Division Director",
      category: "Award",
      issuer: "Toastmasters International",
      year: "Honored",
      description: "Led an entire Toastmasters division to distinguished performance, mentoring club presidents and organizing speech contests.",
      iconName: "Award",
      badgeText: "Leadership Excellence",
      highlightColor: "from-purple-500 to-indigo-600"
    },
    {
      id: "acc-book-pub",
      title: "Published AI Author",
      category: "Publication",
      issuer: "Amazon Publishing",
      year: "2025",
      description: "Author of 'Introduction to Artificial Intelligence: What you need to know to get started with AI'.",
      iconName: "BookOpen",
      badgeText: "Published Book",
      highlightColor: "from-cyan-400 to-blue-600",
      link: "https://www.amazon.com/dp/B0FG18QJWF"
    },
    {
      id: "acc-aws",
      title: "AWS Certified Solutions Architect & Developer",
      category: "Certification",
      issuer: "Amazon Web Services",
      year: "Certified",
      description: "Certified expertise in designing scalable, resilient, fault-tolerant cloud infrastructure on AWS.",
      iconName: "Cloud",
      badgeText: "AWS Cloud Certified",
      highlightColor: "from-orange-400 to-amber-600"
    },
    {
      id: "acc-kryon",
      title: "Kryon RPA Developer Certification",
      category: "Certification",
      issuer: "Nintex / Kryon",
      year: "Certified",
      description: "Robotic Process Automation developer certification for automated bot execution and intelligent desktop recording.",
      iconName: "Bot",
      badgeText: "RPA Automation Certified",
      highlightColor: "from-emerald-400 to-teal-600"
    },
    {
      id: "acc-o365",
      title: "Certified Solutions Professional - O365",
      category: "Certification",
      issuer: "Microsoft",
      year: "Certified",
      description: "Enterprise cloud productivity, security, and document management certification.",
      iconName: "ShieldCheck",
      badgeText: "Microsoft Certified",
      highlightColor: "from-sky-400 to-blue-600"
    },
    {
      id: "acc-security",
      title: "Web Security: OAuth and OpenID Connect",
      category: "Certification",
      issuer: "LinkedIn / Technical Certifications",
      year: "Certified",
      description: "Modern web identity, token-based authentication, OAuth2, and OpenID security protocols.",
      iconName: "Lock",
      badgeText: "Security Certified",
      highlightColor: "from-red-400 to-pink-600"
    },
    {
      id: "acc-bs",
      title: "Bachelor of Science in Computer Science",
      category: "Education",
      issuer: "University of Kuwait",
      year: "Graduated",
      description: "Rigorous foundation in computer science theory, algorithms, mainframe systems, and data architecture.",
      iconName: "GraduationCap",
      badgeText: "BS Computer Science",
      highlightColor: "from-violet-400 to-purple-600"
    },
    {
      id: "acc-uci",
      title: ".NET Technologies Professional Program",
      category: "Education",
      issuer: "University of California, Irvine (UCI)",
      year: "Certified",
      description: "Specialized post-graduate training in Microsoft .NET framework, C# architecture, and enterprise software engineering.",
      iconName: "Code",
      badgeText: "UC Irvine Certified",
      highlightColor: "from-indigo-400 to-blue-600"
    }
  ] as Accomplishment[]
};
