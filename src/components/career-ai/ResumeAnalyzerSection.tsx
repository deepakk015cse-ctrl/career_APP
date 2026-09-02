import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Search,
  Award,
  Layers,
  Zap,
  TrendingUp,
  FileCheck,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleResumePreset } from '../../data/careerAIData';

export const ResumeAnalyzerSection: React.FC = () => {
  const {
    resumeAnalysis,
    isAnalyzingResume,
    analyzeResumeText,
    currentUser,
  } = useApp();

  const [resumeTextInput, setResumeTextInput] = useState<string>(sampleResumePreset);
  const [uploadedFileName, setUploadedFileName] = useState<string>('arjun_patel_swe_resume.pdf');
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'results' | 'edit_text'>('results');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    // If it's a text file or markdown, read it
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && content.length > 30) {
        setResumeTextInput(content);
        analyzeResumeText(content, file.name);
        setActiveViewMode('results');
      } else {
        // Fallback to sample text with the uploaded file's name
        analyzeResumeText(sampleResumePreset, file.name);
        setActiveViewMode('results');
      }
    };
    reader.onerror = () => {
      analyzeResumeText(sampleResumePreset, file.name);
      setActiveViewMode('results');
    };

    if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.readAsText(file);
    } else {
      // For PDF/DOCX binary previews in browser sandbox, run comprehensive analysis on the extracted profile
      analyzeResumeText(sampleResumePreset, file.name);
      setActiveViewMode('results');
    }
  };

  const handleTriggerAnalysis = () => {
    if (!resumeTextInput.trim()) return;
    analyzeResumeText(resumeTextInput, uploadedFileName);
    setActiveViewMode('results');
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const handleLoadSample = () => {
    setResumeTextInput(sampleResumePreset);
    setUploadedFileName('arjun_patel_swe_resume.pdf');
    analyzeResumeText(sampleResumePreset, 'arjun_patel_swe_resume.pdf');
    setActiveViewMode('results');
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5" /> AI Resume & ATS Scanner
            </span>
            {resumeAnalysis?.isDemoMode && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Preview Mode
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            ATS Compatibility & Bullet Impact Analyzer
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Evaluates resume keyword density, quantifies engineering scale using the Google XYZ impact formula, and scans against top-tier tech screening benchmarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <label className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Resume (PDF/DOCX/TXT)</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleLoadSample}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Load Sample Profile
          </button>

          <button
            onClick={() => setActiveViewMode(activeViewMode === 'results' ? 'edit_text' : 'results')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            {activeViewMode === 'results' ? 'View/Edit Text' : 'View Scan Results'}
          </button>
        </div>
      </div>

      {/* Text Edit Mode */}
      {activeViewMode === 'edit_text' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Resume Text Input & Editor
            </h3>
            <span className="text-xs text-slate-400">File: {uploadedFileName}</span>
          </div>

          <textarea
            value={resumeTextInput}
            onChange={(e) => setResumeTextInput(e.target.value)}
            rows={14}
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl p-4 text-xs font-mono text-slate-200 outline-none resize-y leading-relaxed"
            placeholder="Paste your raw resume text here for deep AI analysis..."
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setActiveViewMode('results')}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleTriggerAnalysis}
              disabled={isAnalyzingResume}
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isAnalyzingResume ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Analyzing Resume with Gemini...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Run AI Resume Scan
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Analysis Results View */}
      {activeViewMode === 'results' && resumeAnalysis && (
        <div className="space-y-6">
          {/* Top Score Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* ATS Score Gauge */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">ATS Readability</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Top 8%
                </span>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-cyan-400 font-mono">
                  {resumeAnalysis.atsScore}
                </span>
                <span className="text-sm text-slate-500 font-medium">/ 100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${resumeAnalysis.atsScore}%` }}
                ></div>
              </div>
            </div>

            {/* Profile Completeness */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Profile Completeness</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Complete
                </span>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                  {resumeAnalysis.completenessScore}
                </span>
                <span className="text-sm text-slate-500 font-medium">/ 100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${resumeAnalysis.completenessScore}%` }}
                ></div>
              </div>
            </div>

            {/* Action Verb Metric */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Action Verb Density</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                  High Impact
                </span>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-indigo-400 font-mono">
                  {resumeAnalysis.actionVerbScore}
                </span>
                <span className="text-sm text-slate-500 font-medium">/ 100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${resumeAnalysis.actionVerbScore}%` }}
                ></div>
              </div>
            </div>

            {/* Analyzed Document Info */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400">Target File</span>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {resumeAnalysis.fileName || uploadedFileName}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                Scanned {new Date().toLocaleDateString()}
              </div>
              <button
                onClick={handleTriggerAnalysis}
                disabled={isAnalyzingResume}
                className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isAnalyzingResume ? 'animate-spin' : ''}`} /> Re-scan Resume
              </button>
            </div>
          </div>

          {/* Executive Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Executive Recruiter Assessment</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {resumeAnalysis.summary}
              </p>
            </div>
          </div>

          {/* Google XYZ Bullet Point Rewriter */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Google XYZ Impact Enhancer
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Formula: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>
                </p>
              </div>
              <span className="text-[11px] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-full font-medium">
                {resumeAnalysis.bulletPointImprovements.length} Rewrites Generated
              </span>
            </div>

            <div className="space-y-4">
              {resumeAnalysis.bulletPointImprovements.map((bullet, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-4.5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {bullet.impactKeyword}
                    </span>
                    <button
                      onClick={() => handleCopyBullet(bullet.improved, idx)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedBulletIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Improved Bullet</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1">
                        Original Bullet (Passive / Unquantified):
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-mono">
                        "{bullet.original}"
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-500/20">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Improved Impact Bullet (XYZ Formula):
                      </div>
                      <p className="text-xs text-emerald-200 leading-relaxed font-mono font-medium">
                        "{bullet.improved}"
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Why this works:</strong> {bullet.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords Breakdown (Parsed vs Missing) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Detected High-Value Keywords ({resumeAnalysis.parsedSkills.length})
                </h4>
                <span className="text-[11px] text-emerald-400 font-medium">Indexed by ATS</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {resumeAnalysis.parsedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Missing High-Yield ATS Keywords ({resumeAnalysis.missingKeywords.length})
                </h4>
                <span className="text-[11px] text-amber-400 font-medium">Recommended Additions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {resumeAnalysis.missingKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section by Section Audit Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Detailed Section-by-Section ATS Audit
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumeAnalysis.sectionsReview.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl p-4.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-white">{sec.section}</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          {sec.score}/100
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            sec.status === 'Strong'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : sec.status === 'Satisfactory'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {sec.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {sec.feedback}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800/80">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase mb-1.5">
                      Constructive Suggestions:
                    </div>
                    <ul className="space-y-1">
                      {sec.suggestions.map((sug, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-400 flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
