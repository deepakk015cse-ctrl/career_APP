import React, { useState } from 'react';
import {
  X,
  Code2,
  FolderGit2,
  Award,
  Image,
  Sparkles,
  Terminal,
  Send,
  Plus,
  Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostItem } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: PostItem['type'];
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  initialType = 'general',
}) => {
  const { currentUser, createPost } = useApp();

  const [postType, setPostType] = useState<PostItem['type']>(initialType);
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Developers', 'Tech']);
  const [mediaUrl, setMediaUrl] = useState('');

  // Code Snippet fields
  const [codeSnippetLang, setCodeSnippetLang] = useState('typescript');
  const [codeSnippetCode, setCodeSnippetCode] = useState('');

  // Project Share fields
  const [projTitle, setProjTitle] = useState('');
  const [projSummary, setProjSummary] = useState('');
  const [projStack, setProjStack] = useState('Go, React, Docker');
  const [projGithub, setProjGithub] = useState('https://github.com/username/project');
  const [projLive, setProjLive] = useState('https://project.devnexus.app');

  // Milestone fields
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneBadge, setMilestoneBadge] = useState('LeetCode Guardian Badge (2200+ Rating)');
  const [milestonePlatform, setMilestonePlatform] = useState('LeetCode Contests');

  if (!isOpen) return null;

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const cleanTag = tagInput.trim().replace(/^#/, '');
      setTags([...tags, cleanTag]);
      setTagInput('');
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter(tag => tag !== t));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && postType === 'general') return;

    let projectData = undefined;
    if (postType === 'project' && projTitle.trim()) {
      projectData = {
        title: projTitle.trim(),
        summary: projSummary.trim() || content.trim(),
        techStack: projStack.split(',').map(s => s.trim()).filter(Boolean),
        githubUrl: projGithub.trim() || undefined,
        liveUrl: projLive.trim() || undefined,
      };
    }

    let milestoneData = undefined;
    if (postType === 'milestone') {
      milestoneData = {
        title: milestoneTitle.trim() || 'Milestone Achieved',
        badgeName: milestoneBadge.trim(),
        platform: milestonePlatform.trim(),
      };
    }

    let codeSnippet = undefined;
    if (postType === 'coding' && codeSnippetCode.trim()) {
      codeSnippet = {
        language: codeSnippetLang,
        code: codeSnippetCode.trim(),
      };
    }

    createPost({
      content: content.trim() || (projectData ? projectData.summary : 'Milestone celebration post!'),
      type: postType,
      tags: tags.length ? tags : ['DeveloperNetwork'],
      mediaUrl: mediaUrl.trim() || undefined,
      codeSnippet,
      projectData,
      milestoneData,
    });

    // Reset
    setContent('');
    setCodeSnippetCode('');
    setProjTitle('');
    setMilestoneTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900">{currentUser.fullName}</h3>
              <p className="text-[11px] text-slate-500 font-medium">Post to Developer Feed • Public</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Type Selector Tabs */}
        <div className="px-6 pt-3 flex items-center gap-2 border-b border-slate-100 overflow-x-auto pb-2">
          {[
            { id: 'general', label: 'General Post', icon: <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> },
            { id: 'project', label: 'Project Showcase', icon: <FolderGit2 className="w-3.5 h-3.5 text-emerald-500" /> },
            { id: 'coding', label: 'Code Snippet / DSA', icon: <Code2 className="w-3.5 h-3.5 text-amber-500" /> },
            { id: 'milestone', label: 'Milestone / Badge', icon: <Award className="w-3.5 h-3.5 text-purple-500" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPostType(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                postType === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Body Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Main Content Textarea */}
          <div>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                postType === 'project'
                  ? 'Tell the community about what you built, technical challenges faced, benchmarks, and architecture...'
                  : postType === 'coding'
                  ? 'Share an algorithmic insight, time complexity analysis, or interview takeaway...'
                  : postType === 'milestone'
                  ? 'Celebrate your milestone! What did you learn along the way?'
                  : 'What are you working on or thinking about in tech today?'
              }
              className="w-full text-sm text-slate-900 placeholder:text-slate-400 border-none outline-hidden resize-none leading-relaxed"
            />
          </div>

          {/* Conditional Sub-forms */}
          
          {/* 1. Code Snippet Sub-form */}
          {postType === 'coding' && (
            <div className="p-4 bg-slate-900 rounded-2xl space-y-2.5 text-white">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>Code Snippet Editor</span>
                </span>
                <select
                  value={codeSnippetLang}
                  onChange={(e) => setCodeSnippetLang(e.target.value)}
                  className="bg-slate-800 text-white text-xs px-2 py-1 rounded-lg border border-slate-700 outline-hidden font-mono"
                >
                  <option value="typescript">TypeScript</option>
                  <option value="javascript">JavaScript</option>
                  <option value="go">Go</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="sql">SQL</option>
                </select>
              </div>

              <textarea
                rows={6}
                value={codeSnippetCode}
                onChange={(e) => setCodeSnippetCode(e.target.value)}
                placeholder={`// Enter your ${codeSnippetLang} code snippet here...\nfunction solve(nums: number[]): number {\n  // Implementation\n}`}
                className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-slate-800 outline-hidden resize-none leading-relaxed"
              />
            </div>
          )}

          {/* 2. Project Share Sub-form */}
          {postType === 'project' && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-emerald-600" />
                <span>Attached Project Meta</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g. Distributed In-Memory Cache"
                  className="w-full px-3 py-1.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 outline-hidden font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={projGithub}
                    onChange={(e) => setProjGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-1.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 outline-hidden font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={projLive}
                    onChange={(e) => setProjLive(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 outline-hidden font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tech Stack</label>
                <input
                  type="text"
                  value={projStack}
                  onChange={(e) => setProjStack(e.target.value)}
                  placeholder="e.g. Go, Redis, Docker, React"
                  className="w-full px-3 py-1.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 outline-hidden font-mono text-[11px]"
                />
              </div>
            </div>
          )}

          {/* 3. Milestone Sub-form */}
          {postType === 'milestone' && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Milestone Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Milestone Headline</label>
                  <input
                    type="text"
                    value={milestoneTitle}
                    onChange={(e) => setMilestoneTitle(e.target.value)}
                    placeholder="e.g. Crossed 750+ Solved & Knight Rank!"
                    className="w-full px-3 py-1.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Badge or Platform</label>
                  <input
                    type="text"
                    value={milestoneBadge}
                    onChange={(e) => setMilestoneBadge(e.target.value)}
                    placeholder="e.g. LeetCode Knight Badge (1985 Rating)"
                    className="w-full px-3 py-1.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 outline-hidden font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Media Attachment URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Media / Image URL (Optional)
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  <span>#{t}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag (e.g. Web3, Golang, DSA)..."
                className="flex-1 px-3 py-1.5 bg-slate-50 text-xs text-slate-900 rounded-xl border border-slate-200 outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                + Tag
              </button>
            </div>
          </div>

          {/* Footer controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-[11px] text-slate-400">
              Press Post to share with your developer network.
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
