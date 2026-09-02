import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  Users,
  Briefcase,
  Code2,
  FolderGit2,
  MessageSquare,
  Bell,
  Search,
  Plus,
  LogOut,
  User,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  FileCode2,
  Sparkles,
  Award,
  Trophy,
  BarChart3,
  ShieldCheck,
  Building2,
  Shield,
  ShieldAlert,
  Sliders,
  Check,
} from 'lucide-react';
import { useApp, AppTab, SearchFilter } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Navbar: React.FC<{ onOpenCreatePost?: () => void }> = ({ onOpenCreatePost }) => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    currentUserRole,
    setCurrentUserRole,
    notifications,
    conversations,
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    logout,
    updateProfileHeader,
    devScoreReport,
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(n => !n.isRead).length;
  const unreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('search');
      setIsSearchFocused(false);
    }
  };

  const navItems: { id: AppTab; label: string; icon: React.ReactNode; badge?: number; pill?: string }[] = [
    { id: 'feed', label: 'Feed', icon: <Home className="w-5 h-5" /> },
    { id: 'career_ai', label: 'AI Advisor', icon: <Sparkles className="w-5 h-5 text-cyan-500" />, pill: 'AI' },
    { id: 'dashboard', label: 'Dashboard', icon: <Trophy className="w-5 h-5 text-amber-500" />, pill: `${devScoreReport.overallScore}` },
    { id: 'network', label: 'Network', icon: <Users className="w-5 h-5" /> },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'coding', label: 'Coding Arena', icon: <Code2 className="w-5 h-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, badge: unreadMessages },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, badge: unreadNotifs },
  ];

  // If role is admin, include Admin tab in main nav
  if (currentUserRole === 'admin') {
    navItems.push({
      id: 'admin',
      label: 'Admin',
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      pill: 'SECURE',
    });
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="nav-logo-btn"
              onClick={() => setActiveTab('feed')}
              className="flex items-center gap-2.5 text-left focus:outline-hidden group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-600 transition-colors">
                <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-slate-900">DevNexus</span>
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">PRO</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium -mt-1">Developer Network & Hiring</p>
              </div>
            </button>
          </div>

          {/* Global Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="global-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search developers, skills (e.g. React, Go), projects, jobs..."
                  className="w-full pl-9.5 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-900 placeholder:text-slate-500 rounded-xl border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-hidden"
                />
              </div>
            </form>

            {/* Quick Search Dropdown Filter */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">Filter Search In</div>
                <div className="grid grid-cols-3 gap-1.5 mb-3">
                  {(['all', 'people', 'skills', 'projects', 'companies', 'jobs'] as SearchFilter[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        setSearchFilter(f);
                        setActiveTab('search');
                        setIsSearchFocused(false);
                      }}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-lg text-left capitalize transition-colors ${
                        searchFilter === f ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {f === 'all' ? '🔍 All categories' : f}
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-2 px-1">
                  <div className="text-xs text-slate-400 font-medium mb-1.5">Trending developer searches:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React 19', 'Distributed Systems', 'LeetCode Hard', 'Golang Jobs', 'NIT Trichy', 'Uber Intern'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                          setActiveTab('search');
                          setIsSearchFocused(false);
                        }}
                        className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex flex-col items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="relative">
                    {item.icon}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                    {item.pill && (
                      <span className="absolute -top-1.5 -right-3 px-1.5 py-0.2 bg-amber-500 text-slate-950 font-mono text-[9px] font-black rounded-full shadow-xs">
                        {item.pill}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 tracking-tight">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Center & Profile Dropdown */}
          <div className="flex items-center gap-2.5">
            {/* Quick Action Button */}
            {onOpenCreatePost && (
              <button
                id="btn-quick-create-post"
                onClick={onOpenCreatePost}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>
            )}

            {/* Profile Avatar & Menu */}
            <div ref={userMenuRef} className="relative">
              <button
                id="btn-user-profile-menu"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-slate-100 transition-colors border border-transparent focus:border-slate-300 outline-hidden"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                />
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-none truncate max-w-[90px]">{currentUser.fullName.split(' ')[0]}</p>
                  <p className="text-[10px] text-slate-500 font-medium capitalize">{currentUserRole || currentUser.userType}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-76 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 bg-slate-50 rounded-xl mb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.fullName}
                        className="w-11 h-11 rounded-xl object-cover ring-2 ring-white"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{currentUser.fullName}</h4>
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500 truncate">{currentUser.headline}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full mt-2.5 py-1.5 px-3 bg-white hover:bg-slate-100 text-indigo-600 border border-slate-200 text-xs font-semibold rounded-lg transition-colors text-center block"
                    >
                      View Full Profile
                    </button>
                  </div>

                  {/* RBAC Role Switcher Strip */}
                  <div className="p-2.5 bg-slate-900 text-white rounded-xl mb-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-indigo-400" />
                        Active Security Role (RBAC):
                      </span>
                      <span className="px-1.5 py-0.2 bg-indigo-500/30 text-indigo-300 rounded uppercase font-mono text-[10px]">
                        {currentUserRole}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 pt-1">
                      {(['developer', 'recruiter', 'admin'] as UserRole[]).map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            setCurrentUserRole(role);
                            if (role === 'admin') setActiveTab('admin');
                          }}
                          className={`py-1 text-[10px] font-bold rounded capitalize transition-all flex items-center justify-center gap-1 ${
                            currentUserRole === role
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                          }`}
                        >
                          {currentUserRole === role && <Check className="w-2.5 h-2.5" />}
                          <span>{role}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick status toggles */}
                  <div className="px-3 py-2 border-b border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Open to Work</span>
                      </div>
                      <button
                        onClick={() => updateProfileHeader({
                          fullName: currentUser.fullName,
                          headline: currentUser.headline,
                          location: currentUser.location,
                          collegeOrCompany: currentUser.collegeOrCompany,
                          bio: currentUser.bio,
                          openToWork: !currentUser.openToWork,
                          openToMentor: currentUser.openToMentor,
                        })}
                        className={`w-9 h-5 rounded-full transition-colors relative ${currentUser.openToWork ? 'bg-emerald-500' : 'bg-slate-300'}`}
                      >
                        <span className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.75 ${currentUser.openToWork ? 'left-5' : 'left-1'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <Award className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Open to Mentor</span>
                      </div>
                      <button
                        onClick={() => updateProfileHeader({
                          fullName: currentUser.fullName,
                          headline: currentUser.headline,
                          location: currentUser.location,
                          collegeOrCompany: currentUser.collegeOrCompany,
                          bio: currentUser.bio,
                          openToWork: currentUser.openToWork,
                          openToMentor: !currentUser.openToMentor,
                        })}
                        className={`w-9 h-5 rounded-full transition-colors relative ${currentUser.openToMentor ? 'bg-indigo-600' : 'bg-slate-300'}`}
                      >
                        <span className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.75 ${currentUser.openToMentor ? 'left-5' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left flex items-center justify-between text-xs text-slate-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        <span className="font-bold text-slate-900 group-hover:text-red-700">Admin Console</span>
                      </div>
                      <span className="px-1.5 py-0.2 bg-red-100 text-red-800 text-[10px] font-mono font-bold rounded">
                        Stage 8
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left flex items-center justify-between text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold text-slate-900">Developer Dashboard</span>
                      </div>
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-mono font-bold rounded">
                        {devScoreReport.overallScore}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('career_ai');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left flex items-center justify-between text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-cyan-500" />
                        <span className="font-semibold text-slate-900">AI Career Assistant</span>
                      </div>
                      <span className="px-1.5 py-0.5 bg-cyan-100 text-cyan-800 text-[10px] font-mono font-bold rounded">
                        Stage 6
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('recruiter');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left flex items-center gap-2.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      <span>Recruiter & Company Portal</span>
                    </button>
                  </div>

                  {/* Sign Out */}
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      id="btn-navbar-logout"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full px-3 py-2 text-left flex items-center gap-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
