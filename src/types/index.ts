export type UserType = 'Student' | 'Developer' | 'Job Seeker' | 'Recruiter' | 'Company';
export type UserRole = 'developer' | 'recruiter' | 'admin';

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  leetcode?: string;
  portfolio?: string;
  twitter?: string;
  codeforces?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Part-time' | 'Freelance';
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade?: string;
  description?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Database' | 'AI & ML' | 'DSA & Core';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  endorsements: number;
  isTopSkill?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  stars?: number;
  featured?: boolean;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeIcon?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: 'Hackathon' | 'Competitive Programming' | 'Open Source' | 'Academic';
}

export interface CodingStats {
  leetCodeSolved: number;
  easy: number;
  med: number;
  hard: number;
  contestRating: number;
  globalRank: string;
  badgesCount: number;
  gitHubCommitsThisYear: number;
  gitHubRepos: number;
  gitHubStars: number;
  streakDays: number;
}

export interface GithubRepoItem {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  repoUrl: string;
  isPinned: boolean;
  updatedAt: string;
  topics: string[];
}

export interface GithubProfileData {
  username: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalCommits: number;
  streakDays: number;
  languages: { name: string; percentage: number; color: string; bytes: number }[];
  contributionWeeks: { weekIndex: number; days: { count: number; date: string }[] }[];
  pinnedRepos: GithubRepoItem[];
  allRepos: GithubRepoItem[];
  isConnected: boolean;
  isDemoMode: boolean;
  lastSyncedAt: string;
}

export interface LeetCodeSubmissionItem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded';
  time: string;
  language: string;
  runtime: string;
}

export interface LeetCodeProfileData {
  username: string;
  totalSolved: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  acceptanceRate: string;
  contestRating: number;
  globalRanking: string;
  contestAttendCount: number;
  streakDays: number;
  recentSubmissions: LeetCodeSubmissionItem[];
  isConnected: boolean;
  isDemoMode: boolean;
  lastSyncedAt: string;
}

export interface DevScoreCategory {
  id: string;
  category: string;
  score: number;
  maxScore: number;
  weight: number; // percentage
  status: 'Excellent' | 'Good' | 'Needs Improvement';
  description: string;
  evidence: string[];
  tips: string[];
}

export interface DeveloperScoreReport {
  overallScore: number; // 0 - 1000
  tier: 'Elite (Top 1%)' | 'Master (Top 5%)' | 'Proficient' | 'Developing';
  badgeName: string;
  calculatedAt: string;
  categories: DevScoreCategory[];
  methodologyNote: string;
}

export interface JobMatchBreakdown {
  matchPercentage: number;
  verdict: 'High Match' | 'Good Match' | 'Moderate Match';
  matchingSkills: string[];
  missingSkills: string[];
  factors: {
    name: string;
    score: number;
    maxScore: number;
    explanation: string;
  }[];
}

export interface JobItem {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  type: 'Full-time' | 'Internship' | 'Remote' | 'Contract';
  experienceLevel: 'Entry Level' | 'Associate' | 'Mid-Senior' | 'Lead';
  salary: string;
  stipend?: string;
  duration?: string; // e.g. "3 Months", "6 Months" for internships
  deadline?: string; // e.g. "Apr 30, 2025"
  eligibilityBatch?: string; // e.g. "2025 & 2026 Batch"
  category: 'Full-time' | 'Internship' | 'Remote';
  postedDate: string;
  skillsRequired: string[];
  description: string;
  responsibilities?: string[];
  qualifications?: string[];
  applicantsCount: number;
  isSaved: boolean;
  isApplied: boolean;
  matchScore?: number;
  matchExplanation?: string;
  matchBreakdown?: JobMatchBreakdown;
}

