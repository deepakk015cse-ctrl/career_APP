import {
  AIChatMessage,
  SkillRecommendation,
  ProjectRecommendation,
  JobRecommendationMatch,
  LearningRoadmapStep,
  InterviewPrepPlan,
  ResumeAnalysisResult,
  VisualRoadmapNode,
} from '../types';

export const initialAIChatMessages: AIChatMessage[] = [
  {
    id: 'ai-msg-1',
    role: 'assistant',
    content: `### 👋 Welcome to DevNexus AI Career Advisor!

I have synthesized your developer profile, including your **DevScore (885/1000)**, **LeetCode metrics (342 Solved, 1845 Rating)**, and verified projects (**CloudMesh** & **HyperPay**).

Here are quick actions you can explore right now:

- 📊 **Skill Recommendations**: High-yield technologies to bridge the gap to SDE-II roles.
- 📄 **Resume Analyzer & ATS**: Upload your resume to get instant scores and Google XYZ impact rewrites.
- 🛠️ **Project Blueprints**: Architectural guides for production-grade distributed systems.
- 🗺️ **Visual Career Roadmap**: Step-by-step pathway from your current stack to your target dream job.
- 💼 **Matched Roles**: Personalized jobs with tailored application advice.

What would you like to dive into today?`,
    timestamp: 'Just now',
    isDemoMode: false,
    suggestedPills: [
      'Which skills should I learn?',
      'How can I improve my resume?',
      'What jobs match my profile?',
      'What projects should I build?',
      'How can I prepare for interviews?',
      'What should I learn next?',
    ],
  },
];

export const initialSkillRecommendations: SkillRecommendation[] = [
  {
    id: 'skill-rec-1',
    skill: 'Apache Kafka & Event Streaming',
    category: 'Backend',
    importance: 'Critical',
    rationale: '84% of tier-1 backend engineering positions (Uber, Stripe, Netflix) list event-driven messaging as a core requirement for high-throughput data pipelines.',
    targetRoles: ['Backend SDE-II', 'Distributed Systems Engineer', 'Data Platform Engineer'],
    estimatedHours: 25,
    devScoreBoost: 45,
    learningResources: [
      {
        title: 'Kafka: The Definitive Guide (O\'Reilly)',
        type: 'Book',
        free: false,
      },
      {
        title: 'Confluent Developer Kafka Fundamentals',
        type: 'Documentation',
        url: 'https://developer.confluent.io',
        free: true,
      },
      {
        title: 'Building Event-Driven Microservices Workshop',
        type: 'Practice',
        free: true,
      },
    ],
  },
  {
    id: 'skill-rec-2',
    skill: 'Redis Advanced Caching & Distributed Locks',
    category: 'Database',
    importance: 'Critical',
    rationale: 'Complement your PostgreSQL expertise with cache-aside patterns, sliding-window rate limiters, and distributed locking (Redlock algorithm) to reduce p99 database query latency.',
    targetRoles: ['Full Stack SDE', 'Backend Engineer', 'Platform SDE'],
    estimatedHours: 18,
    devScoreBoost: 35,
    learningResources: [
      {
        title: 'Redis University: Redis for Microservices Architecture',
        type: 'Course',
        url: 'https://university.redis.io',
        free: true,
      },
      {
        title: 'System Design: Cache Stampede Mitigation Guide',
        type: 'Documentation',
        free: true,
      },
    ],
  },
  {
    id: 'skill-rec-3',
    skill: 'gRPC & Protocol Buffers',
    category: 'Backend',
    importance: 'High',
    rationale: 'Microservice inter-communication is shifting from REST/JSON to binary gRPC over HTTP/2 for 7x serialization performance and type-safe schema contracts.',
    targetRoles: ['Core Infrastructure Engineer', 'Go / Node Backend Engineer'],
    estimatedHours: 15,
    devScoreBoost: 30,
    learningResources: [
      {
        title: 'Official gRPC TypeScript & Go Guides',
        type: 'Documentation',
        url: 'https://grpc.io/docs',
        free: true,
      },
      {
        title: 'High-Performance Microservices with gRPC',
        type: 'Course',
        free: true,
      },
    ],
  },
  {
    id: 'skill-rec-4',
    skill: 'Kubernetes (K8s) & Helm Orchestration',
    category: 'DevOps & Cloud',
    importance: 'High',
    rationale: 'Containerizing services is great; orchestrating zero-downtime rolling deployments, horizontal pod autoscaling (HPA), and ingress routing proves production maturity.',
    targetRoles: ['Cloud Platform Engineer', 'Full Stack Tech Lead', 'SRE'],
    estimatedHours: 30,
    devScoreBoost: 50,
    learningResources: [
      {
        title: 'Kubernetes the Hard Way (Kelsey Hightower)',
        type: 'Practice',
        free: true,
      },
      {
        title: 'Certified Kubernetes Application Developer (CKAD) Prep',
        type: 'Course',
        free: false,
      },
    ],
  },
  {
    id: 'skill-rec-5',
    skill: 'OpenTelemetry & Distributed Tracing',
    category: 'DevOps & Cloud',
    importance: 'Recommended',
    rationale: 'Observability is the #1 differentiator for senior candidate interviews. Demonstrate knowledge of APM spans, Prometheus metric counters, and Grafana dashboard alerts.',
    targetRoles: ['SRE', 'Senior Backend Engineer', 'Tech Lead'],
    estimatedHours: 12,
    devScoreBoost: 25,
    learningResources: [
      {
        title: 'OpenTelemetry Architecture & Instrumentation Guide',
        type: 'Documentation',
        url: 'https://opentelemetry.io',
        free: true,
      },
    ],
  },
];

