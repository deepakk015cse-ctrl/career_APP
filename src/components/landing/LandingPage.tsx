import React from 'react';
import {
  Code2,
  Users,
  Briefcase,
  FolderGit2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Flame,
  Award,
  ShieldCheck,
  Zap,
  Terminal,
  ChevronRight,
  TrendingUp,
  Github,
  Globe,
  Compass,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <Code2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900">DevNexus</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">PRO</span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#identity" className="hover:text-indigo-600 transition-colors">Developer Identity</a>
            <a href="#projects" className="hover:text-indigo-600 transition-colors">Project Showcase</a>
            <a href="#jobs" className="hover:text-indigo-600 transition-colors">Jobs & Internships</a>
            <a href="#coding" className="hover:text-indigo-600 transition-colors">Coding Arena</a>
            <a href="#network" className="hover:text-indigo-600 transition-colors">Network</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              id="landing-signin-btn"
              onClick={() => setCurrentView('login')}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Sign In
            </button>
            <button
              id="landing-getstarted-btn"
              onClick={() => setCurrentView('signup')}
              className="px-4.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 text-white rounded-full text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>The Next-Gen Career & Developer Network</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Where Developers <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-slate-800 to-indigo-900">
                Code, Connect & Get Hired.
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              DevNexus merges professional networking, GitHub repositories, live LeetCode milestones, verified tech internships, and AI career guidance into a single unified platform.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setCurrentView('signup')}
                className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Free Developer Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 text-sm font-bold rounded-2xl border border-slate-300 shadow-2xs transition-colors"
              >
                Explore Live Platform Demo
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> GitHub & LeetCode sync
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free for students & devs
              </span>
            </div>
          </div>

          {/* Interactive UI Preview Showcase Card */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-4 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-xs text-slate-400">devnexus.app/workspace</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">
                ● Live Workspace Simulation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Profile Card Mock */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                    alt="Arjun Sharma"
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-600"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      Arjun Sharma
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <div className="text-[10px] text-slate-500">NIT Trichy CSE '25</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-600">LeetCode Solved</span>
                    <span className="font-mono font-bold text-slate-900">764 (Knight)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-600">GitHub Commits</span>
                    <span className="font-mono font-bold text-slate-900">1,420 (2025)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-600">Profile Match Score</span>
                    <span className="font-bold text-emerald-600">96% (Uber SDE)</span>
                  </div>
                </div>
              </div>

              {/* Feed Card Mock */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 md:col-span-2 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                      alt="Priya"
                      className="w-7 h-7 rounded-lg object-cover"
                    />
                    <span className="font-bold text-slate-900">Priya Nambiar • Senior SDE @ Microsoft</span>
                  </div>
                  <span className="text-[10px] text-slate-400">2h ago</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  Published a detailed analysis on Write-Ahead Logging (WAL) and Raft Leader Election consensus. Check out the snippet below:
                </p>

                <div className="p-2.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] overflow-x-auto">
                  <code>atomic.CompareAndSwapInt64(&tb.lastTime, last, now)</code>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                  <span>❤️ 342 Likes</span>
                  <span>💬 48 Comments</span>
                  <span>🚀 18 Shares</span>
                </div>
              </div>

            </div>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-14 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
              Empowering engineers from world-class institutes & companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all">
              <span className="text-sm font-bold text-slate-700">NIT Trichy</span>
              <span className="text-sm font-bold text-slate-700">IIT Kharagpur</span>
              <span className="text-sm font-bold text-slate-700">BITS Pilani</span>
              <span className="text-sm font-bold text-slate-700">Microsoft</span>
              <span className="text-sm font-bold text-slate-700">Google Cloud</span>
              <span className="text-sm font-bold text-slate-700">Uber</span>
              <span className="text-sm font-bold text-slate-700">Razorpay</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Platform Pillars */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Complete Feature Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Engineered Specifically for Tech Careers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Unlike generic business networks, DevNexus is built ground-up for code repositories, data structures, and tech recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div id="identity" className="p-6 bg-slate-50 hover:bg-slate-100/80 rounded-3xl border border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-xs">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                1. Build Your Developer Identity
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your GitHub commits, LeetCode contest rating, project repository links, certifications, and academic background in one unified portfolio.
              </p>
            </div>

            {/* Feature 2 */}
            <div id="projects" className="p-6 bg-slate-50 hover:bg-slate-100/80 rounded-3xl border border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-xs">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-emerald-600 transition-colors">
                2. Showcase Real Projects & Code
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Publish live demos, architectural diagrams, GitHub repository metrics, and code snippets directly on your feed and portfolio.
              </p>
            </div>

            {/* Feature 3 */}
            <div id="jobs" className="p-6 bg-slate-50 hover:bg-slate-100/80 rounded-3xl border border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                3. Discover Jobs & Internships
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter verified software engineering roles, summer internships, and remote developer opportunities with 1-click Easy Apply.
              </p>
            </div>

            {/* Feature 4 */}
            <div id="coding" className="p-6 bg-slate-50 hover:bg-slate-100/80 rounded-3xl border border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-xs">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-amber-600 transition-colors">
                4. Practice in the Coding Arena
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track daily DSA streaks, practice curated problem roadmaps (Blind 75, Striver SDE sheet), and celebrate milestone achievements.
              </p>
            </div>

            {/* Feature 5 */}
            <div id="network" className="p-6 bg-slate-50 hover:bg-slate-100/80 rounded-3xl border border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-4 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-purple-600 transition-colors">
                5. Connect with Tech Professionals
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Network with fellow students, senior engineers, open-source maintainers, and tech recruiters hiring at top companies.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-slate-50 hover:bg-slate-100/80 rounded-3xl border border-slate-200 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4 shadow-xs">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                6. AI-Powered Career Guidance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive automated resume strength audits, job skill alignment scores, and interview prep suggestions powered by Gemini models.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to accelerate your developer career?
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
            Join thousands of students and engineers showcasing real code, cracking DSA, and landing dream roles today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('signup')}
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Account – It's Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('login')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-2xl border border-slate-700 transition-colors"
            >
              Sign In to Existing Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <Code2 className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-bold text-slate-900 text-sm">DevNexus Pro</span>
            <span className="text-xs text-slate-400 ml-2">© 2026 DevNexus Technologies Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#identity" className="hover:text-indigo-600">Privacy</a>
            <a href="#projects" className="hover:text-indigo-600">Terms</a>
            <a href="#jobs" className="hover:text-indigo-600">Community Guidelines</a>
            <a href="#network" className="hover:text-indigo-600">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
