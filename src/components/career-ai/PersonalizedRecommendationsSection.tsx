import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Code2,
  Briefcase,
  Layers,
  CheckCircle2,
  Clock,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Zap,
  CheckSquare,
  Square,
  Award,
  Terminal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalizedRecommendationsSection: React.FC = () => {
  const {
    currentUser,
    devScoreReport,
    skillRecommendations,
    projectRecommendations,
    jobRecommendations,
    learningRoadmap,
    toggleRoadmapStep,
    interviewPrepPlan,
    toggleMockTask,
    applyJob,
    setActiveTab,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'skills' | 'projects' | 'jobs' | 'roadmap' | 'interview'>('skills');

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Tailored for {currentUser.fullName}
              </span>
              <span className="text-xs text-slate-400">DevScore: {devScoreReport.overallScore}/1000 ({devScoreReport.tier})</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Personalized Career Growth Engine
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              AI-generated recommendations calculated from your verified repositories, LeetCode performance, and target SDE-II benchmarks.
            </p>
          </div>

          {/* Metric Stats Pills */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center min-w-[90px]">
              <div className="text-base font-bold text-cyan-400">+{skillRecommendations.reduce((acc, s) => acc + s.devScoreBoost, 0)}</div>
              <div className="text-[11px] text-slate-400 font-medium">DevScore Potential</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center min-w-[90px]">
              <div className="text-base font-bold text-emerald-400">{jobRecommendations.length} Roles</div>
              <div className="text-[11px] text-slate-400 font-medium">Top Matches</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center min-w-[90px]">
              <div className="text-base font-bold text-indigo-400">90 Days</div>
              <div className="text-[11px] text-slate-400 font-medium">Sprint Roadmap</div>
            </div>
          </div>
        </div>

        {/* Sub-tab Switcher Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-800/80">
          <button
            onClick={() => setActiveSubTab('skills')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'skills'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Skill Recommendations ({skillRecommendations.length})
          </button>
          <button
            onClick={() => setActiveSubTab('projects')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'projects'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Project Blueprints ({projectRecommendations.length})
          </button>
          <button
            onClick={() => setActiveSubTab('jobs')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'jobs'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Job Recommendations ({jobRecommendations.length})
          </button>
          <button
            onClick={() => setActiveSubTab('roadmap')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'roadmap'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Learning Roadmap (4 Phases)
          </button>
          <button
            onClick={() => setActiveSubTab('interview')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'interview'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Interview Preparation Plan
          </button>
        </div>
      </div>

      {/* 1. Skill Recommendations Tab */}
      {activeSubTab === 'skills' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              High-Yield Skill Gaps to Bridge
            </h3>
            <span className="text-xs text-slate-400">Ranked by hiring demand & compensation impact</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillRecommendations.map((skill) => (
              <div
                key={skill.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {skill.skill}
                        </h4>
                      </div>
                      <span className="text-xs text-slate-400">{skill.category}</span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          skill.importance === 'Critical'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : skill.importance === 'High'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {skill.importance} Priority
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono">
                        +{skill.devScoreBoost} DevScore
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {skill.rationale}
                  </p>

                  <div className="mb-4">
                    <div className="text-[11px] text-slate-400 font-medium mb-1.5">Target Roles:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.targetRoles.map((role, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> ~{skill.estimatedHours} Hours Required
                    </span>
                    <span className="text-[11px] text-slate-500">Curated Resources</span>
                  </div>

                  <div className="space-y-1.5">
                    {skill.learningResources.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-cyan-500/40 transition-colors"
                      >
                        <span className="text-slate-300 truncate max-w-[280px] font-medium">
                          {res.title}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ml-2 ${
                            res.free ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {res.type} {res.free ? '• Free' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Project Recommendations Tab */}
      {activeSubTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Flagship Portfolio Projects (Production-Grade)
            </h3>
            <span className="text-xs text-slate-400">Architected to pass senior bar-raiser interviews</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projectRecommendations.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                          {project.domain}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                          {project.difficulty}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1.5">{project.title}</h4>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> {project.estimatedDays} Days
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{project.summary}</p>

                  {/* Architecture Pillars */}
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5 mb-3.5">
                    <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Architecture & Key Mechanisms:
                    </div>
                    <ul className="space-y-1.5">
                      {project.architecture.map((arch, aIdx) => (
                        <li key={aIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{arch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resume Bullet Sample */}
                <div className="pt-3.5 border-t border-slate-800/80 bg-slate-950/40 -mx-5 -mb-5 p-5 rounded-b-xl">
                  <div className="text-[11px] text-slate-400 font-medium mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Suggested Resume Bullet (XYZ Formula):
                  </div>
                  <p className="text-xs text-emerald-400/90 font-mono bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-lg">
                    "{project.resumeBulletSample}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Job Recommendations Tab */}
      {activeSubTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              High-Match Job Recommendations
            </h3>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              Browse All Jobs Marketplace <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobRecommendations.map((job) => (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-semibold text-slate-400">{job.company}</span>
                      <h4 className="text-base font-bold text-white">{job.title}</h4>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs shrink-0">
                      {job.matchPercentage}% Match
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-slate-300 font-semibold">{job.salary}</div>
                    <div className="text-xs text-slate-400">{job.location}</div>
                  </div>

                  <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/80 mb-4">
                    <div className="text-[11px] font-semibold text-cyan-400 mb-1">Why You Match:</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{job.whyMatched}</p>
                  </div>

                  <div className="mb-4">
                    <div className="text-[11px] text-slate-400 font-medium mb-1.5">Key Stack:</div>
                    <div className="flex flex-wrap gap-1">
                      {job.keySkills.map((k, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60 font-mono"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    applyJob(job.jobId);
                    setActiveTab('jobs');
                  }}
                  className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-cyan-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Apply with 1-Click Profile <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Learning Roadmap Tab */}
      {activeSubTab === 'roadmap' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              90-Day Structured SDE-II Curriculum
            </h3>
            <span className="text-xs text-slate-400">Click steps to toggle your active completion</span>
          </div>

          <div className="space-y-3">
            {learningRoadmap.map((phase, idx) => (
              <div
                key={phase.id}
                className={`bg-slate-900 border rounded-xl p-5 transition-all ${
                  phase.completed
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleRoadmapStep(phase.id)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {phase.completed ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500" />
                      )}
                    </button>
                    <div>
                      <h4 className={`text-sm font-bold ${phase.completed ? 'text-emerald-300' : 'text-white'}`}>
                        {phase.phase}
                      </h4>
                      <span className="text-xs text-slate-400">{phase.duration}</span>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      phase.completed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {phase.completed ? 'Phase Completed' : 'In Progress'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-800/80">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase mb-2">Core Objectives:</div>
                    <ul className="space-y-1.5">
                      {phase.objectives.map((obj, oIdx) => (
                        <li key={oIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase mb-2">Milestone Proof:</div>
                    <ul className="space-y-1.5">
                      {phase.milestones.map((m, mIdx) => (
                        <li key={mIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Interview Preparation Plan Tab */}
      {activeSubTab === 'interview' && (
        <div className="space-y-6">
          {/* DSA Focus Module */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              1. Priority Data Structures & Algorithms (DSA Target)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interviewPrepPlan.dsaFocus.map((dsa, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{dsa.topic}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        dsa.priority === 'High'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {dsa.targetProblems} Target Solves
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2.5">{dsa.why}</p>
                  <div className="flex flex-wrap gap-1">
                    {dsa.examples.map((ex, eIdx) => (
                      <span
                        key={eIdx}
                        className="text-[10px] px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800 font-mono"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Design Deep Dives */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              2. System Design (HLD & LLD) Blueprints
            </h4>
            <div className="space-y-3">
              {interviewPrepPlan.systemDesignTopics.map((sys, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5">
                  <div className="text-xs font-bold text-cyan-400 mb-1">{sys.concept}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">{sys.breakdown}</p>
                  <div className="text-[11px] text-slate-400 bg-slate-900/90 p-2 rounded border border-slate-800">
                    <span className="text-amber-400 font-medium">Practice Prompt:</span> {sys.practiceQuestions.join(' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral STAR & Readiness Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                3. Behavioral STAR Stories
              </h4>
              <div className="space-y-3">
                {interviewPrepPlan.behavioralStories.map((story, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
                    <div className="text-xs font-bold text-slate-200 mb-1">{story.principle}</div>
                    <div className="text-xs text-slate-400 italic mb-2">"{story.prompt}"</div>
                    <div className="text-xs text-emerald-400/90 bg-emerald-950/20 p-2 rounded border border-emerald-500/20">
                      💡 {story.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                4. Interview Readiness Checklist
              </h4>
              <div className="space-y-2.5">
                {interviewPrepPlan.mockChecklist.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => toggleMockTask(task.id)}
                    className="w-full flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 text-left transition-colors cursor-pointer"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-xs ${task.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                      {task.task}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