export const initialProjectRecommendations: ProjectRecommendation[] = [
  {
    id: 'proj-rec-1',
    title: 'Distributed Task Execution Engine & Message Queue',
    difficulty: 'Production-Ready',
    domain: 'Distributed Systems',
    summary: 'A fault-tolerant distributed background worker pool with delayed task execution, at-least-once delivery semantics, heartbeat monitoring, and dead-letter queues.',
    architecture: [
      'Master Coordinator (Leader election with Raft / Redis locks)',
      'Worker Nodes polling prioritized task queues via Redis Streams',
      'WAL (Write-Ahead Logging) & Crash Recovery mechanism',
      'Live Web Dashboard with WebSocket telemetry and task retry controls',
    ],
    techStack: ['TypeScript / Go', 'Redis Streams', 'PostgreSQL', 'Docker', 'React 19', 'Tailwind CSS'],
    keyProblemsSolved: [
      'Preventing double execution with idempotent task tokens',
      'Worker crash detection via TTL heartbeats and automatic reassignment',
      'Exponential backoff with jitter for transient API failures',
    ],
    resumeBulletSample: 'Architected distributed task engine in TypeScript & Redis handling 10,000+ jobs/sec with automated worker failover and sub-50ms scheduling accuracy.',
    estimatedDays: 14,
  },
  {
    id: 'proj-rec-2',
    title: 'High-Throughput API Gateway & Sliding-Window Rate Limiter',
    difficulty: 'Advanced',
    domain: 'FinTech / High-Frequency',
    summary: 'A reverse proxy gateway that protects microservices with dynamic IP/token rate-limiting, JWT authentication verification, circuit breaking, and metrics aggregation.',
    architecture: [
      'Reverse Proxy routing with HTTP/2 and gRPC termination',
      'Sliding-window counter algorithm implemented in Lua scripts on Redis',
      'Circuit Breaker pattern (Hystrix style) for failing upstream microservices',
      'Prometheus exporter measuring RPS, p95/p99 latency, and 429 drop rates',
    ],
    techStack: ['Node.js / Express', 'Redis', 'Lua Scripts', 'Docker', 'Prometheus', 'Grafana'],
    keyProblemsSolved: [
      'Eliminating race conditions in Redis counters using atomic Lua scripts',
      'Graceful degradation when upstream microservices experience latency spikes',
    ],
    resumeBulletSample: 'Engineered high-throughput reverse proxy gateway with Redis Lua sliding-window rate limiter, mitigating API abuse and maintaining <4ms p99 latency overhead.',
    estimatedDays: 10,
  },
  {
    id: 'proj-rec-3',
    title: 'Real-Time Collaborative Document Canvas (CRDT-based)',
    difficulty: 'Production-Ready',
    domain: 'Full Stack',
    summary: 'A multi-user document and whiteboard editor featuring Conflict-free Replicated Data Types (CRDTs), live cursor tracking, offline persistence, and version history replay.',
    architecture: [
      'Client-side CRDT state synchronization using Yjs',
      'WebSocket server multiplexing document rooms and awareness presence',
      'IndexedDB local cache for offline-first editing with sync upon reconnect',
      'Granular snapshotting to PostgreSQL with time-travel revision scrubber',
    ],
    techStack: ['React 19', 'TypeScript', 'WebSockets', 'Yjs CRDT', 'IndexedDB', 'PostgreSQL', 'Tailwind CSS'],
    keyProblemsSolved: [
      'Mathematical convergence of concurrent edits without server locking',
      'Handling packet loss and high network jitter gracefully',
    ],
    resumeBulletSample: 'Built real-time collaborative workspace utilizing CRDTs & WebSockets, enabling 50+ concurrent users per room with zero merge conflicts and instant offline recovery.',
    estimatedDays: 12,
  },
  {
    id: 'proj-rec-4',
    title: 'Vector Search & RAG Knowledge Retrieval Pipeline',
    difficulty: 'Advanced',
    domain: 'AI & LLMs',
    summary: 'A full-stack semantic search engine that indexes technical documentation, generates embeddings, performs hybrid vector + BM25 keyword search, and streams answers.',
    architecture: [
      'Document Ingestion & Chunking pipeline with recursive token splitters',
      'Vector Embedding storage with PostgreSQL (pgvector) and HNSW indexing',
      'Hybrid Retrieval combining keyword search and semantic cosine similarity',
      'Streaming generative responses with citation verification',
    ],
    techStack: ['TypeScript', 'Gemini API', 'pgvector / PostgreSQL', 'React 19', 'Tailwind CSS'],
    keyProblemsSolved: [
      'Mitigating LLM hallucination through strict context groundings',
      'Sub-100ms vector similarity lookup across 100k+ embedded documents',
    ],
    resumeBulletSample: 'Developed hybrid RAG documentation search engine using pgvector and Gemini API, improving internal query resolution speed by 65%.',
    estimatedDays: 8,
  },
];

