import React from 'react';
import {
  TrendingUp,
  UserPlus,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Code2,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RightSidebar: React.FC = () => {
  const {
    connections,
    jobs,
    codingProblems,
    sendConnectionRequest,
    toggleSolveProblem,
    applyJob,
    setActiveTab,
  } = useApp();

  // Find suggested connections (not yet connected and not pending)
  const suggestedConnections = connections.filter(c => !c.isConnected && !c.isPending).slice(0, 3);
  
  // Pick today's daily problem
  const dailyProblem = codingProblems[0];

  // Pick top job recommendations
  const recommendedJobs = jobs.filter(j => !j.isApplied).slice(0, 2);

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-4">
      {/* Daily Problem of the Day */}
      {dailyProblem && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Problem of the Day</h4>
                <p className="text-[10px] text-slate-400">Daily DSA Challenge</p>
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                dailyProblem.difficulty === 'Easy'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : dailyProblem.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {dailyProblem.difficulty}
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="font-semibold text-xs text-slate-900 line-clamp-1 mb-1">
              {dailyProblem.title}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>{dailyProblem.topic}</span>
              <span className="font-mono text-slate-400">Acc: {dailyProblem.acceptance}</span>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {dailyProblem.companies.slice(0, 3).map((comp) => (
                <span key={comp} className="text-[9px] font-medium bg-white px-1.5 py-0.5 rounded-md border border-slate-200 text-slate-600">
                  {comp}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => toggleSolveProblem(dailyProblem.id)}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                dailyProblem.isSolved
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {dailyProblem.isSolved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Solved</span>
                </>
              ) : (
                <>
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Mark as Solved</span>
                </>
              )}
            </button>
            <a
              href={dailyProblem.leetCodeUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors"
              title="Open on LeetCode"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Suggested Connections */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">People to Connect</h4>
          </div>
          <button
            onClick={() => setActiveTab('network')}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
          >
            See all
          </button>
        </div>

        <div className="space-y-3.5">
          {suggestedConnections.map((user) => (
            <div key={user.id} className="flex items-start gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h5 className="text-xs font-bold text-slate-900 truncate hover:text-indigo-600 cursor-pointer">
                  {user.name}
                </h5>
                <p className="text-[11px] text-slate-500 line-clamp-1">{user.headline}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{user.mutualConnections} mutual connections</p>
                
                <button
                  onClick={() => sendConnectionRequest(user.id)}
                  className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Connect</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Dev Discussions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Trending in Tech</h4>
        </div>

        <div className="space-y-2.5">
          {[
            { topic: '#DistributedSystems', category: 'Backend Architecture', count: '14.2k discussions' },
            { topic: '#React19', category: 'Frontend Ecosystem', count: '9.8k posts' },
            { topic: '#LeetCodeKnight', category: 'Competitive Coding', count: '6.4k milestones' },
            { topic: '#OpenSource2025', category: 'Community Contributions', count: '4.1k repositories' },
          ].map((item) => (
            <button
              key={item.topic}
              onClick={() => setActiveTab('feed')}
              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="text-[10px] text-slate-400 font-medium">{item.category}</div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {item.topic}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.count}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Job Opportunities */}
      {recommendedJobs.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top Job Matches</h4>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View Jobs
            </button>
          </div>

          <div className="space-y-3">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden font-bold text-slate-800 text-xs">
                    {job.company.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{job.title}</h5>
                    <p className="text-[11px] text-slate-600 font-medium">{job.company} • {job.location}</p>
                    <p className="text-[10px] font-mono text-emerald-700 font-semibold mt-0.5">{job.salary}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400">{job.postedDate}</span>
                  <button
                    onClick={() => applyJob(job.id)}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg transition-colors"
                  >
                    Easy Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Meta */}
      <div className="px-2 text-[11px] text-slate-400 space-y-1">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <button onClick={() => setActiveTab('feed')} className="hover:text-slate-600">About</button>
          <button onClick={() => setActiveTab('feed')} className="hover:text-slate-600">Accessibility</button>
          <button onClick={() => setActiveTab('feed')} className="hover:text-slate-600">Privacy & Terms</button>
          <button onClick={() => setActiveTab('feed')} className="hover:text-slate-600">Ad Choices</button>
        </div>
        <p className="text-[10px] text-slate-400 pt-1">DevNexus Platform © 2026. Built for modern engineers.</p>
      </div>
    </aside>
  );
};
