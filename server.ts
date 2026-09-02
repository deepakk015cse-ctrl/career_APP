import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini SDK with telemetry header
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/ai/status", (_req, res) => {
  const client = getGeminiClient();
  res.json({
    hasApiKey: !!client,
    model: "gemini-3.7-flash",
    mode: client ? "live" : "demo_fallback",
  });
});

// AI Chat Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history = [], userProfileContext } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Demo fallback response with deep contextual intelligence
      const fallbackReply = generateFallbackChatResponse(message, userProfileContext);
      return res.json({
        content: fallbackReply.content,
        isDemoMode: true,
        suggestedPills: fallbackReply.suggestedPills,
        category: fallbackReply.category,
      });
    }

    // Build system prompt with user context
    const profileSummary = userProfileContext
      ? `User Profile Context:
- Name: ${userProfileContext.fullName || "Developer"}
- Headline: ${userProfileContext.headline || "Software Engineer"}
- Current Skills: ${(userProfileContext.skills || []).map((s: any) => typeof s === "string" ? s : s.name).join(", ")}
- Projects: ${(userProfileContext.projects || []).map((p: any) => p.title).join(", ")}
- DevScore: ${userProfileContext.devScore || 885}/1000
- LeetCode Solved: ${userProfileContext.codingStats?.leetCodeSolved || 342} (Easy: ${userProfileContext.codingStats?.easy || 120}, Med: ${userProfileContext.codingStats?.med || 188}, Hard: ${userProfileContext.codingStats?.hard || 34})
- Target Interests: Full Stack, Distributed Systems, Cloud Architecture`
      : "User is an ambitious software engineer and computer science developer seeking career growth.";

    const systemInstruction = `You are the DevNexus AI Career Advisor — an elite engineering mentor, staff engineer, and tech recruiter consultant.
You provide precise, actionable, and mathematically grounded career guidance for software engineers, students, and job seekers.
Always format your answers in clean Markdown with clear headings, bullet points, and code/architecture snippets where appropriate.
Avoid generic fluff or clichés. Give concrete actionable steps, industry benchmarks (e.g., FAANG/tier-1 tech requirements), and metric-driven advice.

${profileSummary}`;

    // Format chat history for context
    const conversationPrompt = `Previous conversation:
${history.map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n')}

Current Question: ${message}

Provide a direct, inspiring, and comprehensive answer tailored to this engineer.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: conversationPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I am analyzing your career profile. Please try asking again.";
    
    // Generate contextual follow-up pills
    const suggestedPills = extractFollowUpPills(message);

    res.json({
      content: replyText,
      isDemoMode: false,
      suggestedPills,
    });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    // Graceful fallback to demo mode on API error
    const fallback = generateFallbackChatResponse(req.body.message || "", req.body.userProfileContext);
    res.json({
      content: fallback.content,
      isDemoMode: true,
      errorNotice: "Running in intelligent local preview mode.",
      suggestedPills: fallback.suggestedPills,
    });
  }
});

// Resume Analyzer Endpoint
app.post("/api/ai/resume-analyze", async (req, res) => {
  try {
    const { resumeText, fileName, userProfile } = req.body;
    const ai = getGeminiClient();

    if (!ai || !resumeText || resumeText.trim().length < 20) {
      const demoResult = generateFallbackResumeAnalysis(fileName, userProfile);
      return res.json(demoResult);
    }

    const prompt = `Perform a comprehensive ATS and senior engineering resume review for this resume text:
"${resumeText.slice(0, 4000)}"

