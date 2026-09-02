import React from 'react';
import {
  Home,
  Users,
  Briefcase,
  Code2,
  Bell,
  User,
  PlusCircle,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { useApp, AppTab } from '../../context/AppContext';

export const MobileNav: React.FC<{ onOpenCreatePost?: () => void }> = ({ onOpenCreatePost }) => {
  const { activeTab, setActiveTab, notifications, currentUser, devScoreReport } = useApp();
  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  const tabs: { id: AppTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'feed', label: 'Feed', icon: <Home className="w-5 h-5" /> },
    { id: 'career_ai', label: 'AI Advisor', icon: <Sparkles className="w-5 h-5 text-cyan-500" /> },
    { id: 'dashboard', label: 'Dev Hub', icon: <Trophy className="w-5 h-5 text-amber-500" /> },
    { id: 'coding', label: 'Arena', icon: <Code2 className="w-5 h-5" /> },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
      {tabs.slice(0, 3).map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-medium transition-colors ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="mt-0.5">{tab.label}</span>
          </button>
        );
      })}

      {/* Floating Create Button for mobile */}
      {onOpenCreatePost && (
        <button
          onClick={onOpenCreatePost}
          className="flex flex-col items-center justify-center p-1 -mt-5 bg-indigo-600 text-white rounded-full w-11 h-11 shadow-md hover:bg-indigo-700 transition-colors"
          title="Create Post or Milestone"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      )}

      {tabs.slice(3).map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-medium transition-colors ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
