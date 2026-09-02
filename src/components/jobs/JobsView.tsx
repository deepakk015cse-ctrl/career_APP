import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Building,
  DollarSign,
  Bookmark,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Zap,
  Send,
  X,
  Clock,
  Users,
  Trophy,
  GraduationCap,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building2,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobItem } from '../../types';

export const JobsView: React.FC = () => {
  const {
    jobs,
    toggleSaveJob,
    applyJob,
    currentUser,
    devScoreReport,
    setActiveTab,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'All' | 'Full-time' | 'Internship' | 'Remote' | 'Saved' | 'Applied'>('All');
  const [workplaceFilter, setWorkplaceFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [activeJob, setActiveJob] = useState<JobItem | null>(jobs[0] || null);
  const [applyModalJob, setApplyModalJob] = useState<JobItem | null>(null);
  const [matchAnalysisJob, setMatchAnalysisJob] = useState<JobItem | null>(null);
  const [coverNote, setCoverNote] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleQuickApply = (job: JobItem) => {
    setApplyModalJob(job);
    setCoverNote(
      `Hi ${job.company} Hiring Team,\n\nI am enthusiastic to apply for the ${job.title} role. With my DevScore of ${devScoreReport.overallScore}/1000 (Elite Tier), ${currentUser.codingStats.leetCodeSolved}+ LeetCode problems solved, and hands-on projects in ${job.skillsRequired.slice(0, 3).join(', ')}, I am well-prepared to contribute to your engineering team immediately.`
    );
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyModalJob) {
      applyJob(applyModalJob.id);
      setAppliedSuccess(true);
      setTimeout(() => {
        setAppliedSuccess(false);
        setApplyModalJob(null);
      }, 1200);
    }
  };

  // Filtered jobs logic
  const filteredJobs = jobs.filter(j => {
    // Category tabs
    if (selectedCategoryTab === 'Full-time' && j.type !== 'Full-time') return false;
    if (selectedCategoryTab === 'Internship' && j.type !== 'Internship') return false;
    if (selectedCategoryTab === 'Remote' && j.workplaceType !== 'Remote') return false;
    if (selectedCategoryTab === 'Saved' && !j.isSaved) return false;
    if (selectedCategoryTab === 'Applied' && !j.isApplied) return false;

    // Workplace filter
    if (workplaceFilter !== 'all' && j.workplaceType.toLowerCase() !== workplaceFilter.toLowerCase()) return false;

    // Experience filter
    if (experienceFilter !== 'all' && j.experienceLevel.toLowerCase() !== experienceFilter.toLowerCase()) return false;

    // Search query
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  const appliedCount = jobs.filter(j => j.isApplied).length;
  const savedCount = jobs.filter(j => j.isSaved).length;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner & Marketplace Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Smart Match Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Software Jobs & Elite 2025 Internships
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Curated opportunities matched against your DevScore ({devScoreReport.overallScore}), GitHub repositories, and LeetCode algorithmic progress.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('recruiter')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-300" />
              <span>Recruiter & Company Portal</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-6">
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or tech stack (e.g. Go, Distributed Systems, React)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none font-medium transition-all"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={workplaceFilter}
              onChange={e => setWorkplaceFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-xs text-slate-700 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none font-medium"
            >
              <option value="all">All Workplace Modes</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-site</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={experienceFilter}
              onChange={e => setExperienceFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-xs text-slate-700 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none font-medium"
            >
              <option value="all">All Experience Levels</option>
              <option value="entry level">Entry Level</option>
              <option value="associate">Associate</option>
              <option value="mid-senior">Mid-Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          {[
            { id: 'All', label: 'All Opportunities', count: jobs.length },
            { id: 'Full-time', label: 'Full-time Roles', count: jobs.filter(j => j.type === 'Full-time').length },
            { id: 'Internship', label: 'Internships 2025', count: jobs.filter(j => j.type === 'Internship').length },
            { id: 'Remote', label: 'Remote', count: jobs.filter(j => j.workplaceType === 'Remote').length },
            { id: 'Saved', label: 'Saved Roles', count: savedCount },
            { id: 'Applied', label: 'Applied', count: appliedCount },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategoryTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategoryTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  selectedCategoryTab === tab.id ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Jobs Listing & Details Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Jobs List (Left Column: Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200 space-y-2">
              <Briefcase className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-semibold">No opportunities found matching your filter criteria.</p>
            </div>
          ) : (
            filteredJobs.map(job => {
              const isSelected = activeJob?.id === job.id;

              return (
                <div
                  key={job.id}
                  onClick={() => setActiveJob(job)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-indigo-600 shadow-md ring-2 ring-indigo-500/10'
                      : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-xs"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                            {job.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location} ({job.workplaceType})
                          </span>
                          <span>•</span>
                          <span>{job.experienceLevel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Score & Bookmark */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setMatchAnalysisJob(job);
                        }}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-extrabold rounded-lg border border-emerald-200 flex items-center gap-1 transition-colors"
                        title="Click to view AI Match Breakdown"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{job.matchScore || 92}% Match</span>
                      </button>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleSaveJob(job.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          job.isSaved ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${job.isSaved ? 'fill-indigo-600' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Internship Highlight Strip (if Internship) */}
                  {job.type === 'Internship' && (
                    <div className="mt-3.5 p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                        <span>Internship: {job.duration || '3 Months'}</span>
                      </div>
                      <div className="text-amber-800 font-bold font-mono">
                        Stipend: {job.stipend || '₹1.0L / mo'}
                      </div>
                      {job.deadline && (
                        <div className="text-[10px] text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md font-medium">
                          Apply by: {job.deadline}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Compensation & Skills Required */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {job.skillsRequired.slice(0, 4).map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-800 font-mono">
                        {job.salary}
                      </span>
                      {job.isApplied ? (
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Applied
                        </span>
                      ) : (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleQuickApply(job);
                          }}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                        >
                          Easy Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Job Detail Panel (Right Column: Span 5) */}
        {activeJob && (
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs sticky top-20 space-y-6">
            {/* Header & Logo */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-start gap-3">
                <img
                  src={activeJob.companyLogo}
                  alt={activeJob.company}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-sm"
                />
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-tight">{activeJob.title}</h2>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">{activeJob.company}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {activeJob.location} • {activeJob.workplaceType} • Posted {activeJob.postedDate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleSaveJob(activeJob.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  activeJob.isSaved ? 'text-indigo-600 border-indigo-200 bg-indigo-50' : 'text-slate-400 border-slate-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${activeJob.isSaved ? 'fill-indigo-600' : ''}`} />
              </button>
            </div>

            {/* Smart Match Breakdown Card */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Smart Match Engine Rating: {activeJob.matchScore || 94}%</span>
                </div>
                <button
                  onClick={() => setMatchAnalysisJob(activeJob)}
                  className="text-[11px] text-emerald-700 font-bold hover:underline"
                >
                  View Details
                </button>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                {activeJob.matchExplanation ||
                  `High synergy: Your Go/Distributed Systems experience and DevScore of ${devScoreReport.overallScore} match the required engineering profile.`}
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium uppercase">Compensation</span>
                <p className="font-bold text-slate-900 font-mono mt-0.5">{activeJob.salary}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium uppercase">Experience</span>
                <p className="font-bold text-slate-900 mt-0.5">{activeJob.experienceLevel}</p>
              </div>
            </div>

            {/* Role Description & Responsibilities */}
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-60 overflow-y-auto pr-1">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">About the Role</h4>
                <p>{activeJob.description}</p>
              </div>

              {activeJob.responsibilities && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Key Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {activeJob.responsibilities.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeJob.qualifications && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Qualifications</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {activeJob.qualifications.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Apply CTA Button */}
            <div className="pt-4 border-t border-slate-100">
              {activeJob.isApplied ? (
                <div className="w-full py-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Application Submitted • In Recruiter Review</span>
                </div>
              ) : (
                <button
                  onClick={() => handleQuickApply(activeJob)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Easy Apply with DevNexus Profile</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Smart Match Deep Dive Analysis Modal */}
      {matchAnalysisJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Smart Match Analysis</h3>
                  <p className="text-xs text-slate-500">{matchAnalysisJob.title} @ {matchAnalysisJob.company}</p>
                </div>
              </div>
              <button
                onClick={() => setMatchAnalysisJob(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Score Big Banner */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-semibold">Match Compatibility</span>
                <div className="text-2xl font-black text-emerald-900 font-mono mt-0.5">
                  {matchAnalysisJob.matchScore || 94}% Fit
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                High Interview Probability
              </span>
            </div>

            {/* Detailed Fit Factors */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>1. Tech Stack & Skill Overlap</span>
                  <span className="text-emerald-600">100% Match</span>
                </div>
                <p className="text-slate-500">
                  Required: {matchAnalysisJob.skillsRequired.join(', ')}. Your profile has verified experience and GitHub repositories covering all required skills.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>2. DevScore Threshold</span>
                  <span className="text-emerald-600">Exceeds Target (865 vs 750)</span>
                </div>
                <p className="text-slate-500">
                  Your application DevScore of {devScoreReport.overallScore} places you in the top 1% of applicants for this role.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>3. LeetCode & Problem Solving</span>
                  <span className="text-emerald-600">Knight Tier (1985 Rating)</span>
                </div>
                <p className="text-slate-500">
                  750+ solved problems exceeds this company's algorithmic benchmark for Senior/Entry engineering interviews.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setMatchAnalysisJob(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setMatchAnalysisJob(null);
                  handleQuickApply(matchAnalysisJob);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
              >
                Proceed to Easy Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Easy Apply Modal */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={applyModalJob.companyLogo}
                  alt={applyModalJob.company}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Apply to {applyModalJob.company}</h3>
                  <p className="text-xs text-slate-500">{applyModalJob.title}</p>
                </div>
              </div>
              <button
                onClick={() => setApplyModalJob(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {appliedSuccess ? (
              <div className="py-10 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Application Submitted!</h4>
                <p className="text-xs text-slate-500">
                  Your DevNexus profile and DevScore report have been sent to {applyModalJob.company}'s recruiting dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmApply} className="space-y-4 text-xs">
                {/* Profile Data Pre-Filled Card */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Attached Candidate Profile:</span>
                    <span className="text-[11px] font-mono font-bold text-indigo-600">DevScore: {devScoreReport.overallScore}/1000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.fullName}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{currentUser.fullName}</h4>
                      <p className="text-[11px] text-slate-500">{currentUser.headline}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Resume: <span className="font-semibold text-slate-700">{currentUser.resumeFileName || 'Resume_ArjunSharma_2025.pdf'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Note to Hiring Manager (Optional)</label>
                  <textarea
                    rows={4}
                    value={coverNote}
                    onChange={e => setCoverNote(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setApplyModalJob(null)}
                    className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
