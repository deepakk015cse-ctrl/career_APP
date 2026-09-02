import React from 'react';
import {
  BrainCircuit,
  MessageSquare,
  Sparkles,
  FileCheck,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIChatSection } from './AIChatSection';
import { PersonalizedRecommendationsSection } from './PersonalizedRecommendationsSection';
import { ResumeAnalyzerSection } from './ResumeAnalyzerSection';
import { CareerRoadmapSection } from './CareerRoadmapSection';

export const AICareerAssistantView: React.FC = () => {
  const {
    activeAssistantTab,
    setActiveAssistantTab,
    currentUser,
    devScoreReport,
    isAIDemoMode,
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Master View Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AI Career Assistant (Stage 6)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Enterprise Privacy & Server-Side AI
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI-Powered Career & Engineering Advisor
            </h1>

            <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
              Supercharge your career progression with real-time AI advice grounded in your verified coding stats, project repositories, and target compensation benchmarks.
            </p>
          </div>

          {/* Quick Profile Summary Card */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-cyan-500/20">
              {devScoreReport.overallScore}
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                {currentUser.fullName}
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-[11px] text-cyan-400 font-medium">{devScoreReport.tier} (Top 7%)</div>
              <div className="text-[10px] text-slate-400">
                {currentUser.codingStats.leetCodeSolved} LeetCode • {currentUser.skills.length} Verified Skills
              </div>
            </div>
          </div>
        </div>

        {/* Master Tab Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-800/80">
          <button
            onClick={() => setActiveAssistantTab('chat')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeAssistantTab === 'chat'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Career Chat</span>
          </button>

          <button
            onClick={() => setActiveAssistantTab('recommendations')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeAssistantTab === 'recommendations'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Personalized Recommendations</span>
          </button>

          <button
            onClick={() => setActiveAssistantTab('resume')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeAssistantTab === 'resume'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>ATS Resume Analyzer</span>
          </button>

          <button
            onClick={() => setActiveAssistantTab('roadmap')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeAssistantTab === 'roadmap'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Visual Career Roadmap</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {activeAssistantTab === 'chat' && <AIChatSection />}
        {activeAssistantTab === 'recommendations' && <PersonalizedRecommendationsSection />}
        {activeAssistantTab === 'resume' && <ResumeAnalyzerSection />}
        {activeAssistantTab === 'roadmap' && <CareerRoadmapSection />}
      </div>
    </div>
  );
};
