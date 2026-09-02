import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillItem } from '../../types';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ isOpen, onClose }) => {
  const { addSkill, currentUser } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillItem['category']>('Languages');
  const [level, setLevel] = useState<SkillItem['level']>('Advanced');
  const [isTopSkill, setIsTopSkill] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSkill({
      name: name.trim(),
      category,
      level,
      isTopSkill,
    });
    setName('');
    onClose();
  };

  const quickSkillPresets = [
    { name: 'Go (Golang)', cat: 'Languages' as const },
    { name: 'GraphQL', cat: 'Backend' as const },
    { name: 'Next.js 15', cat: 'Frontend' as const },
    { name: 'Kubernetes', cat: 'DevOps & Cloud' as const },
    { name: 'Redis Caching', cat: 'Backend' as const },
    { name: 'Apache Kafka', cat: 'Backend' as const },
    { name: 'System Design', cat: 'DSA & Core' as const },
    { name: 'PyTorch', cat: 'AI & ML' as const },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Add Technical Skill</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Docker, Rust, C++, Graph Algorithms"
              className="w-full px-3.5 py-2 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
              >
                <option value="Languages">Languages</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Database">Database</option>
                <option value="AI & ML">AI & ML</option>
                <option value="DSA & Core">DSA & Core</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Proficiency Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isTopSkill}
                onChange={(e) => setIsTopSkill(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-md"
              />
              <span className="text-xs text-slate-700 font-medium">Highlight in Top Skills Header</span>
            </label>
          </div>

          {/* Quick presets */}
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>Suggested in high demand:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickSkillPresets.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setName(item.name);
                    setCategory(item.cat);
                  }}
                  className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-slate-700 transition-colors"
                >
                  + {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
