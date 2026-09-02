import React from 'react';
import {
  Sparkles,
  BookOpen,
  Code2,
  Award,
  Zap,
  Briefcase,
  Layers,
  ArrowDown,
  CheckCircle2,
  TrendingUp,
  Clock,
  Target,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CareerRoadmapSection: React.FC = () => {
  const {
    visualRoadmapNodes,
    targetCareerRole,
    setTargetCareerRole,
    currentUser,
    devScoreReport,
    setActiveAssistantTab,
    setActiveTab,
  } = useApp();

  const careerRoles = [
    'Backend SDE-II (Distributed Systems)',
    'Full-Stack Systems Engineer',
    'Cloud Native & DevOps Architect',
    'AI & Data Platform Engineer',
  ];

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'current_skills':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'skills_to_learn':
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'projects_to_build':
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 'certifications':
        return <Award className="w-5 h-5 text-amber-400" />;
      case 'interview_prep':
        return <Zap className="w-5 h-5 text-rose-400" />;
      case 'target_job':
        return <Target className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStageBadgeColor = (stage: string) => {
    switch (stage) {
      case 'current_skills':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'skills_to_learn':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'projects_to_build':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'certifications':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'interview_prep':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'target_job':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Target Role Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Dynamic Career Blueprint
            </span>
            <span className="text-xs text-slate-400">DevScore Baseline: {devScoreReport.overallScore}/1000</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Visual SDE-II Progression Roadmap
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Step-by-step career path tailored to your verified technical foundations, mapping skill acquisition, high-impact projects, and interview readiness to your target compensation level.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0">
          <label className="text-xs text-slate-400 font-medium">Target Role:</label>
          <select
            value={targetCareerRole}
            onChange={(e) => setTargetCareerRole(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 font-medium focus:border-cyan-500 focus:outline-none transition-all cursor-pointer"
          >
            {careerRoles.map((role) => (
              <option key={role} value={role} className="bg-slate-900 text-white">
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Roadmap Flowchart */}
      <div className="relative py-2">
        <div className="space-y-4">
          {visualRoadmapNodes.map((node, idx) => {
            const isLast = idx === visualRoadmapNodes.length - 1;
            return (
              <React.Fragment key={node.id}>
                <div className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-6 transition-all shadow-lg group relative">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      {/* Node Sequence Number & Icon */}
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                        {getStageIcon(node.stage)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStageBadgeColor(node.stage)}`}>
                            Step 0{node.stageNumber}: {node.stage.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            {node.estimatedTime}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white mt-1.5 group-hover:text-cyan-400 transition-colors">
                          {node.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {node.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {node.stage === 'skills_to_learn' && (
                        <button
                          onClick={() => setActiveAssistantTab('recommendations')}
                          className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Explore Skills <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                      {node.stage === 'projects_to_build' && (
                        <button
                          onClick={() => setActiveAssistantTab('recommendations')}
                          className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          View Blueprints <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                      {node.stage === 'target_job' && (
                        <button
                          onClick={() => setActiveTab('jobs')}
                          className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Browse Jobs <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Key Deliverables & Benchmarks:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                      {node.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/70 text-xs text-slate-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Downward Flow Connector */}
                {!isLast && (
                  <div className="flex justify-center my-1">
                    <div className="w-8 h-8 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-md">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
