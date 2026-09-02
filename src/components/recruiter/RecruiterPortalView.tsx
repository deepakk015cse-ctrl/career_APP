import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  FileText,
  Github,
  Code2,
  Trophy,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  SlidersHorizontal,
  Download,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobApplicant, JobItem } from '../../types';

export const RecruiterPortalView: React.FC = () => {
  const {
    jobs,
    addJobPosting,
    jobApplicants,
    updateApplicantStatus,
    contactCandidate,
    setActiveTab,
  } = useApp();

  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [applicantSearch, setApplicantSearch] = useState<string>('');
  const [minDevScoreFilter, setMinDevScoreFilter] = useState<number>(0);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [selectedApplicantForResume, setSelectedApplicantForResume] = useState<JobApplicant | null>(null);

  // Form state for creating a new Job / Internship posting
  const [newPosting, setNewPosting] = useState({
    title: '',
    company: 'DevNexus Engineering',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    location: 'Bengaluru, India',
    workplaceType: 'Hybrid' as 'Remote' | 'Hybrid' | 'On-site',
    type: 'Full-time' as 'Full-time' | 'Internship' | 'Remote' | 'Contract',
    category: 'Full-time' as 'Full-time' | 'Internship' | 'Remote',
    experienceLevel: 'Entry Level' as 'Entry Level' | 'Associate' | 'Mid-Senior' | 'Lead',
    salary: '₹18L - ₹26L / year',
    stipend: '₹1.0L / month',
    duration: '3 Months (May - Jul 2025)',
    deadline: 'April 30, 2025',
    eligibilityBatch: 'Class of 2025 & 2026',
    skillsRequired: 'Go, Distributed Systems, SQL, Docker',
    description: '',
    responsibilities: 'Design scalable microservices\nOptimize database queries\nWrite clean unit tests',
    qualifications: 'B.Tech/M.Tech in CS or related field\nSolid understanding of DSA and Systems',
  });

  const handleCreatePostingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPosting.title || !newPosting.description) return;

    addJobPosting({
      title: newPosting.title,
      company: newPosting.company,
      companyLogo: newPosting.companyLogo,
      location: newPosting.location,
      workplaceType: newPosting.workplaceType,
      type: newPosting.type,
      category: newPosting.type === 'Internship' ? 'Internship' : newPosting.workplaceType === 'Remote' ? 'Remote' : 'Full-time',
      experienceLevel: newPosting.experienceLevel,
      salary: newPosting.salary,
      stipend: newPosting.type === 'Internship' ? newPosting.stipend : undefined,
      duration: newPosting.type === 'Internship' ? newPosting.duration : undefined,
      deadline: newPosting.deadline,
      eligibilityBatch: newPosting.eligibilityBatch,
      skillsRequired: newPosting.skillsRequired.split(',').map(s => s.trim()).filter(Boolean),
      description: newPosting.description,
      responsibilities: newPosting.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
      qualifications: newPosting.qualifications.split('\n').map(s => s.trim()).filter(Boolean),
    });

    setShowCreateJobModal(false);
  };

  // Filter applicants
  const filteredApplicants = jobApplicants.filter(app => {
    const matchesJob = selectedJobFilter === 'all' || app.jobId === selectedJobFilter;
    const matchesStatus = selectedStatusFilter === 'all' || app.status === selectedStatusFilter;
    const matchesScore = app.candidateDevScore >= minDevScoreFilter;
    const matchesSearch =
      app.candidateName.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.candidateHeadline.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.candidateUniversity.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.skills.some(s => s.toLowerCase().includes(applicantSearch.toLowerCase()));

    return matchesJob && matchesStatus && matchesScore && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-700 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                Recruiter & Talent Portal
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold rounded-full border border-emerald-500/30">
                Authorized Workspace
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Talent Acquisition & Hiring Dashboard
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Screen developer candidates with algorithmic DevScore benchmarks, review GitHub project depth, and manage hiring pipelines seamlessly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCreateJobModal(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Role or Internship</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>Switch to Student View</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-700/80">
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Active Postings</span>
            <div className="text-2xl font-bold text-white font-mono mt-0.5">{jobs.length}</div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Total Applicants</span>
            <div className="text-2xl font-bold text-indigo-300 font-mono mt-0.5">{jobApplicants.length}</div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Shortlisted</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">
              {jobApplicants.filter(a => a.status === 'Shortlisted' || a.status === 'Interview').length}
            </div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Avg Candidate DevScore</span>
            <div className="text-2xl font-bold text-amber-400 font-mono mt-0.5">851</div>
          </div>
        </div>
      </div>

      {/* Active Postings Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">Your Active Roles & Internships</h2>
          <span className="text-xs text-slate-500 font-medium">{jobs.length} Roles Active</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {jobs.slice(0, 3).map(job => (
            <div
              key={job.id}
              onClick={() => setSelectedJobFilter(job.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedJobFilter === job.id
                  ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{job.title}</h3>
                  <p className="text-[11px] text-slate-500">{job.company} • {job.location}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                  job.type === 'Internship' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {job.type}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-200/60">
                <span>{job.salary}</span>
                <span className="font-semibold text-indigo-600 font-mono">
                  {jobApplicants.filter(a => a.jobId === job.id).length || job.applicantsCount} applicants
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applicants Management Hub */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        {/* Controls and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Candidate Pipeline & Screening</h2>
            <p className="text-xs text-slate-500">Review candidate codebases, DevScores, and take pipeline actions</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidates or skills..."
                value={applicantSearch}
                onChange={e => setApplicantSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52"
              />
            </div>

            {/* Filter by Job */}
            <select
              value={selectedJobFilter}
              onChange={e => setSelectedJobFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
            >
              <option value="all">All Jobs ({jobApplicants.length})</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>

            {/* Filter by Status */}
            <select
              value={selectedStatusFilter}
              onChange={e => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Min DevScore Filter */}
            <select
              value={minDevScoreFilter}
              onChange={e => setMinDevScoreFilter(Number(e.target.value))}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
            >
              <option value={0}>Any DevScore</option>
              <option value={800}>DevScore &gt; 800 (Elite)</option>
              <option value={850}>DevScore &gt; 850 (Top 1%)</option>
            </select>
          </div>
        </div>

        {/* Applicants List */}
        {filteredApplicants.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Users className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-semibold">No candidates match your current filter settings.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplicants.map(applicant => {
              const matchedJob = jobs.find(j => j.id === applicant.jobId);

              return (
                <div
                  key={applicant.id}
                  className="p-5 rounded-2xl border border-slate-200/90 hover:border-indigo-200 bg-white hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  {/* Candidate Left Information */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start gap-3.5">
                      <img
                        src={applicant.candidateAvatar}
                        alt={applicant.candidateName}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer">
                            {applicant.candidateName}
                          </h3>
                          {/* DevScore Pill */}
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-md text-[11px] font-bold font-mono flex items-center gap-1">
                            <Trophy className="w-3 h-3 text-amber-600" />
                            DevScore {applicant.candidateDevScore}
                          </span>
                          {/* Match % Pill */}
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-md text-[11px] font-bold">
                            {applicant.candidateMatchScore}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{applicant.candidateHeadline}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Applying for <span className="font-semibold text-slate-700">{matchedJob?.title || 'Engineering Role'}</span> • Applied {applicant.appliedDate}
                        </p>
                      </div>
                    </div>

                    {/* Developer highlights badge strip */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {applicant.githubUsername && (
                        <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 rounded-lg text-[11px] text-slate-700 font-mono">
                          <Github className="w-3 h-3 text-slate-800" />
                          <span>@{applicant.githubUsername}</span>
                        </div>
                      )}

                      {applicant.leetCodeSolved && (
                        <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-[11px] font-mono border border-amber-200/60">
                          <Code2 className="w-3 h-3 text-amber-600" />
                          <span>{applicant.leetCodeSolved} LeetCode Solved</span>
                        </div>
                      )}

                      {applicant.skills.slice(0, 4).map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-semibold rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Cover Note */}
                    {applicant.coverNote && (
                      <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic leading-relaxed">
                        "{applicant.coverNote}"
                      </p>
                    )}
                  </div>

                  {/* Candidate Right Actions & Status */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-medium">Status:</span>
                      <select
                        value={applicant.status}
                        onChange={e => updateApplicantStatus(applicant.id, e.target.value as JobApplicant['status'])}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          applicant.status === 'Shortlisted'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : applicant.status === 'Interview'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                            : applicant.status === 'Rejected'
                            ? 'bg-red-50 text-red-700 border-red-300'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedApplicantForResume(applicant)}
                        className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1 border border-slate-200"
                        title="View Resume"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Resume</span>
                      </button>

                      <button
                        onClick={() =>
                          contactCandidate({
                            name: applicant.candidateName,
                            avatar: applicant.candidateAvatar,
                            headline: applicant.candidateHeadline,
                          })
                        }
                        className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Resume Preview Modal */}
      {selectedApplicantForResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedApplicantForResume.candidateName}'s Resume</h3>
                  <p className="text-[11px] text-slate-500">{selectedApplicantForResume.resumeFileName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplicantForResume(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Resume Summary Preview Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{selectedApplicantForResume.candidateName}</span>
                <span className="text-slate-500 font-mono">{selectedApplicantForResume.candidateEmail}</span>
              </div>
              <p className="text-slate-600 font-medium">{selectedApplicantForResume.candidateHeadline}</p>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-800">Verified Technical Skills:</span>
                <p className="text-slate-600 mt-1">{selectedApplicantForResume.skills.join(' • ')}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-800">DevScore Report:</span>
                <p className="text-slate-600 mt-1">
                  Overall Score: <span className="font-bold text-indigo-600">{selectedApplicantForResume.candidateDevScore}/1000</span> (Elite Tier) • Match Rating: <span className="font-bold text-emerald-600">{selectedApplicantForResume.candidateMatchScore}%</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedApplicantForResume(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading ${selectedApplicantForResume.resumeFileName}`);
                  setSelectedApplicantForResume(null);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Role / Internship Modal */}
      {showCreateJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Post New Role or Internship</h3>
                  <p className="text-xs text-slate-500">Reach pre-vetted engineers and students across DevNexus</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateJobModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePostingSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Position / Job Title *</label>
                <input
                  type="text"
                  required
                  value={newPosting.title}
                  onChange={e => setNewPosting({ ...newPosting, title: e.target.value })}
                  placeholder="e.g. Backend Engineer - Distributed Systems or Summer 2025 SDE Intern"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newPosting.company}
                    onChange={e => setNewPosting({ ...newPosting, company: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={newPosting.location}
                    onChange={e => setNewPosting({ ...newPosting, location: e.target.value })}
                    placeholder="e.g. Bengaluru / Remote"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Opportunity Type</label>
                  <select
                    value={newPosting.type}
                    onChange={e => setNewPosting({ ...newPosting, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Workplace Mode</label>
                  <select
                    value={newPosting.workplaceType}
                    onChange={e => setNewPosting({ ...newPosting, workplaceType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience Level</label>
                  <select
                    value={newPosting.experienceLevel}
                    onChange={e => setNewPosting({ ...newPosting, experienceLevel: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Associate">Associate</option>
                    <option value="Mid-Senior">Mid-Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
              </div>

              {/* Internship Specific Fields */}
              {newPosting.type === 'Internship' ? (
                <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-3">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Internship Details & Eligibility</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block font-semibold text-amber-900 mb-1">Duration</label>
                      <input
                        type="text"
                        value={newPosting.duration}
                        onChange={e => setNewPosting({ ...newPosting, duration: e.target.value })}
                        placeholder="e.g. 3 Months"
                        className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-amber-900 mb-1">Monthly Stipend</label>
                      <input
                        type="text"
                        value={newPosting.stipend}
                        onChange={e => setNewPosting({ ...newPosting, stipend: e.target.value })}
                        placeholder="e.g. ₹1.15L / mo"
                        className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-amber-900 mb-1">Application Deadline</label>
                      <input
                        type="text"
                        value={newPosting.deadline}
                        onChange={e => setNewPosting({ ...newPosting, deadline: e.target.value })}
                        placeholder="e.g. Apr 30, 2025"
                        className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Annual Compensation / Salary *</label>
                  <input
                    type="text"
                    required
                    value={newPosting.salary}
                    onChange={e => setNewPosting({ ...newPosting, salary: e.target.value })}
                    placeholder="e.g. ₹24L - ₹32L / year + Equity"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Required Skills (Comma separated) *</label>
                <input
                  type="text"
                  required
                  value={newPosting.skillsRequired}
                  onChange={e => setNewPosting({ ...newPosting, skillsRequired: e.target.value })}
                  placeholder="e.g. Go, Distributed Systems, SQL, Docker, Kafka"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newPosting.description}
                  onChange={e => setNewPosting({ ...newPosting, description: e.target.value })}
                  placeholder="Describe the team, mission, and day-to-day impact..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateJobModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Publish Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