export const initialJobRecommendations: JobRecommendationMatch[] = [
  {
    id: 'job-rec-1',
    jobId: 'job-1',
    title: 'Software Development Engineer - 1 (Backend)',
    company: 'Uber',
    matchPercentage: 94,
    whyMatched: 'Your verified LeetCode rating (1845) and strong Go / Node.js background strongly align with Uber Mobility matching engine requirements.',
    growthOpportunities: 'Exposure to planetary-scale distributed microservices, stateful geospatial processing, and high-frequency dispatch engines.',
    salary: '₹24L - ₹32L / year + Equity',
    location: 'Bengaluru, India (Hybrid)',
    keySkills: ['Go', 'Distributed Systems', 'Kafka', 'SQL', 'Concurrency'],
  },
  {
    id: 'job-rec-2',
    jobId: 'job-3',
    title: 'Frontend Engineer (React / TypeScript)',
    company: 'Razorpay',
    matchPercentage: 96,
    whyMatched: 'Your portfolio showcases clean responsive UI, strong TypeScript typing, and accessible component architectures directly matching Razorpay Checkout team needs.',
    growthOpportunities: 'Design merchant financial analytics dashboards handling billions in transaction volume.',
    salary: '₹18L - ₹26L / year',
    location: 'Bengaluru, India',
    keySkills: ['React', 'TypeScript', 'Tailwind CSS', 'State Management', 'Web Performance'],
  },
  {
    id: 'job-rec-3',
    jobId: 'job-4',
    title: 'Junior Cloud & DevOps Engineer',
    company: 'Atlassian',
    matchPercentage: 86,
    whyMatched: 'Docker containerization and CI/CD foundations in your verified repos provide a strong foundation for Jira and Confluence reliability engineering.',
    growthOpportunities: 'Master multi-region AWS cloud infrastructure, Kubernetes clusters, and Terraform infrastructure as code.',
    salary: '₹22L - ₹28L / year',
    location: 'Remote (India)',
    keySkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Python/Node'],
  },
];

