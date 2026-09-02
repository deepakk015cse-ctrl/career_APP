import React, { useState } from 'react';
import {
  Github,
  Code2,
  Trophy,
  Flame,
  Star,
  GitFork,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
  Info,
  Link2,
  Unlink,
  AlertCircle,
  BarChart3,
  BookOpen,
  Laptop,
  Briefcase,
  Users,
  Clock,
  Send,
  MapPin,
  Building2,
  UserCheck,
  Check,
  Target,
  FileCode2,
  Cpu,
  BadgeCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobItem } from '../../types';

export const DeveloperDashboardView: React.FC = () => {
  const {
    currentUser,
    profileCompletion,
    githubData,
    connectGithub,
    disconnectGithub,
    syncGithub,
    toggleGithubDemoMode,
    leetCodeData,
    connectLeetCode,
    disconnectLeetCode,
    syncLeetCode,
    toggleLeetCodeDemoMode,
    devScoreReport,
    recalculateDevScore,
    jobs,
    applyJob,
    connections,
    sendConnectionRequest,
    skillRecommendations,
    projectRecommendations,
    resumeAnalysis,
    setActiveTab,
  } = useApp();

  type DashboardSubTab = 'overview' | 'career_matches' | 'github' | 'leetcode' | 'score_breakdown';
  const [activeSubTab, setActiveSubTab] = useState<DashboardSubTab>('overview');

  const [showGithubModal, setShowGithubModal] = useState(false);
  const [showLeetCodeModal, setShowLeetCodeModal] = useState(false);
  const [githubInput, setGithubInput] = useState(githubData.username || '');
  const [leetCodeInput, setLeetCodeInput] = useState(leetCodeData.username || '');
  const [repoSearch, setRepoSearch] = useState('');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string>('all');
  const [isSyncing, setIsSyncing] = useState(false);

  // Job Application Modal State
  const [selectedJobToApply, setSelectedJobToApply] = useState<JobItem | null>(null);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      syncGithub();
      syncLeetCode();
      recalculateDevScore();
      setIsSyncing(false);
    }, 600);
  };

  const handleConnectGithub = (e: React.FormEvent) => {
    e.preventDefault();
    connectGithub(githubInput, true);
    setShowGithubModal(false);
  };

  const handleConnectLeetCode = (e: React.FormEvent) => {
    e.preventDefault();
    connectLeetCode(leetCodeInput, true);
    setShowLeetCodeModal(false);
  };

  const handleQuickApply = (job: JobItem) => {
    applyJob(job.id);
    setSelectedJobToApply(null);
    setAppliedNotification(`Application successfully sent to ${job.company} for ${job.title}!`);
    setTimeout(() => setAppliedNotification(null), 4000);
  };

  // Filter full-time jobs and internships
  const recommendedJobs = jobs.filter(j => j.type === 'Full-time').slice(0, 3);
  const recommendedInternships = jobs.filter(j => j.type === 'Internship').slice(0, 3);

  // Suggested connections (not connected yet)
  const suggestedConnectionsList = connections.filter(c => !c.isConnected).slice(0, 4);

  // Filter repos
  const filteredRepos = githubData.allRepos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
      repo.description.toLowerCase().includes(repoSearch.toLowerCase()) ||
      repo.topics.some(t => t.toLowerCase().includes(repoSearch.toLowerCase()));
    const matchesLang = selectedLanguageFilter === 'all' || repo.language.toLowerCase() === selectedLanguageFilter.toLowerCase();
    return matchesSearch && matchesLang;
  });

  // Recent activity timeline
  const recentActivities = [
    {
      id: 'act-1',
      type: 'leetcode',
      title: 'Solved "Course Schedule II" (Medium)',
      detail: 'Runtime 42ms (Beats 94.2%), Memory 6.8MB in C++',
      time: '2 hours ago',
      icon: <Code2 className="w-4 h-4 text-amber-500" />,
      badge: '+15 DevScore Pts',
    },
    {
      id: 'act-2',
      type: 'github',
      title: 'Pushed 4 commits to "distributed-kv-store"',
      detail: 'Implemented Raft consensus log compaction and snapshotting',
      time: '6 hours ago',
      icon: <Github className="w-4 h-4 text-slate-800" />,
      badge: 'Verified Commit',
    },
    {
      id: 'act-3',
      type: 'job',
      title: 'Applied to Backend Engineer @ Uber',
      detail: 'Resume ATS score matched 94% with job requirements',
      time: 'Yesterday',
      icon: <Briefcase className="w-4 h-4 text-indigo-600" />,
      badge: 'Under Review',
    },
    {
      id: 'act-4',
      type: 'network',
      title: 'Connected with Priya Nambiar (Senior SDE @ Microsoft)',
      detail: 'Exchanged notes on Distributed Systems Architecture',
      time: '2 days ago',
      icon: <Users className="w-4 h-4 text-blue-600" />,
      badge: '1st Connection',
    },
    {
      id: 'act-5',
      type: 'ai',
      title: 'AI Career Coach Roadmap Updated',
      detail: 'Completed Apache Kafka Fundamentals module',
      time: '3 days ago',
      icon: <Sparkles className="w-4 h-4 text-cyan-500" />,
      badge: 'Skill Verified',
    },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Notification */}
      {appliedNotification && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{appliedNotification}</span>
        </div>
      )}

      {/* Top Banner & Personalized Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Glow Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-md bg-white shrink-0"
              />
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Personal Developer Dashboard
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Live Sync Active
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>Welcome back, {currentUser.fullName}</span>
                  <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl line-clamp-1">
                  {currentUser.headline} • {currentUser.collegeOrCompany}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={handleSyncAll}
                disabled={isSyncing}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/15 active:scale-95 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2 backdrop-blur-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-300' : ''}`} />
                <span>{isSyncing ? 'Syncing Activity...' : 'Sync Activity'}</span>
              </button>

              <button
                onClick={() => setActiveTab('career_ai')}
                className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>AI Career Coach</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Key Stat Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800/80">
            {/* DevScore Quick Tile */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                <span>Developer Score</span>
                <span className="text-amber-400 text-[11px] font-bold">{devScoreReport.tier}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">{devScoreReport.overallScore}</span>
                <span className="text-xs text-slate-400 font-medium">/ 1000</span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3 h-3" />
                <span>Top 1% Benchmark Tier</span>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                <span>Profile Strength</span>
                <span className="text-indigo-300 text-[11px] font-bold">{profileCompletion.percentage}%</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">{profileCompletion.percentage}%</span>
                <span className="text-xs text-slate-400 font-medium">Ready</span>
              </div>
              <div className="mt-2 text-[11px] text-indigo-300 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Recruiter Search Optimized</span>
              </div>
            </div>

            {/* LeetCode Solved */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                <span>Coding Problems</span>
                <span className="text-amber-400 font-mono text-[11px]">{leetCodeData.contestRating} Rating</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">{leetCodeData.totalSolved}</span>
                <span className="text-xs text-slate-400 font-medium">solved</span>
              </div>
              <div className="mt-2 text-[11px] text-amber-300 flex items-center gap-1 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{leetCodeData.streakDays}d Active Streak</span>
              </div>
            </div>

            {/* GitHub Commits */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                <span>GitHub Codebase</span>
                <span className="text-indigo-400 text-[11px] font-semibold">{githubData.publicRepos} Repos</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">{githubData.totalCommits}</span>
                <span className="text-xs text-slate-400 font-medium">commits</span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{githubData.totalStars} Stars Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Sub-Tabs Navigation */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'overview'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Unified Command Center</span>
        </button>

        <button
          onClick={() => setActiveSubTab('career_matches')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'career_matches'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4 text-indigo-500" />
          <span>Recommended Jobs & Internships</span>
          <span className="px-1.5 py-0.2 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md">
            {jobs.length} Matches
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('leetcode')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'leetcode'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Code2 className="w-4 h-4 text-amber-500" />
          <span>Coding Progress & Arena</span>
          {leetCodeData.isConnected && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('github')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'github'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Github className="w-4 h-4" />
          <span>GitHub Activity & Repos</span>
        </button>

        <button
          onClick={() => setActiveSubTab('score_breakdown')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'score_breakdown'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>DevScore Algorithm</span>
          <span className="px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded-md text-[10px] font-mono font-bold">
            {devScoreReport.overallScore}
          </span>
        </button>
      </div>

      {/* SUB-TAB 1: UNIFIED OVERVIEW (All 8 Features Aggregated) */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Row 1: Profile Completion & Developer Score Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* 1. Profile Completion Card (4 Cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Profile Completion</h3>
                      <p className="text-[11px] text-slate-500">Recruiter Visibility Factor</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg font-mono">
                    {profileCompletion.percentage}%
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${profileCompletion.percentage}%` }}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Profile Checklist:
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {[
                      { label: 'Profile Avatar & Professional Banner', done: true },
                      { label: 'Headline & Target Role Details', done: true },
                      { label: 'Technical Bio & About Statement', done: true },
                      { label: '5+ Core Verified Skills Added', done: true },
                      { label: 'Work Experience / Internships Listed', done: true },
                      { label: 'GitHub & LeetCode Profiles Linked', done: githubData.isConnected && leetCodeData.isConnected },
                      { label: 'PDF Resume Uploaded & ATS Analyzed', done: true },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg">
                        <span className="text-slate-700 truncate pr-2">{item.label}</span>
                        {item.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className="w-full mt-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Edit Profile Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Developer Score Summary & Factor Radar (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Developer Score (DevScore™)</h3>
                      <p className="text-[11px] text-slate-500">Multifactor Engineering Merit Benchmark</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-lg border border-amber-200">
                      {devScoreReport.tier} (Top 1%)
                    </span>
                    <button
                      onClick={recalculateDevScore}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Recalculate</span>
                    </button>
                  </div>
                </div>

                {/* Score Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {devScoreReport.categories.map(cat => (
                    <div key={cat.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-800 truncate">{cat.category}</span>
                        <span className="font-mono font-bold text-indigo-600">{cat.score}/{cat.maxScore}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-500">
                        <span>Weight {cat.weight}%</span>
                        <span className="text-emerald-600 font-bold">{cat.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-slate-600">
                  Calculated from <strong>764 LeetCode solutions</strong>, <strong>1,420 GitHub commits</strong>, and <strong>verified portfolio projects</strong>.
                </span>
                <button
                  onClick={() => setActiveSubTab('score_breakdown')}
                  className="text-indigo-600 font-bold hover:underline shrink-0 flex items-center gap-1"
                >
                  <span>Scoring Methodology</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Coding Progress & AI Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3. Coding Progress Widget */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Coding Progress & LeetCode Sync</h3>
                    <p className="text-[11px] text-slate-500">Contest Rating: {leetCodeData.contestRating} (Knight)</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('coding')}
                  className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Open Coding Arena</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Bars */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                  <div className="text-[10px] text-emerald-700 font-bold">Easy</div>
                  <div className="text-base font-black text-emerald-900 font-mono mt-0.5">{leetCodeData.easySolved} / {leetCodeData.easyTotal}</div>
                  <div className="text-[10px] text-emerald-700 mt-1">94% Solved</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-center">
                  <div className="text-[10px] text-amber-700 font-bold">Medium</div>
                  <div className="text-base font-black text-amber-900 font-mono mt-0.5">{leetCodeData.mediumSolved} / {leetCodeData.mediumTotal}</div>
                  <div className="text-[10px] text-amber-700 mt-1">77% Solved</div>
                </div>
                <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-center">
                  <div className="text-[10px] text-red-700 font-bold">Hard</div>
                  <div className="text-base font-black text-red-900 font-mono mt-0.5">{leetCodeData.hardSolved} / {leetCodeData.hardTotal}</div>
                  <div className="text-[10px] text-red-700 mt-1">48% Solved</div>
                </div>
              </div>

              {/* Recent Submissions List */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Recent Problem Solves:</div>
                {leetCodeData.recentSubmissions.slice(0, 3).map(sub => (
                  <div key={sub.id} className="p-2 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        sub.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                        sub.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sub.difficulty}
                      </span>
                      <span className="font-semibold text-slate-800 truncate">{sub.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono shrink-0">{sub.runtime}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. AI Career Recommendations */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">AI Career Intelligence</h3>
                    <p className="text-[11px] text-slate-500">Personalized Insights from Gemini Pro Engine</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('career_ai')}
                  className="text-xs text-cyan-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Full AI Advisor</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {/* Skill Recommendation */}
                <div className="p-3 bg-cyan-50/60 rounded-xl border border-cyan-200/60 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-950 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-700" />
                      Priority Skill to Learn: {skillRecommendations[0]?.skill || 'Apache Kafka'}
                    </span>
                    <span className="px-1.5 py-0.2 bg-cyan-200 text-cyan-900 text-[10px] font-bold rounded">
                      High ROI
                    </span>
                  </div>
                  <p className="text-cyan-900/80 leading-relaxed text-[11px]">
                    {skillRecommendations[0]?.rationale || 'High demand across Tier-1 tech teams looking for distributed event streaming systems.'}
                  </p>
                </div>

                {/* Project Recommendation */}
                <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200/60 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <FileCode2 className="w-3.5 h-3.5 text-indigo-700" />
                      Portfolio Project Blueprint: {projectRecommendations[0]?.title || 'Distributed Cache Engine'}
                    </span>
                    <span className="px-1.5 py-0.2 bg-indigo-200 text-indigo-900 text-[10px] font-bold rounded">
                      Advanced
                    </span>
                  </div>
                  <p className="text-indigo-900/80 leading-relaxed text-[11px]">
                    {projectRecommendations[0]?.summary || 'Build an in-memory key-value store with Raft consensus and LRU eviction.'}
                  </p>
                </div>

                {/* ATS Resume Tip */}
                <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-600">Resume ATS Match Score:</span>
                  <span className="font-bold font-mono text-emerald-600">
                    {resumeAnalysis?.atsScore || 92}% (Strong)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Recommended Jobs & Recommended Internships */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 5. Recommended Jobs */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Recommended Full-Time Jobs</h3>
                    <p className="text-[11px] text-slate-500">Matched to your stack & DevScore</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View All Jobs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {recommendedJobs.map(job => (
                  <div key={job.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img src={job.companyLogo} alt={job.company} className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-white" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{job.title}</h4>
                          <div className="text-[11px] text-slate-500">{job.company} • {job.location}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md font-mono shrink-0">
                        {job.matchScore || 92}% Match
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="font-mono font-bold text-slate-800">{job.salary}</span>
                      <button
                        onClick={() => setSelectedJobToApply(job)}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <span>1-Click Apply</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Recommended Internships */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Recommended Internships</h3>
                    <p className="text-[11px] text-slate-500">Elite 2025/2026 engineering cohorts</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className="text-xs text-purple-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Explore Internships</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {recommendedInternships.map(internship => (
                  <div key={internship.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-purple-300 transition-all space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img src={internship.companyLogo} alt={internship.company} className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-white" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{internship.title}</h4>
                          <div className="text-[11px] text-slate-500">{internship.company} • {internship.location}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-md font-mono shrink-0">
                        {internship.matchScore || 95}% Match
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="font-mono font-bold text-emerald-700">{internship.salary || internship.stipend}</span>
                      <button
                        onClick={() => setSelectedJobToApply(internship)}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <span>Apply Internship</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Suggested Connections & Recent Activity Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 7. Suggested Connections (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Suggested Connections</h3>
                    <p className="text-[11px] text-slate-500">Students, Alumni & Recruiters</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('network')}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>My Network</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {suggestedConnectionsList.map(person => (
                  <div key={person.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{person.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{person.collegeOrCompany}</div>
                        <div className="text-[10px] text-slate-400">{person.mutualConnections} mutual connections</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sendConnectionRequest(person.id);
                        setAppliedNotification(`Connection invite sent to ${person.name}!`);
                        setTimeout(() => setAppliedNotification(null), 3000);
                      }}
                      className="px-2.5 py-1.5 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-bold rounded-lg transition-colors shrink-0 flex items-center gap-1"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Connect</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Recent Activity Timeline (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Recent Platform Activity</h3>
                    <p className="text-[11px] text-slate-500">Live feed of submissions, applications, and updates</p>
                  </div>
                </div>

                <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Real-time Stream
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {recentActivities.map(act => (
                  <div key={act.id} className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                      {act.icon}
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{act.title}</h4>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded shrink-0">
                          {act.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">{act.detail}</p>
                      <div className="text-[10px] text-slate-400">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CAREER MATCHES (Jobs & Internships) */}
      {activeSubTab === 'career_matches' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  <span>Curated High-Match Career Opportunities</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Ranked using DevScore engineering signals, verified tech stack proficiencies, and graduation year.</p>
              </div>

              <button
                onClick={() => setActiveTab('jobs')}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                Browse All Open Postings
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map(job => (
                <div key={job.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-indigo-300 transition-all space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{job.title}</h4>
                        <div className="text-xs text-slate-500">{job.company} • {job.location}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg font-mono">
                      {job.matchScore || 92}% Match
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {job.skillsRequired.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-white text-slate-700 text-[10px] font-semibold rounded-md border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="font-mono font-bold text-indigo-700 text-xs">{job.salary}</span>
                    <button
                      onClick={() => setSelectedJobToApply(job)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>1-Click Apply</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: GITHUB INTEGRATION */}
      {activeSubTab === 'github' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* GitHub Header & Controls */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold shadow-md">
                  <Github className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">GitHub Engineering Profile</h2>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Connected as <span className="font-mono font-semibold text-slate-800">@{githubData.username}</span> • Last synced {githubData.lastSyncedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSyncAll}
                  disabled={isSyncing}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>Sync Repos</span>
                </button>
                <button
                  onClick={() => setShowGithubModal(true)}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Account Settings</span>
                </button>
              </div>
            </div>

            {/* GitHub Stat Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Public Repos</span>
                <div className="text-lg font-bold text-slate-900 font-mono mt-1">{githubData.publicRepos}</div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Followers</span>
                <div className="text-lg font-bold text-slate-900 font-mono mt-1">{githubData.followers}</div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Following</span>
                <div className="text-lg font-bold text-slate-900 font-mono mt-1">{githubData.following}</div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Stars Received</span>
                <div className="text-lg font-bold text-amber-600 font-mono mt-1">{githubData.totalStars}</div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-500 font-medium">Commits (2024-25)</span>
                <div className="text-lg font-bold text-indigo-600 font-mono mt-1">{githubData.totalCommits}</div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Languages & Technologies Breakdown
              </h3>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                {githubData.languages.map(lang => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percentage}%`}
                    className="h-full first:rounded-l-full last:rounded-r-full hover:opacity-90 transition-opacity"
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-3">
                {githubData.languages.map(lang => (
                  <div key={lang.name} className="flex items-center gap-1.5 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    <span className="text-slate-400 font-mono font-medium">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 52-Week Contribution Graph */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Contribution Activity (Last 12 Months)
                </h3>
                <span className="text-xs text-slate-500 font-mono font-semibold">
                  {githubData.totalCommits} contributions in 2024 - 2025
                </span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl overflow-x-auto border border-slate-800">
                <div className="flex gap-1 min-w-[700px]">
                  {githubData.contributionWeeks.map((week) => (
                    <div key={week.weekIndex} className="flex flex-col gap-1">
                      {week.days.map((day, dIdx) => {
                        const bgClass =
                          day.count === 0
                            ? 'bg-slate-800/80'
                            : day.count < 3
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : day.count < 6
                            ? 'bg-emerald-700 text-emerald-200'
                            : 'bg-emerald-400 text-emerald-950 shadow-xs';

                        return (
                          <div
                            key={dIdx}
                            className={`w-3 h-3 rounded-[3px] ${bgClass} transition-transform hover:scale-125 cursor-pointer`}
                            title={`${day.count} contributions on ${day.date}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 text-[10px] text-slate-400 mt-3 font-medium">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-xs bg-slate-800" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-950 border border-emerald-800/40" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-700" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>

          {/* Repositories Directory */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Repositories & Open-Source Projects</h3>
                <p className="text-xs text-slate-500">Showcasing real codebases with stars, forks, and topic tags</p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <input
                  type="text"
                  placeholder="Filter repositories..."
                  value={repoSearch}
                  onChange={e => setRepoSearch(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44"
                />

                <select
                  value={selectedLanguageFilter}
                  onChange={e => setSelectedLanguageFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
                >
                  <option value="all">All Languages</option>
                  <option value="go">Go</option>
                  <option value="typescript">TypeScript</option>
                  <option value="c++">C++</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRepos.map(repo => (
                <div
                  key={repo.id}
                  className="p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-200 bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-indigo-600 hover:underline font-mono cursor-pointer">
                          {repo.name}
                        </span>
                        {repo.isPinned && (
                          <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-bold rounded-md border border-amber-200">
                            PINNED
                          </span>
                        )}
                      </div>
                      <a
                        href={repo.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {repo.description}
                    </p>

                    {repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {repo.topics.map(topic => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono rounded-md"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                      <span className="font-semibold text-slate-700">{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono">
                      <span className="flex items-center gap-1 text-slate-700 font-semibold">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks}
                      </span>
                      <span className="text-[11px] text-slate-400">{repo.updatedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: LEETCODE STATS */}
      {activeSubTab === 'leetcode' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-bold shadow-md">
                  <Code2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">LeetCode Competitive Metrics</h2>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-md flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-amber-600" />
                      {leetCodeData.globalRanking}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Synced with <span className="font-mono font-semibold text-slate-800">@{leetCodeData.username}</span> • Last updated {leetCodeData.lastSyncedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSyncAll}
                  disabled={isSyncing}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>Sync Submissions</span>
                </button>
                <button
                  onClick={() => setShowLeetCodeModal(true)}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure Account</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Contest Rating</span>
                <div className="text-2xl font-black text-amber-600 font-mono mt-1">{leetCodeData.contestRating}</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-1">Top 3.2% Global</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Acceptance Rate</span>
                <div className="text-2xl font-black text-slate-900 font-mono mt-1">{leetCodeData.acceptanceRate}</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">High Accuracy</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Contests Attended</span>
                <div className="text-2xl font-black text-indigo-600 font-mono mt-1">{leetCodeData.contestAttendCount}</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-1">Bi-Weekly & Weekly</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Current Streak</span>
                <div className="text-2xl font-black text-amber-500 font-mono mt-1 flex items-center gap-1">
                  <Flame className="w-5 h-5 fill-amber-500" />
                  {leetCodeData.streakDays}d
                </div>
                <div className="text-[11px] text-amber-600 font-semibold mt-1">Daily Consistent</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: DEVSCORE BREAKDOWN */}
      {activeSubTab === 'score_breakdown' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-indigo-50 border border-indigo-200/80 rounded-2xl p-5 text-indigo-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h4 className="font-bold text-indigo-950">About DevScore Algorithm</h4>
              <p className="text-indigo-800 leading-relaxed">
                {devScoreReport.methodologyNote}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devScoreReport.categories.map(cat => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Factor Weight: {cat.weight}%
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{cat.category}</h4>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg font-mono">
                      {cat.score} / {cat.maxScore}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2 mb-3">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {cat.description}
                  </p>

                  <div className="space-y-1 text-xs">
                    <span className="text-[11px] font-semibold text-slate-700">Verified Evidence:</span>
                    <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                      {cat.evidence.map((ev, i) => (
                        <li key={i}>{ev}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>How to boost this score:</span>
                  </div>
                  <ul className="text-[11px] text-slate-500 space-y-0.5">
                    {cat.tips.map((tip, idx) => (
                      <li key={idx}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUICK JOB APPLY MODAL */}
      {selectedJobToApply && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={selectedJobToApply.companyLogo} alt={selectedJobToApply.company} className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedJobToApply.title}</h3>
                  <p className="text-xs text-slate-500">{selectedJobToApply.company} • {selectedJobToApply.location}</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-900">{currentUser.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verified DevScore:</span>
                <span className="font-bold font-mono text-indigo-600">{devScoreReport.overallScore} / 1000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Resume Attached:</span>
                <span className="font-semibold text-emerald-600">Arjun_Sharma_SDE_Resume.pdf</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedJobToApply(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleQuickApply(selectedJobToApply)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit 1-Click Application</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Account Connect Modal */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Configure GitHub Integration</h3>
                <p className="text-xs text-slate-500">Sync repositories, stars, and contribution commits</p>
              </div>
            </div>

            <form onSubmit={handleConnectGithub} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">GitHub Username</label>
                <input
                  type="text"
                  value={githubInput}
                  onChange={e => setGithubInput(e.target.value)}
                  placeholder="e.g. torvalds or arjunsharma-dev"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-bold text-slate-800">Demo Simulation Mode</span>
                  <p className="text-[11px] text-slate-500">Pre-loads realistic repository activity & star stats</p>
                </div>
                <input
                  type="checkbox"
                  checked={githubData.isDemoMode}
                  onChange={e => toggleGithubDemoMode(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {githubData.isConnected ? (
                  <button
                    type="button"
                    onClick={() => {
                      disconnectGithub();
                      setShowGithubModal(false);
                    }}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Unlink className="w-3.5 h-3.5" />
                    <span>Disconnect</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGithubModal(false)}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Save & Sync
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LeetCode Account Connect Modal */}
      {showLeetCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Configure LeetCode Profile</h3>
                <p className="text-xs text-slate-500">Sync solved problem counts, contest rating, and rank</p>
              </div>
            </div>

            <form onSubmit={handleConnectLeetCode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">LeetCode Handle</label>
                <input
                  type="text"
                  value={leetCodeInput}
                  onChange={e => setLeetCodeInput(e.target.value)}
                  placeholder="e.g. arjun_codes"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-bold text-slate-800">Demo Simulation Mode</span>
                  <p className="text-[11px] text-slate-500">Pre-populates 750+ solved problems and Knight rank</p>
                </div>
                <input
                  type="checkbox"
                  checked={leetCodeData.isDemoMode}
                  onChange={e => toggleLeetCodeDemoMode(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {leetCodeData.isConnected ? (
                  <button
                    type="button"
                    onClick={() => {
                      disconnectLeetCode();
                      setShowLeetCodeModal(false);
                    }}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Unlink className="w-3.5 h-3.5" />
                    <span>Disconnect</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLeetCodeModal(false)}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Save & Sync
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
