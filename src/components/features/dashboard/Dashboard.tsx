import React from 'react';
import { DashboardProps } from './types';
import { useDashboardState } from './hooks/useDashboardState';
import { useTranslation } from '../../../hooks/useTranslation';

/**
 * Dashboard - Main Container
 * 
 * Professional refactored dashboard with:
 * - Separated concerns
 * - Custom hooks for state management
 * - Reusable components
 * - Type-safe implementation
 * - 3D Shadow Design System
 * - Multi-language support (UZ, RU, EN)
 */
const Dashboard: React.FC<DashboardProps> = (props) => {
  const {
    user,
    studentsData,
    highlights,
    allUsers,
    onRemoveStudent,
    onUpdateProfile,
    onUpdateStudent,
    onAddProgress,
    onAddHighlight,
    onRemoveHighlight,
    activeSeasonId,
    seasons,
    notifications = [],
    onMarkRead,
    onMarkAllRead,
    onAssignStudent,
    onUnassignStudent,
    onlineUsers,
    isDataSaving,
    isLoading
  } = props;

  const state = useDashboardState(user, activeSeasonId);
  const { t } = useTranslation('dashboard');

  return (
    <section id="dashboard" className="py-10 md:py-20 bg-[#0a0a0c] min-h-screen">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-10">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex gap-4 justify-center flex-wrap">
            {(['panel', 'profile', 'notifications'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => state.handleTabChange(tab)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  state.activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
                style={
                  state.activeTab === tab
                    ? {
                        border: '2px solid rgb(79, 70, 229)',
                        boxShadow: '3px 3px 0px 0px rgb(168, 85, 247)',
                      }
                    : {
                        border: '2px solid rgb(79, 70, 229)',
                        boxShadow: '2px 2px 0px 0px rgb(168, 85, 247)',
                      }
                }
              >
                {t(`tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in duration-500">
          {state.activeTab === 'panel' && (
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {t('panel.title')}
              </h2>
              <p className="text-slate-400 text-lg">{t('messages.loading')}</p>
            </div>
          )}

          {state.activeTab === 'profile' && (
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {t('profile.title')}
              </h2>
              <p className="text-slate-400 text-lg">{t('messages.loading')}</p>
            </div>
          )}

          {state.activeTab === 'notifications' && (
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {t('notifications.title')}
              </h2>
              <p className="text-slate-400 text-lg">{t('messages.loading')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