export const initialLearningRoadmapSteps: LearningRoadmapStep[] = [
  {
    id: 'step-1',
    phase: 'Phase 1: Advanced Concurrency & Storage Internals',
    duration: 'Weeks 1 - 3',
    objectives: [
      'Master PostgreSQL index execution plans (EXPLAIN ANALYZE, B-tree, Hash, GIN)',
      'Implement Redis caching patterns (Cache-Aside, Write-Through, Write-Behind)',
      'Solve 25 LeetCode Medium/Hard problems on Graphs and Dynamic Programming',
    ],
    topics: ['PostgreSQL internals', 'Redis Data Structures', 'Graph BFS/DFS & Dijkstra', 'Concurrency Primitives'],
    milestones: ['Build Redis cache layer with 99% hit rate in local benchmark', 'Achieve 360+ solved on LeetCode'],
    completed: true,
  },
  {
    id: 'step-2',
    phase: 'Phase 2: Event-Driven Systems & Message Brokers',
    duration: 'Weeks 4 - 6',
    objectives: [
      'Deploy and configure Apache Kafka multi-broker cluster with Zookeeper/KRaft',
      'Understand partition offsets, consumer rebalances, and idempotency guarantees',
      'Implement gRPC services with Protocol Buffers for fast RPC communication',
    ],
    topics: ['Kafka Topics & Partitions', 'Consumer Groups', 'Protocol Buffers', 'gRPC Streaming'],
    milestones: ['Complete Distributed Task Queue project architecture', 'Write unit tests with 85%+ coverage'],
    completed: false,
  },
  {
    id: 'step-3',
    phase: 'Phase 3: Production Showcase Capstone & Cloud Deployment',
    duration: 'Weeks 7 - 9',
    objectives: [
      'Containerize full multi-service architecture using Docker & Docker Compose',
      'Implement OpenTelemetry distributed tracing with Prometheus & Grafana dashboard',
      'Publish comprehensive GitHub README with live architecture diagrams and benchmarking results',
    ],
    topics: ['Docker Multi-stage Builds', 'Prometheus Metrics', 'Structured Logging', 'Load Testing (k6 / Artillery)'],
    milestones: ['Publish Capstone on GitHub with 10k RPS benchmark evidence', 'Increase DevScore to 930+ pts'],
    completed: false,
  },
  {
    id: 'step-4',
    phase: 'Phase 4: SDE-II & FAANG Interview Sprints',
    duration: 'Weeks 10 - 12',
    objectives: [
      'System Design deep-dives: URL shortener, Rate Limiter, Ride-sharing Dispatcher, Distributed Chat',
      'Mock interview sessions focusing on 35-minute problem solving under pressure',
      'STAR method behavioral rehearsals on technical challenges and team leadership',
    ],
    topics: ['Low-Level Design (LLD)', 'High-Level Design (HLD)', 'STAR Behavioral Stories', 'Live Coding Speed'],
    milestones: ['Complete 5 full mock interviews with peer/mentor evaluations', 'Submit 1-click verified applications'],
    completed: false,
  },
];

