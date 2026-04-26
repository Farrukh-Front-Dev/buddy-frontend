import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
   Trash2, Edit2, Save, X, Quote, Plus, Settings, Activity, Users, Loader2,
   ChevronLeft, ChevronRight, Calendar, Camera, Maximize2,
   UploadCloud, Layout, User, Clock, Lock, UserCircle, Target, AlertCircle, AlertTriangle, Lightbulb, UserCheck, UserX, History, Bookmark, Award, BarChart3, TrendingUp, CheckCircle2, XCircle, ChevronRight as ChevronRightIcon, Link2, ExternalLink, Zap, Code, FileText, Bell, Info, Image as ImageIcon, ChevronDown, Briefcase, Eye, EyeOff, Mail, ShieldCheck, ShieldAlert
} from 'lucide-react';
import { UserData, StudentProgress, WeeklyHighlight, Season, Notification } from '../../types';
import CustomDropdown from './CustomDropdown';

interface DashboardProps {
   user: UserData | null;
   studentsData: StudentProgress[];
   highlights: WeeklyHighlight[];
   allUsers: UserData[];
   onRemoveStudent: (id: string) => void;
   onUpdateProfile: (data: Partial<UserData>) => void;
   onUpdateStudent: (student: StudentProgress) => void;
   onAddProgress: (progress: StudentProgress) => void;
   onAddHighlight: (highlight: WeeklyHighlight) => void;
   onRemoveHighlight: (id: string) => void;
   activeSeasonId: string;
   seasons: Season[];
   notifications?: Notification[];
   onMarkRead?: (id: string) => void;
   onMarkAllRead?: () => void;
   onAssignStudent?: (studentId: string) => void;
   onUnassignStudent?: (studentId: string) => void;
   onlineUsers?: Set<string>;
   isDataSaving?: boolean;
   isLoading?: boolean;
}

const isValidUrl = (url: string) => {
   if (!url) return true;
   try {
      const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return pattern.test(url.trim());
   } catch { return false; }
};

