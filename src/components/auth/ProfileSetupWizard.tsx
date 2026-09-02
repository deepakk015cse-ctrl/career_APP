import React, { useState } from 'react';
import {
  Code2,
  Camera,
  MapPin,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  X,
  Github,
  Linkedin,
  FileText,
  User,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillItem } from '../../types';

const defaultAvatarPresets = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
];

const popularSkills = [
  'JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Python', 'Java', 'C++',
  'Data Structures', 'Algorithms', 'SQL', 'PostgreSQL', 'Docker', 'AWS',
  'Tailwind CSS', 'Next.js', 'System Design', 'Git & GitHub', 'Machine Learning'
];

export const ProfileSetupWizard: React.FC = () => {
  const { currentUser, finishProfileSetup } = useApp();

  const [step, setStep] = useState(1);

  // Step 1: Basic Identity
  const [avatar, setAvatar] = useState(currentUser.avatar || defaultAvatarPresets[0]);
  const [fullName, setFullName] = useState(currentUser.fullName || '');
  const [headline, setHeadline] = useState(
    currentUser.headline || 'Full Stack Engineer | CS Student | Open for Opportunities'
  );
  const [location, setLocation] = useState(currentUser.location || 'Bengaluru, Karnataka, India');
  const [bio, setBio] = useState(
    currentUser.bio || 'Software engineer passionate about building scalable web applications, distributed systems, and mastering algorithms.'
  );

  // Step 2: Education & College
  const [institution, setInstitution] = useState('National Institute of Technology (NIT)');
  const [degree, setDegree] = useState('Bachelor of Technology (B.Tech)');
  const [fieldOfStudy, setFieldOfStudy] = useState('Computer Science and Engineering');
  const [startYear, setStartYear] = useState('2021');
  const [endYear, setEndYear] = useState('2025');

  // Step 3: Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'TypeScript', 'React.js', 'Node.js', 'Data Structures', 'Python', 'SQL'
  ]);
  const [customSkillInput, setCustomSkillInput] = useState('');

  // Step 4: Developer Links
  const [github, setGithub] = useState('https://github.com/developer');
  const [leetcode, setLeetcode] = useState('https://leetcode.com/code_master');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/developer-swe');
  const [portfolio, setPortfolio] = useState('');

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkillInput.trim() && !selectedSkills.includes(customSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, customSkillInput.trim()]);
      setCustomSkillInput('');
    }
  };

  const handleComplete = () => {
    const skillsList: SkillItem[] = selectedSkills.map((name, i) => ({
      id: `skill-init-${i}`,
      name,
      category: 'Languages',
      level: 'Intermediate',
      endorsements: 1,
      isTopSkill: i < 3,
    }));

    finishProfileSetup({
      avatar,
      fullName,
      headline,
      location,
      bio,
      collegeOrCompany: `${institution} / ${degree}`,
      education: [
        {
          id: `edu-${Date.now()}`,
          institution,
          degree,
          fieldOfStudy,
          startYear,
          endYear,
          grade: '8.8 CGPA',
        },
      ],
      skills: skillsList,
      socialLinks: {
        github,
        leetcode,
        linkedin,
        portfolio,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Header with Step Tracker */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile Onboarding Wizard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Build your professional identity
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Let's setup your developer profile so recruiters and peers can find your work.
          </p>

          {/* Stepper Progress Bar */}
          <div className="mt-6 flex items-center justify-between max-w-md mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
            <div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-indigo-600 transition-all duration-300 -z-0"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[
              { num: 1, label: 'Basic Info' },
              { num: 2, label: 'Education' },
              { num: 3, label: 'Skills' },
              { num: 4, label: 'Links' },
            ].map((s) => {
              const isDone = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center bg-slate-50 px-2 relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-xs'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-[10px] font-semibold mt-1.5 ${
                      isCurrent ? 'text-indigo-600' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
          
          {/* STEP 1: Basic Identity */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 1: Personal & Professional Headline</h3>
                <p className="text-xs text-slate-500">Pick a profile picture and write how you want to be discovered.</p>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Profile Photo</label>
                <div className="flex flex-wrap items-center gap-3">
                  <img
                    src={avatar}
                    alt="Selected avatar"
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-600 shadow-sm"
                  />
                  <div className="flex flex-wrap gap-2">
                    {defaultAvatarPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatar(preset)}
                        className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                          avatar === preset ? 'border-indigo-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={preset} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bengaluru, India"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline *</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Full Stack Developer | Solved 500+ LeetCode | Open to Work"
                  className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
                />
                <p className="text-[11px] text-slate-400 mt-1">Recruiters see this under your name in search results.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Bio / About *</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Summarize your engineering interests, key projects, and career goals..."
                  className="w-full px-3.5 py-2 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* STEP 2: College & Academic Background */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 2: Education & Academic Details</h3>
                <p className="text-xs text-slate-500">Provide your college or highest degree for university network matching.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College / University *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. National Institute of Technology, Tiruchirappalli"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Degree *</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Tech / B.E. / M.S."
                    className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch / Major *</label>
                  <input
                    type="text"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Year</label>
                  <input
                    type="text"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    placeholder="e.g. 2021"
                    className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year *</label>
                  <input
                    type="text"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    placeholder="e.g. 2025"
                    className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Core Skills */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 3: Core Technical Skills</h3>
                <p className="text-xs text-slate-500">Select skills you use most often for accurate job and peer recommendations.</p>
              </div>

              {/* Add custom skill input */}
              <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  placeholder="Type a skill (e.g. GraphQL, Kubernetes, Go)..."
                  className="flex-1 px-3.5 py-2 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>

              {/* Popular Skill Badges */}
              <div>
                <div className="text-xs font-semibold text-slate-600 mb-2">Tap to toggle skills ({selectedSkills.length} selected):</div>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map((s) => {
                    const isSelected = selectedSkills.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSkill(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{s}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Developer Links */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 4: Social & Developer Profiles</h3>
                <p className="text-xs text-slate-500">Connect your GitHub, LeetCode, and LinkedIn to showcase real engineering activity.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile URL</label>
                  <div className="relative">
                    <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                    <input
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/your-handle"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LeetCode Profile URL</label>
                  <div className="relative">
                    <Code2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
                    <input
                      type="url"
                      value={leetcode}
                      onChange={(e) => setLeetcode(e.target.value)}
                      placeholder="https://leetcode.com/your-handle"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/your-handle"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Personal Portfolio / Website</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                    <input
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="https://yourportfolio.dev"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Skip for now
              </button>
            )}

            <div className="flex items-center gap-3">
              {step < 4 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Skip step
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Complete Setup & Launch Workspace</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