export const initialInterviewPrepPlan: InterviewPrepPlan = {
  dsaFocus: [
    {
      topic: 'Graphs (BFS/DFS, Topological Sort & Dijkstra)',
      why: 'Heavily tested at Google, Uber, and Amazon for network traversal and dependency graphs.',
      targetProblems: 20,
      priority: 'High',
      examples: ['Course Schedule II', 'Word Ladder', 'Network Delay Time', 'Alien Dictionary'],
    },
    {
      topic: 'Dynamic Programming (2D Grids, Knapsack & Subsequences)',
      why: 'Highest variance topic in technical screenings; mastering recurrence relations prevents freeze-ups.',
      targetProblems: 25,
      priority: 'High',
      examples: ['Longest Common Subsequence', 'Coin Change', 'Edit Distance', 'Word Break'],
    },
    {
      topic: 'Monotonic Stack & Sliding Window',
      why: 'Critical for optimizing O(N²) array problems to O(N) time complexity.',
      targetProblems: 15,
      priority: 'Medium',
      examples: ['Trapping Rain Water', 'Daily Temperatures', 'Sliding Window Maximum'],
    },
    {
      topic: 'Trees & Binary Search Trees',
      why: 'Common in screening rounds to test recursion and edge-case handling.',
      targetProblems: 15,
      priority: 'Medium',
      examples: ['Serialize and Deserialize Binary Tree', 'Lowest Common Ancestor', 'Validate BST'],
    },
  ],
  systemDesignTopics: [
    {
      concept: 'Distributed Rate Limiter',
      breakdown: 'Token bucket vs Leaky bucket vs Sliding-window log. Redis in-memory storage with atomic Lua scripts. Handling cluster clock drift.',
      practiceQuestions: ['Design an API rate limiter for a public developer platform like GitHub / Stripe.'],
    },
    {
      concept: 'Real-Time Chat & Notification System',
      breakdown: 'WebSocket gateway connections, ephemeral message queue (Kafka/Redis pub/sub), persistent storage (Cassandra/HBase for chats, PostgreSQL for user state).',
      practiceQuestions: ['Design WhatsApp / Slack with read receipts, group messaging, and offline message queueing.'],
    },
    {
      concept: 'Scalable URL Shortener & Analytics',
      breakdown: 'Base62 encoding of distributed unique IDs (Snowflake ID generator), caching hot URLs with Redis, write-heavy click analytics pipeline.',
      practiceQuestions: ['Design TinyURL handling 100M new URLs per month and 10B reads per month.'],
    },
  ],
  behavioralStories: [
    {
      principle: 'Technical Ownership & Root Cause Analysis',
      prompt: 'Tell me about a time a production issue occurred or a critical bug escaped testing.',
      suggestion: 'Highlight the CloudMesh WAL race condition fix: how you isolated the issue with stress tests, rolled out a patch, and added regression tests to prevent recurrences.',
    },
    {
      principle: 'Handling Technical Disagreement',
      prompt: 'Describe a situation where you disagreed with a colleague on an architectural decision.',
      suggestion: 'Discuss REST vs WebSocket trade-offs for real-time state sync, backing your argument with latency benchmarks and prototype numbers.',
    },
    {
      principle: 'Spearheading Ambitious Scope Under Ambiguity',
      prompt: 'Describe a project where requirements were vague and you took the initiative.',
      suggestion: 'Detail how you conceptualized and delivered the automated DevScore benchmark engine from scratch.',
    },
  ],
  mockChecklist: [
    { id: 'chk-1', task: 'Solve 10 LeetCode Mediums on Graph & Union-Find under 25 mins each', completed: true },
    { id: 'chk-2', task: 'Whiteboard Distributed Rate Limiter with Redis Lua script design', completed: true },
    { id: 'chk-3', task: 'Prepare 4 STAR behavioral stories with quantified metric results', completed: false },
    { id: 'chk-4', task: 'Conduct 2 peer mock interviews on live coding & edge case testing', completed: false },
    { id: 'chk-5', task: 'Review System Design cheat sheet (CAP, Consistent Hashing, Sharding)', completed: false },
  ],
};

