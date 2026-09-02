import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  PostItem,
  ConnectionUser,
  NotificationItem,
  JobItem,
  CodingProblem,
  Conversation,
  ExperienceItem,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem,
  AchievementItem,
  SocialLinks,
  UserType,
  GithubProfileData,
  LeetCodeProfileData,
  DeveloperScoreReport,
  JobApplicant,
  AIChatMessage,
  SkillRecommendation,
  ProjectRecommendation,
  JobRecommendationMatch,
  LearningRoadmapStep,
  InterviewPrepPlan,
  ResumeAnalysisResult,
  VisualRoadmapNode,
  UserRole,
  AdminUserItem,
  AdminRecruiterItem,
  AdminCompanyItem,
  AdminJobItem,
  AdminReportItem,
  AdminAuditLog,
  SystemHealthMetric,
  PlatformAnalytics,
} from '../types';
import {
  initialCurrentUser,
  initialPosts,
  initialConnections,
  initialNotifications,
  initialJobs,
  initialCodingProblems,
  initialConversations,
  initialGithubData,
  initialLeetCodeData,
  initialDeveloperScoreReport,
  initialJobApplicants,
} from '../data/mockData';
import {
  initialAIChatMessages,
  initialSkillRecommendations,
  initialProjectRecommendations,
  initialJobRecommendations,
  initialLearningRoadmapSteps,
  initialInterviewPrepPlan,
  initialResumeAnalysis,
  initialVisualRoadmapNodes,
} from '../data/careerAIData';
import {
  initialAdminUsers,
  initialAdminRecruiters,
  initialAdminCompanies,
  initialAdminJobs,
  initialAdminReports,
  initialAdminAuditLogs,
  initialSystemHealth,
  initialPlatformAnalytics,
} from '../data/adminData';