export interface JobApplicant {
  id: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar: string;
  candidateHeadline: string;
  candidateUniversity: string;
  candidateDevScore: number;
  candidateMatchScore: number;
  skills: string[];
  appliedDate: string;
  status: 'Applied' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Rejected' | 'Hired';
  coverNote: string;
  resumeFileName: string;
  githubUsername?: string;
  leetCodeSolved?: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  headline: string;
  avatar: string;
  bannerUrl?: string;
  location: string;
  collegeOrCompany: string;
  bio: string;
  userType: UserType;
  userRole?: UserRole;
  isAdmin?: boolean;
  connectionsCount: number;
  followersCount: number;
  profileViews: number;
  openToWork: boolean;
  openToMentor: boolean;
  resumeUrl?: string;
  resumeFileName?: string;
  resumeUploadDate?: string;
  socialLinks: SocialLinks;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  codingStats: CodingStats;
}

export interface CommentItem {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    headline: string;
  };
  timestamp: string;
  text: string;
  likes: number;
}

export interface PostItem {
  id: string;
  author: {
    id: string;
    name: string;
    headline: string;
    avatar: string;
    userType: UserType;
    isVerified?: boolean;
  };
  timestamp: string;
  content: string;
  type: 'general' | 'project' | 'milestone' | 'coding' | 'job_share';
  tags: string[];
  mediaUrl?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  projectData?: {
    title: string;
    summary: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
  };
  milestoneData?: {
    title: string;
    badgeName: string;
    platform: string;
  };
  likes: number;
  isLiked: boolean;
  comments: CommentItem[];
  shares: number;
  isSaved: boolean;
}

export interface ConnectionUser {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  collegeOrCompany: string;
  location: string;
  mutualConnections: number;
  userType: UserType;
  skills: string[];
  isConnected: boolean;
  isPending: boolean;
  isFollowing: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'connection_request' | 'connection_accepted' | 'like' | 'comment' | 'message' | 'job_match' | 'milestone';
  sender: {
    name: string;
    avatar: string;
    headline?: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  targetId?: string;
  actionRequired?: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  acceptance: string;
  leetCodeUrl: string;
  isSolved: boolean;
  companies: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  contact: {
    id: string;
    name: string;
    avatar: string;
    headline: string;
    isOnline: boolean;
  };
  messages: ChatMessage[];
  unreadCount: number;
}

// Stage 6: AI Career Assistant Types
export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isDemoMode?: boolean;
  category?: 'general' | 'skills' | 'resume' | 'jobs' | 'projects' | 'interview' | 'learning';
  suggestedPills?: string[];
}

export interface SkillRecommendation {
  id: string;
  skill: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Database' | 'AI & ML' | 'DSA & Core';
  importance: 'Critical' | 'High' | 'Recommended';
  rationale: string;
  targetRoles: string[];
  estimatedHours: number;
  devScoreBoost: number;
  learningResources: {
    title: string;
    type: 'Course' | 'Documentation' | 'Book' | 'Practice';
    url?: string;
    free: boolean;
  }[];
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Production-Ready';
  domain: 'Full Stack' | 'Distributed Systems' | 'AI & LLMs' | 'DevOps & Cloud' | 'FinTech / High-Frequency';
  summary: string;
  architecture: string[];
  techStack: string[];
  keyProblemsSolved: string[];
  resumeBulletSample: string;
  estimatedDays: number;
  githubTemplateUrl?: string;
}

export interface JobRecommendationMatch {
  id: string;
  jobId: string;
  title: string;
  company: string;
  matchPercentage: number;
  whyMatched: string;
  growthOpportunities: string;
  salary: string;
  location: string;
  keySkills: string[];
}

export interface LearningRoadmapStep {
  id: string;
  phase: string;
  duration: string;
  objectives: string[];
  topics: string[];
  milestones: string[];
  completed: boolean;
}

export interface InterviewPrepPlan {
  dsaFocus: {
    topic: string;
    why: string;
    targetProblems: number;
    priority: 'High' | 'Medium';
    examples: string[];
  }[];
  systemDesignTopics: {
    concept: string;
    breakdown: string;
    practiceQuestions: string[];
  }[];
  behavioralStories: {
    principle: string;
    suggestion: string;
    prompt: string;
  }[];
  mockChecklist: {
    id: string;
    task: string;
    completed: boolean;
  }[];
}