export const sampleResumePreset = `ARJUN PATEL
Bengaluru, India | +91 98765 43210 | arjun.patel@example.com
GitHub: github.com/arjunpatel-dev | LinkedIn: linkedin.com/in/arjunpatel | Portfolio: devnexus.io/arjun

SUMMARY
Pre-final year Computer Science undergraduate with top 1% developer benchmark (DevScore 885). Proven track record in full-stack architecture, distributed systems, and real-time backend microservices. Solved 340+ algorithmic problems on LeetCode (Contest Rating 1845).

EDUCATION
B.Tech in Computer Science & Engineering | International Institute of Information Technology, Bengaluru
CGPA: 9.24 / 10.0 | Expected Graduation: May 2026
Coursework: Distributed Systems, Database Management Systems, Data Structures & Algorithms, Computer Networks, Operating Systems

TECHNICAL SKILLS
Languages: TypeScript, JavaScript (ES6+), Go, Python, C++, SQL
Frontend: React 19, Next.js 15, Tailwind CSS, Redux Toolkit, WebSockets, HTML5/CSS3
Backend: Node.js, Express, Go standard library, RESTful APIs, gRPC, Microservices
Databases & Cloud: PostgreSQL, Redis, MongoDB, Docker, Docker Compose, AWS (S3, ECS), Git, CI/CD

EXPERIENCE
Software Engineering Intern | Zomato Mobility Team | Bengaluru, India
May 2024 - July 2024
- Built high-concurrency order dispatch microservices using Go and Redis, reducing rider assignment latency by 28% for 45,000+ daily deliveries.
- Engineered Redis cache-aside layer for restaurant menu metadata, lowering PostgreSQL database CPU utilization from 78% to 39%.
- Wrote comprehensive unit and integration test suites using Go testing package, achieving 88% code coverage across the dispatch pipeline.

PROJECTS
CloudMesh - High-Performance Distributed Object Storage & CDN Cache
Tech Stack: Go, Raft Consensus, Redis, PostgreSQL, Docker, AWS S3
- Architected distributed key-value storage engine implementing Raft consensus protocol for zero-data-loss leader election and log replication.
- Implemented write-ahead logging (WAL) and memory-mapped file indexing, sustaining 14,500 operations/second with sub-15ms p99 latency.
- Deployed on Docker container cluster with simulated network partitions, verifying 100% crash consistency and automatic node re-synchronization.

HyperPay - Real-Time Developer Payment Gateway & Merchant Dashboard
Tech Stack: React 19, TypeScript, Node.js, PostgreSQL, Tailwind CSS, WebSockets
- Developed full-stack merchant checkout dashboard featuring live WebSocket webhook event streams and payment status analytics.
- Integrated idempotent transaction processing and distributed optimistic locking, preventing duplicate charges across 10,000+ synthetic concurrent checkouts.

HONORS & ACHIEVEMENTS
- 1st Place Winner, National Smart India Hackathon 2024 (Built decentralized disaster relief coordination network among 1,200 teams).
- Global Rank 412 (Top 6%) across 22,000+ contestants in LeetCode Biweekly Contest 124.
- Core Contributor to open-source TypeScript developer tooling with 240+ GitHub stars.`;

