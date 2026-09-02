import React, { useState } from 'react';
import {
  MapPin,
  Building,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Code2,
  FileText,
  Edit3,
  Plus,
  Share2,
  Github,
  Linkedin,
  Globe,
  CheckCircle2,
  ExternalLink,
  Flame,
  Star,
  Download,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExperienceItem, EducationItem, ProjectItem, SkillItem, CertificationItem, AchievementItem } from '../../types';
import { EditProfileHeaderModal } from '../modals/EditProfileHeaderModal';
import { ExperienceModal } from '../modals/ExperienceModal';
import { EducationModal } from '../modals/EducationModal';
import { ProjectModal } from '../modals/ProjectModal';
import { SkillModal } from '../modals/SkillModal';
import { CertificationModal } from '../modals/CertificationModal';
import { AchievementModal } from '../modals/AchievementModal';
import { SocialLinksModal } from '../modals/SocialLinksModal';
import { ResumeUploadModal } from '../modals/ResumeUploadModal';
import { ShareProfileModal } from '../modals/ShareProfileModal';

export const ProfileView: React.FC = () => {
  const { currentUser, posts, endorseSkill, likePost, addComment } = useApp();

  // Modal States
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState<ExperienceItem | null>(null);

  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState<EducationItem | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectItem | null>(null);

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [isSocialLinksModalOpen, setIsSocialLinksModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Skill category filter
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('All');

  // Filter user posts for activity tab
  const userPosts = posts.filter(p => p.author.id === currentUser.id);

  // Calculate profile completion
  const calculateCompletion = () => {
    let score = 0;
    if (currentUser.fullName) score += 10;
    if (currentUser.headline) score += 10;
    if (currentUser.bio) score += 15;
    if (currentUser.avatar) score += 10;
    if (currentUser.experiences.length > 0) score += 15;
    if (currentUser.education.length > 0) score += 15;
    if (currentUser.skills.length >= 5) score += 10;
    if (currentUser.projects.length > 0) score += 10;
    if (currentUser.resumeFileName) score += 5;
    return Math.min(score, 100);
  };

  const completionScore = calculateCompletion();

  const skillCategories = ['All', 'Languages', 'Frontend', 'Backend', 'DevOps & Cloud', 'Database', 'DSA & Core', 'AI & ML'];

  const filteredSkills = selectedSkillCategory === 'All'
    ? currentUser.skills
    : currentUser.skills.filter(s => s.category === selectedSkillCategory);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
        
        {/* Banner */}
        <div className="h-36 sm:h-48 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
          {currentUser.bannerUrl ? (
            <img
              src={currentUser.bannerUrl}
              alt="Profile banner"
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          )}

          {/* Quick Edit Banner button */}
          <button
            onClick={() => setIsHeaderModalOpen(true)}
            className="absolute top-4 right-4 px-3 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Header</span>
          </button>
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 pt-0 relative">
          
          {/* Avatar & Floating Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-4">
            
            <div className="relative inline-block">
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-slate-100"
              />
              {currentUser.openToWork && (
                <span className="absolute -bottom-2 -right-2 px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg shadow-sm border-2 border-white uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Open to Work
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                id="btn-share-profile"
                onClick={() => setIsShareModalOpen(true)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              <button
                id="btn-upload-resume"
                onClick={() => setIsResumeModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Resume / CV</span>
              </button>

              <button
                id="btn-edit-profile-main"
                onClick={() => setIsHeaderModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* User Meta Information */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentUser.fullName}
              </h1>
              <span title="Verified Developer Profile">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
              </span>
              
              {currentUser.openToMentor && (
                <span className="text-[11px] font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">
                  Mentor
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
              {currentUser.headline}
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.location}
              </span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.collegeOrCompany}
              </span>
              <span className="text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={() => setIsShareModalOpen(true)}>
                500+ Connections
              </span>
            </div>

            {/* Social & Dev Links */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
              {currentUser.socialLinks.github && (
                <a
                  href={currentUser.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-slate-800" />
                  <span>GitHub</span>
                </a>
              )}

              {currentUser.socialLinks.leetcode && (
                <a
                  href={currentUser.socialLinks.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>LeetCode</span>
                </a>
              )}

              {currentUser.socialLinks.linkedin && (
                <a
                  href={currentUser.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
              )}

              {currentUser.socialLinks.portfolio && (
                <a
                  href={currentUser.socialLinks.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Portfolio</span>
                </a>
              )}

              <button
                onClick={() => setIsSocialLinksModalOpen(true)}
                className="text-xs text-indigo-600 font-semibold hover:underline ml-1"
              >
                + Edit Links
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Profile Strength Meter */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Profile Strength & Recruiter Visibility</h3>
          </div>
          <span className="text-xs font-bold text-indigo-600 font-mono">{completionScore}% Complete</span>
        </div>

        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              completionScore >= 80 ? 'bg-emerald-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${completionScore}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <p>
            {completionScore >= 90
              ? '⭐ All-Star Profile: Your profile appears in top 5% recruiter searches.'
              : 'Add projects, certifications, and complete your bio to reach All-Star status.'}
          </p>
          {completionScore < 100 && (
            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="text-indigo-600 font-bold hover:underline"
            >
              + Add Featured Project (+10%)
            </button>
          )}
        </div>
      </div>

      {/* 3. About Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900">About & Background</h2>
          <button
            onClick={() => setIsHeaderModalOpen(true)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {currentUser.bio}
        </p>
      </div>

      {/* 4. Coding Profile Integration (LeetCode & GitHub) */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Coding Intelligence & Problem Solving</h2>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
            ✓ Live Synced
          </span>
        </div>

        {/* LeetCode & GitHub Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* LeetCode Card */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">LeetCode Profile</h4>
                  <p className="text-[10px] text-amber-800 font-semibold">{currentUser.codingStats.globalRank}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-slate-900 font-mono">{currentUser.codingStats.leetCodeSolved}</span>
                <span className="text-[10px] text-slate-500 block">Problems Solved</span>
              </div>
            </div>

            {/* Difficulty breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-white rounded-xl border border-amber-100">
                <div className="text-[10px] text-emerald-600 font-bold uppercase">Easy</div>
                <div className="font-mono font-bold text-slate-800">{currentUser.codingStats.easy}</div>
              </div>
              <div className="p-2 bg-white rounded-xl border border-amber-100">
                <div className="text-[10px] text-amber-600 font-bold uppercase">Medium</div>
                <div className="font-mono font-bold text-slate-800">{currentUser.codingStats.med}</div>
              </div>
              <div className="p-2 bg-white rounded-xl border border-amber-100">
                <div className="text-[10px] text-red-600 font-bold uppercase">Hard</div>
                <div className="font-mono font-bold text-slate-800">{currentUser.codingStats.hard}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
              <span>Contest Rating: <strong className="text-slate-900 font-mono">{currentUser.codingStats.contestRating}</strong></span>
              <span className="text-emerald-700 font-semibold">Top 3.8% Globally</span>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">GitHub Contributions</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{currentUser.codingStats.gitHubCommitsThisYear} commits in past year</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-emerald-400 font-mono">{currentUser.codingStats.streakDays}d</span>
                <span className="text-[10px] text-slate-400 block">Daily Streak</span>
              </div>
            </div>

            {/* Simulated Contribution Heatmap */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 mb-1.5 flex justify-between">
                <span>Contribution Grid</span>
                <span className="text-emerald-400">🔥 Active Streak</span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 36 }).map((_, i) => {
                  const intensity = [
                    'bg-slate-800',
                    'bg-emerald-950',
                    'bg-emerald-700',
                    'bg-emerald-500',
                    'bg-emerald-400',
                  ][(i * 7) % 5];
                  return (
                    <div
                      key={i}
                      className={`h-3 rounded-xs ${intensity}`}
                      title={`Active day`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Top Languages: <strong className="text-slate-200">Go, TypeScript, C++</strong></span>
              <span>{currentUser.projects.length} Public Repos</span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Experience / Internships Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Work Experience & Internships</h2>
          </div>
          <button
            onClick={() => {
              setExperienceToEdit(null);
              setIsExperienceModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-bold text-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Experience</span>
          </button>
        </div>

        {currentUser.experiences.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl">
            <p className="text-xs text-slate-500 mb-2">No work experiences added yet.</p>
            <button
              onClick={() => setIsExperienceModalOpen(true)}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              + Add your first internship or role
            </button>
          </div>
        ) : (
          <div className="space-y-6 divide-y divide-slate-100">
            {currentUser.experiences.map((exp) => (
              <div key={exp.id} className="pt-4 first:pt-0 group relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{exp.title}</h3>
                      <div className="text-xs font-semibold text-slate-700">
                        {exp.company} • <span className="text-indigo-600">{exp.type}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {exp.startDate} – {exp.endDate} • {exp.location}
                      </div>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {exp.description}
                      </p>

                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.skills.map((s, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setExperienceToEdit(exp);
                      setIsExperienceModalOpen(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Projects Showcase Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Featured Projects & Live Builds</h2>
          </div>
          <button
            onClick={() => {
              setProjectToEdit(null);
              setIsProjectModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-bold text-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUser.projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-4 hover:border-indigo-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {proj.imageUrl && (
                  <div className="h-32 rounded-xl overflow-hidden mb-3 bg-slate-200 relative">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {proj.featured && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-md shadow-sm">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {proj.title}
                  </h3>
                  <button
                    onClick={() => {
                      setProjectToEdit(proj);
                      setIsProjectModalOpen(true);
                    }}
                    className="text-slate-400 hover:text-indigo-600 p-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links Footer */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-200/60">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                )}
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Skills & Endorsements Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Technical Skills & Endorsements</h2>
          </div>
          <button
            onClick={() => setIsSkillModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-bold text-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap gap-1.5 mb-4 pb-2 border-b border-slate-100">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedSkillCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                selectedSkillCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between hover:bg-slate-100/80 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                  {skill.isTopSkill && (
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  )}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {skill.level} • {skill.category}
                </div>
              </div>

              {/* Endorse button */}
              <button
                onClick={() => endorseSkill(skill.id)}
                className="px-2 py-1 bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                title="Endorse this skill"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{skill.endorsements}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Education Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Education & Academics</h2>
          </div>
          <button
            onClick={() => {
              setEducationToEdit(null);
              setIsEducationModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-bold text-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Education</span>
          </button>
        </div>

        <div className="space-y-4 divide-y divide-slate-100">
          {currentUser.education.map((edu) => (
            <div key={edu.id} className="pt-4 first:pt-0 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{edu.institution}</h3>
                  <div className="text-xs font-semibold text-slate-700">
                    {edu.degree} in {edu.fieldOfStudy}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {edu.startYear} – {edu.endYear} {edu.grade && `• Grade: ${edu.grade}`}
                  </div>
                  {edu.description && (
                    <p className="text-xs text-slate-600 mt-1.5">{edu.description}</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setEducationToEdit(edu);
                  setIsEducationModalOpen(true);
                }}
                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Certifications & Achievements 2-Col Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Certifications */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Certifications</span>
            </h2>
            <button
              onClick={() => setIsCertificationModalOpen(true)}
              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {currentUser.certifications.map((cert) => (
              <div key={cert.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900">{cert.name}</h4>
                <div className="text-[11px] text-slate-600">{cert.issuer} • {cert.issueDate}</div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    <span>Show Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Honors & Achievements */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Honors & Awards</span>
            </h2>
            <button
              onClick={() => setIsAchievementModalOpen(true)}
              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {currentUser.achievements.map((ach) => (
              <div key={ach.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{ach.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md border border-purple-200">
                    {ach.category}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">{ach.issuer} • {ach.date}</div>
                <p className="text-xs text-slate-600 mt-1">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 10. Activity Stream */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-base font-bold text-slate-900 mb-4">Recent Activity & Articles</h2>
        
        {userPosts.length === 0 ? (
          <p className="text-xs text-slate-500">You have not published any posts yet.</p>
        ) : (
          <div className="space-y-4 divide-y divide-slate-100">
            {userPosts.map((post) => (
              <div key={post.id} className="pt-4 first:pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-900">Shared an update</span>
                  <span className="text-[11px] text-slate-400">• {post.timestamp}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold">
                    <ThumbsUp className="w-3.5 h-3.5 text-indigo-600" /> {post.likes} Likes
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" /> {post.comments.length} Comments
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL INJECTIONS */}
      <EditProfileHeaderModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
      />

      <ExperienceModal
        isOpen={isExperienceModalOpen}
        onClose={() => {
          setIsExperienceModalOpen(false);
          setExperienceToEdit(null);
        }}
        experienceToEdit={experienceToEdit}
      />

      <EducationModal
        isOpen={isEducationModalOpen}
        onClose={() => {
          setIsEducationModalOpen(false);
          setEducationToEdit(null);
        }}
        educationToEdit={educationToEdit}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setProjectToEdit(null);
        }}
        projectToEdit={projectToEdit}
      />

      <SkillModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
      />

      <CertificationModal
        isOpen={isCertificationModalOpen}
        onClose={() => setIsCertificationModalOpen(false)}
      />

      <AchievementModal
        isOpen={isAchievementModalOpen}
        onClose={() => setIsAchievementModalOpen(false)}
      />

      <SocialLinksModal
        isOpen={isSocialLinksModalOpen}
        onClose={() => setIsSocialLinksModalOpen(false)}
      />

      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <ShareProfileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

    </div>
  );
};
