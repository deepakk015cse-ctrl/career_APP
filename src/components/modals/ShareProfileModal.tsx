import React, { useState } from 'react';
import { X, Copy, Check, Share2, Globe, QrCode, Linkedin, Twitter, Github } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ShareProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const profileUrl = `https://devnexus.io/in/${currentUser.fullName.toLowerCase().replace(/\s+/g, '-')}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-600" />
            <span>Share Developer Profile</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Mini Card Preview */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-400"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{currentUser.fullName}</h4>
              <p className="text-[10px] text-slate-300 truncate">{currentUser.headline}</p>
              <div className="mt-1 flex items-center gap-2 text-[9px] text-indigo-300 font-mono">
                <span>{currentUser.codingStats.leetCodeSolved} LeetCode Solved</span>
                <span>•</span>
                <span>{currentUser.projects.length} Projects</span>
              </div>
            </div>
          </div>

          {/* Copy Link Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Public Profile Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={profileUrl}
                className="flex-1 px-3 py-2 bg-slate-50 text-xs text-slate-700 rounded-xl border border-slate-200 font-mono outline-hidden"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Share on Channels */}
          <div>
            <div className="text-xs font-semibold text-slate-600 mb-2">Share directly to:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex flex-col items-center justify-center text-xs font-semibold text-slate-700 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-blue-600 mb-1" />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex flex-col items-center justify-center text-xs font-semibold text-slate-700 transition-colors"
              >
                <Twitter className="w-5 h-5 text-sky-500 mb-1" />
                <span>X / Twitter</span>
              </button>
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex flex-col items-center justify-center text-xs font-semibold text-slate-700 transition-colors"
              >
                <Globe className="w-5 h-5 text-emerald-600 mb-1" />
                <span>Portfolio</span>
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