export type AppView = 'landing' | 'login' | 'signup' | 'forgot_password' | 'profile_setup' | 'app';
export type AppTab = 'feed' | 'network' | 'jobs' | 'coding' | 'projects' | 'messages' | 'notifications' | 'profile' | 'search' | 'dashboard' | 'dev_dashboard' | 'recruiter' | 'recruiter_portal' | 'career_ai' | 'admin';
export type SearchFilter = 'all' | 'people' | 'skills' | 'projects' | 'companies' | 'jobs';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  isAuthenticated: boolean;
  currentUser: UserProfile;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  switchRole: (role: UserRole) => void;
  posts: PostItem[];
  connections: ConnectionUser[];
  notifications: NotificationItem[];
  jobs: JobItem[];
  codingProblems: CodingProblem[];
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchFilter: SearchFilter;
  setSearchFilter: (filter: SearchFilter) => void;
  viewingProfileUser: ConnectionUser | null;
  setViewingProfileUser: (user: ConnectionUser | null) => void;
  
  // Developer Dashboard & External Integrations
  githubData: GithubProfileData;
  setGithubData: React.Dispatch<React.SetStateAction<GithubProfileData>>;
  connectGithub: (username: string, isDemo?: boolean) => void;
  disconnectGithub: () => void;
  syncGithub: () => void;
  toggleGithubDemoMode: (enabled: boolean) => void;

  leetCodeData: LeetCodeProfileData;
  setLeetCodeData: React.Dispatch<React.SetStateAction<LeetCodeProfileData>>;
  connectLeetCode: (username: string, isDemo?: boolean) => void;
  disconnectLeetCode: () => void;
  syncLeetCode: () => void;
  toggleLeetCodeDemoMode: (enabled: boolean) => void;

  devScoreReport: DeveloperScoreReport;
  recalculateDevScore: () => void;

  // Recruiter & Marketplace
  recruiterMode: boolean;
  setRecruiterMode: (enabled: boolean) => void;
  jobApplicants: JobApplicant[];
  updateApplicantStatus: (applicantId: string, status: JobApplicant['status']) => void;
  addJobPosting: (posting: Omit<JobItem, 'id' | 'postedDate' | 'applicantsCount' | 'isSaved' | 'isApplied'>) => void;
  contactCandidate: (candidate: { id?: string; name: string; avatar: string; headline: string }) => void;

  // Stage 6: AI Career Assistant
  aiChatMessages: AIChatMessage[];
  isAILoading: boolean;
  isAIDemoMode: boolean;
  sendAIChatMessage: (message: string) => Promise<void>;
  clearAIChat: () => void;
  skillRecommendations: SkillRecommendation[];
  projectRecommendations: ProjectRecommendation[];
  jobRecommendations: JobRecommendationMatch[];
  learningRoadmap: LearningRoadmapStep[];
  toggleRoadmapStep: (stepId: string) => void;
  interviewPrepPlan: InterviewPrepPlan;
  toggleMockTask: (taskId: string) => void;
  resumeAnalysis: ResumeAnalysisResult | null;
  isAnalyzingResume: boolean;
  analyzeResumeText: (text: string, fileName?: string) => Promise<void>;
  visualRoadmapNodes: VisualRoadmapNode[];
  targetCareerRole: string;
  setTargetCareerRole: (role: string) => void;
  activeAssistantTab: 'chat' | 'recommendations' | 'resume' | 'roadmap';
  setActiveAssistantTab: (tab: 'chat' | 'recommendations' | 'resume' | 'roadmap') => void;

  // Stage 8: Admin & Moderation Operations
  adminUsers: AdminUserItem[];
  setAdminUsers: React.Dispatch<React.SetStateAction<AdminUserItem[]>>;
  toggleUserStatus: (userId: string, newStatus: AdminUserItem['status']) => void;
  toggleUserVerification: (userId: string) => void;
  adminRecruiters: AdminRecruiterItem[];
  setAdminRecruiters: React.Dispatch<React.SetStateAction<AdminRecruiterItem[]>>;
  toggleRecruiterStatus: (recId: string, newStatus: AdminRecruiterItem['status']) => void;
  adminCompanies: AdminCompanyItem[];
  setAdminCompanies: React.Dispatch<React.SetStateAction<AdminCompanyItem[]>>;
  toggleCompanyVerification: (compId: string) => void;
  addCompany: (companyData: Omit<AdminCompanyItem, 'id' | 'totalHires'>) => void;
  adminJobs: AdminJobItem[];
  setAdminJobs: React.Dispatch<React.SetStateAction<AdminJobItem[]>>;
  toggleAdminJobStatus: (jobId: string, newStatus: AdminJobItem['status']) => void;
  adminReports: AdminReportItem[];
  setAdminReports: React.Dispatch<React.SetStateAction<AdminReportItem[]>>;
  resolveAdminReport: (reportId: string, action: 'dismiss' | 'delete_content' | 'warn_user' | 'ban_account') => void;
  adminAuditLogs: AdminAuditLog[];
  addAuditLog: (action: string, target: string, severity: AdminAuditLog['severity'], details: string) => void;
  systemHealth: SystemHealthMetric[];
  isDiagnosticsRunning: boolean;
  runSystemDiagnostics: () => Promise<void>;
  platformAnalytics: PlatformAnalytics;

  
  // Auth actions
  login: (email: string, password?: string, remember?: boolean) => boolean;
  signup: (formData: { fullName: string; email: string; phone?: string; userType: UserType }) => void;
  logout: () => void;
  finishProfileSetup: (profileData: Partial<UserProfile>) => void;
  
  // Profile CRUD
  updateProfileHeader: (data: { fullName: string; headline: string; location: string; collegeOrCompany: string; bio: string; openToWork: boolean; openToMentor: boolean }) => void;
  updateAvatar: (avatarUrl: string) => void;
  updateBanner: (bannerUrl: string) => void;
  updateSocialLinks: (links: SocialLinks) => void;
  addExperience: (item: Omit<ExperienceItem, 'id'>) => void;
  editExperience: (id: string, item: Omit<ExperienceItem, 'id'>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (item: Omit<EducationItem, 'id'>) => void;
  editEducation: (id: string, item: Omit<EducationItem, 'id'>) => void;
  deleteEducation: (id: string) => void;
  addSkill: (item: Omit<SkillItem, 'id' | 'endorsements'>) => void;
  deleteSkill: (id: string) => void;
  endorseSkill: (id: string) => void;
  addProject: (item: Omit<ProjectItem, 'id'>) => void;
  editProject: (id: string, item: Omit<ProjectItem, 'id'>) => void;
  deleteProject: (id: string) => void;
  addCertification: (item: Omit<CertificationItem, 'id'>) => void;
  deleteCertification: (id: string) => void;
  addAchievement: (item: Omit<AchievementItem, 'id'>) => void;
  deleteAchievement: (id: string) => void;
  updateResume: (fileName: string) => void;

  // Post & Feed Actions
  createPost: (post: { content: string; type: PostItem['type']; tags: string[]; mediaUrl?: string; codeSnippet?: PostItem['codeSnippet']; projectData?: PostItem['projectData']; milestoneData?: PostItem['milestoneData'] }) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, commentText: string) => void;
  sharePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  
  // Networking Actions
  sendConnectionRequest: (userId: string) => void;
  acceptConnectionRequest: (userId: string) => void;
  rejectConnectionRequest: (userId: string) => void;
  toggleFollow: (userId: string) => void;
  removeConnection: (userId: string) => void;
  
  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Jobs & Coding
  toggleSaveJob: (jobId: string) => void;
  applyJob: (jobId: string) => void;
  toggleSolveProblem: (problemId: string) => void;
  
  // Messages
  sendMessage: (conversationId: string, text: string) => void;
  
  // Stats & Progress
  profileCompletion: {
    percentage: number;
    pendingTasks: { label: string; actionTab: AppTab }[];
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    const saved = localStorage.getItem('devnexus_view');
    return (saved as AppView) || 'landing';
  });
  
  const [activeTab, setActiveTab] = useState<AppTab>(() => {
    const saved = localStorage.getItem('devnexus_tab');
    return (saved as AppTab) || 'feed';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('devnexus_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('devnexus_user');
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  const [posts, setPosts] = useState<PostItem[]>(() => {
    const saved = localStorage.getItem('devnexus_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [connections, setConnections] = useState<ConnectionUser[]>(() => {
    const saved = localStorage.getItem('devnexus_connections');
    return saved ? JSON.parse(saved) : initialConnections;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('devnexus_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [jobs, setJobs] = useState<JobItem[]>(() => {
    const saved = localStorage.getItem('devnexus_jobs');
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [codingProblems, setCodingProblems] = useState<CodingProblem[]>(() => {
    const saved = localStorage.getItem('devnexus_coding');
    return saved ? JSON.parse(saved) : initialCodingProblems;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('devnexus_conversations');
    return saved ? JSON.parse(saved) : initialConversations;
  });

  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<SearchFilter>('all');
  const [viewingProfileUser, setViewingProfileUser] = useState<ConnectionUser | null>(null);

  // GitHub integration state
  const [githubData, setGithubData] = useState<GithubProfileData>(() => {
    const saved = localStorage.getItem('devnexus_github');
    return saved ? JSON.parse(saved) : initialGithubData;
  });

  // LeetCode integration state
  const [leetCodeData, setLeetCodeData] = useState<LeetCodeProfileData>(() => {
    const saved = localStorage.getItem('devnexus_leetcode');
    return saved ? JSON.parse(saved) : initialLeetCodeData;
  });

  // Recruiter Portal & Marketplace state
  const [recruiterMode, setRecruiterMode] = useState<boolean>(() => {
    return localStorage.getItem('devnexus_recruiter_mode') === 'true';
  });

  const [jobApplicants, setJobApplicants] = useState<JobApplicant[]>(() => {
    const saved = localStorage.getItem('devnexus_applicants');
    return saved ? JSON.parse(saved) : initialJobApplicants;
  });

  // Dynamic DevScore calculation
  const calculateDynamicDevScore = (
    user: UserProfile,
    gh: GithubProfileData,
    lc: LeetCodeProfileData
  ): DeveloperScoreReport => {
    // 1. Projects & Architecture Depth (Max: 250)
    const projectCount = user.projects.length;
    const ghPinnedStars = gh.pinnedRepos.reduce((acc, r) => acc + r.stars, 0);
    const projectsScore = Math.min(
      250,
      Math.round(projectCount * 30 + Math.min(100, ghPinnedStars * 0.4) + (projectCount > 0 ? 50 : 0))
    );

    // 2. DSA & Problem Solving (Max: 200)
    const lcSolved = lc.isConnected ? lc.totalSolved : user.codingStats.leetCodeSolved;
    const lcHard = lc.isConnected ? lc.hardSolved : user.codingStats.hard;
    const contestRating = lc.isConnected ? lc.contestRating : user.codingStats.contestRating;
    const dsaScore = Math.min(
      200,
      Math.round(
        Math.min(80, (lcSolved / 500) * 80) +
        Math.min(50, (lcHard / 50) * 50) +
        Math.min(70, Math.max(0, (contestRating - 1400) / 10))
      )
    );

    // 3. GitHub Activity & Consistency (Max: 200)
    const commits = gh.isConnected ? gh.totalCommits : user.codingStats.gitHubCommitsThisYear;
    const repos = gh.isConnected ? gh.publicRepos : user.codingStats.gitHubRepos;
    const streak = gh.isConnected ? gh.streakDays : user.codingStats.streakDays;
    const githubScore = Math.min(
      200,
      Math.round(
        Math.min(80, (commits / 1000) * 80) +
        Math.min(50, (repos / 20) * 50) +
        Math.min(70, (streak / 60) * 70)
      )
    );

    // 4. Skills & Endorsements (Max: 200)
    const skillCount = user.skills.length;
    const endorsements = user.skills.reduce((acc, s) => acc + s.endorsements, 0);
    const skillsScore = Math.min(
      200,
      Math.round(Math.min(100, skillCount * 12) + Math.min(100, endorsements * 0.45))
    );

    // 5. Internships & Experience (Max: 100)
    const expCount = user.experiences.length;
    const experienceScore = Math.min(100, expCount * 35 + (expCount > 0 ? 30 : 0));

    // 6. Certifications (Max: 50)
    const certCount = user.certifications.length;
    const certScore = Math.min(50, certCount * 20);

    const overallScore = projectsScore + dsaScore + githubScore + skillsScore + experienceScore + certScore;

    const tier =
      overallScore >= 850
        ? 'Elite (Top 1%)'
        : overallScore >= 700
        ? 'Master (Top 5%)'
        : overallScore >= 500
        ? 'Proficient'
        : 'Developing';

    return {
      overallScore,
      tier,
      badgeName: overallScore >= 850 ? 'Full-Stack & Systems Master' : overallScore >= 700 ? 'Advanced Engineer' : 'Rising Developer',
      calculatedAt: 'Updated Just Now',
      methodologyNote: 'DevScore is an application-generated benchmark calculated via a weighted multi-factor heuristic evaluating verified GitHub repo depth, DSA solving track, demonstrated internships, certifications, and skill endorsements.',
      categories: [
        {
          id: 'cat-projects',
          category: 'Projects & Architecture Depth',
          score: projectsScore,
          maxScore: 250,
          weight: 25,
          status: projectsScore >= 200 ? 'Excellent' : projectsScore >= 140 ? 'Good' : 'Needs Improvement',
          description: 'Evaluates real-world codebases, star counts, modularity, and distributed system design.',
          evidence: user.projects.slice(0, 3).map(p => `${p.title} (${p.techStack.slice(0, 2).join(', ')})`),
          tips: ['Add end-to-end integration tests & CI workflows', 'Publish an open-source library or live interactive demo'],
        },
        {
          id: 'cat-dsa',
          category: 'DSA & Algorithmic Problem Solving',
          score: dsaScore,
          maxScore: 200,
          weight: 20,
          status: dsaScore >= 160 ? 'Excellent' : dsaScore >= 100 ? 'Good' : 'Needs Improvement',
          description: 'Evaluates LeetCode solved volume, Hard problem percentage, and contest Knight/Guardian rating.',
          evidence: [`${lcSolved} Solved (${lcHard} Hard)`, `${contestRating} Contest Rating`, `${streak}-Day Problem Streak`],
          tips: ['Participate in bi-weekly coding contests to boost global rating', 'Solve Hard dynamic programming and graph problems'],
        },
        {
          id: 'cat-github',
          category: 'GitHub Activity & Consistency',
          score: githubScore,
          maxScore: 200,
          weight: 20,
          status: githubScore >= 160 ? 'Excellent' : githubScore >= 100 ? 'Good' : 'Needs Improvement',
          description: 'Measures active commit velocity, PR merged frequency, and multi-language versatility.',
          evidence: [`${commits} Commits recorded`, `${repos} Repositories`, `${streak} Days continuous activity`],
          tips: ['Maintain a consistent daily commit cadence', 'Contribute pull requests to upstream open-source frameworks'],
        },
        {
          id: 'cat-skills',
          category: 'Skills & Peer Endorsements',
          score: skillsScore,
          maxScore: 200,
          weight: 20,
          status: skillsScore >= 150 ? 'Excellent' : skillsScore >= 90 ? 'Good' : 'Needs Improvement',
          description: 'Assesses skill breadth, peer endorsements, and depth across Frontend, Backend, and Core CS.',
          evidence: [`${skillCount} Skills on profile`, `${endorsements}+ Total endorsements received`],
          tips: ['Request endorsements from colleagues for core backend and database skills'],
        },
        {
          id: 'cat-experience',
          category: 'Internships & Industry Impact',
          score: experienceScore,
          maxScore: 100,
          weight: 10,
          status: experienceScore >= 70 ? 'Excellent' : experienceScore >= 40 ? 'Good' : 'Needs Improvement',
          description: 'Evaluates practical engineering contributions, webhook throughput scaling, and team collaboration.',
          evidence: user.experiences.map(e => `${e.title} @ ${e.company}`),
          tips: ['Quantify business metrics, throughput gains, and latency reductions'],
        },
        {
          id: 'cat-certifications',
          category: 'Certifications & Accreditations',
          score: certScore,
          maxScore: 50,
          weight: 5,
          status: certScore >= 35 ? 'Excellent' : certScore >= 20 ? 'Good' : 'Needs Improvement',
          description: 'Verifies industry standard cloud architect and development credentials.',
          evidence: user.certifications.map(c => c.name),
          tips: ['Add AWS Certified Solutions Architect or Kubernetes CKA certifications'],
        },
      ],
    };
  };

  const [devScoreReport, setDevScoreReport] = useState<DeveloperScoreReport>(() => {
    return calculateDynamicDevScore(currentUser, githubData, leetCodeData);
  });

  // Re-calculate DevScore when dependencies change
  const recalculateDevScore = () => {
    const updated = calculateDynamicDevScore(currentUser, githubData, leetCodeData);
    setDevScoreReport(updated);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('devnexus_github', JSON.stringify(githubData));
  }, [githubData]);

  useEffect(() => {
    localStorage.setItem('devnexus_leetcode', JSON.stringify(leetCodeData));
  }, [leetCodeData]);

  useEffect(() => {
    localStorage.setItem('devnexus_applicants', JSON.stringify(jobApplicants));
  }, [jobApplicants]);

  useEffect(() => {
    localStorage.setItem('devnexus_recruiter_mode', String(recruiterMode));
  }, [recruiterMode]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('devnexus_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('devnexus_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('devnexus_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('devnexus_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('devnexus_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('devnexus_connections', JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem('devnexus_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('devnexus_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('devnexus_coding', JSON.stringify(codingProblems));
  }, [codingProblems]);

  useEffect(() => {
    localStorage.setItem('devnexus_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Auth functions
  const login = (email: string, _password?: string, _remember?: boolean) => {
    setIsAuthenticated(true);
    setCurrentView('app');
    // If logging in with different email, keep profile consistent
    if (email && email !== currentUser.email) {
      setCurrentUser(prev => ({
        ...prev,
        email: email,
      }));
    }
    return true;
  };

  const signup = (formData: { fullName: string; email: string; phone?: string; userType: UserType }) => {
    const newUser: UserProfile = {
      ...initialCurrentUser,
      id: `user-${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || '+91 98765 00000',
      userType: formData.userType,
      headline: `${formData.userType} @ Developer Community`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      connectionsCount: 1,
      followersCount: 3,
      profileViews: 12,
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setCurrentView('profile_setup');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
  };

  const finishProfileSetup = (profileData: Partial<UserProfile>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...profileData,
    }));
    setCurrentView('app');
    setActiveTab('profile');
  };

  // Profile CRUD
  const updateProfileHeader = (data: { fullName: string; headline: string; location: string; collegeOrCompany: string; bio: string; openToWork: boolean; openToMentor: boolean }) => {
    setCurrentUser(prev => ({
      ...prev,
      ...data,
    }));
  };

  const updateAvatar = (avatarUrl: string) => {
    setCurrentUser(prev => ({ ...prev, avatar: avatarUrl }));
  };

  const updateBanner = (bannerUrl: string) => {
    setCurrentUser(prev => ({ ...prev, bannerUrl }));
  };

  const updateSocialLinks = (links: SocialLinks) => {
    setCurrentUser(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, ...links },
    }));
  };

  const addExperience = (item: Omit<ExperienceItem, 'id'>) => {
    const newItem: ExperienceItem = { ...item, id: `exp-${Date.now()}` };
    setCurrentUser(prev => ({
      ...prev,
      experiences: [newItem, ...prev.experiences],
    }));
  };

  const editExperience = (id: string, item: Omit<ExperienceItem, 'id'>) => {
    setCurrentUser(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => (e.id === id ? { ...item, id } : e)),
    }));
  };

  const deleteExperience = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id),
    }));
  };

  const addEducation = (item: Omit<EducationItem, 'id'>) => {
    const newItem: EducationItem = { ...item, id: `edu-${Date.now()}` };
    setCurrentUser(prev => ({
      ...prev,
      education: [newItem, ...prev.education],
    }));
  };

  const editEducation = (id: string, item: Omit<EducationItem, 'id'>) => {
    setCurrentUser(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...item, id } : e)),
    }));
  };

  const deleteEducation = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id),
    }));
  };

  const addSkill = (item: Omit<SkillItem, 'id' | 'endorsements'>) => {
    const newItem: SkillItem = {
      ...item,
      id: `skill-${Date.now()}`,
      endorsements: 1,
    };
    setCurrentUser(prev => ({
      ...prev,
      skills: [...prev.skills, newItem],
    }));
  };

  const deleteSkill = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  };

  const endorseSkill = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === id ? { ...s, endorsements: s.endorsements + 1 } : s)),
    }));
  };

  const addProject = (item: Omit<ProjectItem, 'id'>) => {
    const newItem: ProjectItem = {
      ...item,
      id: `proj-${Date.now()}`,
      stars: 0,
    };
    setCurrentUser(prev => ({
      ...prev,
      projects: [newItem, ...prev.projects],
    }));
  };

  const editProject = (id: string, item: Omit<ProjectItem, 'id'>) => {
    setCurrentUser(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...item, id } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  const addCertification = (item: Omit<CertificationItem, 'id'>) => {
    const newItem: CertificationItem = { ...item, id: `cert-${Date.now()}` };
    setCurrentUser(prev => ({
      ...prev,
      certifications: [newItem, ...prev.certifications],
    }));
  };

  const deleteCertification = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id),
    }));
  };

  const addAchievement = (item: Omit<AchievementItem, 'id'>) => {
    const newItem: AchievementItem = { ...item, id: `ach-${Date.now()}` };
    setCurrentUser(prev => ({
      ...prev,
      achievements: [newItem, ...prev.achievements],
    }));
  };

  const deleteAchievement = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a.id !== id),
    }));
  };

  const updateResume = (fileName: string) => {
    setCurrentUser(prev => ({
      ...prev,
      resumeFileName: fileName,
      resumeUploadDate: 'Just now',
    }));
  };

  // Posts & Feed
  const createPost = (post: { content: string; type: PostItem['type']; tags: string[]; mediaUrl?: string; codeSnippet?: PostItem['codeSnippet']; projectData?: PostItem['projectData']; milestoneData?: PostItem['milestoneData'] }) => {
    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.fullName,
        headline: currentUser.headline,
        avatar: currentUser.avatar,
        userType: currentUser.userType,
        isVerified: false,
      },
      timestamp: 'Just now',
      content: post.content,
      type: post.type,
      tags: post.tags,
      mediaUrl: post.mediaUrl,
      codeSnippet: post.codeSnippet,
      projectData: post.projectData,
      milestoneData: post.milestoneData,
      likes: 0,
      isLiked: false,
      comments: [],
      shares: 0,
      isSaved: false,
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.fullName,
        avatar: currentUser.avatar,
        headline: currentUser.headline,
      },
      timestamp: 'Just now',
      text: commentText.trim(),
      likes: 0,
    };
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );
  };

  const sharePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, shares: p.shares + 1 } : p))
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  // Networking
  const sendConnectionRequest = (userId: string) => {
    setConnections(prev =>
      prev.map(c => (c.id === userId ? { ...c, isPending: true } : c))
    );
  };

  const acceptConnectionRequest = (userId: string) => {
    setConnections(prev =>
      prev.map(c => (c.id === userId ? { ...c, isConnected: true, isPending: false } : c))
    );
    setCurrentUser(prev => ({ ...prev, connectionsCount: prev.connectionsCount + 1 }));
    setNotifications(prev =>
      prev.map(n =>
        n.sender.name.toLowerCase().includes(userId.toLowerCase()) ? { ...n, actionRequired: false, isRead: true } : n
      )
    );
  };

  const rejectConnectionRequest = (userId: string) => {
    setConnections(prev =>
      prev.map(c => (c.id === userId ? { ...c, isPending: false } : c))
    );
    setNotifications(prev =>
      prev.map(n =>
        n.sender.name.toLowerCase().includes(userId.toLowerCase()) ? { ...n, actionRequired: false, isRead: true } : n
      )
    );
  };

  const toggleFollow = (userId: string) => {
    setConnections(prev =>
      prev.map(c => (c.id === userId ? { ...c, isFollowing: !c.isFollowing } : c))
    );
  };

  const removeConnection = (userId: string) => {
    setConnections(prev =>
      prev.map(c => (c.id === userId ? { ...c, isConnected: false, isPending: false } : c))
    );
    setCurrentUser(prev => ({ ...prev, connectionsCount: Math.max(0, prev.connectionsCount - 1) }));
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Jobs
  const toggleSaveJob = (jobId: string) => {
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, isSaved: !j.isSaved } : j))
    );
  };

  const applyJob = (jobId: string) => {
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, isApplied: true, applicantsCount: j.applicantsCount + 1 } : j))
    );
  };

  // Coding Problems
  const toggleSolveProblem = (problemId: string) => {
    setCodingProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          const nextSolved = !p.isSolved;
          setCurrentUser(u => ({
            ...u,
            codingStats: {
              ...u.codingStats,
              leetCodeSolved: nextSolved ? u.codingStats.leetCodeSolved + 1 : u.codingStats.leetCodeSolved - 1,
            },
          }));
          return { ...p, isSolved: nextSolved };
        }
        return p;
      })
    );
  };

  // Messages
  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: 'Just now',
    };
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );
  };

  // GitHub account actions
  const connectGithub = (username: string, isDemo = true) => {
    setGithubData(prev => ({
      ...prev,
      username: username.trim() || 'arjunsharma-dev',
      isConnected: true,
      isDemoMode: isDemo,
      lastSyncedAt: 'Just now',
    }));
    setCurrentUser(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        github: `https://github.com/${username.trim() || 'arjunsharma-dev'}`,
      },
    }));
    recalculateDevScore();
  };

  const disconnectGithub = () => {
    setGithubData(prev => ({
      ...prev,
      isConnected: false,
      lastSyncedAt: 'Disconnected',
    }));
    recalculateDevScore();
  };

  const syncGithub = () => {
    setGithubData(prev => ({
      ...prev,
      lastSyncedAt: 'Just now',
      totalCommits: prev.totalCommits + 2,
    }));
    recalculateDevScore();
  };

  const toggleGithubDemoMode = (enabled: boolean) => {
    setGithubData(prev => ({
      ...prev,
      isDemoMode: enabled,
    }));
  };

  // LeetCode account actions
  const connectLeetCode = (username: string, isDemo = true) => {
    setLeetCodeData(prev => ({
      ...prev,
      username: username.trim() || 'arjun_codes',
      isConnected: true,
      isDemoMode: isDemo,
      lastSyncedAt: 'Just now',
    }));
    setCurrentUser(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        leetcode: `https://leetcode.com/${username.trim() || 'arjun_codes'}`,
      },
    }));
    recalculateDevScore();
  };

  const disconnectLeetCode = () => {
    setLeetCodeData(prev => ({
      ...prev,
      isConnected: false,
      lastSyncedAt: 'Disconnected',
    }));
    recalculateDevScore();
  };

  const syncLeetCode = () => {
    setLeetCodeData(prev => ({
      ...prev,
      lastSyncedAt: 'Just now',
      totalSolved: prev.totalSolved + 1,
    }));
    recalculateDevScore();
  };

  const toggleLeetCodeDemoMode = (enabled: boolean) => {
    setLeetCodeData(prev => ({
      ...prev,
      isDemoMode: enabled,
    }));
  };

  // Recruiter actions
  const updateApplicantStatus = (applicantId: string, status: JobApplicant['status']) => {
    setJobApplicants(prev =>
      prev.map(app => (app.id === applicantId ? { ...app, status } : app))
    );
  };

  const addJobPosting = (posting: Omit<JobItem, 'id' | 'postedDate' | 'applicantsCount' | 'isSaved' | 'isApplied'>) => {
    const newJob: JobItem = {
      ...posting,
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      applicantsCount: 0,
      isSaved: false,
      isApplied: false,
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const contactCandidate = (candidate: { id?: string; name: string; avatar: string; headline: string }) => {
    // Check if conversation already exists
    const existing = conversations.find(c => c.contact.name === candidate.name);
    if (existing) {
      setActiveConversationId(existing.id);
      setActiveTab('messages');
      return;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      contact: {
        id: candidate.id || `user-${Date.now()}`,
        name: candidate.name,
        avatar: candidate.avatar,
        headline: candidate.headline,
        isOnline: true,
      },
      messages: [
        {
          id: `m-${Date.now()}`,
          senderId: currentUser.id,
          text: `Hi ${candidate.name}, we reviewed your DevNexus profile and exceptional DevScore. We would like to connect with you regarding our open engineering roles.`,
          timestamp: 'Just now',
        },
      ],
      unreadCount: 0,
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConvId);
    setActiveTab('messages');
  };

  // Stage 6: AI Career Assistant State & Handlers
  const [aiChatMessages, setAiChatMessages] = useState<AIChatMessage[]>(initialAIChatMessages);
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  const [isAIDemoMode, setIsAIDemoMode] = useState<boolean>(false);
  const [activeAssistantTab, setActiveAssistantTab] = useState<'chat' | 'recommendations' | 'resume' | 'roadmap'>('chat');
  const [skillRecommendations] = useState<SkillRecommendation[]>(initialSkillRecommendations);
  const [projectRecommendations] = useState<ProjectRecommendation[]>(initialProjectRecommendations);
  const [jobRecommendations] = useState<JobRecommendationMatch[]>(initialJobRecommendations);
  const [learningRoadmap, setLearningRoadmap] = useState<LearningRoadmapStep[]>(initialLearningRoadmapSteps);
  const [interviewPrepPlan, setInterviewPrepPlan] = useState<InterviewPrepPlan>(initialInterviewPrepPlan);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysisResult | null>(initialResumeAnalysis);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState<boolean>(false);
  const [visualRoadmapNodes, setVisualRoadmapNodes] = useState<VisualRoadmapNode[]>(initialVisualRoadmapNodes);
  const [targetCareerRole, setTargetCareerRoleState] = useState<string>('Backend SDE-II (Distributed Systems)');

  const sendAIChatMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
      timestamp: 'Just now',
    };

    setAiChatMessages(prev => [...prev, userMsg]);
    setIsAILoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText.trim(),
          history: aiChatMessages.slice(-6).map(m => ({ role: m.role, content: m.content })),
          userProfileContext: {
            fullName: currentUser.fullName,
            headline: currentUser.headline,
            skills: currentUser.skills,
            projects: currentUser.projects,
            devScore: devScoreReport.overallScore,
            codingStats: currentUser.codingStats,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      setIsAIDemoMode(!!data.isDemoMode);

      const assistantMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.content,
        timestamp: 'Just now',
        isDemoMode: data.isDemoMode,
        suggestedPills: data.suggestedPills,
        category: data.category,
      };

      setAiChatMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('AI Chat API fallback triggered:', err);
      setIsAIDemoMode(true);
      
      setTimeout(() => {
        const assistantMsg: AIChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: `### 🎯 Targeted Advice for ${currentUser.fullName}

Here is a focused recommendation based on your profile (**DevScore ${devScoreReport.overallScore}**):

- **Distributed Systems Focus**: Your LeetCode and full-stack fundamentals are strong. Prioritize adding **Apache Kafka** event-streaming and **Redis sliding-window rate limiting** to your portfolio.
- **Quantifiable Project Scale**: Highlight metrics such as throughput (e.g. *15,000 requests/sec*) and latency benchmarks in your resume bullets.
- **Target Role Fit**: You are a 94% match for SDE-1/2 backend roles at tier-1 companies.

Check the **Roadmap** and **Recommendations** tabs for full structured breakdowns!`,
          timestamp: 'Just now',
          isDemoMode: true,
          suggestedPills: [
            'Which skills should I learn next?',
            'How can I improve my resume?',
            'What jobs match my profile?',
          ],
        };
        setAiChatMessages(prev => [...prev, assistantMsg]);
        setIsAILoading(false);
      }, 500);
      return;
    } finally {
      setIsAILoading(false);
    }
  };

  const clearAIChat = () => {
    setAiChatMessages(initialAIChatMessages);
  };

  const toggleRoadmapStep = (stepId: string) => {
    setLearningRoadmap(prev =>
      prev.map(step => (step.id === stepId ? { ...step, completed: !step.completed } : step))
    );
  };

  const toggleMockTask = (taskId: string) => {
    setInterviewPrepPlan(prev => ({
      ...prev,
      mockChecklist: prev.mockChecklist.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const analyzeResumeText = async (text: string, fileName?: string) => {
    setIsAnalyzingResume(true);
    try {
      const response = await fetch('/api/ai/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: text,
          fileName: fileName || 'uploaded_resume.pdf',
          userProfile: currentUser,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze resume with status ${response.status}`);
      }

      const result: ResumeAnalysisResult = await response.json();
      setResumeAnalysis(result);
    } catch (err) {
      console.warn('Resume analysis API fallback:', err);
      setResumeAnalysis({
        ...initialResumeAnalysis,
        fileName: fileName || 'uploaded_resume.pdf',
        analyzedAt: new Date().toISOString(),
        isDemoMode: true,
      });
    } finally {
      setIsAnalyzingResume(false);
    }
  };

  const setTargetCareerRole = (role: string) => {
    setTargetCareerRoleState(role);
    setVisualRoadmapNodes(prev =>
      prev.map(node => {
        if (node.stage === 'target_job') {
          return {
            ...node,
            title: `Target: ${role}`,
            items: [
              role,
              'Core Infrastructure & Architecture',
              'Tier-1 Tech Companies & High-Growth Unicorns',
              'Target CTC: ₹28L - ₹45L+ / $140k+ USD',
            ],
          };
        }
        return node;
      })
    );
  };

  // Calculate Profile Completion %
  const calculateProfileCompletion = () => {
    let score = 0;
    const pendingTasks: { label: string; actionTab: AppTab }[] = [];

    if (currentUser.avatar) score += 10;
    else pendingTasks.push({ label: 'Add a profile photo', actionTab: 'profile' });

    if (currentUser.headline && currentUser.headline.length > 10) score += 15;
    else pendingTasks.push({ label: 'Add a professional headline', actionTab: 'profile' });

    if (currentUser.bio && currentUser.bio.length > 20) score += 10;
    else pendingTasks.push({ label: 'Write a short bio/about section', actionTab: 'profile' });

    if (currentUser.skills.length >= 3) score += 15;
    else pendingTasks.push({ label: 'Add at least 3 skills', actionTab: 'profile' });

    if (currentUser.experiences.length > 0) score += 15;
    else pendingTasks.push({ label: 'Add experience or internships', actionTab: 'profile' });

    if (currentUser.education.length > 0) score += 15;
    else pendingTasks.push({ label: 'Add college or university details', actionTab: 'profile' });

    if (currentUser.projects.length > 0) score += 10;
    else pendingTasks.push({ label: 'Showcase your top projects', actionTab: 'profile' });

    if (currentUser.socialLinks.github || currentUser.socialLinks.leetcode) score += 5;
    else pendingTasks.push({ label: 'Connect GitHub or LeetCode', actionTab: 'profile' });

    if (currentUser.resumeFileName) score += 5;
    else pendingTasks.push({ label: 'Upload your latest resume', actionTab: 'profile' });

    return { percentage: Math.min(100, score), pendingTasks };
  };

  const profileCompletion = calculateProfileCompletion();

  // Stage 8: Roles and Admin State
  const [currentUserRole, setCurrentUserRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('devnexus_role');
    return (saved as UserRole) || 'developer';
  });

  const setCurrentUserRole = (role: UserRole) => {
    setCurrentUserRoleState(role);
    localStorage.setItem('devnexus_role', role);
    setCurrentUser(prev => ({
      ...prev,
      userRole: role,
      isAdmin: role === 'admin',
    }));
  };

  const switchRole = (role: UserRole) => {
    setCurrentUserRole(role);
    if (role === 'admin') {
      setActiveTab('admin');
    } else if (role === 'recruiter') {
      setActiveTab('recruiter_portal');
    } else {
      setActiveTab('feed');
    }
  };

  const [adminUsers, setAdminUsers] = useState<AdminUserItem[]>(() => {
    const saved = localStorage.getItem('devnexus_admin_users');
    return saved ? JSON.parse(saved) : initialAdminUsers;
  });

  const [adminRecruiters, setAdminRecruiters] = useState<AdminRecruiterItem[]>(() => {
    const saved = localStorage.getItem('devnexus_admin_recruiters');
    return saved ? JSON.parse(saved) : initialAdminRecruiters;
  });

  const [adminCompanies, setAdminCompanies] = useState<AdminCompanyItem[]>(() => {
    const saved = localStorage.getItem('devnexus_admin_companies');
    return saved ? JSON.parse(saved) : initialAdminCompanies;
  });

  const [adminJobs, setAdminJobs] = useState<AdminJobItem[]>(() => {
    const saved = localStorage.getItem('devnexus_admin_jobs');
    return saved ? JSON.parse(saved) : initialAdminJobs;
  });

  const [adminReports, setAdminReports] = useState<AdminReportItem[]>(() => {
    const saved = localStorage.getItem('devnexus_admin_reports');
    return saved ? JSON.parse(saved) : initialAdminReports;
  });

  const [adminAuditLogs, setAdminAuditLogs] = useState<AdminAuditLog[]>(() => {
    const saved = localStorage.getItem('devnexus_admin_logs');
    return saved ? JSON.parse(saved) : initialAdminAuditLogs;
  });

  const [systemHealth, setSystemHealth] = useState<SystemHealthMetric[]>(initialSystemHealth);
  const [isDiagnosticsRunning, setIsDiagnosticsRunning] = useState<boolean>(false);
  const [platformAnalytics, setPlatformAnalytics] = useState<PlatformAnalytics>(initialPlatformAnalytics);

  useEffect(() => {
    localStorage.setItem('devnexus_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    localStorage.setItem('devnexus_admin_recruiters', JSON.stringify(adminRecruiters));
  }, [adminRecruiters]);

  useEffect(() => {
    localStorage.setItem('devnexus_admin_companies', JSON.stringify(adminCompanies));
  }, [adminCompanies]);

  useEffect(() => {
    localStorage.setItem('devnexus_admin_jobs', JSON.stringify(adminJobs));
  }, [adminJobs]);

  useEffect(() => {
    localStorage.setItem('devnexus_admin_reports', JSON.stringify(adminReports));
  }, [adminReports]);

  useEffect(() => {
    localStorage.setItem('devnexus_admin_logs', JSON.stringify(adminAuditLogs));
  }, [adminAuditLogs]);

  const addAuditLog = (action: string, target: string, severity: AdminAuditLog['severity'], details: string) => {
    const newLog: AdminAuditLog = {
      id: `log-${Date.now()}`,
      action,
      adminName: currentUserRole === 'admin' ? 'SysAdmin (You)' : 'Security Daemon',
      adminAvatar: currentUser.avatar,
      target,
      timestamp: 'Just now',
      severity,
      details,
    };
    setAdminAuditLogs(prev => [newLog, ...prev]);
  };

  const toggleUserStatus = (userId: string, newStatus: AdminUserItem['status']) => {
    setAdminUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, status: newStatus } : u))
    );
    addAuditLog(`User Status Changed to ${newStatus.toUpperCase()}`, `User ID #${userId}`, newStatus === 'suspended' ? 'critical' : 'info', `Status transition executed via Admin Console.`);
  };

  const toggleUserVerification = (userId: string) => {
    let targetName = userId;
    setAdminUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          targetName = u.name;
          return { ...u, isVerified: !u.isVerified };
        }
        return u;
      })
    );
    addAuditLog(`Developer Verification Toggled`, `User: ${targetName}`, 'info', `Verification badge status updated.`);
  };

  const toggleRecruiterStatus = (recId: string, newStatus: AdminRecruiterItem['status']) => {
    setAdminRecruiters(prev =>
      prev.map(r => (r.id === recId ? { ...r, status: newStatus } : r))
    );
    addAuditLog(`Recruiter Status Set to ${newStatus}`, `Recruiter ID #${recId}`, newStatus === 'approved' ? 'info' : 'warning', `Recruiter credentials status modified.`);
  };

  const toggleCompanyVerification = (compId: string) => {
    setAdminCompanies(prev =>
      prev.map(c => (c.id === compId ? { ...c, verified: !c.verified } : c))
    );
    addAuditLog(`Company Verification Updated`, `Company ID #${compId}`, 'info', `Official domain and recruitment authorization updated.`);
  };

  const addCompany = (companyData: Omit<AdminCompanyItem, 'id' | 'totalHires'>) => {
    const newComp: AdminCompanyItem = {
      ...companyData,
      id: `comp-${Date.now()}`,
      totalHires: 0,
    };
    setAdminCompanies(prev => [newComp, ...prev]);
    addAuditLog(`New Tech Company Registered`, `${companyData.name} (${companyData.domain})`, 'info', `Added company to platform registry.`);
  };

  const toggleAdminJobStatus = (jobId: string, newStatus: AdminJobItem['status']) => {
    setAdminJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    addAuditLog(`Job Posting Status Changed to ${newStatus}`, `Job ID #${jobId}`, newStatus === 'flagged' ? 'warning' : 'info', `Job listing moderation action applied.`);
  };

  const resolveAdminReport = (reportId: string, action: 'dismiss' | 'delete_content' | 'warn_user' | 'ban_account') => {
    const report = adminReports.find(r => r.id === reportId);
    setAdminReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, status: action === 'dismiss' ? 'dismissed' : 'resolved' } : r))
    );

    if (report) {
      if (action === 'delete_content') {
        if (report.targetType === 'job') {
          setAdminJobs(prev => prev.map(j => (j.id === report.targetId ? { ...j, status: 'closed' } : j)));
        } else if (report.targetType === 'post') {
          setPosts(prev => prev.filter(p => p.id !== report.targetId));
        }
        addAuditLog(`Reported Content Removed`, `${report.targetType.toUpperCase()}: ${report.targetTitle}`, 'warning', `Content deleted following user report review.`);
      } else if (action === 'ban_account') {
        toggleUserStatus(report.targetId, 'suspended');
        addAuditLog(`Account Banned from Report`, `${report.targetTitle}`, 'critical', `Immediate permanent suspension triggered by report resolution.`);
      } else if (action === 'warn_user') {
        addAuditLog(`Formal Warning Dispatched`, `${report.targetTitle}`, 'warning', `Official platform compliance warning sent.`);
      } else {
        addAuditLog(`Report Dismissed`, `Report ID #${reportId}`, 'info', `Report reviewed and marked as dismissed.`);
      }
    }
  };

  const runSystemDiagnostics = async () => {
    setIsDiagnosticsRunning(true);
    await new Promise(res => setTimeout(res, 900));
    setSystemHealth(prev =>
      prev.map(sys => ({
        ...sys,
        latency: `${Math.floor(10 + Math.random() * 60)}ms`,
        lastChecked: 'Just now',
      }))
    );
    setIsDiagnosticsRunning(false);
    addAuditLog(`Full System Diagnostics Executed`, `All 6 Core Infrastructure Services`, 'info', `All services reported 100% operational with nominal latencies.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeTab,
        setActiveTab,
        isAuthenticated,
        currentUser,
        currentUserRole,
        setCurrentUserRole,
        switchRole,
        posts,
        connections,
        notifications,
        jobs,
        codingProblems,
        conversations,
        activeConversationId,
        setActiveConversationId,
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        viewingProfileUser,
        setViewingProfileUser,
        login,
        signup,
        logout,
        finishProfileSetup,
        updateProfileHeader,
        updateAvatar,
        updateBanner,
        updateSocialLinks,
        addExperience,
        editExperience,
        deleteExperience,
        addEducation,
        editEducation,
        deleteEducation,
        addSkill,
        deleteSkill,
        endorseSkill,
        addProject,
        editProject,
        deleteProject,
        addCertification,
        deleteCertification,
        addAchievement,
        deleteAchievement,
        updateResume,
        createPost,
        likePost,
        addComment,
        sharePost,
        toggleSavePost,
        sendConnectionRequest,
        acceptConnectionRequest,
        rejectConnectionRequest,
        toggleFollow,
        removeConnection,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toggleSaveJob,
        applyJob,
        toggleSolveProblem,
        sendMessage,
        profileCompletion,
        githubData,
        setGithubData,
        connectGithub,
        disconnectGithub,
        syncGithub,
        toggleGithubDemoMode,
        leetCodeData,
        setLeetCodeData,
        connectLeetCode,
        disconnectLeetCode,
        syncLeetCode,
        toggleLeetCodeDemoMode,
        devScoreReport,
        recalculateDevScore,
        recruiterMode,
        setRecruiterMode,
        jobApplicants,
        updateApplicantStatus,
        addJobPosting,
        contactCandidate,
        // AI Assistant
        aiChatMessages,
        isAILoading,
        isAIDemoMode,
        sendAIChatMessage,
        clearAIChat,
        skillRecommendations,
        projectRecommendations,
        jobRecommendations,
        learningRoadmap,
        toggleRoadmapStep,
        interviewPrepPlan,
        toggleMockTask,
        resumeAnalysis,
        isAnalyzingResume,
        analyzeResumeText,
        visualRoadmapNodes,
        targetCareerRole,
        setTargetCareerRole,
        activeAssistantTab,
        setActiveAssistantTab,
        // Stage 8 Admin
        adminUsers,
        setAdminUsers,
        toggleUserStatus,
        toggleUserVerification,
        adminRecruiters,
        setAdminRecruiters,
        toggleRecruiterStatus,
        adminCompanies,
        setAdminCompanies,
        toggleCompanyVerification,
        addCompany,
        adminJobs,
        setAdminJobs,
        toggleAdminJobStatus,
        adminReports,
        setAdminReports,
        resolveAdminReport,
        adminAuditLogs,
        addAuditLog,
        systemHealth,
        isDiagnosticsRunning,
        runSystemDiagnostics,
        platformAnalytics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