const Dashboard: React.FC<DashboardProps> = ({
   user,
   studentsData = [],
   highlights = [],
   allUsers = [],
   onRemoveStudent,
   onUpdateProfile,
   onUpdateStudent,
   onAddProgress,
   onAddHighlight,
   onRemoveHighlight,
   activeSeasonId,
   seasons = [],
   notifications = [],
   onMarkRead,
   onMarkAllRead,
   onAssignStudent,
   onUnassignStudent,
   onlineUsers,
   isDataSaving,
   isLoading
}) => {
   const { activeTab: urlTab } = useParams<{ activeTab: string }>();
   const navigate = useNavigate();
   
   const [activeTab, setActiveTab] = useState<'panel' | 'profile' | 'notifications'>(
      (urlTab as any) || 'panel'
   );

   useEffect(() => {
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab as any);
    }
  }, [urlTab]);

  const handleTabChange = (tab: 'panel' | 'profile' | 'notifications') => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`);
    localStorage.setItem('buddy_dashboard_tab', tab);
  };
   const [selectedWeek, setSelectedWeek] = useState(() => Number(localStorage.getItem('buddy_dashboard_week')) || 1);
   const [selectedSeason, setSelectedSeason] = useState(() => localStorage.getItem('buddy_dashboard_season') || activeSeasonId);
   const [isAddingStudent, setIsAddingStudent] = useState(false);
   const [isAssigningStudent, setIsAssigningStudent] = useState(false);
   const [studentToAssign, setStudentToAssign] = useState('');

   const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const [selectedUserForView, setSelectedUserForView] = useState<UserData | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const profileFileInputRef = useRef<HTMLInputElement>(null);

   const getAssignedCurator = (student: UserData | null) => {
      if (!student || student.role !== 'student') return null;
      return (allUsers || []).find(u => u.id === student.assignedCuratorId) || null;
   };

   const getStartupCurator = (student: UserData | null) => {
      if (!student || student.role !== 'student') return null;
      return (allUsers || []).find(u => u.id === student.startupCuratorId) || null;
   };

   const getAssignedStudents = (curator: UserData | null) => {
      if (!curator || curator.role !== 'curator') return [];
      return (allUsers || []).filter(u => 
         String(u.assignedCuratorId || (u as any).assigned_curator_id) === String(curator.id) || 
         String(u.startupCuratorId || (u as any).startup_curator_id) === String(curator.id)
      );
   };

   const getUserStatusStyle = (status: string) => {
      switch (status) {
         case 'active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
         case 'inactive': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
         case 'pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
         default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      }
   };

   const getRoleStyle = (role: string) => {
      switch (role) {
         case 'admin': return 'bg-red-500/10 text-red-400 border-red-500/20';
         case 'curator': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
         default: return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      }
   };

   // Monitoring Filter State
   const socialIconInputRef = useRef<HTMLInputElement>(null);
   const [activeSocialLinkIndex, setActiveSocialLinkIndex] = useState<number | null>(null);


   const filteredNotifications = useMemo(() => {
      if (!user) return [];
      const userCreatedAt = user.createdAt ? new Date(user.createdAt).getTime() : 0;

      return notifications.filter(notif => {
         // Faqat ro'yxatdan o'tgandan keyingi xabarlarni ko'rsatish
         const notifTime = new Date(notif.timestamp || (notif as any).createdAt || Date.now()).getTime();
         if (notifTime < userCreatedAt) return false;

         // If specific user ID is targeted, only show to that user
         if (notif.targetUserId) {
            return notif.targetUserId === user.id;
         }
         // Otherwise filter by role
         return notif.targetRole === 'all' || notif.targetRole === user.role;
      });
   }, [notifications, user]);

   const unreadCount = useMemo(() => filteredNotifications.filter(n => !n.isRead).length, [filteredNotifications]);

   const canUpload = (user?.role || '').toLowerCase() === 'curator' || (user?.role || '').toLowerCase() === 'admin';

   // Sync activeSeasonId if it changes from props
   useEffect(() => {
      setSelectedSeason(activeSeasonId);
   }, [activeSeasonId]);

   useEffect(() => {
      localStorage.setItem('buddy_dashboard_tab', activeTab);
   }, [activeTab]);

   useEffect(() => {
      localStorage.setItem('buddy_dashboard_week', selectedWeek.toString());
   }, [selectedWeek]);

   useEffect(() => {
      localStorage.setItem('buddy_dashboard_season', selectedSeason);
      const activeSeason = seasons.find(s => s.id === selectedSeason);
      const maxWeeks = (activeSeason?.durationInMonths || 3) * 4;
      if (selectedWeek > maxWeeks) {
         setSelectedWeek(maxWeeks);
      }
   }, [selectedSeason, seasons]);

   useEffect(() => {
      localStorage.setItem('buddy_dashboard_season', selectedSeason);
   }, [selectedSeason]);
   // Profile Editing State
   const [isEditingProfile, setIsEditingProfile] = useState(false);

   // Enhanced Body and Html scroll lock effect for Dashboard
   useEffect(() => {
      if (selectedUserForView || isEditingProfile) {
         document.body.style.overflow = 'hidden';
         document.documentElement.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = '';
         document.documentElement.style.overflow = '';
      }
      return () => {
         document.body.style.overflow = '';
         document.documentElement.style.overflow = '';
      };
   }, [selectedUserForView, isEditingProfile]);

   const [showPassword, setShowPassword] = useState(false);
   const [editingProgress, setEditingProgress] = useState<StudentProgress | null>(null);
   const [newPlanForm, setNewPlanForm] = useState({
      studentName: '',
      meetingDay: '',
      weeklyGoal: '',
      difficulty: ''
   });
   const [editPlanForm, setEditPlanForm] = useState({
      meetingDay: '',
      attended: false,
      weeklyGoal: '',
      difficulty: '',
      solution: '',
      status: 'Kutilmoqda' as 'Bajarilmoqda' | 'Hal qilindi' | 'Kutilmoqda' | 'Bajarmadi'
   });
   const [profileForm, setProfileForm] = useState({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      avatar: user?.avatar || '',
      field: user?.field || '',
      longBio: user?.longBio || '',
      fieldDescription: user?.fieldDescription || '',
      motivationQuote: user?.motivationQuote || '',
      skills: user?.skills?.join(', ') || '',
      socialLinks: user?.socialLinks || []
   });

   const isAllUrlsValid = useMemo(() => {
      return (profileForm.socialLinks || []).every(link => !link.linkUrl || isValidUrl(link.linkUrl));
   }, [profileForm.socialLinks]);


   const handleSaveProfile = async () => {
      // Social linklarini tekshirish
      const validatedSocialLinks = (profileForm.socialLinks || []).map(link => {
         let url = link.linkUrl.trim();
         if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
         }
         // Agar iconUrl o'zgarmagan URL bo'lsa (server URLi) — qayta yubormaslik
         const iconUrl = link.iconUrl?.startsWith('data:') ? link.iconUrl : undefined;
         return {
            id: (link as any).id,
            linkUrl: url,
            ...(iconUrl ? { iconUrl } : { iconUrl: link.iconUrl || '' })
         };
      }).filter(link => link.linkUrl.trim() !== '');

      // Faqat o'zgargan ma'lumotlarni yuborish
      const payload: Record<string, any> = {
         name: profileForm.name,
         username: profileForm.username,
         field: profileForm.field,
         longBio: profileForm.longBio,
         fieldDescription: profileForm.fieldDescription,
         motivationQuote: profileForm.motivationQuote,
         skills: (profileForm.skills || '').split(',').map(s => s.trim()).filter(s => s !== ''),
         socialLinks: validatedSocialLinks
      };

      if (profileForm.password && profileForm.password !== user?.password) {
         payload.password = profileForm.password;
      }

      // Avatarni faqat yangi base64 rasm bo'lsa yuborish
      if (profileForm.avatar?.startsWith('data:')) {
         payload.avatar = profileForm.avatar;
      }

      try {
         const success = await (onUpdateProfile as any)(payload);
         if (success !== false) {
            setIsEditingProfile(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
         }
      } catch (err) {
         console.error('Profile save error', err);
      }
   };

   const handleAddStudent = () => {
      if (!newPlanForm.meetingDay.trim() || !user || isDataSaving) return;
      const userRole = (user?.role || '').toLowerCase();
      
      // Both curators and admins should be able to add plans
      if (userRole !== 'curator' && userRole !== 'admin') return;

      const assignedStudents = (allUsers || []).filter(u => {
         const uRole = (u.role || '').toLowerCase();
         const uAssigned = u.assignedCuratorId || (u as any).assigned_curator_id;
         const uStartup = u.startupCuratorId || (u as any).startup_curator_id;
         
         // If admin, we might want to filter by some criteria or let them add to any student?
         // For now, let's assume they are acting as a curator for their own students if they have any,
         // or handle it differently. But curators are definitely the main users here.
         return uRole === 'student' && (
            String(uAssigned) === String(user.id) || 
            String(uStartup) === String(user.id)
         );
      });

      assignedStudents.forEach((student, index) => {
         // Check if a progress report already exists for this student, season, and week
         const existingProgress = (studentsData || []).find(
            p => {
               const pStudentId = p.studentId || (p as any).student_id || (p as any).student?.id;
               const pSeasonId = p.seasonId || (p as any).season_id || (p as any).season?.id;
               const pWeekNum = p.weekNumber || (p as any).week_number;
               const pCuratorId = p.curatorId || (p as any).curator_id || (p as any).curator?.id;

               return String(pStudentId) === String(student.id) && 
                      String(pSeasonId) === String(selectedSeason) && 
                      Number(pWeekNum) === Number(selectedWeek) && 
                      String(pCuratorId) === String(user.id);
            }
         );

         if (!existingProgress) {
            const newProgress: StudentProgress = {
               id: (Date.now() + index).toString(),
               curatorId: user.id,
               seasonId: selectedSeason,
               weekNumber: selectedWeek,
               studentId: student.id,
               studentName: student.name || student.username,
               weeklyGoal: '',
               difficulty: '',
               solution: '',
               status: 'Kutilmoqda',
               meetingDay: newPlanForm.meetingDay.trim(),
               attended: false
            };            onAddProgress(newProgress);
         }
      });

      setIsAddingStudent(false);
      setNewPlanForm({ studentName: '', meetingDay: '', weeklyGoal: '', difficulty: '' });
   };

   const toDateTimeLocal = (dateStr: string) => {
      if (!dateStr) return '';
      try {
         const date = new Date(dateStr);
         if (isNaN(date.getTime())) return '';
         const pad = (n: number) => n.toString().padStart(2, '0');
         return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
      } catch { return ''; }
   };
   const handleEditStudent = (progress: StudentProgress) => {
       setEditingProgress(progress);
       setEditPlanForm({
          meetingDay: toDateTimeLocal(progress.meetingDay || (progress as any).meeting_day || ''),
          attended: progress.attended || (progress as any).attended || false,
          weeklyGoal: progress.weeklyGoal || (progress as any).weekly_goal || '',
          difficulty: progress.difficulty || (progress as any).difficulty || '',
          solution: progress.solution || (progress as any).solution || '',
          status: progress.status || (progress as any).status || 'Kutilmoqda'
       });
    };

   const handleSaveEdit = () => {
      if (!editingProgress) return;

      const payload = {
         ...editingProgress,
         ...editPlanForm,
         meetingDay: editPlanForm.meetingDay || null
      };

      onUpdateStudent(payload);
      setEditingProgress(null);
   };

   const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         if (!file.type.startsWith('image/')) {
            console.error('Faqat rasm (image) yuklashingiz mumkin!');
            return;
         }

         const reader = new FileReader();
         reader.onloadend = () => {
            setProfileForm({ ...profileForm, avatar: reader.result as string });
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSocialIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && activeSocialLinkIndex !== null) {
         if (!file.type.startsWith('image/')) {
            console.error('Faqat rasm (image) yuklashingiz mumkin!');
            return;
         }

         const reader = new FileReader();
         reader.onloadend = () => {
            const newLinks = (profileForm.socialLinks || []).map((link, idx) => 
               idx === activeSocialLinkIndex ? { ...link, iconUrl: reader.result as string } : link
            );
            setProfileForm({ ...profileForm, socialLinks: newLinks });
            setActiveSocialLinkIndex(null);
            if (socialIconInputRef.current) socialIconInputRef.current.value = '';
         };
         reader.readAsDataURL(file);
      }
   };

   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && user) {
         if (!file.type.startsWith('image/')) {
            console.error('Faqat rasm (image) yuklashingiz mumkin!');
            return;
         }

         const reader = new FileReader();
         reader.onloadend = () => {
            const newHighlight: any = {
               id: Date.now().toString(),
               curatorId: user.id,
               seasonId: selectedSeason,
               weekNumber: selectedWeek,
               photoUrl: reader.result as string,
               imageFile: file,
               uploadedBy: user.name
            };
            onAddHighlight(newHighlight);
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = '';
         };
         reader.readAsDataURL(file);
      }
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

   const getNotificationIcon = (type: Notification['type']) => {
      switch (type) {
         case 'info': return <Info className="w-5 h-5 text-blue-400" />;
         case 'success': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
         case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
         case 'urgent': return <Zap className="w-5 h-5 text-red-500 animate-pulse" />;
         default: return <Bell className="w-5 h-5 text-indigo-400" />;
      }
   };

   const mySeasonProgress = useMemo(() => {
      // Admin sees all, Curator sees their own, Student sees their own
      let base: StudentProgress[] = [];
      const userRole = (user?.role || '').toLowerCase();
      
      if (userRole === 'admin') {
         base = studentsData || [];
      } else if (userRole === 'curator') {
         base = (studentsData || []).filter(s => {
            const sCuratorId = s.curatorId || (s as any).curator_id || (s as any).curator?.id;
            return String(sCuratorId) === String(user.id);
         });
      } else if (userRole === 'student') {
         base = (studentsData || []).filter(s => {
            const sStudentId = s.studentId || (s as any).student_id || (s as any).student?.id;
            const sStudentName = s.studentName || (s as any).student_name;
            return String(sStudentId) === String(user.id) || sStudentName === user.name;
         });
      }
      const filtered = base.filter(s => {
         const sSeasonId = s.seasonId || (s as any).season_id || (s as any).season?.id;
         return String(sSeasonId) === String(selectedSeason);
      });

      // Deduplicate to prevent double items from multiple POSTs or WebSocket overlaps
      const seen = new Set();
      return filtered.filter(p => {
         const pStudentId = p.studentId || (p as any).student_id || (p as any).student?.id;
         const pCuratorId = p.curatorId || (p as any).curator_id || (p as any).curator?.id;
         const pWeekNum = p.weekNumber || (p as any).week_number;
         const key = `${pStudentId}-${pCuratorId}-${pWeekNum}`;
         if (seen.has(key)) return false;
         seen.add(key);
         return true;
      });
   }, [studentsData, user, selectedSeason]);

   const filteredProgress = useMemo(() => {
      return mySeasonProgress.filter(p => {
         const pWeekNum = p.weekNumber || (p as any).week_number;
         return Number(pWeekNum) === Number(selectedWeek);
      });
   }, [mySeasonProgress, selectedWeek]);

   const curatorsWithProgress = useMemo(() => {
      if ((user?.role || '').toLowerCase() !== 'admin') return [];
      const curatorIds = Array.from(new Set(filteredProgress.map(p => {
         const pCuratorId = p.curatorId || (p as any).curator_id || (p as any).curator?.id;
         return String(pCuratorId);
      })));
      return curatorIds.map(id => {
         const curator = (allUsers || []).find(u => String(u.id) === String(id));
         const progress = filteredProgress.filter(p => {
            const pCuratorId = p.curatorId || (p as any).curator_id || (p as any).curator?.id;
            return String(pCuratorId) === String(id);
         });
         return { curator, progress };
      });
   }, [filteredProgress, allUsers, user]);

   const filteredHighlights = useMemo(() => {
      if (user?.role === 'curator') {
         return highlights.filter(h =>
            String(h.curatorId || (h as any).curator_id) === String(user.id) &&
            String(h.seasonId || (h as any).season_id) === String(selectedSeason) &&
            Number(h.weekNumber || (h as any).week_number) === Number(selectedWeek)
         );
      }
      if (user?.role === 'admin') {
         return highlights.filter(h =>
            String(h.seasonId || (h as any).season_id) === String(selectedSeason) &&
            Number(h.weekNumber || (h as any).week_number) === Number(selectedWeek)
         ).sort((a, b) => {
             const curatorA = (allUsers || []).find(u => String(u.id) === String(a.curatorId || (a as any).curator_id));
             const curatorB = (allUsers || []).find(u => String(u.id) === String(b.curatorId || (b as any).curator_id));
             const isStartupA = curatorA?.field === 'StartUp Community';
             const isStartupB = curatorB?.field === 'StartUp Community';
             if (!isStartupA && isStartupB) return -1;
             if (isStartupA && !isStartupB) return 1;
             return 0;
          });
      }
      if (user?.role === 'student' && (user.assignedCuratorId || (user as any).assigned_curator_id || user.startupCuratorId || (user as any).startup_curator_id)) {
         const assignedId = user.assignedCuratorId || (user as any).assigned_curator_id;
         const startupId = user.startupCuratorId || (user as any).startup_curator_id;
         return highlights.filter(h => {
             const hCuratorId = h.curatorId || (h as any).curator_id;
             const hSeasonId = h.seasonId || (h as any).season_id;
             const hWeekNum = h.weekNumber || (h as any).week_number;
             return (String(hCuratorId) === String(assignedId) || String(hCuratorId) === String(startupId)) &&
                    String(hSeasonId) === String(selectedSeason) &&
                    Number(hWeekNum) === Number(selectedWeek);
         }).sort((a, b) => {
             const curatorA = (allUsers || []).find(u => String(u.id) === String(a.curatorId || (a as any).curator_id));
             const curatorB = (allUsers || []).find(u => String(u.id) === String(b.curatorId || (b as any).curator_id));
             const isStartupA = curatorA?.field === 'StartUp Community';
             const isStartupB = curatorB?.field === 'StartUp Community';
             if (!isStartupA && isStartupB) return -1;
             if (isStartupA && !isStartupB) return 1;
             return 0;
          });
      }
      return [];
   }, [highlights, user, selectedSeason, selectedWeek]);

   const uniqueStudents = useMemo(() => {
      const userRole = (user?.role || '').toLowerCase();
      if (userRole === 'curator') {
         return (allUsers || []).filter(u => {
            const uRole = (u.role || '').toLowerCase();
            const uAssigned = u.assignedCuratorId || (u as any).assigned_curator_id;
            const uStartup = u.startupCuratorId || (u as any).startup_curator_id;
            return uRole === 'student' && (
               String(uAssigned) === String(user.id) || 
               String(uStartup) === String(user.id)
            );
         }).map(u => ({
            id: u.id,
            name: u.name,
            avatar: u.avatar
         }));
      }
      // Fallback for other roles or if logic differs
      const names = Array.from(new Set(mySeasonProgress.map(s => s.studentName)));
      return names.map(name => {
         const studentData = mySeasonProgress.find(s => s.studentName === name);
         const userProfile = (allUsers || []).find(u => u.name === name);
         return {
            id: studentData?.id || `temp-${name}`,
            name: name,
            avatar: userProfile?.avatar
         };
      });
   }, [mySeasonProgress, allUsers, user]);

   const formatMeetingDay = (val: string) => {
      if (!val) return "Belgilanmagan";
      try {
         const date = new Date(val);
         return date.toLocaleString('uz-UZ', {
            weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
         });
      } catch { return val; }
   };

   return (
      <section id="dashboard" className="py-10 md:py-20 bg-[#0a0a0c] min-h-screen">
         <div className="max-w-[1800px] mx-auto px-4 lg:px-10">


            {activeTab === 'profile' && (
               <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
                  {isEditingProfile && (
                     <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
                        <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl md:rounded-[48px] max-w-5xl w-full p-6 md:p-14 relative shadow-2xl my-auto opacity-100 scale-100 animate-in zoom-in-95">
                           <button onClick={() => setIsEditingProfile(false)} className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-2xl bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 transition-colors z-[10] shadow-lg">
                              <X className="w-5 h-5" />
                           </button>
                           <div className="flex flex-col lg:flex-row gap-8 md:gap-10 items-start">
                           {/* Avatar */}
                           <div
                              className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shrink-0 group cursor-pointer relative overflow-hidden mx-auto lg:mx-0"
                              onClick={() => profileFileInputRef.current?.click()}
                           >
                              <input type="file" ref={profileFileInputRef} onChange={handleProfileImageUpload} className="hidden" accept="image/*" />
                              {profileForm.avatar ? (
                                 <img src={profileForm.avatar} className="w-full h-full object-cover" />
                              ) : (
                                 <ImageIcon className="w-16 h-16 text-white/40" />
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <Camera className="w-8 h-8 text-white" />
                              </div>
                           </div>

                           {/* Top Fields */}
                           <div className="flex-1 space-y-6 w-full">
                              {/* Social Links - Moved to Top */}
                              {user?.role !== 'admin' && (
                                 <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest ml-1 flex items-center gap-2">
                                    <Link2 className="w-3 h-3" /> IJTIMOIY TARMOQLAR (MAX 5)
                                 </label>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="file" ref={socialIconInputRef} onChange={handleSocialIconUpload} className="hidden" accept="image/*" />
                                    {profileForm.socialLinks?.map((link, index) => (
                                        <div key={index} className={`flex gap-4 bg-[#121214] py-2 px-4 rounded-2xl border items-center h-[56px] transition-all duration-300 ${link.linkUrl && !isValidUrl(link.linkUrl) ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] bg-red-500/5" : "border-white/5"}`}>
                                          <div
                                             className="w-10 h-10 bg-black/20 border border-white/5 rounded-xl flex items-center justify-center overflow-hidden shrink-0 cursor-pointer hover:border-indigo-500 transition-colors group relative"
                                             onClick={() => {
                                                setActiveSocialLinkIndex(index);
                                                socialIconInputRef.current?.click();
                                             }}
                                          >
                                             {link.iconUrl ? (
                                                <img src={link.iconUrl} alt="icon" className="w-full h-full object-cover" />
                                             ) : (
                                                <UploadCloud className="w-4 h-4 text-slate-600 group-hover:text-indigo-500 transition-colors" />
                                             )}
                                             {link.iconUrl && (
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                                   <Edit2 className="w-3 h-3 text-white" />
                                                </div>
                                             )}
                                          </div>
                                          <div className="flex-1 min-w-0 flex flex-col pt-2 pb-1 relative">
                                             {link.linkUrl && !isValidUrl(link.linkUrl) && (
                                                <div className="absolute -top-6 left-0 right-0 bg-red-600/90 text-[8px] font-black text-white px-3 py-1 rounded-lg border border-red-500 shadow-xl z-50 animate-bounce">
                                                   URL xato togri url kiriting masalan :https://21-school.uz
                                                </div>
                                             )}
                                             <input
                                                type="text"
                                                placeholder="Link URL (https://...)"
                                                className={`w-full bg-transparent border-b py-2 px-0 text-xs text-white transition-all outline-none ${link.linkUrl && !isValidUrl(link.linkUrl) ? 'border-red-500 text-red-200 shadow-[0_4px_12px_rgba(239,68,68,0.2)]' : 'border-white/5 focus:border-indigo-500'}`}
                                                value={link.linkUrl}
                                                onChange={(e) => {
                                                   const newLinks = (profileForm.socialLinks || []).map((l, idx) => 
                                                      idx === index ? { ...l, linkUrl: e.target.value } : l
                                                   );
                                                   setProfileForm({ ...profileForm, socialLinks: newLinks });
                                                }}
                                             />
                                          </div>
                                          <button
                                             onClick={() => {
                                                const newLinks = (profileForm.socialLinks || []).filter((_, i) => i !== index);
                                                setProfileForm({ ...profileForm, socialLinks: newLinks });
                                             }}
                                             className="w-8 h-8 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center transition-colors shrink-0"
                                          >
                                             <Trash2 className="w-4 h-4" />
                                          </button>
                                       </div>
                                    ))}
                                    {(profileForm.socialLinks?.length || 0) < 5 && (
                                       <button
                                          onClick={() => setProfileForm({ ...profileForm, socialLinks: [...(profileForm.socialLinks || []), { iconUrl: '', linkUrl: '' }] })}
                                          className="w-full h-[56px] bg-[#1a1a1f] hover:bg-[#25252b] text-slate-400 hover:text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all border border-white/5 border-dashed flex items-center justify-center gap-2"
                                       >
                                          <Plus className="w-4 h-4" />
                                          <span>Yangi qo'shish</span>
                                       </button>
                                    )}
                                 </div>
                              </div>
                           )}


                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest ml-1 flex justify-between">
                                       <span>TO'LIQ ISMINGIZ</span>
                                       <span className="text-slate-500">{(profileForm.name || '').length} / 50</span>
                                    </label>
                                    <input
                                       type="text"
                                       maxLength={50}
                                       className="w-full bg-[#121214] border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-indigo-500 transition-all outline-none font-bold"
                                       value={profileForm.name}
                                       onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                    />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest ml-1">USERNAME (@)</label>
                                    <input
                                       type="text"
                                       disabled={user?.role !== 'admin'}
                                       className={`w-full bg-[#121214] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none font-medium transition-all ${user?.role === 'admin' ? 'focus:border-indigo-500 shadow-[0_4px_20px_rgba(99,102,241,0.05)]' : 'text-slate-500 cursor-not-allowed'}`}
                                       value={profileForm.username}
                                       onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                                    />
                                 </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest ml-1">EMAIL MANZILINGIZ</label>
                                    <input
                                       type="email"
                                       disabled
                                       className="w-full bg-[#121214] border border-white/5 rounded-2xl py-4 px-6 text-slate-500 cursor-not-allowed outline-none font-medium"
                                       value={profileForm.email}
                                    />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest ml-1">YANGI PAROL (Ixtiyoriy)</label>
                                    <div className="relative group/pass">
                                       <input
                                          type={showPassword ? "text" : "password"}
                                          className="w-full bg-[#121214] border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-indigo-500 transition-all outline-none font-medium pr-14"
                                          value={profileForm.password}
                                          onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                                          placeholder="Parolni kiriting..."
                                       />
                                       <button 
                                          onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-white transition-colors"
                                       >
                                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                       </button>
                                    </div>
                                 </div>
                              </div>
                              </div>
                           </div>

                        {user?.role !== 'admin' && (
                           <>
                              <div className="my-10 h-px bg-white/5"></div>

                              {/* Bottom Section */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                 <div className="space-y-10">
                              <div className="space-y-4">
                                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between items-center">
                                    <span className="flex items-center gap-2"><Info className="w-3 h-3" /> TARJIMAI HOL (TAHRIR)</span>
                                    <span>{(profileForm.longBio || '').length} / 600</span>
                                 </label>
                                 <textarea
                                    maxLength={600}
                                    className="w-full bg-[#121214] border border-white/5 rounded-2xl py-4 px-6 text-slate-300 min-h-[150px] focus:border-indigo-500 outline-none transition-all leading-relaxed resize-none [&::-webkit-scrollbar]:hidden"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    value={profileForm.longBio}
                                    onChange={(e) => setProfileForm({ ...profileForm, longBio: e.target.value })}
                                 />
                              </div>
                              {user?.role === 'curator' && (
                                 <>
                                    <div className="space-y-4">
                                       <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between items-center">
                                          <span className="flex items-center gap-2"><Info className="w-3 h-3" /> MUTAXASSISLIK HAQIDA</span>
                                          <span>{(profileForm.fieldDescription || '').length} / 700</span>
                                       </label>
                                       <textarea
                                          maxLength={700}
                                          className="w-full bg-[#121214] border border-white/5 rounded-2xl py-4 px-6 text-slate-300 min-h-[150px] focus:border-indigo-500 outline-none transition-all leading-relaxed resize-none [&::-webkit-scrollbar]:hidden"
                                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                          value={profileForm.fieldDescription}
                                          onChange={(e) => setProfileForm({ ...profileForm, fieldDescription: e.target.value })}
                                          placeholder="Mutaxassislik falsafasi yoki qisqacha ma'lumot..."
                                       />
                                    </div>
                                 </>
                              )}
                              {user?.role === 'student' && (
                                 <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between items-center">
                                       <span className="flex items-center gap-2"><Quote className="w-3 h-3" /> MOTIVATSION SO'Z</span>
                                       <span>{(profileForm.motivationQuote || '').length} / 150</span>
                                    </label>
                                    <input
                                       type="text"
                                       maxLength={150}
                                       className="w-full bg-[#121214] border border-white/5 rounded-2xl py-6 px-6 text-white focus:border-indigo-500 transition-all outline-none"
                                       value={profileForm.motivationQuote}
                                       onChange={(e) => setProfileForm({ ...profileForm, motivationQuote: e.target.value })}
                                    />
                                 </div>
                              )}
                           </div>
                           <div className="space-y-10">
                              <div className="space-y-4">
                                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between items-center">
                                    <span className="flex items-center gap-2"><Briefcase className="w-3 h-3" /> SOHANGIZ</span>
                                    <span>{(profileForm.field || '').length} / 100</span>
                                 </label>
                                 <input
                                    type="text"
                                    maxLength={100}
                                    className="w-full bg-[#121214] border border-white/5 rounded-2xl py-6 px-6 text-white focus:border-indigo-500 transition-all outline-none"
                                    value={profileForm.field}
                                    onChange={(e) => setProfileForm({ ...profileForm, field: e.target.value })}
                                 />
                              </div>
                              <div className="space-y-4">
                                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between items-center">
                                    <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> KO'NIKMALAR</span>
                                    <span>{(profileForm.skills || '').length} / 100</span>
                                 </label>
                                 <textarea
                                    maxLength={100}
                                    className="w-full bg-[#121214] border border-white/5 rounded-2xl py-6 px-6 text-white focus:border-indigo-500 transition-all outline-none min-h-[100px] resize-none"
                                    value={profileForm.skills}
                                    onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                                    placeholder="React, Node.js, UI/UX..."
                                 />
                              </div>
                              {user?.role === 'curator' && (
                                 <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between items-center">
                                       <span className="flex items-center gap-2"><Quote className="w-3 h-3" /> MOTIVATSION SO'Z</span>
                                       <span>{(profileForm.motivationQuote || '').length} / 150</span>
                                    </label>
                                    <input
                                       type="text"
                                       maxLength={150}
                                       className="w-full bg-[#121214] border border-white/5 rounded-2xl py-6 px-6 text-white focus:border-indigo-500 transition-all outline-none"
                                       value={profileForm.motivationQuote}
                                       onChange={(e) => setProfileForm({ ...profileForm, motivationQuote: e.target.value })}
                                    />
                                 </div>
                              )}
                                 </div>
                              </div>
                           </>
                        )}
                        
                        {/* Buttons moved below motivation quote */}
                        <div className="mt-10 flex flex-col sm:flex-row justify-end gap-3 w-full border-t border-white/5 pt-8">
                           <button onClick={() => setIsEditingProfile(false)} className="w-full sm:w-auto bg-[#1a1a1f] hover:bg-[#25252b] text-slate-400 hover:text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center">
                              BEKOR
                           </button>
                           <button onClick={handleSaveProfile} disabled={!isAllUrlsValid} className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg ${!isAllUrlsValid ? "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50" : "bg-[#00c288] hover:bg-[#00a876] text-white shadow-[#00c288]/10"}`}>

                              <Save className="w-4 h-4" />
                              Saqlash
                           </button>
                        </div>
                     </div>
                  </div>
               )}

                   {/* STATIC VIEW */}
                   {user?.role === 'admin' ? (
                       <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700 w-full mb-20 px-2 sm:px-0 mt-8">
                           <div className="bg-[#0f0f12]/80 backdrop-blur-3xl rounded-[3rem] p-1.5 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 group">
                               {/* Animated Gradient Background Blobs for Premium Feel */}
                               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent blur-[120px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                               <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-30"></div>
                               
                               <div className="bg-[#121214]/80 backdrop-blur-xl rounded-[2.8rem] p-8 md:p-16 relative z-10 flex flex-col items-center text-center border border-white/5">
                                   <div className="relative mb-10 group/avatar">
                                       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-30 group-hover/avatar:opacity-60 transition-opacity duration-700 pointer-events-none"></div>
                                       <div className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl relative z-10 scale-95 group-hover/avatar:scale-100 transition-transform duration-500">
                                            <div className="w-full h-full bg-[#0a0a0c] rounded-[2.3rem] overflow-hidden relative">
                                                {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110" /> : <ShieldAlert className="w-full h-full text-indigo-400 p-12" />}
                                            </div>
                                       </div>
                                       <div className="absolute -bottom-4 -right-4 w-14 h-14 md:w-16 md:h-16 bg-[#0a0a0c] rounded-2xl flex items-center justify-center border border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.5)] z-20">
                                            <Zap className="w-6 h-6 md:w-7 md:h-7 text-indigo-400 animate-pulse" />
                                       </div>
                                   </div>

                                   <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">{user?.name}</h2>
                                   
                                   <div className="flex items-center gap-3 px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-10 shadow-[0_0_20px_rgba(99,102,241,0.15)] flex-shrink-0">
                                       <Activity className="w-4 h-4 text-indigo-400" />
                                       <p className="text-indigo-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mt-0.5">BOSH ADMINISTRATOR</p>
                                   </div>

                                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12 relative z-10 max-w-4xl mx-auto">
                                        <div className="bg-[#1a1a1f]/80 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-5 flex flex-col items-center hover:bg-indigo-500/10 transition-all shadow-lg text-center group">
                                           <div className="p-3 bg-indigo-500/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform"><Users className="w-6 h-6 text-indigo-400" /></div>
                                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">O'quvchilar</p>
                                           <p className="text-3xl font-black text-white drop-shadow-lg">{(allUsers || []).filter(u => u.role === 'student').length}</p>
                                        </div>
                                        <div className="bg-[#1a1a1f]/80 backdrop-blur-md border border-purple-500/20 rounded-3xl p-5 flex flex-col items-center hover:bg-purple-500/10 transition-all shadow-lg text-center group">
                                           <div className="p-3 bg-purple-500/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform"><ShieldCheck className="w-6 h-6 text-purple-400" /></div>
                                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Kuratorlar</p>
                                           <p className="text-3xl font-black text-white drop-shadow-lg">{(allUsers || []).filter(u => u.role === 'curator').length}</p>
                                        </div>
                                        <div className="bg-[#1a1a1f]/80 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-5 flex flex-col items-center hover:bg-emerald-500/10 transition-all shadow-lg text-center group">
                                           <div className="p-3 bg-emerald-500/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform"><Activity className="w-6 h-6 text-emerald-400" /></div>
                                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Monitoring</p>
                                           <p className="text-3xl font-black text-white drop-shadow-lg">{(studentsData || []).length}</p>
                                        </div>
                                        <div className="bg-[#1a1a1f]/80 backdrop-blur-md border border-amber-500/20 rounded-3xl p-5 flex flex-col items-center hover:bg-amber-500/10 transition-all shadow-lg text-center group">
                                           <div className="p-3 bg-amber-500/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform"><Calendar className="w-6 h-6 text-amber-400" /></div>
                                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Mavsumlar</p>
                                           <p className="text-3xl font-black text-white drop-shadow-lg">{(seasons || []).length}</p>
                                        </div>
                                   </div>

                                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mb-12">
                                       <div className="flex-1 w-full bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col items-center hover:bg-white/10 transition-colors">
                                           <div className="p-3 bg-white/5 rounded-xl mb-4 border border-white/5"><UserCircle className="w-5 h-5 text-slate-400" /></div>
                                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Username</p>
                                           <p className="text-white font-black text-base md:text-lg truncate w-full px-2">@{user?.username}</p>
                                       </div>
                                       <div className="flex-1 w-full bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col items-center hover:bg-white/10 transition-colors">
                                           <div className="p-3 bg-white/5 rounded-xl mb-4 border border-white/5"><Mail className="w-5 h-5 text-slate-400" /></div>
                                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Pochta Manzili</p>
                                           <p className="text-white font-black text-base md:text-lg truncate w-full px-2">{user?.email}</p>
                                       </div>
                                   </div>

                                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2 mt-4 text-center justify-center"><Zap className="w-3 h-3 text-amber-500" /> Tezkor Amallar</h3>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
                                       <button onClick={() => navigate('/admin/users')} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-all hover:border-indigo-500/30 group/action">
                                           <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover/action:scale-110 transition-transform"><Users className="w-6 h-6 text-indigo-400" /></div>
                                           <div className="text-left">
                                               <p className="text-white font-black text-sm uppercase tracking-widest">Foydalanuvchilar</p>
                                               <p className="text-[10px] text-slate-500 font-medium">Ro'yxatni boshqarish</p>
                                           </div>
                                       </button>
                                       <button onClick={() => navigate('/admin/requests')} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-all hover:border-amber-500/30 group/action">
                                           <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center group-hover/action:scale-110 transition-transform"><ShieldAlert className="w-6 h-6 text-amber-400" /></div>
                                           <div className="text-left">
                                               <p className="text-white font-black text-sm uppercase tracking-widest">So'rovlar</p>
                                               <p className="text-[10px] text-slate-500 font-medium">Barchasini ko'rish</p>
                                           </div>
                                       </button>
                                   </div>

                                   <button onClick={() => {
                                      setProfileForm({
                                         name: user?.name || '',
                                         username: user?.username || '',
                                         email: user?.email || '',
                                         password: user?.password || '',
                                         avatar: user?.avatar || '',
                                         field: user?.field || '',
                                         longBio: user?.longBio || '',
                                         fieldDescription: user?.fieldDescription || '',
                                         motivationQuote: user?.motivationQuote || '',
                                         skills: user?.skills?.join(', ') || '',
                                         socialLinks: user?.socialLinks || []
                                      });
                                      setIsEditingProfile(true);
                                   }} className="group/btn relative px-8 py-5 md:px-10 bg-[#0a0a0c] text-white rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 border border-indigo-500/30 hover:border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.2)] hover:shadow-[0_0_60px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto">
                                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                                      <Edit2 className="w-5 h-5 text-indigo-400 relative z-10" /> 
                                      <span className="relative z-10 mt-0.5">Ma'lumotlarni Yangilash</span>
                                   </button>
                               </div>
                           </div>
                       </div>
                   ) : (
                   <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 animate-in fade-in duration-500">
                      {/* Left Column: Avatar & Basic Info */}
                      <div className="lg:col-span-2 space-y-6 min-w-0 bg-[#0f0f12] rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden group shadow-2xl h-fit">
                           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-50"></div>

                           <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-[#1a1a1f] border border-white/5 overflow-hidden shadow-2xl mb-6 md:mb-8 relative z-10 transition-transform duration-500">
                              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <UserCircle className="w-full h-full text-slate-700 p-8 md:p-12" />}
                           </div>

                           <h2 className="text-3xl font-black text-white tracking-tight mb-1 relative z-10 break-words w-full">{user?.name}</h2>
                           {user?.role !== 'admin' && (
                              <p className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 relative z-10 px-4 py-1.5 bg-indigo-500/5 rounded-full border border-indigo-500/10 break-words w-full">{user?.field || 'Soha kiritilmagan'}</p>
                           )}
                           <p className="text-slate-500 font-bold text-sm mb-6 relative z-10 truncate w-full">@{user?.username}</p>

                           {user?.role !== 'admin' && (
                              <div className="flex flex-wrap justify-center gap-2 mb-6 relative z-10">
                                 {user?.skills?.map((s, index) => (
                                    <span key={`${s}-${index}`} className="px-4 py-1.5 bg-[#1a1a1f] text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/5 hover:border-indigo-500/30 transition-colors">
                                       {s}
                                    </span>
                                 ))}
                              </div>
                           )}

                           {/* Social Links Display */}
                           {user?.role !== 'admin' && user?.socialLinks && user.socialLinks.length > 0 && (
                              <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-10">
                                 {user.socialLinks.map((link, index) => (
                                    <a
                                       key={index}
                                       href={link.linkUrl}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="w-10 h-10 bg-[#1a1a1f] rounded-xl border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all group overflow-hidden"
                                    >
                                       {link.iconUrl ? (
                                          <img src={link.iconUrl} className="w-full h-full object-cover" />
                                       ) : (
                                          <Link2 className="w-4 h-4 text-slate-500 group-hover:text-black transition-colors" />
                                       )}
                                    </a>
                                 ))}
                              </div>
                           )}

                           {user?.role === 'curator' && (
                              <div className="grid grid-cols-2 gap-4 w-full mb-8 relative z-10">
                                 <div className="bg-[#1a1a1f] rounded-2xl p-4 border border-white/5">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">O'quvchilar</p>
                                    <p className="text-2xl font-black text-white">{uniqueStudents.length}</p>
                                 </div>
                                 <div className="bg-[#1a1a1f] rounded-2xl p-4 border border-white/5">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Reyting</p>
                                    <p className="text-2xl font-black text-white">5.0</p>
                                 </div>
                              </div>
                           )}

                           <button onClick={() => {
                              setProfileForm({
                                 name: user?.name || '',
                                 username: user?.username || '',
                                 email: user?.email || '',
                                  password: user?.password || '',
                                 avatar: user?.avatar || '',
                                 field: user?.field || '',
                                 longBio: user?.longBio || '',
                                 fieldDescription: user?.fieldDescription || '',
                                 motivationQuote: user?.motivationQuote || '',
                                 skills: user?.skills?.join(', ') || '',
                                 socialLinks: user?.socialLinks || []
                              });
                              setIsEditingProfile(true);
                           }} className="w-full mt-2 px-5 py-4 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all border border-white/5 hover:border-white/10 flex items-center justify-center gap-2 relative z-10 shadow-lg">
                              <Edit2 className="w-3.5 h-3.5" /> Tahrirlash
                           </button>
                        </div>

                        {/* Right Column: Details */}
                        {user?.role !== 'admin' && (
                           <div className="lg:col-span-3 space-y-6 flex flex-col h-full min-w-0">
                              <div className="bg-[#0f0f12] rounded-3xl border border-white/5 p-6 md:p-10 flex-1 shadow-2xl">
                              <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                                 <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                                    <Zap className="w-6 h-6 text-indigo-400" />
                                 </div>
                                 Tarjimai Hol
                              </h4>

                              <div className="mb-10">
                                 <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-4">Tarjimai Hol</h4>
                                 <p className="text-lg text-slate-300 leading-relaxed font-light whitespace-pre-wrap break-words">{user?.longBio || "Ma'lumot kiritilmagan."}</p>
                              </div>

                              {user?.role === 'curator' && (
                                 <div className="bg-[#151518] rounded-2xl p-6 border border-white/5 border-l-4 border-l-indigo-500 relative overflow-hidden shadow-lg">
                                    <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                                    <h4 className="text-[10px] font-bold uppercase text-indigo-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                                       <Info className="w-3 h-3" /> Mutaxassislik haqida
                                    </h4>
                                    <p className="text-slate-400 italic leading-relaxed relative z-10 whitespace-pre-wrap break-words">
                                       "{user?.fieldDescription || "Foydalanuvchi psixologiyasi va vizual iyerarxiya bo'yicha ekspert."}"
                                    </p>
                                 </div>
                              )}
                           </div>

                           <div className="bg-[#0f0f12] p-12 rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden min-h-[240px] shadow-2xl">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-serif text-white/5 pointer-events-none select-none">"</div>
                              <p className="text-3xl md:text-4xl font-black text-white italic text-center leading-tight relative z-10 max-w-2xl whitespace-pre-wrap break-words">
                                 "{user?.motivationQuote || 'Harakatda barakat!'}"
                              </p>
                              </div>
                           </div>
                        )}
                     </div>
                   )}

                  {user?.role === 'curator' && (
                     <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-3xl md:rounded-[48px] border border-white/5 p-6 md:p-14 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 md:mb-12">
                           <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 md:gap-4"><Users className="w-6 h-6 md:w-8 md:h-8 text-indigo-400 shrink-0" /> Jamoa O'quvchilari</h3>
                           {user.isApproved && (
                              <button onClick={() => setIsAssigningStudent(true)} className="w-full md:w-auto px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all">
                                 <Plus className="w-5 h-5" /> O'quvchi qo'shish
                              </button>
                           )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                           {uniqueStudents.length > 0 ? uniqueStudents.map(s => {
                              const fullStudent = (allUsers || []).find(u => u.id === s.id || u.name === s.name);
                              return (
                              <div key={s.id} className="p-6 md:p-8 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-indigo-500/30 transition-all shadow-lg">
                                 <div 
                                    className="flex items-center gap-6 min-w-0 flex-1 cursor-pointer"
                                    onClick={() => fullStudent && setSelectedUserForView(fullStudent)}
                                 >
                                    {s.avatar ? (
                                       <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-2xl object-cover border border-white/5 shadow-sm shrink-0" />
                                    ) : (
                                       <div className="w-12 h-12 rounded-2xl bg-[#1a1a1f] border border-white/5 flex items-center justify-center transition-all shrink-0">
                                          <UserCircle className="w-8 h-8 text-slate-700" />
                                       </div>
                                    )}
                                    <span className="font-black text-white text-sm truncate group-hover:text-indigo-400 transition-colors">{s.name}</span>
                                 </div>
                                 <button
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       if (user?.role === 'curator' && onUnassignStudent) {
                                          onUnassignStudent(s.id);
                                       } else {
                                          onRemoveStudent(s.id);
                                       }
                                    }}
                                    className="p-4 text-slate-700 hover:text-red-500 transition-all shrink-0 z-10"
                                 >
                                    <Trash2 className="w-5 h-5" />
                                 </button>
                              </div>
                           );
                           }) : (
                              <div className="col-span-full py-20 text-center text-slate-700 font-black uppercase tracking-widest text-xs border-4 border-dashed border-white/5 rounded-[3rem]">O'quvchilar yo'q</div>
                           )}
                        </div>
                     </div>
                  )}
               </div>
            )}

            {activeTab === 'panel' && (
               <div className="animate-in fade-in duration-500 space-y-16">
                  {/* Approval Check for Monitoring */}
                  {user?.role === 'curator' && !user.isApproved ? (
                     <div className="py-32 flex flex-col items-center justify-center text-center space-y-8 bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[4rem] border-dashed border border-indigo-500/20 shadow-2xl">
                        <div className="w-24 h-24 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center border border-indigo-500/20">
                           <Lock className="w-10 h-10 text-indigo-400" />
                        </div>
                        <div className="max-w-xl px-6">
                           <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Monitoring Yopiq</h2>
                           <p className="text-slate-400 text-lg leading-relaxed">
                              Sizning kuratorlik so'rovingiz hali admin tomonidan tasdiqlanmagan.
                              Profil ma'lumotlaringizni to'ldirib bo'lganingizdan so'ng, admin tasdiqlashini kuting.
                           </p>
                        </div>
                        <button onClick={() => setActiveTab('profile')} className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all">
                           <UserCircle className="w-5 h-5" /> Profilni To'ldirish
                        </button>
                     </div>
                  ) : (
                     <>
                        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
                           <div>
                              <h2 className="text-indigo-500 font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px] mb-2 md:mb-4 flex items-center gap-2"><Layout className="w-4 h-4" /> Boshqaruv Markazi</h2>
                              <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter">Hafta #{selectedWeek.toString().padStart(2, '0')}</h1>
                           </div>
                        </div>

                        {/* New Header Container with Season Selector */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2 md:px-4">
                           <div className="flex items-center gap-3 md:gap-4">
                              <div className="p-2.5 md:p-3 bg-indigo-600/20 rounded-2xl text-indigo-400 border border-indigo-500/20"><Activity className="w-5 h-5 md:w-6 md:h-6" /></div>
                              <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-widest">Joriy Monitoring</h3>
                              {user?.role === 'curator' && selectedSeason === activeSeasonId && (
                                 <button
                                    onClick={() => setIsAddingStudent(true)}
                                    className="ml-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
                                 >
                                    <Plus className="w-4 h-4" /> Reja qo'shish
                                 </button>
                              )}
                           </div>

                           <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                              {/* New Week Selector */}
                              <div className="flex items-center bg-[#121214] border border-white/5 rounded-2xl p-1 h-[52px] w-full sm:w-auto justify-between sm:justify-center shadow-xl">
                                 <button disabled={selectedWeek === 1} onClick={() => setSelectedWeek(w => w - 1)} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all disabled:opacity-20 active:scale-90">
                                    <ChevronLeft className="w-5 h-5" />
                                 </button>
                                 <div className="px-6 flex flex-col items-center justify-center border-x border-white/5 h-2/3 min-w-[100px]">
                                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] leading-none mb-1">Haftalik</span>
                                    <span className="text-xl font-black text-white leading-none">#0{selectedWeek}</span>
                                 </div>
                                 <button disabled={selectedWeek >= (seasons.find(s => s.id === selectedSeason)?.durationInMonths || 3) * 4} onClick={() => setSelectedWeek(w => w + 1)} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all disabled:opacity-20 active:scale-90">
                                    <ChevronRight className="w-5 h-5" />
                                 </button>
                              </div>

                              {/* Season Selector */}
                              <div className="w-full sm:w-auto">
                                 <CustomDropdown
                                    className="w-full sm:w-[240px]"
                                    options={seasons.map(s => ({
                                       value: s.id,
                                       label: `Mavsum #${s.number}`,
                                       icon: <div className={`w-2 h-2 rounded-full ${s.isActive ? 'bg-green-500 animate-pulse' : 'bg-indigo-500'}`} />
                                    }))}
                                    value={selectedSeason}
                                    onChange={setSelectedSeason}
                                    placeholder="Mavsum tanlang"
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-12">
                           {user?.role === 'admin' ? (
                              curatorsWithProgress.length > 0 ? curatorsWithProgress.map(({ curator, progress }, index) => (
                                 <div key={curator?.id || `unknown-${index}`} className="space-y-6">
                                    <div
                                       className="flex flex-col sm:flex-row items-center justify-between p-4 sm:px-8 sm:py-6 bg-indigo-600/10 border border-indigo-500/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg cursor-pointer hover:bg-indigo-600/20 transition-all gap-4"
                                       onClick={() => curator && setSelectedUserForView(curator)}
                                    >
                                       <div className="flex items-center gap-3 sm:gap-6 min-w-0 w-full sm:w-auto flex-1">
                                          {curator?.avatar ? (
                                             <img src={curator.avatar} alt={curator.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover shadow-xl border border-white/5 shrink-0" />
                                          ) : (
                                             <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-xl shrink-0">
                                                {curator?.name?.[0] || '?'}
                                             </div>
                                          )}
                                          <div className="min-w-0 flex-1">
                                             <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight break-words">{curator?.name || 'Noma\'lum Kurator'}</h3>
                                             <p className="text-[9px] sm:text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] truncate">Mas'ul Kurator</p>
                                          </div>
                                       </div>
                                       <div className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-white/5 rounded-xl sm:rounded-2xl border border-white/5 flex items-center justify-center sm:justify-start">
                                          <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mr-3">O'quvchilar:</span>
                                          <span className="text-base sm:text-lg font-black text-white">{progress.length}</span>
                                       </div>
                                    </div>

                                    <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-3xl md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-[#0a0a0c]/60">
                                       {/* Desktop Table */}
                                       <div className="hidden lg:block w-full overflow-x-auto">
                                          <table className="w-full text-left border-collapse table-fixed">
                                             <thead>
                                                <tr className="bg-white/[0.04] border-b border-white/5">
                                                   <th className="w-[18%] px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">O'quvchi</th>
                                                   <th className="w-[14%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Uchrashuv</th>
                                                   <th className="w-[18%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Haftalik Maqsad</th>
                                                   <th className="w-[14%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Asosiy Muammo</th>
                                                   <th className="w-[14%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Berilgan Yechim</th>
                                                   <th className="w-[10%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Holat</th>
                                                   <th className="w-[12%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Amal</th>
                                                </tr>
                                             </thead>
                                             <tbody className="divide-y divide-white/5">
                                                {progress.map((item) => {
                                                   const student = (allUsers || []).find(u => u.name === item.studentName);
                                                   return (
                                                      <tr key={item.id} className="hover:bg-indigo-600/[0.03] transition-all duration-300">
                                                         <td className="px-10 py-8">
                                                            <div className="flex items-center gap-4 cursor-pointer group/name" onClick={() => student && setSelectedUserForView(student)}>
                                                               <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/10 flex items-center justify-center text-sm text-indigo-400 font-black group-hover/name:bg-indigo-600 group-hover/name:text-white transition-all">{item.studentName?.[0]}</div>
                                                               <p className="text-base font-black text-white group-hover/name:text-indigo-400 transition-colors break-words">{item.studentName}</p>
                                                            </div>
                                                         </td>
                                                         <td className="px-6 py-8">
                                                            <div className="flex flex-col gap-1.5">
                                                               <p className="text-[11px] text-indigo-300 font-black uppercase tracking-widest flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatMeetingDay(item.meetingDay)}</p>
                                                               <p className={`text-[9px] font-black uppercase tracking-widest ${item.attended ? 'text-green-500' : 'text-red-500'}`}>{item.attended ? 'Ishtirok etdi' : 'Ishtirok etmadi'}</p>
                                                            </div>
                                                         </td>
                                                         <td className="px-6 py-8"><p className="text-[13px] text-slate-300 leading-relaxed font-medium break-words">{item.weeklyGoal || 'Kiritilmagan'}</p></td>
                                                         <td className="px-6 py-8"><p className={`text-[13px] leading-relaxed font-medium ${!item.difficulty || item.difficulty === "Yo'q" ? 'text-slate-500' : 'text-slate-300'}`}>{item.difficulty || "Yo'q"}</p></td>
                                                         <td className="px-6 py-8"><p className={`text-[13px] leading-relaxed font-medium break-words ${!item.solution ? 'text-slate-500 italic' : 'text-slate-300'}`}>{item.solution || 'Kutilmoqda'}</p></td>
                                                         <td className="px-6 py-8"><span className={`px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all shadow-sm ${getStatusStyle(item.status)}`}>{item.status}</span></td>
                                                         <td className="px-6 py-8 text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                               <button onClick={() => handleEditStudent(item)} className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5"><Edit2 className="w-4 h-4" /></button>
                                                            </div>
                                                         </td>
                                                      </tr>
                                                   );
                                                })}
                                             </tbody>
                                          </table>
                                       </div>
                                       {/* Mobile Cards */}
                                       <div className="lg:hidden p-4 md:p-6 space-y-6">
                                          {progress.map((item) => {
                                             const sName = item.studentName || (item as any).student_name;
                                             const student = (allUsers || []).find(u => u.name === sName);
                                             return (
                                                <div key={item.id} className="p-4 sm:p-6 bg-white/5 border border-white/5 rounded-2xl space-y-5 shadow-xl">
                                                   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                                                      <div className="flex items-center gap-3 cursor-pointer min-w-0 flex-1" onClick={() => student && setSelectedUserForView(student)}>
                                                         <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center font-black text-indigo-400 text-xs border border-indigo-500/20 shrink-0">{sName?.[0] || 'O'}</div>
                                                         <div className="min-w-0 flex-1">
                                                            <span className="font-black text-white text-sm block truncate">{sName}</span>
                                                            <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5"><Calendar className="w-3 h-3 shrink-0" /><span className="truncate">{formatMeetingDay(item.meetingDay || (item as any).meeting_day)}</span></span>
                                                         </div>
                                                      </div>
                                                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                                                         <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase border ${getStatusStyle(item.status)}`}>{item.status}</span>
                                                      </div>
                                                   </div>
                                                   <div className="space-y-4">
                                                      <div className="space-y-1">
                                                         <p className="text-[9px] font-black uppercase text-indigo-400 tracking-widest flex items-center gap-2"><Target className="w-3 h-3" /> Maqsad</p>
                                                         <p className="text-[13px] text-slate-300 leading-relaxed font-medium bg-white/5 p-3 rounded-xl break-words whitespace-pre-wrap">{(item.weeklyGoal || (item as any).weekly_goal) || 'Kiritilmagan'}</p>
                                                      </div>
                                                      <div className="grid grid-cols-1 gap-3">
                                                         <div className="space-y-1">
                                                            <p className="text-[9px] font-black uppercase text-orange-400 tracking-widest flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> Muammo</p>
                                                            <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                                                               <p className={`text-[12px] leading-relaxed font-bold break-words ${!(item.difficulty || (item as any).difficulty) || (item.difficulty || (item as any).difficulty) === "Yo'q" ? 'text-slate-600 italic' : 'text-orange-300'}`}>{(item.difficulty || (item as any).difficulty) || "Yo'q"}</p>
                                                            </div>
                                                         </div>
                                                         <div className="space-y-1">
                                                            <p className="text-[9px] font-black uppercase text-green-400 tracking-widest flex items-center gap-2"><Lightbulb className="w-3 h-3" /> Yechim</p>
                                                            <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                                                               <p className={`text-[12px] leading-relaxed font-bold break-words ${!(item.solution || (item as any).solution) ? 'text-slate-600 italic' : 'text-green-300'}`}>{(item.solution || (item as any).solution) || 'Kutilmoqda'}</p>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Davomat: {item.attended ? <span className="text-green-500">Faol</span> : <span className="text-red-500">Yo'q</span>}</div>
                                                      <button onClick={() => handleEditStudent(item)} className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all border border-white/5"><Edit2 className="w-4 h-4" /></button>
                                                   </div>
                                                </div>
                                             );
                                          })}
                                       </div>
                                    </div>
                                 </div>
                              )) : (
                                 (!isLoading ? (
                                   <div className="py-32 text-center bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[3rem] border-dashed border-2 border-white/5">
                                      <Activity className="w-16 h-16 text-slate-800 mx-auto mb-6 opacity-20" />
                                      <p className="text-xl font-black text-slate-700 uppercase tracking-widest">Ma'lumotlar mavjud emas</p>
                                   </div>
                                 ) : null)
                              )
                           ) : (
                              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-3xl md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-[#0a0a0c]/60">
                                 {/* Desktop Table */}
                                 <div className="hidden lg:block w-full overflow-x-auto">
                                    <table className="w-full text-left border-collapse table-fixed">
                                       <thead>
                                          <tr className="bg-white/[0.04] border-b border-white/5">
                                             <th className="py-6 px-8 text-[10px] font-black uppercase text-slate-500 tracking-widest w-[16%]">O'quvchi</th>
                                             <th className="py-6 px-8 text-[10px] font-black uppercase text-slate-500 tracking-widest w-[12%]">Uchrashuv</th>
                                             <th className={`py-6 px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest ${user?.role === 'student' ? 'w-[13%]' : 'w-[18%]'}`}>Maqsad</th>
                                             <th className={`py-6 px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest ${user?.role === 'student' ? 'w-[13%]' : 'w-[18%]'}`}>Muammo</th>
                                             <th className={`py-6 px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest ${user?.role === 'student' ? 'w-[13%]' : 'w-[18%]'}`}>Yechim</th>
                                             {user?.role === 'student' && <th className="py-6 px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest w-[15%]">Kurator</th>}
                                             <th className="py-6 px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest w-[8%] text-center">Holat</th>
                                             <th className="py-6 px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest w-[10%] text-center">Amal</th>
                                          </tr>
                                       </thead>
                                       <tbody className="divide-y divide-white/5">
                                          {filteredProgress.length > 0 ? filteredProgress.map((item) => {
                                             const sName = item.studentName || (item as any).student_name;
                                             const student = (allUsers || []).find(u => u.name === sName);
                                             const cId = item.curatorId || (item as any).curator_id;
                                             const reportCurator = (allUsers || []).find(u => String(u.id) === String(cId));
                                             const isStartup = reportCurator?.field === 'StartUp Community';
                                             
                                             return (
                                                <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                                                   <td className="py-6 px-8">
                                                      <div className="flex items-center gap-4 cursor-pointer" onClick={() => student && setSelectedUserForView(student)}>
                                                         <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center font-black text-indigo-400 text-xs border border-indigo-500/20 shrink-0">{(sName || '?')[0]}</div>
                                                         <div className="font-black text-white text-sm truncate">{sName}</div>
                                                      </div>
                                                   </td>
                                                   <td className="py-6 px-8">
                                                      <div className="flex flex-col gap-1">
                                                         <p className="text-[11px] text-indigo-300 font-black uppercase tracking-widest flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {formatMeetingDay(item.meetingDay || (item as any).meeting_day)}</p>
                                                         <p className={`text-[9px] font-black uppercase ${item.attended ? 'text-green-500' : 'text-red-500'}`}>{item.attended ? 'Bor' : "Yo'q"}</p>
                                                      </div>
                                                   </td>
                                                   <td className="py-6 px-4"><div className="w-full"><p className="text-xs text-slate-400 whitespace-pre-wrap break-words">{item.weeklyGoal || 'Kiritilmagan'}</p></div></td>
                                                   <td className="py-6 px-4"><div className="w-full"><p className="text-xs text-orange-300 whitespace-pre-wrap break-words">{item.difficulty || "Yo'q"}</p></div></td>
                                                   <td className="py-6 px-4"><div className="w-full"><p className="text-xs text-green-300 whitespace-pre-wrap break-words">{item.solution || 'Kutilmoqda'}</p></div></td>
                                                   {user?.role === 'student' && (
                                                      <td className="py-6 px-8">
                                                         <div className="flex flex-col gap-1">
                                                            <span className={`text-[9px] font-black uppercase tracking-widest ${isStartup ? 'text-pink-400' : 'text-indigo-400'}`}>
                                                               {isStartup ? 'StartUp Kurator' : 'Asosiy Kurator'}
                                                            </span>
                                                            <span className="text-[11px] font-bold text-slate-300 truncate">{reportCurator?.name || '—'}</span>
                                                         </div>
                                                      </td>
                                                   )}
                                                   <td className="py-6 px-8 text-center"><span className={`px-4 py-2 rounded-xl text-[9px] font-black border ${getStatusStyle(item.status)}`}>{item.status}</span></td>
                                                   <td className="py-6 px-2 text-center">
                                                      <div className="flex gap-2 justify-center items-center min-w-fit px-2">
                                                         <button onClick={() => handleEditStudent(item)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-slate-400 hover:text-white transition-all shadow-sm shrink-0"><Edit2 className="w-4 h-4" /></button>
                                                         {user?.role !== 'student' && (
                                                            <button onClick={() => onRemoveStudent(item.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 text-red-400 hover:text-red-300 transition-all shadow-sm shrink-0"><Trash2 className="w-4 h-4" /></button>
                                                         )}
                                                      </div>
                                                   </td>
                                                </tr>
                                             );
                                          }) : (!isLoading ? (<tr><td colSpan={8} className="py-12 text-center text-slate-500 italic">Hozircha ma'lumot yo'q</td></tr>) : null)}
                                       </tbody>
                                    </table>
                                 </div>
                                 {/* Mobile Cards */}
                                 <div className="lg:hidden p-4 md:p-6 space-y-6">
                                    {filteredProgress.length > 0 ? filteredProgress.map((item) => {
                                       const sName = item.studentName || (item as any).student_name;
                                       const student = (allUsers || []).find(u => u.name === sName);
                                       const cId = item.curatorId || (item as any).curator_id;
                                       const reportCurator = (allUsers || []).find(u => String(u.id) === String(cId));
                                       const isStartup = reportCurator?.field === 'StartUp Community';
                                       return (
                                          <div key={item.id} className="p-4 sm:p-6 bg-white/5 border border-white/5 rounded-2xl space-y-5 shadow-xl">
                                             <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                                                <div className="flex items-center gap-3 cursor-pointer min-w-0 flex-1" onClick={() => student && setSelectedUserForView(student)}>
                                                   <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center font-black text-indigo-400 text-xs border border-indigo-500/20 shrink-0">{sName?.[0] || 'O'}</div>
                                                   <div className="min-w-0 flex-1">
                                                      <span className="font-black text-white text-sm block truncate">{sName}</span>
                                                      <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5"><Calendar className="w-3 h-3 shrink-0" /><span className="truncate">{formatMeetingDay(item.meetingDay || (item as any).meeting_day)}</span></span>
                                                   </div>
                                                </div>
                                                <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase border shrink-0 ${getStatusStyle(item.status)}`}>{item.status}</span>
                                             </div>
                                             <div className="space-y-3">
                                                <div className="space-y-1">
                                                   <p className="text-[9px] font-black uppercase text-indigo-400 tracking-widest flex items-center gap-2"><Target className="w-3 h-3" /> Maqsad</p>
                                                   <p className="text-[13px] text-slate-300 leading-relaxed font-medium bg-white/5 p-3 rounded-xl break-words whitespace-pre-wrap">{(item.weeklyGoal || (item as any).weekly_goal) || 'Kiritilmagan'}</p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                   <div className="space-y-1">
                                                      <p className="text-[9px] font-black uppercase text-orange-400 tracking-widest flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> Muammo</p>
                                                      <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                                                         <p className={`text-[12px] leading-relaxed font-bold break-words ${!(item.difficulty || (item as any).difficulty) || (item.difficulty || (item as any).difficulty) === "Yo'q" ? 'text-slate-600 italic' : 'text-orange-300'}`}>{(item.difficulty || (item as any).difficulty) || "Yo'q"}</p>
                                                      </div>
                                                   </div>
                                                   <div className="space-y-1">
                                                      <p className="text-[9px] font-black uppercase text-green-400 tracking-widest flex items-center gap-2"><Lightbulb className="w-3 h-3" /> Yechim</p>
                                                      <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                                                         <p className={`text-[12px] leading-relaxed font-bold break-words ${!(item.solution || (item as any).solution) ? 'text-slate-600 italic' : 'text-green-300'}`}>{(item.solution || (item as any).solution) || 'Kutilmoqda'}</p>
                                                      </div>
                                                   </div>
                                                </div>
                                                {user?.role === 'student' && (
                                                   <div className="space-y-1">
                                                      <p className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${isStartup ? 'text-pink-400' : 'text-indigo-400'}`}><Users className="w-3 h-3" /> Kurator</p>
                                                      <div className={`p-3 rounded-xl border ${isStartup ? 'bg-pink-500/5 border-pink-500/10' : 'bg-indigo-500/5 border-indigo-500/10'}`}>
                                                         <p className={`text-[8px] font-black uppercase mb-0.5 ${isStartup ? 'text-pink-400' : 'text-indigo-400'}`}>{isStartup ? 'StartUp Kurator' : 'Asosiy Kurator'}</p>
                                                         <p className="text-[12px] font-bold text-white leading-none">{reportCurator?.name || '—'}</p>
                                                      </div>
                                                   </div>
                                                )}
                                             </div>
                                             <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Davomat: {item.attended ? <span className="text-green-500">Faol</span> : <span className="text-red-500">Yo'q</span>}</div>
                                                <div className="flex gap-2">
                                                   <button onClick={() => handleEditStudent(item)} className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all border border-white/5"><Edit2 className="w-4 h-4" /></button>
                                                   {user?.role !== 'student' && (
                                                      <button onClick={() => onRemoveStudent(item.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all border border-red-500/20"><Trash2 className="w-4 h-4" /></button>
                                                   )}
                                                </div>
                                             </div>
                                          </div>
                                       );
                                    }) : (
                                       (!isLoading ? (
                                         <div className="py-12 text-center">
                                            <Activity className="w-12 h-12 text-slate-800 mx-auto mb-4 opacity-20" />
                                            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Ma'lumotlar mavjud emas</p>
                                         </div>
                                       ) : null)
                                    )}
                                 </div>
                              </div>
                           )}
                           <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                              <div className="text-center sm:text-left">
                                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                                    <Zap className="w-3 h-3 text-purple-400" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-purple-300">Vizual Xotiralar</span>
                                 </div>
                                 <h3 className="text-3xl md:text-5xl font-black text-white flex items-center justify-center sm:justify-start gap-4 tracking-tighter mb-2">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-500">Uchrashuvdan</span>
                                    <span className="text-purple-500">Lavhalar</span>
                                 </h3>
                                 <p className="text-slate-400 text-sm font-medium max-w-md">
                                    Hafta #0{selectedWeek} davomida o'tkazilgan uchrashuvlardan esda qolarli onlarni tomosha qiling.
                                 </p>
                              </div>
                              {canUpload && (
                                 <>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    <button
                                       onClick={() => fileInputRef.current?.click()}
                                       className="group relative px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase flex items-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                    >
                                       <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                       <UploadCloud className="w-5 h-5 relative z-10 group-hover:text-white transition-colors" />
                                       <span className="relative z-10 group-hover:text-white transition-colors">Rasm Yuklash</span>
                                    </button>
                                 </>
                              )}
                           </div>

                           <div className="min-h-[300px] bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[3rem] p-4 md:p-8 bg-[#0a0a0c]/40 relative overflow-hidden shadow-2xl">
                              {filteredHighlights.length > 0 ? (
                                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                                    {filteredHighlights.map((highlight) => {
                                       const uploader = (allUsers || []).find(u => String(u.id) === String(highlight.curatorId));
                                       const isStartupUploader = uploader?.field === 'StartUp Community';
                                       
                                       return (
                                          <div
                                             key={highlight.id}
                                             className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 bg-[#121214] transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-2 shadow-xl"
                                          >
                                             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity z-10 duration-300 pointer-events-none"></div>
                                             <img
                                                src={highlight.image || highlight.photoUrl}
                                                alt="Highlight"
                                                onClick={() => setSelectedImage(highlight.image || highlight.photoUrl)}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                                             />
                                             <div className="absolute top-4 right-4 z-20 flex gap-2">
                                                <div
                                                   className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/5 text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-white/20"
                                                   onClick={(e) => { e.stopPropagation(); setSelectedImage(highlight.image || highlight.photoUrl); }}
                                                >
                                                   <Maximize2 className="w-5 h-5" />
                                                </div>
                                                {(user?.role === 'admin' || user?.id === highlight.curatorId) && (
                                                   <div
                                                      className="w-10 h-10 bg-red-500/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/5 text-white cursor-pointer hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto"
                                                      onClick={(e) => { e.stopPropagation(); onRemoveHighlight(highlight.id); }}
                                                   >
                                                      <Trash2 className="w-5 h-5" />
                                                   </div>
                                                )}
                                             </div>
                                             <div className="absolute bottom-0 inset-x-0 p-5 z-20 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                <div className="flex flex-col gap-1">
                                                   <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md w-fit ${isStartupUploader ? 'bg-pink-500/20 text-pink-400 border border-pink-500/20' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20'}`}>
                                                      {isStartupUploader ? 'StartUp Kurator' : 'Asosiy Kurator'}
                                                   </span>
                                                   <p className="text-white font-black text-xs truncate uppercase tracking-widest drop-shadow-lg">{highlight.uploadedBy}</p>
                                                </div>
                                             </div>
                                          </div>
                                       );
                                    })}
                                    {canUpload && (
                                       <div
                                          onClick={() => fileInputRef.current?.click()}
                                          className="aspect-[4/5] rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-6 gap-4 group cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all shadow-inner"
                                       >
                                          <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform text-slate-500 group-hover:text-purple-400">
                                             <Plus className="w-6 h-6" />
                                          </div>
                                          <p className="text-[10px] font-black uppercase text-slate-500 group-hover:text-purple-300 transition-colors">Yangi rasm qo'shish</p>
                                       </div>
                                    )}
                                 </div>
                              ) : (
                                 <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center max-w-sm px-6">
                                       <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/5 relative">
                                          <ImageIcon className="w-8 h-8 text-slate-600" />
                                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                                             <Info className="w-3 h-3 text-purple-400" />
                                          </div>
                                       </div>
                                       <h4 className="text-xl font-black text-white mb-2">Hozircha bo'shliq</h4>
                                       <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                          Hafta #0{selectedWeek} uchun hali hech qanday rasm yuklanmagan.
                                          {canUpload ? " Birinchi bo'lib siz yuklang!" : " Kuratorlar tez orada yuklashadi."}
                                       </p>
                                       {canUpload && (
                                          <button
                                             onClick={() => fileInputRef.current?.click()}
                                             className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-xs transition-all shadow-lg shadow-purple-600/20"
                                          >
                                             Rasm Yuklash
                                          </button>
                                       )}
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     </>
                  )}
               </div>
            )}
            {activeTab === 'notifications' && (
               <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
                  <div className="flex items-center justify-between">
                     <h2 className="text-4xl font-black text-white flex items-center gap-4">
                        <Bell className="w-10 h-10 text-purple-400" /> Bildirishnomalar
                     </h2>
                     <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-6">
                        {unreadCount > 0 && (
                           <button 
                              onClick={onMarkAllRead}
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-indigo-400 hover:text-indigo-300 rounded-xl border border-white/5 transition-all"
                           >
                              Barchasini o'qilgan deb belgilash
                           </button>
                        )}
                        Jami {filteredNotifications.length} ta xabar
                     </span>
                  </div>

                  <div className="space-y-6">
                     {filteredNotifications.length > 0 ? filteredNotifications.map((notif) => (
                        <div
                           key={notif.id}
                           onClick={() => onMarkRead?.(notif.id)}
                           className={`relative p-6 md:p-8 rounded-[2.5rem] border transition-all cursor-pointer group ${notif.isRead
                              ? 'bg-white/[0.02] border-white/5 opacity-70'
                              : 'bg-indigo-600/[0.04] border-indigo-500/10 shadow-2xl'
                              }`}
                        >
                           {!notif.isRead && (
                              <div className="absolute top-6 right-6 w-3 h-3 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                           )}

                           <div className="flex items-start gap-6">
                              <div className={`p-4 rounded-2xl shrink-0 ${notif.type === 'urgent' ? 'bg-red-500/10' :
                                 notif.type === 'success' ? 'bg-green-500/10' :
                                    notif.type === 'warning' ? 'bg-orange-500/10' : 'bg-blue-500/10'
                                 }`}>
                                 {getNotificationIcon(notif.type)}
                              </div>

                              <div className="flex-1 min-w-0">
                                 <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-black text-white break-words group-hover:text-indigo-400 transition-colors">
                                       {notif.title}
                                    </h3>
                                    <span className="text-[10px] font-bold text-slate-600 shrink-0 uppercase tracking-widest">
                                       {new Date(notif.timestamp || (notif as any).createdAt || Date.now()).toLocaleDateString()}
                                    </span>
                                 </div>
                                 <p className="text-slate-400 break-words leading-relaxed font-medium">
                                    {notif.message}
                                 </p>
                                 <div className="mt-4 flex items-center gap-2">
                                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">Yuboruvchi:</span>
                                    <span className="text-[9px] font-black text-indigo-400 break-words uppercase tracking-widest">{notif.sender}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )) : (
                        <div className="py-32 text-center bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[3rem] border-dashed border-2 border-white/5">
                           <Bell className="w-16 h-16 text-slate-800 mx-auto mb-6 opacity-20" />
                           <p className="text-xl font-black text-slate-700 uppercase tracking-widest">Hozircha bildirishnomalar yo'q</p>
                        </div>
                     )}
                  </div>
               </div>
            )}

            {/* ULTRA-PREMIUM USER DETAIL MODAL IN DASHBOARD */}
            {selectedUserForView && (
               <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-3xl overflow-y-auto p-4 py-4 md:py-10 px-3 md:px-10 animate-in fade-in zoom-in duration-500">
                  <div className="flex min-h-full items-start md:items-center justify-center">
                     <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 w-full max-w-5xl rounded-2xl md:rounded-[3rem] lg:rounded-[4.5rem] relative shadow-[0_0_100px_rgba(79,70,229,0.15)] overflow-hidden">
                        <button onClick={() => setSelectedUserForView(null)} className="absolute top-3 right-3 md:top-8 md:right-8 p-3 md:p-3.5 bg-white/5 text-slate-400 hover:text-white hover:bg-red-500/20 rounded-full transition-all border border-white/5 z-30 group"><X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform" /></button>
                        <div className="p-4 sm:p-6 md:p-16">
                           <div className="flex flex-col lg:flex-row items-center gap-5 md:gap-12 mb-6 md:mb-16 border-b border-white/5 pb-6 md:pb-16">
                              <div className="relative group shrink-0">
                                 <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[3.5rem] md:rounded-[4.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                 <div className="w-32 h-32 md:w-56 md:h-56 rounded-[3rem] md:rounded-[4.5rem] bg-[#121214] border-4 border-white/5 overflow-hidden flex items-center justify-center text-indigo-400 text-5xl md:text-7xl font-black shadow-2xl relative z-10 transition-transform group-hover:scale-[1.02] duration-500">
                                    {selectedUserForView.avatar ? (<img src={selectedUserForView.avatar} className="w-full h-full object-cover" alt={selectedUserForView.name} />) : (selectedUserForView.name || selectedUserForView.username || '?')[0].toUpperCase()}
                                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-[#121214] z-20">
                                       {selectedUserForView.status === 'active' ? <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" /> : <Clock className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse" />}
                                    </div>
                                 </div>
                              </div>
                              <div className="text-center lg:text-left flex-1 space-y-6">
                                 <div className="space-y-2">
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-2">
                                       <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${getRoleStyle(selectedUserForView.role)}`}>{selectedUserForView.role}</span>
                                       <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${getUserStatusStyle(selectedUserForView.status)}`}>{selectedUserForView.status === 'active' ? 'Faol' : selectedUserForView.status === 'inactive' ? 'Passiv' : 'Kutilmoqda'}</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-2xl md:text-7xl font-black text-white tracking-tighter leading-none break-words">{selectedUserForView.name}</h2>
                                    <p className="text-xl md:text-3xl font-bold text-slate-500 tracking-tight break-words">@{selectedUserForView.username}</p>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                                    <div className="flex items-center gap-4 bg-white/[0.03] p-5 rounded-3xl border border-white/5 hover:bg-white/[0.06] transition-all"><div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-400"><Mail className="w-5 h-5" /></div><div className="overflow-hidden"><p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-1">Elektron Pochta</p><p className="text-slate-300 break-words font-bold text-sm truncate">{selectedUserForView.email}</p></div></div>
                                    <div className="flex items-center gap-4 bg-white/[0.03] p-5 rounded-3xl border border-white/5 hover:bg-white/[0.06] transition-all"><div className="p-3 bg-purple-600/10 rounded-2xl text-purple-400"><Briefcase className="w-5 h-5" /></div><div className="overflow-hidden"><p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-1">Mutaxassislik</p><p className="text-slate-300 break-words font-bold text-sm truncate">{selectedUserForView.field || 'Generalist'}</p></div></div>
                                 </div>
                              </div>
                           </div>
                           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                              <div className="lg:col-span-2 space-y-8">
                                 <div className="space-y-4">
                                    <h4 className="text-[11px] break-words font-black uppercase text-slate-500 tracking-[0.4em] flex items-center gap-3"><FileText className="w-5 h-5 text-indigo-500" /> Professional Bio</h4>
                                    <div className="relative group"><div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition-all"></div><div className="relative p-6 md:p-10 bg-[#121214]/50 border border-white/5 rounded-[2.5rem] min-h-[160px]"><Quote className="w-10 h-10 text-white/5 absolute top-8 left-8" /><p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-medium italic relative z-10 whitespace-pre-wrap break-words">"{selectedUserForView.longBio || 'Ma\'lumot kiritilmagan.'}"</p><Quote className="w-10 h-10 text-white/5 absolute bottom-8 right-8 rotate-180" /></div></div>
                                 </div>
                                 <div className="space-y-4">
                                    <h4 className="text-[11px] break-words font-black uppercase text-slate-500 tracking-[0.4em] flex items-center gap-3"><Info className="w-5 h-5 text-indigo-500" /> Mutaxassislik Haqida</h4>
                                    <div className="p-8 bg-[#121214]/50 border border-white/5 rounded-[2.5rem]">
                                       <p className="text-lg text-slate-300 leading-relaxed font-medium whitespace-pre-wrap break-words">"{selectedUserForView.fieldDescription || "Ma'lumot kiritilmagan."}"</p>
                                    </div>
                                 </div>

                                 <div className="space-y-4">
                                    <h4 className="text-[11px] break-words font-black uppercase text-slate-500 tracking-[0.4em] flex items-center gap-3"><Link2 className="w-5 h-5 text-purple-500" /> Buddy Tarmoq Ma'lumotlari</h4>
                                    {selectedUserForView.role === 'student' ? (
                                       <div className="flex flex-col gap-4">
                                          {getAssignedCurator(selectedUserForView) && (
                                             <div className="p-8 bg-purple-600/5 border border-purple-500/10 rounded-3xl flex flex-col md:flex-row items-center gap-8 group cursor-pointer hover:border-purple-500/30 transition-all" onClick={() => { const curator = getAssignedCurator(selectedUserForView); if (curator) setSelectedUserForView(curator); }}><div className="w-24 h-24 rounded-2xl bg-white/5 overflow-hidden flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">{getAssignedCurator(selectedUserForView)?.avatar ? (<img src={getAssignedCurator(selectedUserForView)?.avatar} className="w-full h-full object-cover" />) : <UserCircle className="w-12 h-12 text-slate-700" />}</div><div className="text-center md:text-left min-w-0 flex-1"><p className="text-[10px] font-black uppercase text-purple-400 tracking-widest mb-1">Mas'ul Kurator (Asosiy Buddy)</p><h5 className="text-2xl font-black text-white break-words whitespace-normal break-words mb-2">{getAssignedCurator(selectedUserForView)?.name || 'Noma\'lum'}</h5><p className="text-sm text-slate-400 break-words whitespace-normal font-medium">Bu o'quvchi {getAssignedCurator(selectedUserForView)?.name || 'mentor'} nazorati ostida ish olib bormoqda.</p></div><div className="ml-auto hidden md:block shrink-0"><ChevronRight className="w-8 h-8 text-slate-800 group-hover:text-purple-500 transition-colors" /></div></div>
                                          )}
                                          {getStartupCurator(selectedUserForView) && (
                                             <div className="p-8 bg-pink-600/5 border border-pink-500/10 rounded-3xl flex flex-col md:flex-row items-center gap-8 group cursor-pointer hover:border-pink-500/30 transition-all" onClick={() => { const curator = getStartupCurator(selectedUserForView); if (curator) setSelectedUserForView(curator); }}><div className="w-24 h-24 rounded-2xl bg-white/5 overflow-hidden flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">{getStartupCurator(selectedUserForView)?.avatar ? (<img src={getStartupCurator(selectedUserForView)?.avatar} className="w-full h-full object-cover" />) : <UserCircle className="w-12 h-12 text-slate-700" />}</div><div className="text-center md:text-left min-w-0 flex-1"><p className="text-[10px] font-black uppercase text-pink-400 tracking-widest mb-1">Mas'ul Kurator (Startup Buddy)</p><h5 className="text-2xl font-black text-white break-words whitespace-normal break-words mb-2">{getStartupCurator(selectedUserForView)?.name || 'Noma\'lum'}</h5><p className="text-sm text-slate-400 break-words whitespace-normal font-medium">Bu o'quvchi {getStartupCurator(selectedUserForView)?.name || 'mentor'} nazorati ostida ish olib bormoqda.</p></div><div className="ml-auto hidden md:block shrink-0"><ChevronRight className="w-8 h-8 text-slate-800 group-hover:text-pink-500 transition-colors" /></div></div>
                                          )}
                                          {!getAssignedCurator(selectedUserForView) && !getStartupCurator(selectedUserForView) && (
                                             <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl text-center"><p className="text-slate-500 font-bold text-sm italic">Hali kurator biriktirilmagan.</p></div>
                                          )}
                                       </div>
                                    ) : selectedUserForView.role === 'curator' ? (<div className="space-y-4"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{getAssignedStudents(selectedUserForView).length > 0 ? (getAssignedStudents(selectedUserForView).map(student => (<div key={student.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer group/st" onClick={() => setSelectedUserForView(student)}><div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-xs font-black text-indigo-400 group-hover/st:bg-indigo-600 group-hover/st:text-white transition-all">{(student.name || student.username || '?')[0].toUpperCase()}</div><div className="truncate flex-1 min-w-0"><p className="text-sm font-black text-white break-words whitespace-normal">{student.name || student.username}</p><p className="text-[10px] text-slate-500 font-bold">O'quvchi</p></div></div>))) : (<div className="col-span-full py-10 text-center border-2 border-dashed border-white/5 rounded-3xl"><p className="text-slate-700 font-bold text-xs uppercase tracking-widest">Hozircha o'quvchilar biriktirilmagan</p></div>)}</div></div>) : (<div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl text-center"><p className="text-slate-500 font-bold text-sm italic">Adminlar global nazorat huquqiga ega.</p></div>)}
                                 </div>

                                 <div className="space-y-4">
                                    <h4 className="text-[11px] break-words font-black uppercase text-slate-500 tracking-[0.4em] flex items-center gap-3"><Quote className="w-5 h-5 text-indigo-500" /> Motivatsion So'z</h4>
                                    <div className="p-8 bg-[#121214]/50 border border-white/5 rounded-[2.5rem]">
                                       <p className="text-xl text-white leading-relaxed font-black italic text-center whitespace-pre-wrap break-words">"{selectedUserForView.motivationQuote || "Harakatda barakat!"}"</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="space-y-10">
                                 <div className="space-y-6"><h4 className="text-[11px] break-words font-black uppercase text-slate-500 tracking-[0.4em] flex items-center gap-3"><Code className="w-5 h-5 text-purple-500" /> Texnik Stack</h4><div className="flex flex-wrap gap-2.5">{selectedUserForView.skills && selectedUserForView.skills.length > 0 ? (selectedUserForView.skills.map((skill, i) => (<span key={i} className="px-5 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-slate-400 break-words uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-default shadow-sm group/skill">{skill}</span>))) : (<div className="w-full p-6 text-center border-2 border-dashed border-white/5 rounded-3xl text-slate-700 font-bold text-xs uppercase tracking-widest">Ma'lumot yo'q</div>)}</div></div>

                                 <div className="space-y-4 pt-8 border-t border-white/5">
                                    <h4 className="text-[11px] break-words font-black uppercase text-slate-500 tracking-[0.4em] mb-6">Ijtimoiy Tarmoqlar</h4>
                                    <div className="flex flex-wrap gap-4">
                                       {selectedUserForView.socialLinks && selectedUserForView.socialLinks.length > 0 ? (
                                          selectedUserForView.socialLinks.map((link, index) => (
                                             <a
                                                key={index}
                                                href={link.linkUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all group overflow-hidden"
                                             >
                                                {link.iconUrl ? (
                                                   <img src={link.iconUrl} className="w-full h-full object-cover" />
                                                ) : (
                                                   <Link2 className="w-4 h-4 text-slate-500 group-hover:text-black transition-colors" />
                                                )}
                                             </a>
                                          ))
                                       ) : (
                                          <div className="w-full p-6 text-center border-2 border-dashed border-white/5 rounded-3xl text-slate-700 font-bold text-xs uppercase tracking-widest">
                                             Tarmoqlar ulanmagan
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {selectedImage && (
               <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}><button className="absolute top-6 right-6 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all shadow-2xl"><X className="w-8 h-8 md:w-10 md:h-10" /></button><img src={selectedImage} className="max-w-full max-h-[85vh] object-contain rounded-2xl md:rounded-[3rem] shadow-3xl border border-white/5" alt="Full view" /></div>
            )}

            {/* ADD STUDENT MODAL */}
            {isAddingStudent && (
               <div className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
                  <div className="bg-[#0a0a0c] w-full max-w-2xl border border-white/5 rounded-[3rem] p-6 md:p-10 relative shadow-2xl">
                     <h3 className="text-4xl font-black text-white tracking-tight mb-4">Yangi haftalik reja</h3>
                     <p className="text-slate-400 text-sm mb-10">Uchrashuv vaqtini belgilang. Haftalik maqsad, muammo va yechimlarni har bir o'quvchi uchun alohida tahrirlashingiz mumkin.</p>

                     <div className="space-y-6 mb-10">
                        <div className="space-y-3">
                           <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1 block">Uchrashuv vaqti</label>
                           <input
                              type="datetime-local"
                              value={newPlanForm.meetingDay}
                              onChange={(e) => setNewPlanForm(prev => ({ ...prev, meetingDay: e.target.value }))}
                              className="w-full bg-[#121214] border border-white/5 rounded-2xl p-5 text-white focus:outline-none focus:border-indigo-500 transition-colors [color-scheme:dark] shadow-inner text-lg"
                           />
                        </div>
                     </div>

                     <div className="flex items-center gap-4">
                        <button
                           onClick={handleAddStudent}
                           disabled={!newPlanForm.meetingDay || isDataSaving}
                           className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black uppercase tracking-widest text-sm py-5 rounded-2xl transition-all shadow-lg shadow-indigo-600/20"
                        >
                           {isDataSaving ? 'SAQLANMOQDA...' : 'REJANI SAQLASH'}
                        </button>
                        <button
                           onClick={() => setIsAddingStudent(false)}
                           className="px-10 py-5 bg-white/5 hover:bg-white/10 text-slate-300 font-black uppercase tracking-widest text-sm rounded-2xl transition-all border border-white/5"
                        >
                           BEKOR QILISH
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* EDIT STUDENT MODAL */}
            {editingProgress && (
               <div className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
                  <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 w-full max-w-4xl border border-white/5 rounded-[3rem] p-6 md:p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto">
                     <button
                        onClick={() => setEditingProgress(null)}
                        className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5"
                     >
                        <X className="w-5 h-5" />
                     </button>

                     <div className="flex items-center gap-6 mb-10">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-xl">
                           {editingProgress.studentName[0]}
                        </div>
                        <div className="overflow-hidden pr-14 md:pr-20">
                           <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight truncate">{editingProgress.studentName}</h3>
                           <p className="text-[9px] md:text-[11px] font-black uppercase text-indigo-400 tracking-[0.2em] mt-2 truncate">Hafta #{editingProgress.weekNumber.toString().padStart(2, '0')} Monitoringini Tahrirlash</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="space-y-8">
                           {user?.role !== 'student' && (
                              <>
                                 <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1 block">Uchrashuv vaqti va davomat</label>
                                    <div className="flex gap-3">
                                       <input
                                          type="datetime-local"
                                          value={editPlanForm.meetingDay}
                                          onChange={(e) => setEditPlanForm(prev => ({ ...prev, meetingDay: e.target.value }))}
                                          className="flex-1 bg-[#121214] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors [color-scheme:dark] shadow-inner"
                                       />
                                       <button
                                          onClick={() => setEditPlanForm(prev => ({ ...prev, attended: !prev.attended }))}
                                          className={`px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all border ${editPlanForm.attended ? 'bg-green-500 text-white border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'}`}
                                       >
                                          {editPlanForm.attended ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                                          {editPlanForm.attended ? 'Ishtirok Etdi' : 'Ishtirok Etmadi'}
                                       </button>
                                    </div>
                                 </div>

                                 <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1 block">Monitoring holati</label>
                                    <div className="grid grid-cols-2 gap-3">
                                       {(['Bajarilmoqda', 'Hal qilindi', 'Kutilmoqda', 'Bajarmadi'] as const).map(status => (
                                          <button
                                             key={status}
                                             onClick={() => setEditPlanForm(prev => ({ ...prev, status }))}
                                             className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${editPlanForm.status === status ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 'bg-[#121214] text-slate-500 border-white/5 hover:bg-white/5'}`}
                                          >
                                             {status}
                                          </button>
                                       ))}
                                    </div>
                                 </div>
                              </>
                           )}

                           <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between">
                                 <span>Haftalik maqsad</span>
                                 <span className="text-slate-600">{(editPlanForm.weeklyGoal || '').length} / 200</span>
                              </label>
                              <textarea
                                 maxLength={200}
                                 value={editPlanForm.weeklyGoal}
                                 onChange={(e) => setEditPlanForm(prev => ({ ...prev, weeklyGoal: e.target.value }))}
                                 className="w-full bg-[#121214] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[120px] resize-none shadow-inner"
                              />
                           </div>
                        </div>

                        <div className="space-y-8">
                           <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between">
                                 <span>Asosiy muammo</span>
                                 <span className="text-slate-600">{(editPlanForm.difficulty || '').length} / 200</span>
                              </label>
                              <textarea
                                 maxLength={200}
                                 value={editPlanForm.difficulty}
                                 onChange={(e) => setEditPlanForm(prev => ({ ...prev, difficulty: e.target.value }))}
                                 className="w-full bg-[#121214] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[150px] resize-none shadow-inner"
                              />
                           </div>

                           <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between">
                                 <span>Tavsiya qilingan yechim</span>
                                 <span className="text-slate-600">{(editPlanForm.solution || '').length} / 200</span>
                              </label>
                              <textarea
                                 maxLength={200}
                                 value={editPlanForm.solution}
                                 onChange={(e) => setEditPlanForm(prev => ({ ...prev, solution: e.target.value }))}
                                 className="w-full bg-[#121214] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[150px] resize-none shadow-inner"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                        <button
                           onClick={handleSaveEdit}
                           className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-sm py-5 rounded-2xl transition-all flex items-center justify-center gap-3"
                        >
                           <Save className="w-5 h-5" /> Monitoringni Saqlash
                        </button>
                        <button
                           onClick={() => setEditingProgress(null)}
                           className="px-10 py-5 bg-white/5 hover:bg-white/10 text-slate-300 font-black uppercase tracking-widest text-sm rounded-2xl transition-all border border-white/5"
                        >
                           Bekor Qilish
                        </button>
                     </div>
                  </div>
               </div>
            )}
            {/* ASSIGN STUDENT MODAL */}
            {isAssigningStudent && (
               <div className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
                  <div className="bg-[#0a0a0c] w-full max-w-2xl border border-white/5 rounded-[3rem] p-6 md:p-10 relative shadow-2xl">
                     <button
                        onClick={() => setIsAssigningStudent(false)}
                        className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5"
                     >
                        <X className="w-5 h-5" />
                     </button>

                     <h3 className="text-3xl font-black text-white tracking-tight mb-2">Jamoaga o'quvchi qo'shish</h3>
                     <p className="text-slate-400 text-sm mb-8">Sizga biriktirilmagan o'quvchilarni tanlab jamoangizga qo'shing.</p>

                     <div className="space-y-6">
                        <div className="space-y-3">
                           <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1 block">O'quvchini tanlang</label>
                           <CustomDropdown
                              options={allUsers
                                 .filter(u => u.role === 'student' && (user?.field === 'StartUp Community' ? !u.startupCuratorId : !u.assignedCuratorId))
                                 .map(u => ({
                                    value: u.id,
                                    label: u.name || u.username,
                                    icon: u.avatar ? (
                                       <img src={u.avatar} className="w-6 h-6 rounded-full object-cover border border-white/5 shadow-sm" />
                                    ) : (
                                       <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold border border-white/5 shadow-sm">
                                          {(u.name || u.username || '?')[0].toUpperCase()}
                                       </div>
                                    )
                                 }))}
                              value={studentToAssign}
                              onChange={setStudentToAssign}
                              placeholder="O'quvchini tanlang..."
                              icon={<UserCircle className="w-5 h-5" />}
                              className="w-full"
                           />
                           {(allUsers || []).filter(u => u.role === 'student' && (user?.field === 'StartUp Community' ? !u.startupCuratorId : !u.assignedCuratorId)).length === 0 && (
                              <p className="text-slate-500 text-xs mt-2 pl-1 italic">Barcha o'quvchilar allaqachon biriktirilgan.</p>
                           )}
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                           <button
                              onClick={() => {
                                 if (studentToAssign && onAssignStudent) {
                                    onAssignStudent(studentToAssign);
                                    setIsAssigningStudent(false);
                                    setStudentToAssign('');
                                 }
                              }}
                              disabled={!studentToAssign}
                              className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20"
                           >
                              Jamoaga Qo'shish
                           </button>
                           <button
                              onClick={() => setIsAssigningStudent(false)}
                              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-black uppercase tracking-widest text-sm rounded-2xl transition-all border border-white/5"
                           >
                              Bekor Qilish
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>

      </section>
   );
};

export default Dashboard;