export interface ResumeAnalysisResult {
  atsScore: number;
  completenessScore: number;
  summary: string;
  fileName?: string;
  parsedSkills: string[];
  missingKeywords: string[];
  actionVerbScore: number;
  sectionsReview: {
    section: 'Skills' | 'Projects' | 'Education' | 'Experience' | 'Formatting & ATS' | 'Keywords';
    score: number;
    status: 'Strong' | 'Satisfactory' | 'Needs Work';
    feedback: string;
    suggestions: string[];
  }[];
  bulletPointImprovements: {
    original: string;
    improved: string;
    reason: string;
    impactKeyword: string;
  }[];
  isDemoMode: boolean;
  analyzedAt: string;
}

export interface VisualRoadmapNode {
  id: string;
  stage: 'current_skills' | 'skills_to_learn' | 'projects_to_build' | 'certifications' | 'interview_prep' | 'target_job';
  stageNumber: number;
  title: string;
  items: string[];
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
  actionTip: string;
  badge?: string;
  estimatedTime?: string;
}

// Stage 8: Admin Dashboard & Security Types
export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Developer' | 'Student' | 'Recruiter' | 'Admin';
  status: 'active' | 'suspended' | 'flagged' | 'pending';
  joinedDate: string;
  lastActive: string;
  devScore: number;
  reportsCount: number;
  isVerified: boolean;
  collegeOrCompany: string;
  location: string;
}

export interface AdminRecruiterItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  companyName: string;
  companyDomain: string;
  verifiedCompany: boolean;
  activeJobsCount: number;
  applicantsReceived: number;
  hiredCount: number;
  status: 'approved' | 'pending' | 'suspended';
  joinedDate: string;
}

export interface AdminCompanyItem {
  id: string;
  name: string;
  logo: string;
  domain: string;
  industry: string;
  tier: 'Enterprise' | 'Scale-up' | 'Startup';
  verified: boolean;
  activeJobsCount: number;
  totalHires: number;
  status: 'active' | 'under_review';
  location: string;
}

export interface AdminJobItem {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  type: 'Full-time' | 'Internship' | 'Remote';
  category: 'Full-time' | 'Internship' | 'Remote';
  location: string;
  salaryOrStipend: string;
  postedDate: string;
  applicantsCount: number;
  status: 'active' | 'flagged' | 'closed' | 'expired';
  reportsCount: number;
  recruiterName: string;
}

export interface AdminReportItem {
  id: string;
  targetType: 'post' | 'user' | 'job' | 'comment';
  targetId: string;
  targetTitle: string;
  reportedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  reason: 'Spam / Scam' | 'Inappropriate Content' | 'Fake Profile / Impersonation' | 'Harassment' | 'Misleading Job Posting';
  details: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  status: 'pending' | 'resolved' | 'dismissed';
  excerpt: string;
}

export interface AdminAuditLog {
  id: string;
  action: string;
  adminName: string;
  adminAvatar: string;
  target: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  details: string;
}

export interface SystemHealthMetric {
  id: string;
  service: string;
  status: 'operational' | 'degraded' | 'outage';
  latency: string;
  uptime: string;
  errorRate: string;
  lastChecked: string;
  description: string;
}

export interface PlatformAnalytics {
  totalUsers: number;
  verifiedDevelopers: number;
  activeRecruiters: number;
  totalJobs: number;
  totalApplications: number;
  aiQueriesCount: number;
  dsaSubmissionsCount: number;
  uptimePercentage: number;
  weeklyGrowthRate: string;
  userTypeDistribution: { name: string; count: number; percentage: number; color: string }[];
  topSkillsOnPlatform: { skill: string; demandCount: number; growth: string }[];
  weeklyActivity: { day: string; activeUsers: number; applications: number; submissions: number }[];
}

