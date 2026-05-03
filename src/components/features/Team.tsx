import React, { useState, useMemo } from 'react';
import { TEAM_MEMBERS } from '../../config/constants';
import { UserCheck, Search, Users, UserX, AlertCircle, Link2 } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import CuratorDetail from './CuratorDetail';
import Card3D from '../common/Card3D/Card3D';
import { TeamMember, StudentProgress, WeeklyHighlight, Season, UserData } from '../../types';

interface TeamProps {
  user: UserData | null;
  onAssignCurator: (id: string) => void;
  customMembers?: TeamMember[];
  studentsData?: StudentProgress[];
  highlights?: WeeklyHighlight[];
  seasons?: Season[];
  activeSeasonId?: string;
  isLoading?: boolean;
}

/**
 * Skeleton Card Component - Loading State
 */
const SkeletonCard: React.FC = () => (
  <div className="group relative">
    <div className="relative bg-slate-900 border border-white/5 rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 overflow-hidden">
      <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 sm:mb-5 md:mb-6 bg-white/5 animate-pulse border border-white/5" />
      <div className="space-y-3 sm:space-y-4">
        <div className="h-6 sm:h-7 w-3/4 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-3 w-1/3 bg-white/5 rounded-full animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-white/5 rounded-full animate-pulse" />
          <div className="h-3 w-5/6 bg-white/5 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Team Member Card Component - Reusable
 */
interface TeamMemberCardProps {
  member: TeamMember;
  user: UserData | null;
  isStudentChoosing: boolean;
  onSelect: (member: TeamMember) => void;
  onAssign: (id: string) => void;
  shadowColor: string;
  borderColor: string;
  t: (key: string, defaultValue?: string) => string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  user,
  isStudentChoosing,
  onSelect,
  onAssign,
  shadowColor,
  borderColor,
  t,
}) => {
  const canAssign = isStudentChoosing && (
    (!user?.assignedCuratorId && member.field !== 'StartUp Community') ||
    (!user?.startupCuratorId && member.field === 'StartUp Community')
  );

  return (
    <Card3D
      borderColor={borderColor}
      shadowColor={shadowColor}
      className="p-4 sm:p-5 md:p-6 lg:p-8 group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
    >
      {/* Avatar */}
      <div
        onClick={() => onSelect(member)}
        className="cursor-pointer aspect-[4/5] rounded-xl overflow-hidden mb-4 sm:mb-5 md:mb-6 relative border border-white/10 group-hover:border-indigo-500/30 transition-colors"
      >
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6366f1&color=fff&size=400&bold=true`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white font-bold text-xs sm:text-sm flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>{t('view_details', 'Batafsil')}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-3 sm:gap-4">
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover:text-indigo-400 transition-colors break-words">
            {member.name}
          </h3>
          <p className="text-indigo-400 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] mt-1">
            {member.role}
          </p>
        </div>

        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 font-medium">
          {member.bio}
        </p>

        {/* Action Button or Skills */}
        {canAssign ? (
          <button
            onClick={() => onAssign(member.id)}
            className="w-full py-2.5 sm:py-3 md:py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 mt-auto"
          >
            <UserCheck className="w-4 h-4" />
            <span>{t('select_button', 'Tanlash')}</span>
          </button>
        ) : (
          <div className="flex flex-wrap gap-2 pt-2 mt-auto">
            {member.skills?.slice(0, 3).map((skill, idx) => (
              <span
                key={`${skill}-${idx}`}
                className="px-2 sm:px-3 py-1 bg-white/5 rounded-lg text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400 border border-white/5"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Status Badges */}
      {(member.id === user?.assignedCuratorId || member.id === user?.startupCuratorId) && (
        <div className="pt-3 sm:pt-4 border-t border-white/10 mt-3 sm:mt-4">
          <span className="text-[8px] sm:text-[9px] font-bold uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-2 sm:px-3 py-1 rounded-lg border border-indigo-500/20 block w-fit">
            {member.id === user?.assignedCuratorId ? t('main_buddy', 'Asosiy Buddy') : t('startup_buddy', 'Startup Buddy')}
          </span>
        </div>
      )}
    </Card3D>
  );
};

/**
 * Empty State Component
 */
const EmptyState: React.FC = () => {
  const { t } = useTranslation('team');

  return (
    <div className="max-w-2xl mx-auto py-16 sm:py-20 md:py-24 text-center">
      <div className="relative inline-block mb-6 sm:mb-8 md:mb-10">
        <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-3xl animate-pulse"></div>
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center">
          <UserX className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-indigo-400/50" />
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 md:mb-6">
        {t('empty_title', 'Kuratorlar mavjud emas')}
      </h3>

      <p className="text-slate-400 text-sm sm:text-base md:text-lg font-medium max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
        {t('empty_description', 'Tizimda hozirda faol kuratorlar yo\'q. Yaqin kunlarda yangi mutaxassislar qo\'shiladi.')}
      </p>

      <div className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 rounded-lg border border-white/10 text-slate-400 text-xs sm:text-sm font-bold w-fit mx-auto">
        <AlertCircle className="w-4 h-4 text-indigo-500" />
        <span>{t('empty_notice', 'Qabul jarayoni davom etmoqda')}</span>
      </div>
    </div>
  );
};

/**
 * Team Section - Curator Showcase
 */
const Team: React.FC<TeamProps> = ({
  user,
  onAssignCurator,
  customMembers,
  studentsData = [],
  highlights = [],
  seasons = [],
  activeSeasonId = '1',
  isLoading = false,
}) => {
  const { t } = useTranslation('team');
  const [selectedCurator, setSelectedCurator] = useState<TeamMember | null>(null);
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  const members = customMembers || TEAM_MEMBERS;

  const displayedMembers = useMemo(() => {
    if (user?.role === 'student') {
      const { assignedCuratorId, startupCuratorId } = user;
      const bothAssigned = assignedCuratorId && startupCuratorId;
      if (bothAssigned) {
        return members.filter(m => m.id === assignedCuratorId || m.id === startupCuratorId);
      } else if (assignedCuratorId) {
        return members.filter(m => m.id === assignedCuratorId || m.field === 'StartUp Community');
      } else if (startupCuratorId) {
        return members.filter(m => m.id === startupCuratorId || m.field !== 'StartUp Community');
      }
    }
    return members;
  }, [user, members]);

  const isStudentChoosing = user?.role === 'student' && (!user.assignedCuratorId || !user.startupCuratorId);
  const isStudentWithCurator = user?.role === 'student' && (!!user.assignedCuratorId || !!user.startupCuratorId);
  const isStudentWithBothCurators = user?.role === 'student' && !!user.assignedCuratorId && !!user.startupCuratorId;

  return (
    <section id="team" className="py-16 sm:py-20 md:py-28 lg:py-36 relative min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-4 sm:mb-6 md:mb-8 text-white">
            {isStudentWithBothCurators ? t('title_selected', 'Tanlangan') : isStudentWithCurator ? t('title_partial', 'Sizning') : t('title_all', 'Barcha')} <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {t('title_highlight', 'Kuratorlar')}
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {isStudentWithBothCurators
              ? t('description_both', 'Ushbu kuratorlar sizning o\'sishingizda yordam berishadi.')
              : isStudentWithCurator
              ? t('description_partial', 'Ikkinchi kuratoringizni ham tanlang.')
              : t('description_all', 'Bizning jamoa a\'zolari har haftalik sessiyalarni boshqarishadi.')}
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            {isStudentChoosing && displayedMembers.length > 0 && (
              <Card3D
                borderColor={borderColor}
                shadowColor={shadowColor}
                className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 p-4 sm:p-6 md:p-8 text-center"
              >
                <Users className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-indigo-400 mx-auto mb-3 sm:mb-4 md:mb-6" />
                <h4 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2 sm:mb-3 uppercase tracking-tight">
                  {!user?.assignedCuratorId && !user?.startupCuratorId
                    ? t('select_buddy', 'Buddy Tanlang')
                    : !user?.assignedCuratorId
                    ? t('select_main', 'Asosiy Buddy Tanlang')
                    : t('select_startup', 'Startup Buddy Tanlang')}
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm md:text-base font-medium">
                  {!user?.assignedCuratorId && !user?.startupCuratorId
                    ? t('select_description', 'Sizga mos keladigan mutaxassislarni tanlang.')
                    : !user?.assignedCuratorId
                    ? t('select_main_desc', 'Asosiy yo\'nalish uchun buddy tanlang.')
                    : t('select_startup_desc', 'Startup yo\'nalishi uchun buddy tanlang.')}
                </p>
              </Card3D>
            )}

            {displayedMembers.length > 0 ? (
              <div className={`grid grid-cols-1 ${displayedMembers.length === 1 ? 'sm:max-w-sm sm:mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4 sm:gap-5 md:gap-6 lg:gap-8`}>
                {displayedMembers.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    user={user}
                    isStudentChoosing={isStudentChoosing}
                    onSelect={setSelectedCurator}
                    onAssign={onAssignCurator}
                    shadowColor={shadowColor}
                    borderColor={borderColor}
                    t={t}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </div>

      {selectedCurator && (
        <CuratorDetail
          curator={selectedCurator}
          onClose={() => setSelectedCurator(null)}
          studentsData={studentsData}
          highlights={highlights}
          seasons={seasons}
          activeSeasonId={activeSeasonId}
        />
      )}
    </section>
  );
};

export default Team;
