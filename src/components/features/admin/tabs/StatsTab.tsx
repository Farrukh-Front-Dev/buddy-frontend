import React, { useMemo } from 'react';
import { Users, Briefcase, Target, Clock, Award, TrendingUp, AlertTriangle } from 'lucide-react';
import { UserData, StudentProgress, Season } from '../../../../types';
import StatsCard from '../components/StatsCard';
import WeeklyProgressChart from '../components/charts/WeeklyProgressChart';
import StatusDistributionChart from '../components/charts/StatusDistributionChart';
import AttendancePieChart from '../components/charts/AttendancePieChart';
import TopCuratorsChart from '../components/charts/TopCuratorsChart';

interface StatsTabProps {
  allUsers: UserData[];
  allProgress: StudentProgress[];
  seasons: Season[];
  activeSeasonId: string;
}

const StatsTab: React.FC<StatsTabProps> = ({ allUsers, allProgress, seasons, activeSeasonId }) => {
  const stats = useMemo(() => {
    const approvedCurators = allUsers.filter(u => u.role === 'curator' && u.status === 'active');
    const pendingUsers = allUsers.filter(u => u.status === 'pending');
    const students = allUsers.filter(u => u.role === 'student');
    const totalCompleted = allProgress.filter(p => p.status === 'Hal qilindi').length;
    const overallRate = allProgress.length > 0 ? Math.round((totalCompleted / allProgress.length) * 100) : 0;

    return {
      curatorsCount: approvedCurators.length,
      pendingCount: pendingUsers.length,
      studentsCount: students.length,
      totalPlans: allProgress.length,
      overallRate
    };
  }, [allUsers, allProgress]);

  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <StatsCard
          title="O'quvchilar"
          value={stats.studentsCount}
          icon={Users}
          color="indigo"
          badge="Faol"
          badgeIcon={TrendingUp}
        />
        <StatsCard
          title="Kuratorlar"
          value={stats.curatorsCount}
          icon={Briefcase}
          color="purple"
          badge="Mentorlar"
          badgeIcon={Award}
        />
        <StatsCard
          title="Jami Rejalar"
          value={stats.totalPlans}
          icon={Target}
          color="green"
          badge={`${stats.overallRate}%`}
          badgeIcon={TrendingUp}
        />
        <StatsCard
          title="Kutilmoqda"
          value={stats.pendingCount}
          icon={Clock}
          color="orange"
          badge="Kutish"
          badgeIcon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyProgressChart 
          allProgress={allProgress} 
          seasons={seasons} 
          activeSeasonId={activeSeasonId} 
        />
        <StatusDistributionChart allProgress={allProgress} />
        <AttendancePieChart allProgress={allProgress} />
        <TopCuratorsChart allUsers={allUsers} allProgress={allProgress} />
      </div>
    </div>
  );
};

export default StatsTab;
