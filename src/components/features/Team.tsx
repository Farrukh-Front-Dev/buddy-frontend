
import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../../config/constants';
import { Github, Twitter, Zap, UserCheck, Search, Users, UserX, AlertCircle, Link2 } from 'lucide-react';
import CuratorDetail from './CuratorDetail';
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

// Skeleton card for loading state
const SkeletonCard = () => (
  <div className="group relative">
    <div className="relative bg-[#121214] border border-white/5 shadow-2xl rounded-3xl p-5 md:p-8 overflow-hidden">
      {/* Avatar skeleton */}
      <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 md:mb-8 bg-white/5 animate-pulse border border-white/5" />
      <div className="space-y-4">
        {/* Name skeleton */}
        <div className="h-7 w-3/4 bg-white/5 rounded-xl animate-pulse" />
        {/* Role skeleton */}
        <div className="h-3 w-1/3 bg-white/5 rounded-full animate-pulse" />
        {/* Bio skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-white/5 rounded-full animate-pulse" />
          <div className="h-3 w-5/6 bg-white/5 rounded-full animate-pulse" />
        </div>
        {/* Skills skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-6 w-20 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-6 w-14 bg-white/5 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const Team: React.FC<TeamProps> = ({ user, onAssignCurator, customMembers, studentsData = [], highlights = [], seasons = [], activeSeasonId = '1', isLoading = false }) => {
  const [selectedCurator, setSelectedCurator] = useState<TeamMember | null>(null);

  const members = customMembers || TEAM_MEMBERS;

  const displayedMembers = React.useMemo(() => {
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
    <section id="team" className="py-16 md:py-24 lg:py-32 relative min-h-[60vh]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-600/5 blur-[150px] -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-4">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-black text-blue-400 uppercase tracking-widest">
              {isStudentWithBothCurators ? "Tanlangan Buddylar" : isStudentWithCurator ? "Sizning Tanlangan Buddyingiz" : "O'z ustozingni top"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-8 text-white tracking-tighter">
            {isStudentWithBothCurators ? "Sizning " : isStudentWithCurator ? "Sizning va Boshqa " : "Barcha "}
            <span className="bg-gradient-to-br from-[#60a5fa] to-[#a855f7] bg-clip-text text-transparent">Kuratorlar</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-medium px-2">
            {isStudentWithBothCurators
              ? "Ushbu kuratorlar sizning o'sishingiz va muammolaringizni hal qilishda yordam berishadi."
              : isStudentWithCurator
              ? "Ushbu kurator sizning o'sishingizga yordam beradi. Ikkinchi kuratoringizni ham tanlang."
              : "Bizning jamoa a'zolari har haftalik sessiyalarni boshqarishadi. O'zingizga mos yo'nalishni tanlang."}
          </p>
        </div>

        {/* LOADING SKELETON STATE */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            {isStudentChoosing && displayedMembers.length > 0 && (
              <div className="mb-12 p-6 md:p-10 bg-white/5 backdrop-blur-[12px] border border-white/10 border-dashed border border-indigo-500/20 shadow-xl rounded-3xl text-center animate-in fade-in zoom-in duration-500">
                <Users className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                 <h4 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tight">
                   {!user.assignedCuratorId && !user.startupCuratorId 
                     ? "Buddy (Kurator) Tanlang" 
                     : !user.assignedCuratorId 
                       ? "Sizga Asosiy Buddy (Kurator) Zarur"
                       : "Sizga Startup Buddy (Kurator) Zarur"}
                 </h4>
                 <p className="text-slate-500 text-sm font-medium">
                   {!user.assignedCuratorId && !user.startupCuratorId 
                     ? "Sizga mos keladigan mutaxassislarni tanlang. Ham asosiy, ham startup yo'nalishi uchun alohida buddy tanlashingiz mumkin." 
                     : !user.assignedCuratorId 
                       ? "Sizda startup buddy bor, endi asosiy yo'nalish uchun buddy tanlang."
                       : "Sizda asosiy buddy bor, endi startup yo'nalishi uchun buddy tanlang."}
                 </p>
              </div>
            )}

            {displayedMembers.length > 0 ? (
              <div className={`grid grid-cols-1 ${displayedMembers.length === 1 ? 'max-w-sm mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6 md:gap-10`}>
                {displayedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-indigo-600/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-[#121214] border border-white/5 shadow-2xl rounded-3xl p-5 md:p-8 transition-all duration-500 group-hover:border-indigo-500/50 group-hover:-translate-y-4 overflow-hidden">
                      <div onClick={() => setSelectedCurator(member)} className="cursor-pointer aspect-[4/5] rounded-2xl overflow-hidden mb-6 md:mb-8 relative border border-white/5">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                          onError={(e) => {
                            // Fallback to generated avatar if image fails
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6366f1&color=fff&size=400&bold=true`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-black flex items-center space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            <Search className="w-5 h-5" />
                            <span>Batafsil ko'rish</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight break-words">{member.name}</h3>
                          <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px] mt-1 break-words">{member.role}</p>
                        </div>

                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
                          {member.bio}
                        </p>

                        {isStudentChoosing && ((!user.assignedCuratorId && member.field !== 'StartUp Community') || (!user.startupCuratorId && member.field === 'StartUp Community')) ? (
                          <button
                            onClick={() => onAssignCurator(member.id)}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 active:scale-95"
                          >
                            <UserCheck className="w-5 h-5" />
                            <span>Shu kuratorni tanlash</span>
                          </button>
                        ) : (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {member.skills.slice(0, 3).map((skill, index) => (
                              <span key={`${skill}-${index}`} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-500 border border-white/5">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="pt-6 flex justify-between items-center border-t border-white/5">
                          <div className="flex space-x-3">
                            {member.socialLinks && member.socialLinks.length > 0 ? (
                              member.socialLinks.map((link, index) => (
                                <a
                                  key={index}
                                  href={link.linkUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all"
                                >
                                  {link.iconUrl ? (
                                    <img
                                      src={link.iconUrl}
                                      alt="social"
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                  ) : (
                                    <Link2 className="w-4 h-4 text-slate-500" />
                                  )}
                                </a>
                              ))
                            ) : (
                              <div className="flex space-x-3 opacity-50">
                                <span className="p-2 bg-white/5 rounded-xl text-slate-500 border border-white/5"><Github className="w-4 h-4" /></span>
                                <span className="p-2 bg-white/5 rounded-xl text-slate-500 border border-white/5"><Twitter className="w-4 h-4" /></span>
                              </div>
                            )}
                          </div>
                          {member.id === user?.assignedCuratorId && (
                            <div className="text-[9px] font-black uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/20 whitespace-nowrap">Asosiy Buddy</div>
                          )}
                          {member.id === user?.startupCuratorId && (
                            <div className="text-[9px] font-black uppercase text-pink-400 tracking-widest bg-pink-500/10 px-3 py-1 rounded-xl border border-pink-500/20 whitespace-nowrap">Startup Buddy</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* EMPTY STATE PLACEHOLDER */
              <div className="max-w-4xl mx-auto py-24 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-indigo-600/20 blur-[60px] rounded-3xl animate-pulse"></div>
                  <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white/5 rounded-3xl border border-white/5 shadow-xl flex items-center justify-center">
                    <UserX className="w-16 h-16 md:w-20 md:h-20 text-indigo-400/50" />
                  </div>
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                  Hozircha kuratorlar mavjud emas
                </h3>

                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                  Tizimda hozirda faol kuratorlar yo'q yoki barcha mentorlar tasdiqlanish jarayonida.
                  Yaqin kunlarda yangi mutaxassislar qo'shiladi.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 text-slate-400">
                    <AlertCircle className="w-5 h-5 text-indigo-500" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Qabul jarayoni davom etmoqda</span>
                  </div>
                </div>
              </div>
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
