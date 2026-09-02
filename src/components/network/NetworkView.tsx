import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Check,
  Search,
  Building,
  GraduationCap,
  Sparkles,
  MapPin,
  Code2,
  Filter,
  UserCheck,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NetworkView: React.FC = () => {
  const {
    connections,
    sendConnectionRequest,
    toggleFollow,
    removeConnection,
    currentUser,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');

  const filteredConnections = connections.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.collegeOrCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedRoleFilter === 'All') return matchesSearch;
    if (selectedRoleFilter === 'Connected') return matchesSearch && u.isConnected;
    if (selectedRoleFilter === 'Students') return matchesSearch && u.userType === 'Student';
    if (selectedRoleFilter === 'Recruiters') return matchesSearch && u.userType === 'Recruiter';
    return matchesSearch;
  });

  const connectedCount = connections.filter(c => c.isConnected).length;
  const pendingCount = connections.filter(c => c.isPending).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Developer Graph & University Network</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Expand your engineering network
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Connect with fellow university peers, open-source maintainers, mentors, and tech recruiters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-base font-bold text-slate-900 font-mono block">
                {currentUser.connectionsCount + connectedCount}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Connections</span>
            </div>
            <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-base font-bold text-indigo-600 font-mono block">{pendingCount}</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Pending</span>
            </div>
          </div>
        </div>

        {/* Search & Filter bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, university, or tech stack (e.g. Go, Distributed Systems)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'Connected', 'Students', 'Recruiters'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedRoleFilter(filter)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedRoleFilter === filter
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Peers Grid */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <span>Engineers from your institute & tech circle ({filteredConnections.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConnections.map((peer) => {
            return (
              <div
                key={peer.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-slate-900 truncate">
                          {peer.name}
                        </h3>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                          {peer.userType}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight mt-0.5">
                        {peer.headline}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5 truncate">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{peer.collegeOrCompany}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{peer.location}</span>
                    </div>
                    {peer.mutualConnections > 0 && (
                      <div className="flex items-center gap-1.5 text-indigo-600 font-semibold">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span>{peer.mutualConnections} mutual connections</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {peer.skills.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connect / Follow Action */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  {peer.isConnected ? (
                    <button
                      onClick={() => removeConnection(peer.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Connected</span>
                    </button>
                  ) : peer.isPending ? (
                    <button
                      disabled
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-500 flex items-center justify-center gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Pending</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => sendConnectionRequest(peer.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Connect</span>
                    </button>
                  )}

                  <button
                    onClick={() => toggleFollow(peer.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                      peer.isFollowing
                        ? 'bg-slate-100 border-slate-200 text-slate-700'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {peer.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
