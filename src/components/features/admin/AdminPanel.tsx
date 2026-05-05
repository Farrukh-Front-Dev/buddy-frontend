import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Zap, ShieldAlert } from 'lucide-react';
import { UserData, StudentProgress, Season, Notification } from '../../../types';
import AdminHeader from './components/AdminHeader';
import AdminNavigation from './components/AdminNavigation';
import StatsTab from './tabs/StatsTab';
import MonitoringTab from './tabs/MonitoringTab';
import UsersTab from './tabs/UsersTab';
import RequestsTab from './tabs/RequestsTab';
import SeasonsTab from './tabs/SeasonsTab';
import MessagesTab from './tabs/MessagesTab';
import SettingsTab from './tabs/SettingsTab';

interface AdminPanelProps {
  user: UserData | null;
  allUsers: UserData[];
  allProgress: StudentProgress[];
  onDeleteUser: (userId: string) => void;
  onChangeRole: (userId: string, newRole: 'student' | 'curator' | 'admin') => void;
  onUpdateProgress: (progress: StudentProgress) => void;
  onApproveUser: (userId: string) => void;
  onChangeStatus?: (userId: string, status: 'active' | 'inactive' | 'pending') => void;
  isRegistrationOpen: boolean;
  onToggleRegistration: () => void;
  isCuratorRegistrationOpen: boolean;
  onToggleCuratorRegistration: () => void;
  seasons: Season[];
  activeSeasonId: string;
  onSwitchSeason: (id: string) => void;
  onStartNewSeason: () => void;
  onUpdateSeason: (id: string, updates: Partial<Season>) => void;
  onDeleteSeason: (id: string) => void;
  onSendNotification: (notif: any) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllRead?: () => void;
  isDataSaving?: boolean;
  notifications: Notification[];
  onLogout: () => void;
}

type TabType = 'stats' | 'monitoring' | 'users' | 'requests' | 'seasons' | 'messages' | 'settings';

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  const { user } = props;
  const { activeTab: urlTab } = useParams<{ activeTab: string }>();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<TabType>(
    (urlTab as TabType) || 'stats'
  );

  useEffect(() => {
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab as TabType);
    }
  }, [urlTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
    localStorage.setItem('buddy_admin_tab', tab);
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#0a0a0c]">
        <div className="text-center p-12 bg-white/5 backdrop-blur-[12px] border border-red-500/10 rounded-3xl shadow-xl">
          <ShieldAlert className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white mb-4">Kirish Taqiqlandi</h2>
          <p className="text-slate-400">Sizda ushbu sahifani ko'rish uchun ruxsat yo'q.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-6 md:py-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      {/* Sidebar Navigation */}
      <AdminNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        notifications={props.notifications}
        user={user}
        onLogout={props.onLogout}
      />

      {/* Main Content with left margin for sidebar */}
      <div className="lg:ml-64 px-3 sm:px-4 lg:px-10 pt-16 lg:pt-6">
        <div className="max-w-[1700px] mx-auto">
        <AdminHeader activeTab={activeTab} />

        {activeTab === 'stats' && <StatsTab {...props} />}
        {activeTab === 'monitoring' && <MonitoringTab {...props} />}
        {activeTab === 'users' && <UsersTab {...props} />}
        {activeTab === 'requests' && <RequestsTab {...props} />}
        {activeTab === 'seasons' && <SeasonsTab {...props} />}
        {activeTab === 'messages' && <MessagesTab {...props} />}
        {activeTab === 'settings' && <SettingsTab {...props} />}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
