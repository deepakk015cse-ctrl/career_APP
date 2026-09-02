import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from './Navbar';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { MobileNav } from './MobileNav';
import { FeedView } from '../feed/FeedView';
import { ProfileView } from '../profile/ProfileView';
import { NetworkView } from '../network/NetworkView';
import { JobsView } from '../jobs/JobsView';
import { CodingArenaView } from '../coding/CodingArenaView';
import { NotificationsView } from '../notifications/NotificationsView';
import { DeveloperDashboardView } from '../dashboard/DeveloperDashboardView';
import { RecruiterPortalView } from '../recruiter/RecruiterPortalView';
import { AICareerAssistantView } from '../career-ai/AICareerAssistantView';
import { AdminDashboardView } from '../admin/AdminDashboardView';

export const AppShell: React.FC = () => {
  const { activeTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'career_ai':
        return <AICareerAssistantView />;
      case 'dashboard':
        return <DeveloperDashboardView />;
      case 'recruiter':
        return <RecruiterPortalView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'profile':
        return <ProfileView />;
      case 'network':
        return <NetworkView />;
      case 'jobs':
        return <JobsView />;
      case 'coding':
        return <CodingArenaView />;
      case 'notifications':
        return <NotificationsView />;
      case 'feed':
      default:
        return <FeedView />;
    }
  };

  // Determine if full-width or standard 3-column
  const isProfileTab = activeTab === 'profile';
  const isJobsTab = activeTab === 'jobs';
  const isCodingTab = activeTab === 'coding';
  const isNetworkTab = activeTab === 'network';
  const isDashboardTab = activeTab === 'dashboard';
  const isRecruiterTab = activeTab === 'recruiter';
  const isCareerAiTab = activeTab === 'career_ai';
  const isAdminTab = activeTab === 'admin';

  const showSidebars =
    !isProfileTab &&
    !isJobsTab &&
    !isCodingTab &&
    !isNetworkTab &&
    !isDashboardTab &&
    !isRecruiterTab &&
    !isCareerAiTab &&
    !isAdminTab;

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {showSidebars ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Sticky Sidebar) */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-20">
              <LeftSidebar />
            </aside>

            {/* Main Center Stream */}
            <section className="lg:col-span-6 w-full">
              {renderContent()}
            </section>

            {/* Right Column (Sticky Sidebar) */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-20">
              <RightSidebar />
            </aside>
          </div>
        ) : (
          <section className="w-full">
            {renderContent()}
          </section>
        )}
      </main>

      <MobileNav />
    </div>
  );
};
