import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  Briefcase,
  Building2,
  AlertTriangle,
  Activity,
  BarChart3,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Trash2,
  Ban,
  UserCheck,
  UserX,
  Sparkles,
  Server,
  Zap,
  Terminal,
  Lock,
  Unlock,
  Key,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Plus,
  Send,
  AlertOctagon,
  FileText,
  BadgeCheck,
  TrendingUp,
  Cpu,
  Layers,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  AdminUserItem,
  AdminRecruiterItem,
  AdminCompanyItem,
  AdminJobItem,
  AdminReportItem,
  AdminAuditLog,
  UserRole,
} from '../../types';

export const AdminDashboardView: React.FC = () => {
  const {
    currentUser,
    currentUserRole,
    setCurrentUserRole,
    switchRole,
    adminUsers,
    toggleUserStatus,
    toggleUserVerification,
    adminRecruiters,
    toggleRecruiterStatus,
    adminCompanies,
    toggleCompanyVerification,
    addCompany,
    adminJobs,
    toggleAdminJobStatus,
    adminReports,
    resolveAdminReport,
    adminAuditLogs,
    systemHealth,
    isDiagnosticsRunning,
    runSystemDiagnostics,
    platformAnalytics,
    setActiveTab,
  } = useApp();

  type AdminTab = 'overview' | 'users' | 'recruiters' | 'companies' | 'jobs' | 'moderation' | 'audit' | 'system' | 'security';
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('overview');

  // Search and Filter States
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'Student' | 'Developer' | 'Recruiter' | 'Admin'>('all');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'active' | 'suspended' | 'flagged'>('all');

  const [jobSearch, setJobSearch] = useState('');
  const [jobStatusFilter, setJobStatusFilter] = useState<'all' | 'active' | 'flagged' | 'closed'>('all');

  const [reportFilter, setReportFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');
  const [reportSeverityFilter, setReportSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const [auditSearch, setAuditSearch] = useState('');
  const [auditSeverityFilter, setAuditSeverityFilter] = useState<'all' | 'info' | 'warning' | 'critical'>('all');

  // Modals
  const [selectedUserForModal, setSelectedUserForModal] = useState<AdminUserItem | null>(null);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyDomain, setNewCompanyDomain] = useState('');
  const [newCompanyIndustry, setNewCompanyIndustry] = useState('');
  const [newCompanyTier, setNewCompanyTier] = useState<'Enterprise' | 'Scale-up' | 'Startup'>('Enterprise');
  const [newCompanyLocation, setNewCompanyLocation] = useState('');

  // Toast / notification feedback state
  const [adminFeedback, setAdminFeedback] = useState<string | null>(null);

  const showToast = (message: string) => {
    setAdminFeedback(message);
    setTimeout(() => setAdminFeedback(null), 3000);
  };

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim() || !newCompanyDomain.trim()) return;

    addCompany({
      name: newCompanyName.trim(),
      domain: newCompanyDomain.trim(),
      industry: newCompanyIndustry.trim() || 'Software & Internet Technology',
      tier: newCompanyTier,
      verified: true,
      activeJobsCount: 0,
      status: 'active',
      location: newCompanyLocation.trim() || 'Bengaluru, India',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    });

    setNewCompanyName('');
    setNewCompanyDomain('');
    setNewCompanyIndustry('');
    setNewCompanyLocation('');
    setShowAddCompanyModal(false);
    showToast('Company registered and verified successfully!');
  };

  // Filtered lists
  const filteredUsers = adminUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.collegeOrCompany.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchesStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredJobs = adminJobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.recruiterName.toLowerCase().includes(jobSearch.toLowerCase());
    const matchesStatus = jobStatusFilter === 'all' || j.status === jobStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredReports = adminReports.filter(r => {
    const matchesStatus = reportFilter === 'all' || r.status === reportFilter;
    const matchesSeverity = reportSeverityFilter === 'all' || r.severity === reportSeverityFilter;
    return matchesStatus && matchesSeverity;
  });

  const filteredAuditLogs = adminAuditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.target.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesSeverity = auditSeverityFilter === 'all' || log.severity === auditSeverityFilter;
    return matchesSearch && matchesSeverity;
  });

  const pendingReportsCount = adminReports.filter(r => r.status === 'pending').length;
  const flaggedUsersCount = adminUsers.filter(u => u.status === 'flagged').length;
  const flaggedJobsCount = adminJobs.filter(j => j.status === 'flagged').length;

  // RBAC Barrier Check
  const isAdmin = currentUserRole === 'admin' || currentUser.isAdmin;

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-6 shadow-xs">
            <Lock className="w-10 h-10" />
          </div>

          <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-200 inline-block mb-3 uppercase tracking-wider">
            RBAC Access Guard • HTTP 403 Forbidden Simulation
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Administrator Privileges Required
          </h1>

          <p className="text-slate-600 text-sm max-w-xl mx-auto mt-3 leading-relaxed">
            You are currently signed in as a <span className="font-bold text-slate-900 capitalize">{currentUserRole}</span> (<code className="px-1.5 py-0.5 bg-slate-100 rounded text-indigo-700 font-mono text-xs">{currentUser.email}</code>). The Administration Command Center is strictly protected under Role-Based Access Control (RBAC).
          </p>

          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left space-y-2 text-xs text-slate-600">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Production Security Protections Active:</span>
            </div>
            <ul className="space-y-1 list-disc list-inside text-slate-600 pl-1">
              <li>Protected API routes with secure Bearer authorization</li>
              <li>Input sanitization and XSS escape filters</li>
              <li>Role authorization verification on sensitive actions</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setCurrentUserRole('admin');
                showToast('Switched to Super Administrator role!');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-emerald-400" />
              <span>Authenticate as Super Admin</span>
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
            >
              Return to Feed
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Feedback Notification */}
      {adminFeedback && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{adminFeedback}</span>
        </div>
      )}

      {/* Top Admin Security & Control Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Root Command Center
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                RBAC Level 3 • Super Admin
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              DevNexus Administration & Security Console
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Real-time platform telemetry, user role management, recruiter verification, job moderation, reported content triage, and infrastructure health monitoring.
            </p>
          </div>

          {/* Role Switching & Quick Action Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2.5 backdrop-blur-md">
              <div className="text-[11px] font-semibold text-slate-400 mb-1.5 px-1 flex items-center justify-between gap-4">
                <span>Active Persona Simulation</span>
                <span className="text-emerald-400 font-mono">LIVE</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {(['developer', 'recruiter', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      showToast(`Role switched to ${r.toUpperCase()}!`);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                      currentUserRole === r
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {r === 'admin' ? 'Super Admin' : r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  runSystemDiagnostics();
                  showToast('Diagnostics test initiated!');
                }}
                disabled={isDiagnosticsRunning}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isDiagnosticsRunning ? 'animate-spin text-cyan-400' : ''}`} />
                <span>{isDiagnosticsRunning ? 'Testing Services...' : 'Ping Diagnostics'}</span>
              </button>
              <button
                onClick={() => setActiveTab('feed')}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                View App Feed
              </button>
            </div>
          </div>
        </div>

        {/* Global Metric Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400">Total Users</div>
            <div className="text-lg font-black font-mono text-white mt-0.5">{platformAnalytics.totalUsers.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">{platformAnalytics.weeklyGrowthRate} this week</div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400">Verified Devs</div>
            <div className="text-lg font-black font-mono text-indigo-400 mt-0.5">{platformAnalytics.verifiedDevelopers.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">DevScore &gt; 700</div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400">Active Recruiters</div>
            <div className="text-lg font-black font-mono text-cyan-400 mt-0.5">{platformAnalytics.activeRecruiters}</div>
            <div className="text-[10px] text-slate-400">Verified companies</div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400">Live Postings</div>
            <div className="text-lg font-black font-mono text-amber-400 mt-0.5">{platformAnalytics.totalJobs}</div>
            <div className="text-[10px] text-slate-400">Jobs & Internships</div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400">Applications</div>
            <div className="text-lg font-black font-mono text-emerald-400 mt-0.5">{platformAnalytics.totalApplications.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">1-Click Submissions</div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400">AI Queries</div>
            <div className="text-lg font-black font-mono text-purple-400 mt-0.5">{platformAnalytics.aiQueriesCount.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">Gemini LLM calls</div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400">Pending Reports</div>
            <div className={`text-lg font-black font-mono mt-0.5 ${pendingReportsCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {pendingReportsCount}
            </div>
            <div className="text-[10px] text-slate-400">{pendingReportsCount > 0 ? 'Requires action' : 'Queue clear'}</div>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-1.5 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Platform Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'users', label: 'User Directory', icon: <Users className="w-4 h-4" />, badge: flaggedUsersCount > 0 ? flaggedUsersCount : undefined },
          { id: 'recruiters', label: 'Recruiters', icon: <UserCheck className="w-4 h-4" /> },
          { id: 'companies', label: 'Companies', icon: <Building2 className="w-4 h-4" /> },
          { id: 'jobs', label: 'Job Listings', icon: <Briefcase className="w-4 h-4" />, badge: flaggedJobsCount > 0 ? flaggedJobsCount : undefined },
          { id: 'moderation', label: 'Moderation Queue', icon: <AlertTriangle className="w-4 h-4" />, badge: pendingReportsCount > 0 ? pendingReportsCount : undefined },
          { id: 'audit', label: 'Audit Logs', icon: <FileText className="w-4 h-4" /> },
          { id: 'system', label: 'System Health', icon: <Server className="w-4 h-4" /> },
          { id: 'security', label: 'Security & RBAC', icon: <Shield className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as AdminTab)}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeAdminTab === tab.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeAdminTab === tab.id ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Demographics */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>User Distribution by Persona</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">14.8k Total</span>
              </div>

              <div className="space-y-3">
                {platformAnalytics.userTypeDistribution.map((u) => (
                  <div key={u.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{u.name}</span>
                      <span className="font-mono text-slate-900 font-bold">{u.count.toLocaleString()} ({u.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${u.percentage}%`, backgroundColor: u.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <div className="text-slate-500">Student vs Dev Ratio</div>
                  <div className="font-black text-slate-900 font-mono mt-0.5">1.79 : 1</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <div className="text-slate-500">Recruiter Match Rate</div>
                  <div className="font-black text-emerald-600 font-mono mt-0.5">94.2%</div>
                </div>
              </div>
            </div>

            {/* In-Demand Skills Growth */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Top In-Demand Skills on Platform</span>
                </h3>
                <span className="text-xs text-emerald-600 font-bold">YoY Growth</span>
              </div>

              <div className="space-y-3">
                {platformAnalytics.topSkillsOnPlatform.map(s => (
                  <div key={s.skill} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 truncate">{s.skill}</div>
                      <div className="text-[11px] text-slate-500">{s.demandCount} hiring requirements</div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono rounded-lg">
                      {s.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Platform Activity */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-600" />
                    <span>Weekly Activity Cadence</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Daily Active Users</span>
                </div>

                <div className="space-y-2">
                  {platformAnalytics.weeklyActivity.map(day => (
                    <div key={day.day} className="flex items-center gap-3 text-xs">
                      <span className="w-8 font-bold text-slate-600">{day.day}</span>
                      <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${(day.activeUsers / 7000) * 100}%` }}
                          title={`Active Users: ${day.activeUsers}`}
                        />
                      </div>
                      <span className="w-14 text-right font-mono font-bold text-slate-800">{day.activeUsers}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Peak activity: Saturday & Sunday</span>
                <span className="font-bold text-indigo-600">Arena Contests</span>
              </div>
            </div>
          </div>

          {/* Quick Security & Moderation Health Row */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Automated Moderation & Anomaly Detection</h4>
                  <p className="text-xs text-slate-400">Zero active security threats detected in the last 24-hour cycle.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveAdminTab('moderation')}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Inspect Moderation Queue ({pendingReportsCount})
                </button>
                <button
                  onClick={() => setActiveAdminTab('system')}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                >
                  System Nodes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER DIRECTORY & MANAGEMENT */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Platform User Registry ({filteredUsers.length} total)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage accounts, toggle developer verification badges, and apply moderation status.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user or college..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="all">All Roles</option>
                <option value="Student">Students</option>
                <option value="Developer">Developers</option>
                <option value="Recruiter">Recruiters</option>
                <option value="Admin">Admins</option>
              </select>

              <select
                value={userStatusFilter}
                onChange={(e) => setUserStatusFilter(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="flagged">Flagged</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-3">Role & Location</th>
                  <th className="py-3 px-3">DevScore</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Verification</th>
                  <th className="py-3 px-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No users match the search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {user.isVerified && (
                                <span title="Verified Developer">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono truncate">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'Recruiter' ? 'bg-emerald-100 text-emerald-800' :
                          user.role === 'Developer' ? 'bg-blue-100 text-blue-800' :
                          'bg-indigo-100 text-indigo-800'
                        }`}>
                          {user.role}
                        </span>
                        <div className="text-[11px] text-slate-500 mt-0.5 truncate">{user.collegeOrCompany}</div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold">
                        {user.devScore > 0 ? (
                          <span className={`px-2 py-0.5 rounded-md text-[11px] ${
                            user.devScore >= 800 ? 'bg-amber-100 text-amber-900 font-bold' :
                            user.devScore >= 500 ? 'bg-slate-100 text-slate-800' :
                            'bg-red-50 text-red-700'
                          }`}>
                            {user.devScore} pts
                          </span>
                        ) : (
                          <span className="text-slate-400">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          user.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                          user.status === 'flagged' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                        {user.reportsCount > 0 && (
                          <div className="text-[10px] text-red-600 font-semibold mt-0.5">
                            {user.reportsCount} report(s)
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => {
                            toggleUserVerification(user.id);
                            showToast(`Verification status updated for ${user.name}`);
                          }}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1 ${
                            user.isVerified
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <BadgeCheck className="w-3.5 h-3.5" />
                          <span>{user.isVerified ? 'Verified' : 'Verify'}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedUserForModal(user)}
                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Inspect User Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {user.status !== 'suspended' ? (
                            <button
                              onClick={() => {
                                toggleUserStatus(user.id, 'suspended');
                                showToast(`Suspended account for ${user.name}`);
                              }}
                              className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                              title="Suspend User Account"
                            >
                              <Ban className="w-3 h-3" />
                              <span>Suspend</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                toggleUserStatus(user.id, 'active');
                                showToast(`Re-activated account for ${user.name}`);
                              }}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                              title="Unsuspend Account"
                            >
                              <UserCheck className="w-3 h-3" />
                              <span>Activate</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RECRUITER MANAGEMENT */}
      {activeAdminTab === 'recruiters' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                <span>Recruiter Credentials & Hiring Verification</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Approve corporate talent specialists, verify domain authenticity, and monitor hiring pipeline activity.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminRecruiters.map(rec => (
              <div key={rec.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={rec.avatar} alt={rec.name} className="w-11 h-11 rounded-xl object-cover ring-2 ring-white" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{rec.name}</h4>
                      <p className="text-[11px] text-slate-500 font-mono">{rec.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
                    rec.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    rec.status === 'pending' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {rec.status}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Company Domain:</span>
                    <span className="font-mono font-bold text-slate-800">{rec.companyDomain}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Active Job Postings:</span>
                    <span className="font-bold text-indigo-600">{rec.activeJobsCount} roles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Candidates Hired:</span>
                    <span className="font-bold text-emerald-600">{rec.hiredCount} developers</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  {rec.status !== 'approved' ? (
                    <button
                      onClick={() => {
                        toggleRecruiterStatus(rec.id, 'approved');
                        showToast(`Approved recruiter credentials for ${rec.name}`);
                      }}
                      className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve Credentials</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        toggleRecruiterStatus(rec.id, 'suspended');
                        showToast(`Suspended recruiter credentials for ${rec.name}`);
                      }}
                      className="w-full py-1.5 bg-slate-200 hover:bg-red-50 hover:text-red-700 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Suspend Recruiter</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMPANY MANAGEMENT */}
      {activeAdminTab === 'companies' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span>Partner Tech Companies & Enterprises ({adminCompanies.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Verified engineering employers, ATS integration bindings, and tier authorizations.</p>
            </div>

            <button
              onClick={() => setShowAddCompanyModal(true)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Register Company</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminCompanies.map(comp => (
              <div key={comp.id} className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={comp.logo} alt={comp.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white p-1" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">{comp.name}</h4>
                        {comp.verified && (
                          <span title="Verified Tech Employer">
                            <BadgeCheck className="w-4 h-4 text-indigo-600" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">{comp.domain}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                    comp.tier === 'Enterprise' ? 'bg-indigo-100 text-indigo-800' :
                    comp.tier === 'Scale-up' ? 'bg-cyan-100 text-cyan-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {comp.tier}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div className="text-[11px] text-slate-500 font-medium">{comp.industry}</div>
                  <div className="text-[11px] text-slate-500">{comp.location}</div>
                </div>

                <div className="p-2 bg-slate-50 rounded-xl flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600">{comp.activeJobsCount} Active Jobs</span>
                  <span className="text-emerald-600">{comp.totalHires} Hires Made</span>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() => {
                      toggleCompanyVerification(comp.id);
                      showToast(`Verification status updated for ${comp.name}`);
                    }}
                    className={`text-xs font-semibold py-1 px-2.5 rounded-lg border transition-colors ${
                      comp.verified
                        ? 'text-indigo-700 bg-indigo-50 border-indigo-200'
                        : 'text-slate-600 bg-slate-100 border-slate-200'
                    }`}
                  >
                    {comp.verified ? 'Verified Employer' : 'Mark Verified'}
                  </button>
                  <span className="text-[11px] text-emerald-600 font-bold uppercase">Active Status</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: JOB LISTINGS & MODERATION */}
      {activeAdminTab === 'jobs' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <span>Job Listings & Internship Postings Registry ({filteredJobs.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Audit employment listings, manage suspicious scam postings, and review application flows.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-52">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Search job or company..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden"
                />
              </div>

              <select
                value={jobStatusFilter}
                onChange={(e) => setJobStatusFilter(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="flagged">Flagged</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Role & Company</th>
                  <th className="py-3 px-3">Type & Comp</th>
                  <th className="py-3 px-3">Applicants</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Recruiter</th>
                  <th className="py-3 px-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredJobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{job.title}</div>
                      <div className="text-[11px] text-slate-500">{job.company} • {job.location}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800">{job.type}</span>
                      <div className="text-[11px] text-emerald-600 font-medium font-mono">{job.salaryOrStipend}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-indigo-600">
                      {job.applicantsCount} candidates
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        job.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        job.status === 'flagged' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {job.recruiterName}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {job.status === 'flagged' && (
                          <button
                            onClick={() => {
                              toggleAdminJobStatus(job.id, 'closed');
                              showToast(`Job listing #${job.id} taken down.`);
                            }}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold rounded-lg transition-colors"
                          >
                            Take Down
                          </button>
                        )}
                        {job.status === 'active' && (
                          <button
                            onClick={() => {
                              toggleAdminJobStatus(job.id, 'flagged');
                              showToast(`Job listing #${job.id} marked as flagged for review.`);
                            }}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-semibold rounded-lg transition-colors"
                          >
                            Flag
                          </button>
                        )}
                        {job.status === 'closed' && (
                          <button
                            onClick={() => {
                              toggleAdminJobStatus(job.id, 'active');
                              showToast(`Job listing #${job.id} restored to active.`);
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors"
                          >
                            Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: MODERATION & REPORTED CONTENT QUEUE */}
      {activeAdminTab === 'moderation' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Reported Content & Community Moderation Queue ({filteredReports.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Review user-flagged posts, fake profiles, spam jobs, and inappropriate algorithmic comments.</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={reportFilter}
                onChange={(e) => setReportFilter(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="all">All Reports</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>

              <select
                value={reportSeverityFilter}
                onChange={(e) => setReportSeverityFilter(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="all">All Severities</option>
                <option value="high">High Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="low">Low Severity</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredReports.length === 0 ? (
              <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">Moderation queue is clean</p>
                <p className="text-xs text-slate-400">No pending reports match your current filter settings.</p>
              </div>
            ) : (
              filteredReports.map(report => (
                <div
                  key={report.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    report.status === 'pending'
                      ? report.severity === 'high'
                        ? 'border-red-300 bg-red-50/20'
                        : 'border-amber-200 bg-amber-50/20'
                      : 'border-slate-200 bg-slate-50/60 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                        report.severity === 'high' ? 'bg-red-600 text-white' :
                        report.severity === 'medium' ? 'bg-amber-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {report.severity} Severity
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 text-slate-800 uppercase">
                        {report.targetType} Target
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">{report.targetTitle}</h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Reported by <strong>{report.reportedBy.name}</strong></span>
                      <span>•</span>
                      <span>{report.timestamp}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-red-600">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>Reason: {report.reason}</span>
                    </div>
                    <p className="text-slate-700">{report.details}</p>
                    <div className="mt-2 p-2 bg-slate-50 rounded-lg text-slate-600 font-mono text-[11px] border border-slate-100 italic">
                      Excerpt: "{report.excerpt}"
                    </div>
                  </div>

                  {report.status === 'pending' && (
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => {
                          resolveAdminReport(report.id, 'dismiss');
                          showToast('Report dismissed.');
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                      >
                        Dismiss Report
                      </button>
                      <button
                        onClick={() => {
                          resolveAdminReport(report.id, 'warn_user');
                          showToast('Compliance warning dispatched to user.');
                        }}
                        className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold rounded-lg transition-colors"
                      >
                        Send Formal Warning
                      </button>
                      <button
                        onClick={() => {
                          resolveAdminReport(report.id, 'delete_content');
                          showToast('Reported content permanently removed.');
                        }}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Content</span>
                      </button>
                      <button
                        onClick={() => {
                          resolveAdminReport(report.id, 'ban_account');
                          showToast('Target user account banned immediately.');
                        }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Ban Account</span>
                      </button>
                    </div>
                  )}

                  {report.status !== 'pending' && (
                    <div className="flex items-center justify-end text-xs font-semibold text-emerald-600 gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="capitalize">Status: {report.status}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 7: AUDIT LOGS */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span>Security Audit Trail & Admin Action Logs</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Immutable event record of administrative privileges, status transitions, and automated security triggers.</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  placeholder="Filter log actions..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden"
                />
              </div>

              <select
                value={auditSeverityFilter}
                onChange={(e) => setAuditSeverityFilter(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="all">All Severities</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {filteredAuditLogs.map(log => (
              <div
                key={log.id}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                      log.severity === 'critical' ? 'bg-red-600 text-white' :
                      log.severity === 'warning' ? 'bg-amber-500 text-white' :
                      'bg-slate-200 text-slate-800'
                    }`}>
                      {log.severity}
                    </span>
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-indigo-700 font-semibold truncate">{log.target}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans">{log.details}</div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
                  <span>by {log.adminName}</span>
                  <span>•</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: SYSTEM HEALTH & MONITORING */}
      {activeAdminTab === 'system' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Server className="w-5 h-5 text-indigo-600" />
                  <span>Infrastructure Microservices & Cloud Run Telemetry</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Live node health, proxy latencies, memory cache, and error rate telemetry.</p>
              </div>

              <button
                onClick={() => {
                  runSystemDiagnostics();
                  showToast('Live diagnostics executed across all nodes!');
                }}
                disabled={isDiagnosticsRunning}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isDiagnosticsRunning ? 'animate-spin' : ''}`} />
                <span>{isDiagnosticsRunning ? 'Testing Ping...' : 'Run Diagnostics'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemHealth.map(sys => (
                <div key={sys.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-all space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{sys.service}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">{sys.description}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {sys.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-2 bg-white rounded-xl border border-slate-100 text-center font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Latency</div>
                      <div className="font-bold text-slate-900">{sys.latency}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Uptime</div>
                      <div className="font-bold text-emerald-600">{sys.uptime}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Error Rate</div>
                      <div className="font-bold text-slate-800">{sys.errorRate}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Last Ping: {sys.lastChecked}</span>
                    <span className="text-indigo-600 font-semibold">Healthy</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: SECURITY & RBAC ARCHITECTURE */}
      {activeAdminTab === 'security' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                <span>Production Security Architecture & Compliance Specifications</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Summary of platform access controls, input sanitization rules, and token protections.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <Key className="w-4 h-4 text-indigo-600" />
                  <span>Role-Based Access Control (RBAC) Hierarchy</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li><strong>Student / Developer:</strong> Standard profile editing, feed posting, LeetCode / GitHub integration, job applications.</li>
                  <li><strong>Recruiter:</strong> Company job postings creation, candidate inbox outreach, applicant status management.</li>
                  <li><strong>Super Admin:</strong> Full root privileges, user suspension, moderation triage, system diagnostic triggers.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>Secure API & Secret Protections</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li><strong>Zero Key Exposure:</strong> Gemini API keys are processed server-side in <code>server.ts</code> only.</li>
                  <li><strong>Input Sanitization:</strong> Client inputs stripped of malicious XSS scripts and dangerous tags.</li>
                  <li><strong>Safe Fallbacks:</strong> Intelligent local heuristic mocks if API endpoints encounter transient timeouts.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-2">
              <div className="font-bold text-xs text-indigo-950 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-indigo-700" />
                <span>Active Encrypted Session Token Information</span>
              </div>
              <div className="font-mono text-xs text-indigo-900/80 space-y-1">
                <div>Principal Subject: <code>{currentUser.email}</code></div>
                <div>Authenticated Role: <code>{currentUserRole.toUpperCase()} (Privilege Mask: 0x7F)</code></div>
                <div>Session Protocol: <code>TLS 1.3 / Bearer JWT Mock Verification</code></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* USER INSPECTION MODAL */}
      {selectedUserForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={selectedUserForModal.avatar} alt={selectedUserForModal.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-100" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    {selectedUserForModal.name}
                    {selectedUserForModal.isVerified && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">{selectedUserForModal.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUserForModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Role:</span>
                <span className="font-bold">{selectedUserForModal.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Institution:</span>
                <span className="font-bold">{selectedUserForModal.collegeOrCompany}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span>{selectedUserForModal.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">DevScore:</span>
                <span className="font-mono font-bold text-indigo-600">{selectedUserForModal.devScore} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Account Status:</span>
                <span className="font-bold uppercase text-emerald-700">{selectedUserForModal.status}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedUserForModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REGISTER COMPANY MODAL */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span>Register Partner Tech Company</span>
              </h3>
              <button onClick={() => setShowAddCompanyModal(false)} className="text-slate-400 hover:text-slate-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="e.g. Stripe, Razorpay, Zepto"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Corporate Domain *</label>
                <input
                  type="text"
                  required
                  value={newCompanyDomain}
                  onChange={(e) => setNewCompanyDomain(e.target.value)}
                  placeholder="e.g. stripe.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Industry</label>
                <input
                  type="text"
                  value={newCompanyIndustry}
                  onChange={(e) => setNewCompanyIndustry(e.target.value)}
                  placeholder="e.g. Payments Infrastructure & FinTech"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tier</label>
                  <select
                    value={newCompanyTier}
                    onChange={(e) => setNewCompanyTier(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden font-semibold"
                  >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Scale-up">Scale-up</option>
                    <option value="Startup">Startup</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={newCompanyLocation}
                    onChange={(e) => setNewCompanyLocation(e.target.value)}
                    placeholder="Bengaluru, India"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCompanyModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Register & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
