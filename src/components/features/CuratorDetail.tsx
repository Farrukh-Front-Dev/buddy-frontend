
import React, { useState, useEffect, useRef } from 'react';
import { TeamMember, StudentProgress, WeeklyHighlight, Season } from '../../types';
import { X, ChevronLeft, Star, Quote, Users, Briefcase, Award, Info, Calendar, UserCheck, UserX, Activity, ChevronRight, Target, Camera, Image as ImageIcon, Maximize2, Zap, AlertCircle, Lightbulb, ChevronDown } from 'lucide-react';

interface CuratorDetailProps {
  curator: TeamMember;
  onClose: () => void;
  studentsData?: StudentProgress[];
  highlights?: WeeklyHighlight[];
  seasons?: Season[];
  activeSeasonId?: string;
}

const CuratorDetail: React.FC<CuratorDetailProps> = ({ curator, onClose, studentsData = [], highlights = [], seasons = [], activeSeasonId = '1' }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'plans'>('profile');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(activeSeasonId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Custom Dropdown State
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeSeason = seasons.find(s => s.id === selectedSeason);
    const maxWeeks = (activeSeason?.durationInMonths || 3) * 4;
    if (selectedWeek > maxWeeks) {
      setSelectedWeek(maxWeeks);
    }
  }, [selectedSeason, seasons]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSeasonDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const curatorStudents = studentsData
    .filter(item => item.curatorId === curator.id)
    .reduce((acc, current) => {
      const x = acc.find(item => item.studentName === current.studentName);
      if (!x) return acc.concat([current]);
      return acc;
    }, [] as StudentProgress[]);

  const filteredPlans = studentsData.filter(
    item => item.curatorId === curator.id &&
      item.weekNumber === selectedWeek &&
      item.seasonId === selectedSeason
  );

  const currentHighlights = highlights.filter(h =>
    h.weekNumber === selectedWeek &&
    h.curatorId === curator.id &&
    h.seasonId === selectedSeason
  );

  const formatMeetingDay = (val: string) => {
    if (!val) return "Belgilanmagan";
    try {
      const date = new Date(val);
      if (isNaN(date.getTime())) return val;
      return date.toLocaleString('uz-UZ', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch { return val; }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Hal qilindi': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Bajarmadi': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Bajarilmoqda': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Kutilmoqda': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[#0a0a0c] overflow-y-auto animate-in fade-in duration-300">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-indigo-600/10 blur-[100px] md:blur-[150px] rounded-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/10 blur-[100px] md:blur-[150px] rounded-3xl"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-20 min-h-screen">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 md:mb-16">
          <button onClick={onClose} className="w-full lg:w-auto flex items-center justify-center space-x-3 text-slate-400 hover:text-white transition-all bg-white/5 px-6 py-3.5 md:py-4 rounded-2xl border border-white/5 group"><ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /><span className="font-bold uppercase text-[9px] md:text-[10px] tracking-widest">Barcha kuratorlar</span></button>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 w-full lg:w-auto"><button onClick={() => setActiveTab('profile')} className={`flex-1 lg:flex-none px-6 md:px-10 py-3 rounded-xl text-[9px] md:text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>PROFİL</button><button onClick={() => setActiveTab('plans')} className={`flex-1 lg:flex-none px-6 md:px-10 py-3 rounded-xl text-[9px] md:text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'plans' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>O'QUV REJALARI</button></div>
        </div>

        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="lg:col-span-1 min-w-0">
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 md:mb-8 border-4 border-white/5 shadow-2xl group mx-auto max-w-[300px]">
                  <img src={curator.avatar} alt={curator.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="text-center mb-8 md:mb-10">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tighter break-words">{curator.name}</h2>
                  <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-6 break-words">{curator.role}</p>
                  <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                    {curator.skills.map((skill, index) => (
                      <span key={`${skill}-${index}`} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-tight">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 mx-auto mb-2" />
                    <p className="text-[8px] md:text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">O'quvchilar</p>
                    <p className="text-xl md:text-2xl font-black text-white">{curatorStudents.length}</p>
                  </div>
                  <div className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-current mx-auto mb-2" />
                    <p className="text-[8px] md:text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Reyting</p>
                    <p className="text-xl md:text-2xl font-black text-white">5.0</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-8 md:space-y-12 min-w-0">
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 border border-white/5 rounded-3xl p-6 md:p-14 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-indigo-500 hidden md:block">
                  <Briefcase className="w-64 h-64" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-8 md:mb-10 flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                    <Zap className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span>Soha va Tajriba</span>
                </h3>
                <div className="space-y-8 md:space-y-10 relative z-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 ml-1">Mutaxassis haqida</h4>
                    <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-medium tracking-tight break-words whitespace-pre-wrap">{curator.longBio}</p>
                  </div>
                  <div className="p-6 md:p-10 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
                    <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 md:w-4 h-4" />Mutaxassislik falsafasi
                    </h4>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed italic font-medium break-words whitespace-pre-wrap">"{curator.fieldDescription}"</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -left-3 -top-3 md:-left-6 md:-top-6">
                  <Quote className="w-16 h-16 md:w-24 md:h-24 text-indigo-600/10" />
                </div>
                <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 border border-white/5 rounded-3xl p-8 md:p-24 text-center bg-gradient-to-br from-indigo-600/[0.03] to-purple-600/[0.03] shadow-xl">
                  <p className="text-xl sm:text-2xl md:text-5xl font-black text-white leading-tight italic tracking-tighter break-words whitespace-pre-wrap">"{curator.motivationQuote}"</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12 md:space-y-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 text-center lg:text-left">
              <div><h2 className="text-indigo-500 font-black tracking-[0.2em] uppercase text-[9px] md:text-[10px] mb-3 flex items-center justify-center lg:justify-start gap-2"><Activity className="w-4 h-4" /> Monitoring Tizimi</h2><h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter">Haftalik Monitoring</h1></div>

              <div className="flex flex-col items-center lg:items-end gap-3 w-full md:w-auto">
                {/* Week Selector */}
                <div className="w-full md:w-[280px] flex items-center justify-between p-2 bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl border border-white/5">
                  <button disabled={selectedWeek === 1} onClick={() => setSelectedWeek(w => w - 1)} className="p-4 text-slate-400 hover:text-white disabled:opacity-20 rounded-xl hover:bg-white/5 transition-all"><ChevronLeft className="w-5 h-5" /></button>
                  <div className="text-center">
                    <p className="text-[9px] font-black uppercase text-slate-500 mb-0.5 tracking-[0.2em]">Haftalik</p>
                    <p className="text-3xl font-black text-white leading-none tracking-tight">#0{selectedWeek}</p>
                  </div>
                  <button disabled={selectedWeek >= (seasons.find(s => s.id === selectedSeason)?.durationInMonths || 3) * 4} onClick={() => setSelectedWeek(w => w + 1)} className="p-4 text-slate-400 hover:text-white disabled:opacity-20 rounded-xl hover:bg-white/5 transition-all"><ChevronRight className="w-5 h-5" /></button>
                </div>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2 md:px-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2.5 md:p-3 bg-indigo-600/20 rounded-xl text-indigo-400 border border-indigo-500/20"><Target className="w-5 h-5 md:w-6 md:h-6" /></div>
                  <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-widest">O'quv rejalari va holatlar</h3>
                </div>

                {/* Season Selector Dropdown Moved Here */}
                <div className="relative z-[60] w-full md:w-[260px]" ref={dropdownRef}>
                  <button
                    onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
                    className={`w-full flex items-center justify-between bg-[#121214] border border-white/5 rounded-xl px-6 py-3.5 text-white font-bold uppercase text-[10px] tracking-widest outline-none transition-all hover:bg-white/5 hover:border-indigo-500/30 group ${isSeasonDropdownOpen ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${seasons.find(s => s.id === selectedSeason)?.isActive ? 'bg-green-500' : 'bg-indigo-500'} ${seasons.find(s => s.id === selectedSeason)?.isActive ? 'animate-pulse' : ''}`}></div>
                      <span className="text-slate-300 group-hover:text-indigo-400 transition-colors">
                        Mavsum #{seasons.find(s => s.id === selectedSeason)?.number}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isSeasonDropdownOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                  </button>

                  {isSeasonDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-full bg-[#161618] border border-white/5 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {seasons.map(s => (
                        <button
                          key={s.id}
                          onClick={() => { setSelectedSeason(s.id); setIsSeasonDropdownOpen(false); }}
                          className={`w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-between transition-all border-b border-white/5 last:border-0 hover:bg-white/5 ${selectedSeason === s.id ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400'}`}
                        >
                          <span>Mavsum #{s.number}</span>
                          {s.isActive && (
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded border border-green-500/20 text-[9px] shadow-sm">Active</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-3xl border border-white/5 shadow-2xl bg-[#0a0a0c]/40 overflow-hidden">
                <div className="hidden xl:block w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse table-fixed min-w-[1200px]">
                    <thead><tr className="bg-white/[0.04] border-b border-white/5"><th className="w-[15%] px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">O'quvchi</th><th className="w-[13%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Vaqt</th><th className="w-[20%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Maqsad</th><th className="w-[15%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Muammo</th><th className="w-[20%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Yechim</th><th className="w-[11%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Holat</th><th className="w-[9%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Davomat</th></tr></thead>
                    <tbody className="divide-y divide-white/5">{filteredPlans.length > 0 ? filteredPlans.map((item) => (<tr key={item.id} className="hover:bg-white/[0.03] transition-colors"><td className="px-10 py-9 align-middle"><div className="flex items-center space-x-4 min-w-0"><div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center font-black text-indigo-400 text-xs border border-indigo-500/20">{item.studentName[0]}</div><span className="font-black text-white text-[14px] tracking-tight break-words flex-1">{item.studentName}</span></div></td><td className="px-4 py-9 align-middle"><span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1.5 uppercase break-words"><Calendar className="w-4 h-4" />{formatMeetingDay(item.meetingDay)}</span></td><td className="px-4 py-9 align-middle"><p className="text-[13px] text-slate-300 font-medium leading-relaxed break-words whitespace-pre-wrap">{item.weeklyGoal}</p></td><td className="px-4 py-9 align-middle"><p className={`text-[13px] leading-relaxed break-words whitespace-pre-wrap ${item.difficulty === 'Yo\'q' ? 'text-slate-600' : 'text-orange-400 font-bold'}`}>{item.difficulty}</p></td><td className="px-4 py-9 align-middle"><p className="text-[13px] text-indigo-300 font-medium italic opacity-90 leading-relaxed break-words whitespace-pre-wrap">{item.solution}</p></td><td className="px-4 py-9 align-middle"><span className={`inline-flex items-center px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${getStatusStyle(item.status)}`}>{item.status}</span></td><td className="px-6 py-9 text-center align-middle">{item.attended ? (<UserCheck className="w-6 h-6 text-green-400 mx-auto" />) : (<UserX className="w-6 h-6 text-red-400/50 mx-auto" />)}</td></tr>)) : (<tr><td colSpan={7} className="py-24 text-center text-slate-700 font-black uppercase tracking-widest text-xs">Ushbu mavsum va hafta uchun rejalar yo'q</td></tr>)}</tbody>
                  </table>
                </div>

                {/* MOBILE & TABLET CARD VIEW */}
                <div className="xl:hidden p-4 md:p-8 space-y-6">
                  {filteredPlans.length > 0 ? filteredPlans.map((item) => (
                    <div key={item.id} className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-5 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center font-black text-indigo-400 text-xs">{item.studentName[0]}</div>
                          <div>
                            <span className="font-black text-white text-base block break-words">{item.studentName}</span>
                            <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest break-words">{formatMeetingDay(item.meetingDay)}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase border ${getStatusStyle(item.status)}`}>{item.status}</span>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase text-indigo-400 tracking-widest flex items-center gap-2"><Target className="w-3 h-3" /> Maqsad</p>
                          <p className="text-[13px] text-slate-300 leading-relaxed font-medium bg-white/5 p-3 rounded-xl break-words whitespace-pre-wrap">{item.weeklyGoal}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase text-orange-400 tracking-widest flex items-center gap-2"><AlertCircle className="w-3 h-3" /> Muammo</p>
                            <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                              <p className={`text-[12px] leading-relaxed font-bold break-words whitespace-pre-wrap ${item.difficulty === 'Yo\'q' ? 'text-slate-600 italic' : 'text-orange-300'}`}>{item.difficulty}</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase text-green-400 tracking-widest flex items-center gap-2"><Lightbulb className="w-3 h-3" /> Yechim</p>
                            <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                              <p className="text-[12px] text-green-300 leading-relaxed italic font-medium break-words whitespace-pre-wrap">{item.solution}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Davomat:</div>
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${item.attended ? 'text-green-500' : 'text-red-500'}`}>
                            {item.attended ? <><UserCheck className="w-4 h-4" /> Faol</> : <><UserX className="w-4 h-4" /> Yo'q</>}
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="py-20 text-center opacity-30">
                      <p className="text-xs font-black uppercase tracking-widest">Ushbu mavsumda rejalar topilmadi</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-12 md:pt-16 border-t border-white/5">
              <div className="space-y-8 md:space-y-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
                  <div className="text-center sm:text-left"><h3 className="text-2xl md:text-4xl font-black text-white flex items-center justify-center sm:justify-start gap-4 md:gap-5 tracking-tighter"><Camera className="w-8 h-8 md:w-12 md:h-12 text-purple-400" /><span>Uchrashuvdan lavhalar</span></h3><p className="text-slate-500 text-[11px] md:text-sm font-medium mt-2 md:mt-3">Hafta #0{selectedWeek} davomidagi vizual isbotlar.</p></div>
                </div>
                <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-3xl border border-white/5 p-6 md:p-12 bg-white/[0.01]">
                  {currentHighlights.length > 0 ? (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-10">{currentHighlights.map((highlight) => (<div key={highlight.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-[#121214] shadow-2xl transition-all hover:scale-[1.05] cursor-pointer" onClick={() => setSelectedImage(highlight.image || highlight.photoUrl)}><img src={highlight.image || highlight.photoUrl} alt="Highlight" className="w-full h-full object-cover" /><Maximize2 className="absolute top-4 right-4 md:top-8 md:right-8 w-4 h-4 md:w-6 md:h-6 text-white/50" /></div>))}</div>) : (<div className="py-16 md:py-24 text-center border-2 md:border-4 border-dashed border-white/5 rounded-3xl"><ImageIcon className="w-12 h-12 md:w-20 md:h-20 text-slate-800 mx-auto mb-4 md:mb-8 opacity-20" /><p className="text-slate-600 font-black uppercase tracking-widest text-[10px] md:text-sm px-4">Hozircha lavhalar yuklanmagan.</p></div>)}
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}><button className="absolute top-6 right-6 p-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all shadow-2xl"><X className="w-8 h-8 md:w-10 md:h-10" /></button><img src={selectedImage} className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-3xl border border-white/5" alt="Full view" /></div>
        )}
      </div>
    </div>
  );
};

export default CuratorDetail;