export const initialResumeAnalysis: ResumeAnalysisResult = {
  atsScore: 89,
  completenessScore: 95,
  fileName: 'arjun_patel_swe_resume.pdf',
  summary: 'Exceptional undergraduate technical resume featuring verified distributed systems projects, strong quantitative metrics (Google XYZ format), and high-caliber competitive coding credentials. Minor keyword gaps in Kubernetes and distributed tracing.',
  parsedSkills: [
    'TypeScript', 'JavaScript', 'Go', 'Python', 'C++', 'SQL', 'React 19', 'Next.js', 'Tailwind CSS',
    'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'WebSockets', 'Raft Consensus', 'Git'
  ],
  missingKeywords: [
    'Kubernetes (K8s)', 'OpenTelemetry (Distributed Tracing)', 'Apache Kafka', 'CI/CD Pipeline Automation',
    'Terraform (IaC)', 'Prometheus & Grafana Alerting'
  ],
  actionVerbScore: 92,
  sectionsReview: [
    {
      section: 'Skills',
      score: 94,
      status: 'Strong',
      feedback: 'Well-structured taxonomy with distinct categorization. Searchable and relevant to modern SDE roles.',
      suggestions: [
        'Add container orchestration (Kubernetes) and message brokers (Kafka/RabbitMQ) as you acquire them.',
      ],
    },
    {
      section: 'Projects',
      score: 95,
      status: 'Strong',
      feedback: 'Outstanding technical depth. Clearly states architectural mechanisms (Raft, WAL, Memory-mapped indexing) with throughput benchmarks.',
      suggestions: [
        'Include direct clickable links to live demo deployments alongside GitHub URLs.',
      ],
    },
    {
      section: 'Experience',
      score: 90,
      status: 'Strong',
      feedback: 'Impactful internship bullet points featuring quantified latency reductions and database load drops.',
      suggestions: [
        'Mention team size and specific Agile/Scrum cross-functional practices.',
      ],
    },
    {
      section: 'Education',
      score: 98,
      status: 'Strong',
      feedback: 'Clear institutional branding, high CGPA (9.24), and relevant foundational coursework listed.',
      suggestions: ['No changes needed — format is crisp and standard.'],
    },
    {
      section: 'Formatting & ATS',
      score: 92,
      status: 'Strong',
      feedback: 'Clean single-column typography with standard margins and high contrast headings.',
      suggestions: ['Ensure export is standard text-selectable PDF (not flattened raster image).'],
    },
    {
      section: 'Keywords',
      score: 84,
      status: 'Satisfactory',
      feedback: 'Strong presence of distributed systems and full-stack terms. Missing some cloud reliability keywords.',
      suggestions: [
        'Incorporate "Microservices architecture", "Event-driven pipelines", and "Observability".',
      ],
    },
  ],
  bulletPointImprovements: [
    {
      original: 'Built high-concurrency order dispatch microservices using Go and Redis for daily deliveries.',
      improved: 'Architected high-concurrency order dispatch microservices in Go & Redis, reducing rider assignment latency by 28% across 45,000+ daily deliveries.',
      reason: 'Applied Google XYZ formula: highlighted metric improvement (28% latency drop) and scale (45k daily deliveries).',
      impactKeyword: 'High-Throughput Optimization',
    },
    {
      original: 'Developed merchant dashboard featuring live WebSocket webhook event streams.',
      improved: 'Engineered responsive merchant analytics portal with React 19 & WebSockets, streaming real-time payment telemetry with sub-100ms event propagation.',
      reason: 'Specified event latency SLA (sub-100ms) and modern React 19 runtime stack.',
      impactKeyword: 'Real-Time Streaming Performance',
    },
    {
      original: 'Used Docker to deploy services and test crash consistency.',
      improved: 'Orchestrated multi-node Docker cluster under simulated network partitions, validating 100% crash consistency via Raft log recovery.',
      reason: 'Emphasized rigorous fault-injection testing and distributed consensus verification.',
      impactKeyword: 'Fault Tolerance & Distributed Verification',
    },
  ],
  isDemoMode: true,
  analyzedAt: new Date().toISOString(),
};

