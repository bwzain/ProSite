export interface RssStory {
  title: string;
  link: string;
  image: string;
  teaser: string;
  pubDate: string;
}

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

export interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  coverImage: string;
  amazonUrl: string;
  description: string;
  themeColor: {
    border: string;
    text: string;
    bg: string;
    accentGlow: string;
  };
  features: string[];
  chapters: { number: number; title: string; desc: string }[];
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

export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  duration: string;
  genre: string;
  url: string;
  thumbnail: string;
}

export interface YouTubePlaylistData {
  title: string;
  channelName: string;
  url: string;
  videos: YouTubeVideo[];
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
    coverImage: "/images/intro-to-ai-cover.png",
    amazonUrl: "https://www.amazon.com/dp/B0FG18QJWF",
    description: "A practical, approachable breakdown of AI for non-technical readers, executives, and curious creators looking to harness machine intelligence in everyday life.",
    features: [
      "Demystifying Large Language Models (LLMs) & Neural Networks",
      "Practical AI automation strategies for daily workflow",
      "Ethical considerations, security & the future of creative AI",
      "Actionable prompt engineering techniques & toolkits"
    ]
  },

  books: [
    {
      id: "book-1",
      title: "Introduction to Artificial Intelligence",
      subtitle: "What you need to know to get started with AI",
      author: "William Zain",
      coverImage: "/images/intro-to-ai-cover.png",
      amazonUrl: "https://www.amazon.com/dp/B0FG18QJWF",
      description: "A practical, approachable breakdown of AI for non-technical readers, executives, and curious creators looking to harness machine intelligence in everyday life.",
      themeColor: {
        border: "border-sky-200 dark:border-sky-900/50",
        text: "text-sky-600 dark:text-sky-400",
        bg: "bg-sky-600 hover:bg-sky-500",
        accentGlow: "hover:shadow-sky-500/20"
      },
      features: [
        "Demystifying Large Language Models (LLMs) & Neural Networks",
        "Practical AI automation strategies for daily workflow",
        "Ethical considerations, security & the future of creative AI",
        "Actionable prompt engineering techniques & toolkits"
      ],
      chapters: [
        { number: 1, title: "ML Foundations & Neural Network Concepts", desc: "Core algorithms, training data models, and foundational AI principles." },
        { number: 2, title: "Large Language Models & Generative AI", desc: "Transformer architectures, attention mechanisms, and tokenization." },
        { number: 3, title: "Practical Prompt Workflows for Business", desc: "Crafting structured prompt strategies to automate everyday tasks." },
        { number: 4, title: "Security, OAuth, Ethics & AI Synergy", desc: "Safe deployment, data privacy compliance, and future trends." }
      ]
    },
    {
      id: "book-2",
      title: "Generative AI for Content Creators: A Practical Guide",
      subtitle: "Turn your ideas into stunning images, videos, and music with AI",
      author: "William Zain",
      coverImage: "/images/generative-ai-creators-cover.png",
      amazonUrl: "https://www.amazon.com/dp/B0FSSRXQHJ",
      description: "Creative Partner: A beginner's guide to building your brand with AI. Learn how to turn creative concepts into professional images, videos, music, and digital brand assets.",
      themeColor: {
        border: "border-pink-200 dark:border-pink-900/50",
        text: "text-pink-600 dark:text-pink-400",
        bg: "bg-pink-600 hover:bg-pink-500",
        accentGlow: "hover:shadow-pink-500/20"
      },
      features: [
        "Turn creative ideas into AI-generated images, videos, and soundscapes",
        "Building a cohesive personal or corporate brand identity using AI",
        "Hands-on guide to modern creative generative tools and prompt engineering",
        "Actionable media production workflows for content creators and marketers"
      ],
      chapters: [
        { number: 1, title: "Generative AI Foundations for Creators", desc: "Introduction to creative AI models, capabilities, and essential toolsets." },
        { number: 2, title: "Visual AI & Prompt Design for Branding", desc: "Generating logos, graphics, brand assets, and marketing imagery." },
        { number: 3, title: "AI Video Synthesis & Music Production", desc: "Combining AI audio engines, voice, and dynamic video generation." },
        { number: 4, title: "Scaling Your Brand & Creative Workflows", desc: "Publishing strategy, asset management, and end-to-end automation." }
      ]
    }
  ] as BookItem[],

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

  youtubePlaylist: {
    title: "Billy Zain's Music Videos & Soundscapes",
    channelName: "Billy Zain / Zainy Beats",
    url: "https://www.youtube.com/watch?v=mh29q13G8EE&list=PLPxVaKAOkZW6Xx_45jXFQSN1qa8BqPxHn",
    videos: [
      {
        id: "yt-1",
        videoId: "mh29q13G8EE",
        title: "A Gathering Storm (Official Video)",
        description: "Cinematic/classical instrumental exploring emotional extremes through storm soundscapes and visuals.",
        duration: "4:12",
        genre: "Cinematic / Instrumental",
        url: "https://www.youtube.com/watch?v=mh29q13G8EE&list=PLPxVaKAOkZW6Xx_45jXFQSN1qa8BqPxHn",
        thumbnail: "https://img.youtube.com/vi/mh29q13G8EE/hqdefault.jpg"
      },
      {
        id: "yt-2",
        videoId: "VfpsFYI4ou0",
        title: "Ghost in the Room (Official Music Video)",
        description: "Haunting alt-pop/alt-rock fusion where memory becomes a phantom and grief wears perfume.",
        duration: "3:12",
        genre: "Alt-Pop / Alt-Rock",
        url: "https://www.youtube.com/watch?v=VfpsFYI4ou0",
        thumbnail: "https://img.youtube.com/vi/VfpsFYI4ou0/hqdefault.jpg"
      },
      {
        id: "yt-3",
        videoId: "GyoHKRAQQPg",
        title: "Moscow Lights (Official Music Video)",
        description: "Layered House and Techno textures with poetic lyricism and ambient sound design set in a snow-covered night.",
        duration: "3:45",
        genre: "Ambient Synthwave / Techno",
        url: "https://www.youtube.com/watch?v=GyoHKRAQQPg",
        thumbnail: "https://img.youtube.com/vi/GyoHKRAQQPg/hqdefault.jpg"
      },
      {
        id: "yt-4",
        videoId: "rxoyTfn6pso",
        title: "Steel Canyon Ghosts (Official Audio)",
        description: "Pulsing electronic arrangement and driving rhythms from the album Cultural Static.",
        duration: "4:22",
        genre: "Electronic / Synth",
        url: "https://www.youtube.com/watch?v=rxoyTfn6pso",
        thumbnail: "https://img.youtube.com/vi/rxoyTfn6pso/hqdefault.jpg"
      }
    ]
  } as YouTubePlaylistData,

  websites: [
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
      id: "fb-travel",
      title: "Facebook - World Traveler",
      tagline: "Global Travel & Photo Updates",
      url: "https://www.facebook.com/bwzain",
      category: "Travel",
      description: "Official Facebook page documenting William Zain's travel adventures, photo logs, and cultural stories around the globe.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      accentGlow: "from-blue-500 to-teal-500",
      featured: true,
      stats: [
        { label: "Platform", value: "Facebook" },
        { label: "Focus", value: "World Traveler" }
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
      id: "ai-book-creators",
      title: "Generative AI for Content Creators",
      tagline: "Published Book on Brand Building with AI",
      url: "https://www.amazon.com/dp/B0FSSRXQHJ",
      category: "Book",
      description: "William Zain's practical guide to turning ideas into stunning images, videos, and music with generative AI.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      accentGlow: "from-pink-500 to-purple-600",
      featured: true,
      stats: [
        { label: "Platform", value: "Amazon Kindle/Print" },
        { label: "Subject", value: "Generative AI" }
      ]
    },
    {
      id: "fb-author",
      title: "Facebook - Author Page",
      tagline: "AI Books & Literature Community",
      url: "https://www.facebook.com/AuthorWilliamZain",
      category: "Book",
      description: "Official Facebook author page for William Zain's AI books, reader community, literature news, and generative tech insights.",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
      accentGlow: "from-indigo-500 to-purple-600",
      featured: true,
      stats: [
        { label: "Platform", value: "Facebook" },
        { label: "Focus", value: "Author & AI Literature" }
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
      description: "Author of 'Introduction to Artificial Intelligence' and 'Generative AI for Content Creators'.",
      iconName: "BookOpen",
      badgeText: "Amazon Author Page",
      highlightColor: "from-cyan-400 to-blue-600",
      link: "https://www.amazon.com/stores/William-Zain/author/B0FFN749GN"
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