Return a valid JSON object matching this structure:
{
  "atsScore": 86,
  "completenessScore": 92,
  "summary": "Concise 2-sentence executive assessment of technical depth and ATS readability.",
  "parsedSkills": ["React", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Docker", "AWS"],
  "missingKeywords": ["Distributed Tracing", "gRPC", "CI/CD Pipeline", "Kubernetes", "Redis Caching", "System Observability"],
  "actionVerbScore": 84,
  "sectionsReview": [
    {
      "section": "Skills",
      "score": 90,
      "status": "Strong",
      "feedback": "...",
      "suggestions": ["..."]
    },
    {
      "section": "Projects",
      "score": 85,
      "status": "Strong",
      "feedback": "...",
      "suggestions": ["..."]
    },
    {
      "section": "Experience",
      "score": 80,
      "status": "Satisfactory",
      "feedback": "...",
      "suggestions": ["..."]
    },
    {
      "section": "Education",
      "score": 95,
      "status": "Strong",
      "feedback": "...",
      "suggestions": ["..."]
    },
    {
      "section": "Formatting & ATS",
      "score": 88,
      "status": "Strong",
      "feedback": "...",
      "suggestions": ["..."]
    },
    {
      "section": "Keywords",
      "score": 78,
      "status": "Needs Work",
      "feedback": "...",
      "suggestions": ["..."]
    }
  ],
  "bulletPointImprovements": [
    {
      "original": "Built a backend API for e-commerce website using Express.",
      "improved": "Architected low-latency RESTful API gateway handling 15k+ RPM using Express & Redis, reducing p99 latency by 38%.",
      "reason": "Quantified scale, highlighted caching mechanism, and applied Google XYZ impact formula.",
      "impactKeyword": "Latency Optimization"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      ...parsed,
      fileName: fileName || "uploaded_resume.pdf",
      isDemoMode: false,
      analyzedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Resume analyze error:", error);
    const demoResult = generateFallbackResumeAnalysis(req.body.fileName, req.body.userProfile);
    res.json(demoResult);
  }
});

// Helper Fallback Engines for Robustness & Preview Mode
function extractFollowUpPills(message: string): string[] {
  const lower = message.toLowerCase();
  if (lower.includes("skill") || lower.includes("learn")) {
    return [
      "What projects should I build?",
      "How does this impact my DevScore?",
      "Create a 30-day learning roadmap",
    ];
  }
  if (lower.includes("resume") || lower.includes("cv")) {
    return [
      "Rewrite my project bullets using XYZ formula",
      "Which keywords are missing for backend roles?",
      "How to showcase open-source contributions?",
    ];
  }
  if (lower.includes("job") || lower.includes("match")) {
    return [
      "How to bridge gaps for Uber / Google roles?",
      "Should I focus on LeetCode or Projects?",
      "Mock interview questions for my top match",
    ];
  }
  if (lower.includes("interview") || lower.includes("prepare")) {
    return [
      "High-frequency System Design topics",
      "Top Dynamic Programming patterns",
      "STAR method answers for conflict resolution",
    ];
  }
  return [
    "Which skills should I learn next?",
    "How can I improve my resume?",
    "What jobs match my profile?",
    "What projects should I build?",
  ];
}

function generateFallbackChatResponse(message: string, context?: any): { content: string; suggestedPills: string[]; category?: any } {
  const lower = message.toLowerCase();
  const name = context?.fullName || "Developer";

  if (lower.includes("skill") || lower.includes("learn next") || lower.includes("what should i learn")) {
    return {
      category: "skills",
      content: `### 🎯 Targeted Skill Progression for ${name}

Based on your verified profile (**DevScore 885/1000** with strong React, Node.js, and TypeScript proficiency), here is your highest-leverage skill priority:

#### 1. Distributed Systems & Message Brokers (**Critical Priority**)
- **Apache Kafka / RabbitMQ**: High-throughput event streaming, consumer groups, partition management, and idempotency patterns.
- **gRPC & Protocol Buffers**: Binary serialization and bi-directional streaming for microservice communication.
- **Why**: 82% of Tier-1 backend openings (Uber, Razorpay, Google) require event-driven architecture experience.

#### 2. Advanced Caching & Database Internals (**High Priority**)
- **Redis Strategies**: Write-through vs Cache-aside, distributed locks (\`Redlock\`), rate limiting using Token Bucket algorithms.
- **PostgreSQL Optimization**: EXPLAIN ANALYZE, B-tree vs GIN indexing, transaction isolation levels.

#### 3. Container Orchestration & Observability (**Recommended**)
- **Kubernetes (K8s)**: Deployments, StatefulSets, Ingress controllers.
- **OpenTelemetry & Prometheus**: Distributed tracing and metrics collection.

💡 **Action Item**: Implement a Redis cache layer with 10k mock requests in your next project to boost your DevScore by **+45 points**.`,
      suggestedPills: [
        "What projects should I build?",
        "How can I improve my resume?",
        "Generate a 30-day learning roadmap",
      ],
    };
  }

  if (lower.includes("resume") || lower.includes("improve my resume")) {
    return {
      category: "resume",
      content: `### 📄 5 High-Impact Resume Upgrades for ${name}

Your core fundamentals are strong, but technical hiring managers and ATS filters look for **metrics, scale, and architectural depth**:

#### 1. Apply the Google XYZ Impact Formula
- ❌ *Before*: "Created a full-stack job board using React and Node.js."
- ✅ *After*: "Architected a real-time developer job board with React & Node.js, implementing algorithmic skill-matching that reduced query latency by 42% across 5,000+ indexed roles."

#### 2. Surface Quantitative Scale
- Mention request volumes (e.g., *"Handles 1,200 RPS with <45ms p99 response time"*).
- Mention dataset size (e.g., *"Indexed 500k+ records using PostgreSQL composite indexing"*).

#### 3. Lead with System Design in Projects
- Explicitly list: **Architecture**: Microservices / Event-driven, **Storage**: PostgreSQL + Redis, **Testing**: 85% Jest unit coverage.

#### 4. Feature Verified Coding Credentials
- Highlight: *"Solved 340+ LeetCode problems (Contest Rating 1845, Top 6% globally)"*.

#### 5. Clean Single-Column ATS Layout
- Avoid dual-column tables or icon bars that break standard parser text flow.`,
      suggestedPills: [
        "Upload my resume for full ATS scan",
        "Which skills are missing on my resume?",
        "How to prepare for System Design interviews?",
      ],
    };
  }

  if (lower.includes("job") || lower.includes("match my profile")) {
    return {
      category: "jobs",
      content: `### 💼 Top Job Matches Based on Your Profile

Analyzing your profile against 24 active openings in DevNexus:

1. **Software Development Engineer - 1 (Backend) @ Uber**
   - **Match Score**: **92% (High Match)**
   - **Strong Fit**: Go, Distributed Systems concepts, Kafka knowledge, and strong LeetCode medium/hard metrics.
   - **Gap to Close**: Docker compose multi-service orchestration.

2. **Full Stack Engineer @ Stripe / Fintech Platform**
   - **Match Score**: **88% (Good Match)**
   - **Strong Fit**: TypeScript, React state management, REST API design, transaction safety.
   - **Gap to Close**: Idempotent payment webhook handling.

3. **Frontend Engineer (React / TypeScript) @ Razorpay**
   - **Match Score**: **95% (Top Match)**
   - **Strong Fit**: Advanced React patterns, Tailwind CSS, performance profiling, responsive component libraries.

💡 **Next Step**: You can apply directly through the **Jobs Marketplace** tab with your 1-click DevScore verified profile!`,
      suggestedPills: [
        "What skills should I learn for Uber?",
        "Mock interview for Backend SDE-1",
        "How to prepare for System Design?",
      ],
    };
  }

  if (lower.includes("project") || lower.includes("what projects should i build")) {
    return {
      category: "projects",
      content: `### 🛠️ 3 Portfolio-Defining Projects to Build

To transition from a regular developer to a top 1% candidate, avoid generic clone apps (Todo apps, Netflix UI clones). Build projects that demonstrate **distributed scale, concurrency, and real-world failure handling**:

#### 1. Distributed Task Scheduler & Message Queue (Production-Ready)
- **Tech Stack**: Go or TypeScript/Node.js, Redis Streams, Docker, PostgreSQL.
- **Core Problems**: Delayed jobs, worker heartbeats, at-least-once delivery, dead-letter queues.
- **Why It Shines**: Directly mirrors AWS SQS / Celery architecture.

#### 2. Real-Time Collaborative Document Canvas (Advanced)
- **Tech Stack**: React 19, WebSockets, CRDTs (Yjs) or Operational Transformation, Tailwind CSS.
- **Core Problems**: Conflict-free concurrent typing, presence awareness, offline mutation sync.

#### 3. High-Frequency Rate Limiter & Reverse Proxy Gateway
- **Tech Stack**: Go / Node.js, Redis sliding window algorithm, Token Bucket, Prometheus metrics.
- **Core Problems**: Mitigating DDoS, multi-tenant quota enforcement, <5ms latency overhead.

🚀 **Pro Tip**: Document your architecture with clean ASCII diagrams in your GitHub README!`,
      suggestedPills: [
        "Give me the architecture breakdown for the Task Scheduler",
        "How to prepare for DSA & LeetCode?",
        "Which skills should I learn next?",
      ],
    };
  }

  if (lower.includes("interview") || lower.includes("prepare")) {
    return {
      category: "interview",
      content: `### 🎯 Complete Technical Interview Preparation Strategy

#### 1. Data Structures & Algorithms (3-4 Weeks)
- **Focus Areas**: Two Pointers, Sliding Window, Monotonic Stack, Graphs (BFS/DFS + Dijkstra), Dynamic Programming (Knapsack & Subsequences).
- **Target**: Solve 3-4 Medium problems daily without checking solutions for the first 25 minutes.
- **Mock Timers**: Practice writing code under a 30-minute clock with clean edge case testing.

#### 2. Low-Level & High-Level System Design (2-3 Weeks)
- **Topics**: Rate Limiters, URL Shortener, Uber Geo-hashing service, WhatsApp Chat architecture.
- **Core Concepts**: Horizontal scaling, Database Sharding, Consistent Hashing, CAP theorem tradeoffs.

#### 3. Behavioral & Culture Fit (STAR Method)
- Prepare 4 core stories:
  1. *A complex bug that blocked production and how you debugged it.*
  2. *A technical disagreement with a teammate and the outcome.*
  3. *A project with ambiguous requirements that you spearheaded.*
  4. *A time you made a mistake and took extreme ownership.*`,
      suggestedPills: [
        "Mock DSA questions for top tech firms",
        "Which skills should I learn?",
        "How can I improve my resume?",
      ],
    };
  }

  // General Career Q&A
  return {
    category: "general",
    content: `### 🚀 AI Career Advisor at Your Service

Hello ${name}! I have analyzed your developer profile, coding statistics, and portfolio projects.

Here are the key areas I can assist you with right now:

- 📊 **Skill Recommendations**: Identify the exact high-yield technologies that will maximize your compensation and interview callbacks.
- 📄 **Resume Analyzer**: Scan your resume against ATS criteria, quantify achievements, and generate impact bullets.
- 💼 **Job Matchmaker**: Map your current DevScore (**885 pts**) and skill stack against tier-1 tech job openings.
- 🛠️ **Project Architecture**: Brainstorm production-grade full-stack and distributed systems projects.
- 🗺️ **Interactive Career Roadmap**: Walk through a step-by-step path from your current skills to SDE-II / Senior roles.

What would you like to focus on first?`,
    suggestedPills: [
      "Which skills should I learn?",
      "How can I improve my resume?",
      "What jobs match my profile?",
      "What projects should I build?",
      "How can I prepare for interviews?",
    ],
  };
}

function generateFallbackResumeAnalysis(fileName?: string, userProfile?: any) {
  const name = userProfile?.fullName || "Candidate";
  return {
    atsScore: 88,
    completenessScore: 94,
    fileName: fileName || "alex_chen_swe_resume.pdf",
    summary: `Strong technical profile demonstrating robust full-stack and distributed architecture experience. Excellent LeetCode benchmark and verified project portfolio. Minor keyword gaps in observability and gRPC.`,
    parsedSkills: [
      "TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Kafka",
      "Redis", "Docker", "Tailwind CSS", "Next.js", "Git", "REST APIs", "Jest"
    ],
    missingKeywords: [
      "gRPC & Protobuf", "Distributed Tracing (OpenTelemetry)", "Kubernetes (K8s)",
      "CI/CD Pipeline Automation", "Database Sharding", "Prometheus & Grafana"
    ],
    actionVerbScore: 86,
    sectionsReview: [
      {
        section: "Skills",
        score: 92,
        status: "Strong",
        feedback: "Comprehensive tech stack categorized by language, frontend, backend, and tools. Highly searchable.",
        suggestions: [
          "Group by 'Core Languages', 'Distributed Infrastructure', and 'Databases & Caching' for faster recruiter scanning.",
          "Add cloud platform competencies (e.g. AWS S3, ECS, Lambda, or GCP Cloud Run)."
        ]
      },
      {
        section: "Projects",
        score: 90,
        status: "Strong",
        feedback: "Projects feature clear links to live demos and GitHub repositories with meaningful technical challenges.",
        suggestions: [
          "Ensure every project bullet contains a quantifiable metric (e.g. latency reduction, throughput, user count).",
          "Highlight testing methodologies (e.g. unit tests, integration testing)."
        ]
      },
      {
        section: "Experience",
        score: 84,
        status: "Satisfactory",
        feedback: "Good chronological timeline with strong responsibility statements.",
        suggestions: [
          "Replace passive phrasing ('Responsible for developing...') with impact verbs ('Spearheaded', 'Orchestrated', 'Reduced').",
          "Include team size and cross-functional collaboration notes (e.g. worked with 4 engineers and product manager)."
        ]
      },
      {
        section: "Education",
        score: 96,
        status: "Strong",
        feedback: "Computer Science degree, graduation date, and honors clearly presented.",
        suggestions: [
          "Include notable coursework (e.g. Distributed Systems, Database Management, Algorithms) if applying for new grad roles."
        ]
      },
      {
        section: "Formatting & ATS",
        score: 89,
        status: "Strong",
        feedback: "Clean typography, standard margins, and clear section dividers that parse smoothly.",
        suggestions: [
          "Avoid dual-column skill charts or icons that can confuse older ATS scanners."
        ]
      },
      {
        section: "Keywords",
        score: 82,
        status: "Satisfactory",
        feedback: "High density of modern web and backend keywords. Needs cloud native and reliability terms.",
        suggestions: [
          "Include 'Microservices', 'Event-driven architecture', and 'Observability' to match senior job descriptions."
        ]
      }
    ],
    bulletPointImprovements: [
      {
        original: "Built backend APIs using Node.js and Express for data handling.",
        improved: "Architected scalable RESTful API services using Node.js & Express, processing 25k+ daily requests with sub-60ms response latency.",
        reason: "Added quantifiable throughput (25k+ requests) and p99 latency SLA metric.",
        impactKeyword: "High-Throughput Scaling"
      },
      {
        original: "Implemented Redis to make database queries faster.",
        improved: "Integrated Redis cache-aside caching layer for hot product queries, reducing PostgreSQL database load by 47% and eliminating query bottlenecks.",
        reason: "Specified cache strategy (cache-aside) and measured database load reduction percentage.",
        impactKeyword: "Cache Strategy & DB Offloading"
      },
      {
        original: "Worked on frontend user interface with React and Tailwind CSS.",
        improved: "Engineered responsive component library in React & Tailwind CSS with 100% WCAG accessibility compliance, cutting page load time by 1.2s.",
        reason: "Highlighted accessibility standards and tangible load performance gains.",
        impactKeyword: "Web Performance & Accessibility"
      }
    ],
    isDemoMode: true,
    analyzedAt: new Date().toISOString()
  };
}

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DevNexus Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
