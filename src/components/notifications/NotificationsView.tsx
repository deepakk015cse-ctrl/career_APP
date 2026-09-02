import React from 'react';
import {
  Bell,
  ThumbsUp,
  MessageSquare,
  Award,
  Briefcase,
  UserPlus,
  CheckCircle2,
  Sparkles,
  CheckCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, acceptConnectionRequest, rejectConnectionRequest } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'connection_request':
        return <UserPlus className="w-4 h-4 text-amber-600" />;
      case 'connection_accepted':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'like':
        return <ThumbsUp className="w-4 h-4 text-indigo-600" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'job_match':
        return <Briefcase className="w-4 h-4 text-purple-600" />;
      case 'milestone':
        return <Award className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-16">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            <span>Notifications & Activity Alerts</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stay updated with peer endorsements, recruiter views, and community interactions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200">
            {unreadCount} Unread
          </span>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No notifications at this time.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-4 sm:p-5 flex items-start gap-3.5 transition-colors cursor-pointer ${
                !n.isRead ? 'bg-indigo-50/40 hover:bg-indigo-50/60' : 'hover:bg-slate-50'
              }`}
            >
              {/* Icon Container or Sender Avatar */}
              <div className="relative shrink-0 mt-0.5">
                <img
                  src={n.sender.avatar}
                  alt={n.sender.name}
                  className="w-10 h-10 rounded-2xl object-cover ring-1 ring-slate-200"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                  {getIcon(n.type)}
                </div>
              </div>

              {/* Text Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{n.sender.name}</h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.content}</p>

                {/* Connection Request Action Buttons */}
                {n.actionRequired && (
                  <div className="flex items-center gap-2 mt-3 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        acceptConnectionRequest(n.sender.name);
                      }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-2xs"
                    >
                      Accept Connection
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        rejectConnectionRequest(n.sender.name);
                      }}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>

              {!n.isRead && (
                <div className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};