export const initialVisualRoadmapNodes: VisualRoadmapNode[] = [
  {
    id: 'node-1',
    stage: 'current_skills',
    stageNumber: 1,
    title: 'Current Skills & Stack',
    items: ['TypeScript / JS', 'React 19 & Next.js', 'Node.js / Express', 'PostgreSQL', 'Docker Basics', 'Git / GitHub', 'LeetCode (340+ Solved)'],
    status: 'completed',
    description: 'Strong foundation in full-stack web engineering, relational schema design, and core algorithmic problem solving.',
    actionTip: 'Maintain daily LeetCode streak and keep GitHub contributions active.',
    badge: 'Verified Level 4',
    estimatedTime: 'Completed',
  },
  {
    id: 'node-2',
    stage: 'skills_to_learn',
    stageNumber: 2,
    title: 'Skills to Learn (High-Yield Gaps)',
    items: ['Apache Kafka Event Streaming', 'Redis Advanced Caching & Locks', 'gRPC & Protocol Buffers', 'Kubernetes Orchestration', 'OpenTelemetry Tracing'],
    status: 'in_progress',
    description: 'Bridge the critical gap between senior frontend/full-stack developer and high-scale distributed backend architect.',
    actionTip: 'Dedicate 5-8 hours weekly to hands-on distributed systems coding.',
    badge: 'Current Priority',
    estimatedTime: '3 - 4 Weeks',
  },
  {
    id: 'node-3',
    stage: 'projects_to_build',
    stageNumber: 3,
    title: 'Portfolio-Defining Projects',
    items: ['Distributed Task Queue & Scheduler', 'Sliding-Window Rate Limiting Gateway', 'Real-Time Collaborative Canvas (CRDTs)', 'Hybrid RAG Search Pipeline'],
    status: 'in_progress',
    description: 'Build 2 flagship open-source projects with documented architecture diagrams, load test benchmarks, and automated CI/CD.',
    actionTip: 'Record a 2-minute Loom video demo for each project and link in your GitHub README.',
    badge: 'High Impact',
    estimatedTime: '4 Weeks',
  },
  {
    id: 'node-4',
    stage: 'certifications',
    stageNumber: 4,
    title: 'Certifications & Industry Badges',
    items: ['DevNexus Elite SDE-1 Verified Badge', 'AWS Certified Solutions Architect (Associate)', 'Certified Kubernetes Application Developer (CKAD)', 'Meta / Confluent Developer Credential'],
    status: 'upcoming',
    description: 'Industry recognized credentials that pass automated recruiter resume filters and validate cloud proficiency.',
    actionTip: 'Take official practice exams after completing Phase 2 & 3 project implementations.',
    badge: 'Credibility',
    estimatedTime: '2 Weeks',
  },
  {
    id: 'node-5',
    stage: 'interview_prep',
    stageNumber: 5,
    title: 'Interview Preparation Sprints',
    items: ['High-Frequency Graph & DP Algorithms', 'System Design (HLD & LLD Masterclass)', 'STAR Behavioral Rehearsal Stories', '5 Full Timed Mock Technical Interviews'],
    status: 'upcoming',
    description: 'Systematic interview conditioning under 35-minute problem solving constraints and architectural whiteboarding.',
    actionTip: 'Practice out loud while writing code to demonstrate clear problem decomposition.',
    badge: 'Interview Ready',
    estimatedTime: '3 Weeks',
  },
  {
    id: 'node-6',
    stage: 'target_job',
    stageNumber: 6,
    title: 'Target Dream Role',
    items: ['Software Development Engineer - 1 / 2', 'Distributed Backend Engineer', 'Top Tech Firms (Uber, Google, Stripe, Razorpay)', 'Target Package: ₹28L - ₹40L+ CTC / $140k+ USD'],
    status: 'upcoming',
    description: 'High-leverage engineering position building core infrastructure and high-throughput systems at scale.',
    actionTip: 'Leverage DevNexus 1-Click Fast-Track Application with your verified DevScore profile.',
    badge: 'Goal Destination',
    estimatedTime: 'Target: Q3 2025',
  },
];
