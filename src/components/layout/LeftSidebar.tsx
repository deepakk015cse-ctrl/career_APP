import React from 'react';
import {
  Bookmark,
  Code2,
  Users,
  Flame,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Github,
  Trophy,
  Sparkles,
  BarChart3,
  Building2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LeftSidebar: React.FC = () => {
  const { currentUser, setActiveTab, profileCompletion, devScoreReport } = useApp();

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      {/* Mini Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Banner */}
        <div className="h-20 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 relative">
          {currentUser.bannerUrl && (
            <img
              src={currentUser.bannerUrl}
              alt="Banner"
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>

        {/* Profile Details */}
        <div className="px-4 pb-4 pt-0 relative">
          <div className="flex justify-between items-end -mt-10 mb-2">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="w-18 h-18 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white"
              />
              {currentUser.openToWork && (
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-md ring-2 ring-white">
                  OPEN
                </span>
              )}
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              className="px-2.5 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              Profile
            </button>
          </div>

          <div className="mt-1">
            <button
              onClick={() => setActiveTab('profile')}
              className="text-left group block"
            >
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                {currentUser.fullName}
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
              </h3>
            </button>
            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
              {currentUser.headline}
            </p>
          </div>

          {/* Profile Completion Bar */}
          <div className="mt-3.5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">Profile Strength</span>
              <span className="font-bold text-indigo-600">{profileCompletion.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${profileCompletion.percentage}%` }}
              />
            </div>
            {profileCompletion.percentage < 100 && profileCompletion.pendingTasks.length > 0 && (
              <button
                onClick={() => setActiveTab('profile')}
                className="mt-1.5 text-[11px] text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
              >
                <span>+ {profileCompletion.pendingTasks[0].label}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Analytics stats */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('network')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <div className="text-[11px] text-slate-500 font-medium">Connections</div>
              <div className="text-sm font-bold text-slate-900">{currentUser.connectionsCount}</div>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <div className="text-[11px] text-slate-500 font-medium">Profile Views</div>
              <div className="text-sm font-bold text-slate-900">{currentUser.profileViews}</div>
            </button>
          </div>
        </div>
      </div>

      {/* DevScore Quick Tile */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-4 text-white border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">DevScore Benchmark</span>
          </div>
          <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 text-[10px] font-bold rounded-md border border-amber-400/30">
            {devScoreReport.tier}
          </span>
        </div>

        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-3xl font-black font-mono text-white">{devScoreReport.overallScore}</span>
          <span className="text-xs text-slate-400">/ 1000 pts</span>
        </div>

        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
          Top 1% candidate ranking based on projects, LeetCode, and verified GitHub commits.
        </p>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="w-full mt-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Developer Command Center</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Developer Stats Widget */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
              <Code2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Coding Milestones</h4>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {currentUser.codingStats.streakDays}d Streak
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">LeetCode Solved</span>
            <span className="font-bold text-slate-900 font-mono">{currentUser.codingStats.leetCodeSolved} problems</span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${(currentUser.codingStats.easy / currentUser.codingStats.leetCodeSolved) * 100}%` }}
              title={`Easy: ${currentUser.codingStats.easy}`}
            />
            <div
              className="bg-amber-500 h-full"
              style={{ width: `${(currentUser.codingStats.med / currentUser.codingStats.leetCodeSolved) * 100}%` }}
              title={`Medium: ${currentUser.codingStats.med}`}
            />
            <div
              className="bg-red-500 h-full"
              style={{ width: `${(currentUser.codingStats.hard / currentUser.codingStats.leetCodeSolved) * 100}%` }}
              title={`Hard: ${currentUser.codingStats.hard}`}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span className="text-emerald-600 font-semibold">{currentUser.codingStats.easy} Easy</span>
            <span className="text-amber-600 font-semibold">{currentUser.codingStats.med} Med</span>
            <span className="text-red-600 font-semibold">{currentUser.codingStats.hard} Hard</span>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Github className="w-3.5 h-3.5 text-slate-800" />
              <span>GitHub Commits</span>
            </div>
            <span className="font-bold text-slate-900 font-mono">{currentUser.codingStats.gitHubCommitsThisYear}</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('coding')}
          className="w-full mt-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors text-center block"
        >
          Explore Coding Arena
        </button>
      </div>

      {/* Quick Navigation Shortcuts */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3 space-y-1">
        <button
          onClick={() => setActiveTab('feed')}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-4 h-4 text-indigo-500" />
            <span>Saved Posts & Articles</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={() => setActiveTab('career_ai')}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-cyan-900 bg-cyan-50/70 hover:bg-cyan-100/80 rounded-xl transition-colors text-left border border-cyan-200/60"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>AI Career Assistant</span>
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-cyan-600 text-white rounded-md">
            Stage 6
          </span>
        </button>

        <button
          onClick={() => setActiveTab('recruiter')}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Recruiter Portal</span>
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
            Hiring
          </span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors text-left group"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span className="group-hover:text-red-700 font-semibold">Admin & Security</span>
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-50 text-red-700 rounded-md">
            Stage 8
          </span>
        </button>

        <button
          onClick={() => setActiveTab('network')}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-blue-500" />
            <span>Developer Circles & Groups</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </aside>
  );
};
