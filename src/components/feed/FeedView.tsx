import React, { useState } from 'react';
import {
  Sparkles,
  FolderGit2,
  Code2,
  Award,
  Image,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  ExternalLink,
  Github,
  Send,
  MoreHorizontal,
  Copy,
  Check,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostItem } from '../../types';
import { CreatePostModal } from '../modals/CreatePostModal';

export const FeedView: React.FC = () => {
  const {
    currentUser,
    posts,
    likePost,
    addComment,
    sharePost,
    toggleSavePost,
    toggleFollow,
    connections,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'project' | 'coding' | 'milestone' | 'following'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalInitialType, setCreateModalInitialType] = useState<PostItem['type']>('general');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleOpenCreateModal = (type: PostItem['type']) => {
    setCreateModalInitialType(type);
    setIsCreateModalOpen(true);
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (commentText && commentText.trim()) {
      addComment(postId, commentText.trim());
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'following') {
      const conn = connections.find(c => c.name === post.author.name || c.id === post.author.id);
      return conn ? conn.isFollowing || conn.isConnected : false;
    }
    return post.type === activeFilter;
  });

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-16">
      
      {/* 1. Create Post Widget Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="w-11 h-11 rounded-2xl object-cover ring-2 ring-indigo-50"
          />
          <button
            onClick={() => handleOpenCreateModal('general')}
            className="flex-1 text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-500 rounded-2xl border border-slate-200/80 transition-colors"
          >
            Share a project build, code breakdown, or engineering question...
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => handleOpenCreateModal('project')}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl font-semibold transition-colors"
          >
            <FolderGit2 className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Showcase</span> Project
          </button>

          <button
            onClick={() => handleOpenCreateModal('coding')}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl font-semibold transition-colors"
          >
            <Code2 className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Code</span> Snippet
          </button>

          <button
            onClick={() => handleOpenCreateModal('milestone')}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl font-semibold transition-colors"
          >
            <Award className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Share</span> Milestone
          </button>

          <button
            onClick={() => handleOpenCreateModal('general')}
            className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Post</span>
          </button>
        </div>
      </div>

      {/* 2. Feed Topic Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Updates' },
          { id: 'project', label: '🚀 Project Builds' },
          { id: 'coding', label: '⚡ Code & DSA' },
          { id: 'milestone', label: '🏆 Milestones' },
          { id: 'following', label: '👥 Following' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeFilter === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Feed Posts Stream */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No updates in this filter</h3>
            <p className="text-xs text-slate-500 mt-1">Be the first to publish a post to the developer community.</p>
            <button
              onClick={() => handleOpenCreateModal('general')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
            >
              Create Post
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isSaved = post.isSaved;
            const isCommentsOpen = activeCommentPostId === post.id;
            const matchedConn = connections.find(c => c.name === post.author.name || c.id === post.author.id);
            const isFollowing = matchedConn?.isFollowing;

            return (
              <article
                key={post.id}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4 transition-all"
              >
                {/* Author Info Bar */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-11 h-11 rounded-2xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs font-bold text-slate-900">{post.author.name}</h4>
                        {post.author.isVerified && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{post.author.headline}</p>
                      <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                    </div>
                  </div>

                  {post.author.id !== currentUser.id && matchedConn && (
                    <button
                      onClick={() => toggleFollow(matchedConn.id)}
                      className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors ${
                        isFollowing
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                      }`}
                    >
                      {isFollowing ? 'Following' : '+ Follow'}
                    </button>
                  )}
                </div>

                {/* Post Content */}
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Code Snippet Box (If coding post) */}
                {post.codeSnippet && (
                  <div className="rounded-2xl bg-slate-950 text-slate-200 overflow-hidden border border-slate-800 shadow-md">
                    <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-mono text-[11px] text-slate-400 uppercase font-bold">
                          {post.codeSnippet.language}
                        </span>
                      </div>
                      <button
                        onClick={() => copyCode(post.codeSnippet!.code, post.id)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded-md hover:bg-slate-800 transition-colors"
                      >
                        {copiedCodeId === post.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono overflow-x-auto text-emerald-300 leading-relaxed">
                      <code>{post.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Project Showcase Meta Card (If project post) */}
                {post.projectData && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-xs font-bold text-slate-900">{post.projectData.title}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {post.projectData.summary}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {post.projectData.techStack.map((tech, i) => (
                        <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                      {post.projectData.githubUrl && (
                        <a
                          href={post.projectData.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-indigo-600"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>View Repository</span>
                        </a>
                      )}
                      {post.projectData.liveUrl && (
                        <a
                          href={post.projectData.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Try Live Build</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Milestone Banner (If milestone post) */}
                {post.milestoneData && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border border-purple-200 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-purple-950">{post.milestoneData.title}</h4>
                      <p className="text-[11px] font-semibold text-purple-800 mt-0.5">{post.milestoneData.badgeName}</p>
                      <span className="text-[10px] text-purple-600 font-medium">Verified on {post.milestoneData.platform}</span>
                    </div>
                  </div>
                )}

                {/* Media Image */}
                {post.mediaUrl && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-96">
                    <img src={post.mediaUrl} alt="Post attachment" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t, idx) => (
                      <span key={idx} className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Engagement Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => likePost(post.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-colors ${
                        post.isLiked
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-indigo-600' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() => setActiveCommentPostId(isCommentsOpen ? null : post.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 font-semibold text-slate-600 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments.length}</span>
                    </button>

                    <button
                      onClick={() => {
                        sharePost(post.id);
                        navigator.clipboard?.writeText(window.location.href);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 font-semibold text-slate-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Share ({post.shares})</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toggleSavePost(post.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      isSaved ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:bg-slate-100'
                    }`}
                    title={isSaved ? 'Saved to bookmarks' : 'Save post'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-600' : ''}`} />
                  </button>
                </div>

                {/* Expandable Comments Drawer */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                    
                    {/* Add Comment Input */}
                    <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex gap-2">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.fullName}
                        className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200 mt-0.5"
                      />
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                        }
                        placeholder="Add a constructive insight or comment..."
                        className="flex-1 px-3.5 py-1.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>

                    {/* Existing Comments List */}
                    <div className="space-y-2.5 pt-2">
                      {post.comments.map((c) => (
                        <div key={c.id} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-2xl">
                          <img
                            src={c.author.avatar}
                            alt={c.author.name}
                            className="w-7 h-7 rounded-xl object-cover mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">{c.author.name}</span>
                              <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialType={createModalInitialType}
      />

    </div>
  );
};
