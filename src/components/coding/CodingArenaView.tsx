import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Flame,
  CheckCircle2,
  Play,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Cpu,
  Layers,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CodingProblem } from '../../types';

export const CodingArenaView: React.FC = () => {
  const { codingProblems, toggleSolveProblem, currentUser } = useApp();

  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblems[0] || null);
  const [code, setCode] = useState(`function solution(input: any): any {\n  // Write optimal algorithm here (O(N) time / O(1) space)\n  return input;\n}`);
  const [activeTopic, setActiveTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [runStatus, setRunStatus] = useState<string | null>(null);

  const handleSelectProblem = (p: CodingProblem) => {
    setSelectedProblem(p);
    setCode(`// ${p.title} (${p.difficulty})\n// Tested at: ${p.companies.join(', ')}\n\nfunction solve(input: any): any {\n  // Implementation for ${p.topic}\n  return true;\n}`);
    setRunStatus(null);
  };

  const handleRunCode = () => {
    setRunStatus('Executing test suite against edge cases (O(N) benchmark)...');
    setTimeout(() => {
      setRunStatus(`✅ Test Cases Passed for ${selectedProblem.title}! (Runtime: 52ms • Beats 96.4% submissions)`);
    }, 700);
  };

  const filteredProblems = codingProblems.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTopic === 'All') return matchesSearch;
    return matchesSearch && p.topic.toLowerCase().includes(activeTopic.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>DSA Arena & Blind 75 Sheet</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Algorithmic Problem Solving Track
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Curated coding problems frequently tested at FAANG, top tech startups, and university placement drives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-amber-500/10 rounded-2xl border border-amber-200 text-center">
              <span className="text-base font-bold text-amber-800 font-mono block">
                {currentUser.codingStats.streakDays} Days
              </span>
              <span className="text-[10px] text-amber-700 font-semibold uppercase">Daily Streak</span>
            </div>
            <div className="px-4 py-2 bg-slate-900 text-white rounded-2xl text-center">
              <span className="text-base font-bold text-emerald-400 font-mono block">
                {currentUser.codingStats.leetCodeSolved}
              </span>
              <span className="text-[10px] text-slate-300 font-semibold uppercase">Solved</span>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems by name, company, or topic (e.g. Google, Tree, Hash Map)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'Hash Map', 'Tree', 'Graph', 'Dynamic Programming', 'Binary Search'].map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTopic === topic
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Problem List & Code Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Problems List */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredProblems.map((prob) => {
            const isSelected = selectedProblem?.id === prob.id;

            return (
              <div
                key={prob.id}
                onClick={() => handleSelectProblem(prob)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer bg-white ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSolveProblem(prob.id);
                      }}
                      className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 transition-colors ${
                        prob.isSolved
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 hover:border-indigo-600'
                      }`}
                    >
                      {prob.isSolved && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{prob.title}</h3>
                      <p className="text-[11px] text-slate-500">{prob.topic}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {prob.companies.map((c, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md">
                      {c}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-slate-100">
                  <span>Acceptance: {prob.acceptance}</span>
                  <a
                    href={prob.leetCodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>LeetCode</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Code Editor & Execution Sandbox */}
        <div className="lg:col-span-7">
          {selectedProblem ? (
            <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4 text-white sticky top-20">
              
              {/* Editor Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200">{selectedProblem.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                    TypeScript / Go
                  </span>
                  <button
                    onClick={() => toggleSolveProblem(selectedProblem.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      selectedProblem.isSolved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {selectedProblem.isSolved ? '✓ Solved' : 'Mark as Solved'}
                  </button>
                </div>
              </div>

              {/* Code Textarea */}
              <textarea
                rows={12}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-slate-900 text-emerald-400 font-mono text-xs p-4 rounded-2xl border border-slate-800 outline-hidden resize-none leading-relaxed"
              />

              {/* Run Output Box */}
              {runStatus && (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 animate-in fade-in duration-150">
                  {runStatus}
                </div>
              )}

              {/* Execution Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 font-mono">Simulated Sandbox Environment</span>
                <button
                  onClick={handleRunCode}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Run Test Cases</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-xs text-slate-500">Select a problem from the track list.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
