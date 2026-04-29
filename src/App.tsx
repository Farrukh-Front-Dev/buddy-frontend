
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Loader2, Zap, AlertTriangle, Trash2, CheckCircle, Info } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import PixelBlast from './components/reactbits/PixelBlast';
import HomePage from './components/features/home/HomePage';
import Features from './components/features/Features';
import Team from './components/features/Team';
import Contact from './components/features/Contact';
import AuthPage from './components/features/AuthPage';
import Dashboard from './components/features/Dashboard';
import AdminPanel from './components/features/AdminPanel';
import Footer from './components/layout/Footer';
import { StudentProgress, WeeklyHighlight, TeamMember, Season, Notification, Page, UserData } from './types';
import api, { WS_URL, MEDIA_BASE_URL } from './services/api/client';

const BuddyStorage = {
  KEYS: {
    CURRENT_PAGE: 'buddy_current_page',
    USER: 'buddy_user',
    ALL_USERS: 'buddy_all_users',
    STUDENTS_DATA: 'buddy_all_students_data',
    HIGHLIGHTS: 'buddy_weekly_highlights',
    REGISTRATION_OPEN: 'buddy_is_registration_open',
    CURATOR_REGISTRATION_OPEN: 'buddy_is_curator_registration_open',
    NOTIFICATIONS: 'buddy_notifications',
    SEASONS: 'buddy_seasons',
    ACTIVE_SEASON_ID: 'buddy_active_season_id',
    CHAT_MESSAGES: 'buddy_chat_messages'
  },
  save: (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Failed to save ${key} to localStorage`, e);
    }
  },
  load: <T,>(key: string, defaultValue: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.error(`Failed to load ${key} from localStorage`, e);
      return defaultValue;
    }
  }
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    try {
      return (localStorage.getItem(BuddyStorage.KEYS.CURRENT_PAGE) as Page) || 'home';
    } catch (e) {
      return 'home';
    }
  });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDataSaving, setIsDataSaving] = useState(false);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: 'danger' | 'info' | 'success';
    confirmText?: string;
    isAlert?: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
    type: 'info',
    isAlert: false
  });

  const confirmThis = (title: string, message: string, onConfirm: () => void, type: 'danger' | 'info' | 'success' = 'danger', confirmText?: string, isAlert: boolean = false) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      },
      type,
      confirmText,
      isAlert
    });
  };

  // Data states
  const [allStudentsData, setAllStudentsData] = useState<StudentProgress[]>([]);
  const [weeklyHighlights, setWeeklyHighlights] = useState<WeeklyHighlight[]>([]);
  const [dynamicTeamMembers, setDynamicTeamMembers] = useState<TeamMember[]>([]);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([{ id: '1', number: 1, startDate: '2025-05-01', isActive: true }]);
  const [activeSeasonId, setActiveSeasonId] = useState('1');

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [isCuratorRegistrationOpen, setIsCuratorRegistrationOpen] = useState(true);

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>(() => BuddyStorage.load(BuddyStorage.KEYS.NOTIFICATIONS, []));

  const filteredNotifications = useMemo(() => {
    if (!user) return [];

    // Admin barcha xabarlarni ko'ra oladi
    if (user.role === 'admin') return notifications;

    return notifications.filter(notif => {
      // Shaxsiy xabarni faqat o'sha user ko'radi
      if (notif.targetUserId) {
        return notif.targetUserId === user.id;
      }
      // Aks holda role bo'yicha tekshirish
      return notif.targetRole === 'all' || notif.targetRole === user.role;
    });
  }, [notifications, user]);

  // Sync currentPage with URL path (only purely informational)
  useEffect(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    const path = segments[0] || 'home';

    // Valid main pages - including login/register aliases
    const validPages = ['home', 'features', 'team', 'contact', 'auth', 'dashboard', 'admin', 'login', 'signup'];

    if (validPages.includes(path)) {
      if (path === 'login' || path === 'signup') {
        setCurrentPage('auth');
      } else {
        setCurrentPage(path as Page);
      }
    }
  }, [location]);

  const handleNavigate = (page: Page, tab?: string) => {
    setCurrentPage(page);
    if (tab) {
      navigate(`/${page}/${tab}`);
    } else {
      navigate(`/${page === 'home' ? '' : page}`);
    }
  };

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(BuddyStorage.KEYS.CURRENT_PAGE, currentPage);
  }, [currentPage]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const userRes = await api.get('auth/me/');
          setUser(userRes.data as UserData);
        }
      } catch (err) {
        console.error("Failed to authenticate user", err);
        setIsDataLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);

  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  // WebSocket for Real-time Notifications
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('access_token');
    // Use dynamic WS_URL from api.ts
    const wsUrl = `${WS_URL}notifications/?token=${token}`;

    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'notification') {
        setNotifications(prev => {
          if (prev.some(n => n.id === data.notification.id)) return prev;
          const newList = [data.notification, ...prev];
          BuddyStorage.save(BuddyStorage.KEYS.NOTIFICATIONS, newList);
          return newList;
        });
      } else if (data.type === 'monitoring_update') {
        setAllStudentsData(prev => {
          const index = prev.findIndex(m => m.id === data.monitoring.id);
          if (index !== -1) {
            const newList = [...prev];
            newList[index] = data.monitoring;
            return newList;
          }
          return [...prev, data.monitoring];
        });
      } else if (data.type === 'highlight_update') {
        setWeeklyHighlights(prev => {
          const id = data.highlight.id;
          const exists = prev.some(h => String(h.id) === String(id));
          if (exists) {
            return prev.map(h => String(h.id) === String(id) ? data.highlight : h);
          }
          return [data.highlight, ...prev];
        });
      } else if (data.type === 'user_status') {
        setOnlineUsers(prev => {
          const newSet = new Set(prev);
          if (data.status === 'online') {
            newSet.add(data.user_id);
          } else {
            newSet.delete(data.user_id);
          }
          return newSet;
        });
      }
    };

    socket.onopen = () => console.log('WebSocket Connected');
    socket.onerror = (e) => console.error('WebSocket Error:', e);
    socket.onclose = () => console.log('WebSocket Disconnected');

    return () => {
      socket.close();
    };
  }, [user]);

  // Fetch public data (users/seasons) immediately, no auth needed
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [usersRes, seasonsRes] = await Promise.all([
          api.get('users/').catch(() => ({ data: [] })),
          api.get('seasons/').catch(() => ({ data: [] })),
        ]);
        setAllUsers(usersRes.data);
        setSeasons(seasonsRes.data);
        if (seasonsRes.data.length > 0) {
          const activeSeason = seasonsRes.data.find((s: Season) => s.isActive) || seasonsRes.data[0];
          setActiveSeasonId(activeSeason.id);
        }
      } catch (e) {
        console.error('Public data load error', e);
      } finally {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setIsDataLoading(false);
        } else {
           // Fallback: if data is still loading after 5 seconds, release it anyway
           setTimeout(() => {
              setIsDataLoading(false);
           }, 5000);
        }
      }
    };
    fetchPublicData();
  }, []); // Run once on mount, no auth needed

  // Fetch application data periodically or when auth changes
  useEffect(() => {
    if (!user) return; // Auth-protected data only for logged-in users
    const fetchData = async () => {
      setIsDataLoading(true);
      try {
        const [usersRes, seasonsRes, monitorRes, hlRes, notifRes] = await Promise.all([
          api.get('users/').catch(() => ({ data: [] })),
          api.get('seasons/').catch(() => ({ data: [] })),
          api.get('monitoring/').catch(() => ({ data: [] })),
          api.get('highlights/').catch(() => ({ data: [] })),
          api.get('notifications/').catch(() => ({ data: [] }))
        ]);

        setAllUsers(usersRes.data);
        setSeasons(seasonsRes.data);
        if (seasonsRes.data.length > 0) {
          const activeSeason = seasonsRes.data.find((s: Season) => s.isActive) || seasonsRes.data[0];
          setActiveSeasonId(activeSeason.id);
        }
        setAllStudentsData(monitorRes.data);
        setWeeklyHighlights(hlRes.data);

        // Bildirishnomalarni yangilaymiz (server statusi ustuvor)
        if (notifRes.data && Array.isArray(notifRes.data)) {
          setNotifications(prev => {
            const serverNotifs = notifRes.data as Notification[];
            const serverNotifMap = new Map(serverNotifs.map(n => [n.id, n]));
            const merged = [...serverNotifs];
            
            // Serverda yo'q bo'lgan (masalan, hali keshdagi yoki WebSocket orqali kelgan) xabarlarni saqlaymiz
            for (const local of prev) {
               if (!serverNotifMap.has(local.id)) {
                  merged.push(local);
               }
            }
            
            return merged.sort((a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
          });
        }
      } catch (e) {
        console.error("Data load error", e);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
    const lightInterval = setInterval(async () => {
      // Lightweight poll: users + notifications (every 60s)
      try {
        const [usersRes, notifRes] = await Promise.all([
          api.get('users/').catch(() => ({ data: [] })),
          api.get('notifications/').catch(() => ({ data: [] })),
        ]);
        setAllUsers(usersRes.data);
        if (notifRes.data && Array.isArray(notifRes.data)) {
          setNotifications(prev => {
            const serverNotifs = notifRes.data as Notification[];
            const serverNotifMap = new Map(serverNotifs.map(n => [n.id, n]));
            const merged = [...serverNotifs];
            for (const local of prev) {
               if (!serverNotifMap.has(local.id)) {
                  merged.push(local);
               }
            }
            return merged.sort((a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
          });
        }
      } catch (e) { /* silent */ }
    }, 60000);
    const heavyInterval = setInterval(async () => {
      // Heavy poll: monitoring + highlights (every 5 min)
      try {
        const [monitorRes, hlRes] = await Promise.all([
          api.get('monitoring/').catch(() => ({ data: [] })),
          api.get('highlights/').catch(() => ({ data: [] })),
        ]);
        setAllStudentsData(monitorRes.data);
        setWeeklyHighlights(hlRes.data);
      } catch (e) { /* silent */ }
    }, 300000);
    return () => { clearInterval(lightInterval); clearInterval(heavyInterval); };
  }, [user]);

  useEffect(() => {
    BuddyStorage.save(BuddyStorage.KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    // Rasm URLni to'g'rilash: agar relative path bo'lsa, MEDIA_BASE_URL qo'sh
    const fixUrl = (url: string | null | undefined): string => {
      if (!url) return '';
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
      return `${MEDIA_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    // Faqat statusi 'active' bo'lgan kuratorlarni chiqarish
    const approvedCurators = allUsers
      .filter(u => u.role === 'curator' && u.status === 'active')
      .map(u => ({
        id: u.id,
        name: u.name,
        role: u.field || 'Mentor',
        field: u.field || '',
        avatar: fixUrl(u.avatar) || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'Curator')}&background=6366f1&color=fff&size=400&bold=true`,
        bio: u.longBio?.slice(0, 100) || "Buddy jamoasining faol kuratori.",
        longBio: u.longBio || "Foydalanuvchi haqida ma'lumot yo'q.",
        fieldDescription: u.fieldDescription || "O'quvchilarga o'z yo'nalishi bo'yicha yordam beradi.",
        motivationQuote: u.motivationQuote || "Harakatda barakat!",
        skills: u.skills || [],
        socialLinks: (u.socialLinks || []).map(link => ({
          ...link,
          iconUrl: fixUrl(link.iconUrl)
        }))
      }));
    setDynamicTeamMembers(approvedCurators);
  }, [allUsers]);

  const handleNavigateToAuth = (mode: 'login' | 'signup') => {
    if (mode === 'signup' && !isRegistrationOpen) {
      setAuthMode('login');
      handleNavigate('auth', 'login');
    } else {
      setAuthMode(mode);
      handleNavigate('auth', mode);
    }
  };

  const handleLoginSuccess = (userData: UserData) => {
    localStorage.removeItem('buddy_admin_tab');
    localStorage.removeItem('buddy_dashboard_tab');
    setUser(userData);
    handleNavigate(userData.role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigate('home');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const handleDeleteUser = async (userId: string) => {
    confirmThis(
      "Foydalanuvchini o'chirish",
      "Haqiqatan ham ushbu foydalanuvchini o'chirib tashlamoqchimisiz? Ushbu amalni ortga qaytarib bo'lmaydi.",
      async () => {
        setIsDataSaving(true);
        try {
          await api.delete(`users/${userId}/`);
          setAllUsers(prev => prev.filter(u => u.id !== userId));
          setAllStudentsData(prev => prev.filter(s => s.curatorId !== userId && s.studentId !== userId));
        } catch (e) {
          console.error("Foydalanuvchini o'chirishda xatolik:", e);
        } finally {
          setIsDataSaving(false);
        }
      }
    );
  };

  const handleChangeRole = async (userId: string, role: 'student' | 'curator' | 'admin') => {
    confirmThis(
      "Rolni o'zgartirish",
      `Foydalanuvchi rolini ${role.toUpperCase()} ga o'zgartirmoqchimisiz?`,
      async () => {
        setIsDataSaving(true);
        try {
          await api.patch(`admin/users/${userId}/role/`, { role });
          setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
        } catch (e) {
          console.error("Rolni o'zgartirishda xatolik:", e);
        } finally {
          setIsDataSaving(false);
        }
      },
      'info'
    );
  };

  const handleUpdateStudent = async (updatedStudent: StudentProgress) => {
    setIsDataSaving(true);
    try {
      const payload = {
        ...updatedStudent,
        curator: updatedStudent.curatorId || (updatedStudent as any).curator_id,
        season: updatedStudent.seasonId || (updatedStudent as any).season_id,
        student: updatedStudent.studentId || (updatedStudent as any).student_id,
      };
      const res = await api.patch(`monitoring/${updatedStudent.id}/`, payload);
      setAllStudentsData(prev => prev.map(s => s.id === updatedStudent.id ? res.data : s));
    } catch (err) {
      console.error("Failed to update student progress:", err);
    } finally {
      setIsDataSaving(false);
    }
  };

  const handleAddProgress = async (p: StudentProgress) => {
    setIsDataSaving(true);
    try {
      const payload = {
        curator: p.curatorId || (p as any).curator_id,
        season: p.seasonId || (p as any).season_id || activeSeasonId,
        weekNumber: p.weekNumber || (p as any).week_number,
        student: p.studentId || (p as any).student_id || null,
        studentName: p.studentName || (p as any).student_name,
        weeklyGoal: p.weeklyGoal || (p as any).weekly_goal || '',
        difficulty: p.difficulty || (p as any).difficulty || '',
        solution: p.solution || (p as any).solution || '',
        status: p.status || (p as any).status || 'Kutilmoqda',
        meetingDay: p.meetingDay || (p as any).meeting_day || null,
        attended: p.attended ?? (p as any).attended ?? false
      };
      const res = await api.post('monitoring/', payload);
      setAllStudentsData(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add progress:", err);
    } finally {
      setIsDataSaving(false);
    }
  };

  const handleRemoveProgress = async (id: string) => {
    confirmThis(
      "Monitoringni o'chirish",
      "Haqiqatan ham ushbu monitoring ma'lumotini o'chirmoqchimisiz?",
      async () => {
        setIsDataSaving(true);
        try {
          await api.delete(`monitoring/${id}/`);
          setAllStudentsData(prev => prev.filter(s => String(s.id) !== String(id)));
        } catch (err) {
          console.error("Failed to remove progress:", err);
        } finally {
          setIsDataSaving(false);
        }
      }
    );
  };

  const handleApproveUser = async (userId: string) => {
    setIsDataSaving(true);
    try {
      await api.post(`admin/users/${userId}/approve/`);
      setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isApproved: true, status: 'active' } : u));
      if (user?.id === userId) {
        setUser(prev => prev ? { ...prev, isApproved: true, status: 'active' } : null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDataSaving(false);
    }
  };

  const handleChangeUserStatus = async (userId: string, status: 'active' | 'inactive' | 'pending') => {
    setIsDataSaving(true);
    try {
      await api.patch(`admin/users/${userId}/status/`, { status });
      setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
      if (user?.id === userId) {
        setUser(prev => prev ? { ...prev, status } : null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDataSaving(false);
    }
  };

  const handleUpdateProfile = async (data: Partial<UserData>) => {
    setIsDataSaving(true);
    try {
      const res = await api.patch(`users/${user.id}/`, data);
      setUser(res.data);
      setAllUsers(prev => prev.map(u => u.id === user.id ? res.data : u));
      return true;
    } catch (e: any) {
      console.error(e);
      const errorMsg = e.response?.data ? JSON.stringify(e.response.data) : "Xatolik yuz berdi";
      confirmThis("Xatolik", "Profilni yangilashda xatolik yuz berdi: " + errorMsg, () => {}, "danger", "TUSHUNARLI", true);
      return false;
    } finally {
      setIsDataSaving(false);
    }
  };

  const handleAddHighlight = async (h: any) => {
    setIsDataSaving(true);
    try {
      const form = new FormData();
      form.append('curatorId', h.curatorId);
      form.append('seasonId', h.seasonId || activeSeasonId);
      form.append('weekNumber', h.weekNumber.toString());
      form.append('uploadedBy', h.uploadedBy || '');
      if (h.imageFile) {
        form.append('image', h.imageFile);
      } else if (h.photoUrl) {
        form.append('photoUrl', h.photoUrl);
      }

      const res = await api.post('highlights/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setWeeklyHighlights(prev => [...prev, res.data]);
    } catch (e) {
      console.error("Rasmni saqlashda xatolik:", e);
    } finally {
      setIsDataSaving(false);
    }
  };

  const handleRemoveHighlight = async (id: string) => {
    confirmThis(
      "Rasmni o'chirish",
      "Ushbu rasmni o'chirib tashlamoqchimisiz?",
      async () => {
        setIsDataSaving(true);
        try {
          await api.delete(`highlights/${id}/`);
          setWeeklyHighlights(prev => prev.filter(h => h.id !== id));
        } catch (e) {
          console.error("Rasmni o'chirishda xatolik:", e);
        } finally {
          setIsDataSaving(false);
        }
      }
    );
  };

  const handleUpdateSeason = async (seasonId: string, updates: Partial<Season>) => {
    setIsDataSaving(true);
    try {
      await api.patch(`seasons/${seasonId}/`, updates);
      setSeasons(prev => prev.map(s => s.id === seasonId ? { ...s, ...updates } : s));
    } catch (e) {
      console.error(e);
    } finally {
      setIsDataSaving(false);
    }
  };

  const handleDeleteSeason = async (seasonId: string) => {
    confirmThis(
      "Mavsumni o'chirish",
      "Mavsumni o'chirish barcha unga tegishli monitoring va rasmlarni ham o'chirishi mumkin. Haqiqatan ham o'chirmoqchimisiz?",
      async () => {
        setIsDataSaving(true);
        try {
          await api.delete(`seasons/${seasonId}/`);
          setSeasons(prev => {
            const newSeasons = prev.filter(s => s.id !== seasonId);
            if (activeSeasonId === seasonId && newSeasons.length > 0) {
              setActiveSeasonId(newSeasons[newSeasons.length - 1].id);
            }
            return newSeasons;
          });
        } catch (e) {
          console.error(e);
        } finally {
          setIsDataSaving(false);
        }
      }
    );
  };

  const handleStartNewSeason = async (durationInMonths: number = 3) => {
    setIsDataSaving(true);
    try {
      const nextNumber = seasons.length > 0 ? Math.max(...seasons.map(s => s.number)) + 1 : 1;
      const res = await api.post("seasons/", {
        number: nextNumber,
        startDate: new Date().toISOString().split('T')[0],
        isActive: true,
        durationInMonths: durationInMonths
      });

      const newSeasonData = res.data;
      const nextSeason: Season = {
        id: newSeasonData.id,
        number: newSeasonData.number,
        startDate: newSeasonData.startDate,
        isActive: newSeasonData.isActive,
        durationInMonths: newSeasonData.durationInMonths
      };

      setSeasons(prev => prev.map(s => ({ ...s, isActive: false })).concat([nextSeason]));
      setActiveSeasonId(nextSeason.id);
      setIsRegistrationOpen(true);

      handleAddNotification({
        id: Math.random().toString(36).substr(2, 9),
        title: `Yangi Mavsum #${nextNumber} boshlandi!`,
        message: 'Buddy Team loyihasida yangi mavsum start oldi. Rejalaringizni belgilashni boshlang.',
        type: 'success',
        timestamp: new Date().toISOString(),
        isRead: false,
        targetRole: 'all',
        sender: 'Admin'
      });
    } catch (e) { console.error(e) }
    finally { setIsDataSaving(false); }
  };

  const handleAddNotification = async (notif: Partial<Notification>) => {
    try {
      const res = await api.post('notifications/', notif);
      const savedNotif = res.data;
      setNotifications(prev => {
        // ID bo'yicha tekshirish (WebSocket orqali kelgan bo'lsa ham takrorlanmasin)
        if (prev.some(n => n.id === savedNotif.id)) return prev;
        return [savedNotif, ...prev];
      });
      return savedNotif;
    } catch (e) {
      console.error("Xabarni yuborishda xatolik:", e);
      throw e;
    }
  };

  const handleMarkNotificationAsRead = async (id: string | 'all') => {
    const markAsRead = async () => {
      try {
        if (id === 'all') {
          await api.post('notifications/mark_all_read/');
          setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } else {
          // If the ID is a UUID (server notification)
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (uuidRegex.test(String(id))) {
            await api.patch(`notifications/${id}/`, { isRead: true });
          }
          setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        }
      } catch (e) {
        console.error("Xabarlarni o'qilgan deb belgilashda xatolik:", e);
      }
    };

    if (id === 'all') {
      confirmThis(
        "Tasdiqlash",
        "Barcha bildirishnomalarni o'qilgan deb belgilamoqchimisiz?",
        markAsRead,
        'info',
        "HA, BELGILASH"
      );
    } else {
      markAsRead();
    }
  };

  const handleAssignStudent = async (studentId: string) => {
    confirmThis(
      "O'quvchini qo'shish",
      "Ushbu o'quvchini jamoangizga qo'shmoqchimisiz?",
      async () => {
        setIsDataSaving(true);
        try {
          const propertyToUpdate = user!.field === 'StartUp Community' ? 'startupCuratorId' : 'assignedCuratorId';
          await api.patch(`users/${studentId}/`, { [propertyToUpdate]: user!.id });
          setAllUsers(prev => prev.map(u => u.id === studentId ? { ...u, [propertyToUpdate]: user!.id } : u));

          const student = allUsers.find(u => u.id === studentId);
          if (student) {
            handleAddNotification({
              id: Math.random().toString(36).substr(2, 9),
              title: 'Yangi Kurator Biriktirildi',
              message: `${user!.username} sizni o'z jamoasiga qo'shdi.`,
              type: 'success',
              timestamp: new Date().toISOString(),
              isRead: false,
              targetRole: 'student',
              targetUserId: studentId,
              sender: user!.username
            });
          }
        } catch (e) { console.error(e) }
        finally { setIsDataSaving(false); }
      },
      'success',
      "HA, QO'SHISH"
    );
  };

  const handleUnassignStudent = async (studentId: string) => {
    confirmThis(
      "O'quvchini chiqarish",
      "O'quvchini jamoangizdan chiqarib yubormoqchimisiz?",
      async () => {
        setIsDataSaving(true);
        try {
          const propertyToUpdate = user!.field === 'StartUp Community' ? 'startupCuratorId' : 'assignedCuratorId';
          await api.patch(`users/${studentId}/`, { [propertyToUpdate]: null });
          setAllUsers(prev => prev.map(u => u.id === studentId ? { ...u, [propertyToUpdate]: null } : u));
        } catch (e) { console.error(e) }
        finally { setIsDataSaving(false); }
      }
    );
  };

  const handleAssignCurator = async (curatorId: string) => {
    const curator = allUsers.find(u => u.id === curatorId);
    confirmThis(
      "Kurator Tanlash",
      `${curator?.username || 'Ushbu kurator'}ni tanlamoqchimisiz? Bu amalni keyinchalik o'zgartirish uchun adminga murojaat qilishingiz kerak bo'ladi.`,
      async () => {
        setIsDataSaving(true);
        try {
          const isStartup = curator?.field === 'StartUp Community';
          const propertyToUpdate = isStartup ? 'startupCuratorId' : 'assignedCuratorId';
          await api.patch(`users/${user!.id}/`, { [propertyToUpdate]: curatorId });
          setUser(prev => prev ? { ...prev, [propertyToUpdate]: curatorId } : null);
          setAllUsers(prev => prev.map(u => u.id === user!.id ? { ...u, [propertyToUpdate]: curatorId } : u));

          if (curator) {
            handleAddNotification({
              id: Math.random().toString(36).substr(2, 9),
              title: 'Yangi O\'quvchi Qo\'shildi',
              message: `${user!.username} kurator sifatida ${curator?.username}ni tanladi.`,
              type: 'success',
              timestamp: new Date().toISOString(),
              isRead: false,
              targetRole: 'curator',
              targetUserId: curatorId,
              sender: user!.username
            });
          }

          handleAddNotification({
            id: Math.random().toString(36).substr(2, 9),
            title: 'Kurator Tanlandi',
            message: `${curator?.username || 'Kurator'} muvaffaqiyatli biriktirildi. Mashg'ulotlarni boshlashingiz mumkin!`,
            type: 'success',
            timestamp: new Date().toISOString(),
            isRead: false,
            targetRole: 'student',
            targetUserId: user!.id,
            sender: 'Tizim'
          });

          handleNavigate('dashboard');
        } catch (e) {
          console.error(e);
        } finally {
          setIsDataSaving(false);
        }
      },
      'success',
      "HA, TANLASH"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] z-50">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium animate-pulse text-sm">Profil tekshirilmoqda...</p>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#0a0a0c]">
      {/* Global PixelBlast Background */}
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#8B5CF6"
          patternScale={2.2}
          patternDensity={0.65}
          liquid={false}
          liquidStrength={0}
          liquidRadius={0}
          enableRipples={true}
          rippleIntensityScale={0.9}
          rippleThickness={0.12}
          rippleSpeed={0.3}
          pixelSizeJitter={0.25}
          edgeFade={0.25}
          transparent={false}
          autoPauseOffscreen={true}
          speed={0.4}
          noiseAmount={0}
        />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onAuthNavigate={handleNavigateToAuth}
        user={user}
        onLogout={handleLogout}
        isRegistrationOpen={isRegistrationOpen}
        unreadCount={filteredNotifications.filter(n => !n.isRead).length}
      />
      
      {/* GLOBAL SAVING OVERLAY LOADER */}
      {isDataSaving && (
        <div className="fixed inset-0 z-[1200] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/5 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-6 h-6 text-indigo-500 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-indigo-400 font-black uppercase tracking-[0.3em] text-[9px] animate-pulse">Saqlanmoqda...</p>
        </div>
      )}

      {/* GLOBAL ACTION CONFIRMATION MODAL */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#0f0f12] border border-white/10 rounded-[2.5rem] p-10 max-w-sm w-full shadow-[0_50px_100px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-300 text-center relative overflow-hidden">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${
              confirmModal.type === 'danger' ? 'bg-red-500/10' : 
              confirmModal.type === 'success' ? 'bg-green-500/10' : 'bg-indigo-500/10'
            }`}>
              {confirmModal.type === 'danger' ? <Trash2 className="w-10 h-10 text-red-500" /> : 
               confirmModal.type === 'success' ? <CheckCircle className="w-10 h-10 text-green-500" /> : 
               <Info className="w-10 h-10 text-indigo-500" />}
            </div>

            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{confirmModal.title}</h3>
            <p className="text-slate-400 font-medium mb-10 leading-relaxed">{confirmModal.message}</p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={confirmModal.onConfirm}
                className={`w-full py-5 text-white font-black rounded-3xl transition-all shadow-lg active:scale-95 uppercase tracking-widest text-xs ${
                  confirmModal.type === 'danger' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 
                  confirmModal.type === 'success' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20' : 
                  'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                }`}
              >
                {confirmModal.confirmText || (confirmModal.isAlert ? 'OK' : 'HA, TASDIQLAYMAN')}
              </button>
              
              {!confirmModal.isAlert && (
                <button
                  onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full py-5 bg-white/5 hover:bg-white/10 text-slate-300 font-black rounded-3xl transition-all active:scale-95 uppercase tracking-widest text-xs border border-white/5"
                >
                  BEKOR QILISH
                </button>
              )}
            </div>
          </div>
        </div>
      )}

            {isDataLoading && (
         <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0a0a0c] bg-opacity-90 backdrop-blur-xl transition-all duration-700">
            <div className="relative">
               <div className="w-16 h-16 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
               <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500 animate-pulse" />
            </div>
           <p className="mt-8 text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Ma'lumotlar yuklanmoqda...</p>
        </div>
      )}

      <main className="animate-in fade-in duration-700">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} onAuthNavigate={handleNavigateToAuth} isRegistrationOpen={isRegistrationOpen} user={user} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/features" element={<div className="pt-20"><Features /></div>} />
          <Route path="/team" element={
            <div className="pt-20">
              <Team
                user={user}
                onAssignCurator={handleAssignCurator}
                customMembers={dynamicTeamMembers}
                studentsData={allStudentsData}
                highlights={weeklyHighlights}
                seasons={seasons}
                activeSeasonId={activeSeasonId}
                isLoading={isDataLoading}
              />
            </div>
          } />
          <Route path="/contact" element={<div className="pt-20"><Contact /></div>} />
          <Route path="/dashboard/:activeTab?" element={
            user ? (
              user.role === 'admin' && window.location.pathname !== '/dashboard/profile' ? (
                <Navigate to="/admin" replace />
              ) : (
                <div className="pt-20">
                  <Dashboard
                    user={user} studentsData={allStudentsData} highlights={weeklyHighlights}
                    allUsers={allUsers}
                    onRemoveStudent={handleRemoveProgress}
                    onUpdateProfile={handleUpdateProfile}
                    onUpdateStudent={handleUpdateStudent}
                    onAddProgress={handleAddProgress}
                    onAddHighlight={handleAddHighlight}
                    onRemoveHighlight={handleRemoveHighlight}
                    activeSeasonId={activeSeasonId}
                    seasons={seasons}
                    notifications={filteredNotifications}
                    onMarkRead={handleMarkNotificationAsRead}
                    onMarkAllRead={() => handleMarkNotificationAsRead('all')}
                    onAssignStudent={handleAssignStudent}
                    onUnassignStudent={handleUnassignStudent}
                    onlineUsers={onlineUsers}
                    isDataSaving={isDataSaving}
                  />
                </div>
              )
            ) : <Navigate to="/auth" replace />
          } />
          <Route path="/admin/:activeTab?" element={
            user?.role === 'admin' ? (
              <div className="pt-20">
                <AdminPanel
                  user={user} allUsers={allUsers} allProgress={allStudentsData}
                  onDeleteUser={handleDeleteUser}
                  onChangeRole={handleChangeRole}
                  onUpdateProgress={handleUpdateStudent}
                  onApproveUser={handleApproveUser}
                  onChangeStatus={handleChangeUserStatus}
                  isRegistrationOpen={isRegistrationOpen}
                  onToggleRegistration={() => setIsRegistrationOpen(!isRegistrationOpen)}
                  isCuratorRegistrationOpen={isCuratorRegistrationOpen}
                  onToggleCuratorRegistration={() => setIsCuratorRegistrationOpen(!isCuratorRegistrationOpen)}
                  seasons={seasons}
                  activeSeasonId={activeSeasonId}
                  onSwitchSeason={setActiveSeasonId}
                  onStartNewSeason={handleStartNewSeason}
                  onUpdateSeason={handleUpdateSeason}
                  onDeleteSeason={handleDeleteSeason}
                  onSendNotification={handleAddNotification}
                  notifications={notifications}
                  onMarkAsRead={handleMarkNotificationAsRead}
                  onMarkAllRead={() => handleMarkNotificationAsRead('all')}
                  isDataSaving={isDataSaving}
                />
              </div>
            ) : user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          } />
          <Route path="/auth/:mode?" element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
            ) : (
              <AuthPage
                initialMode={authMode}
                onBack={() => handleNavigate('home')}
                onSuccess={handleLoginSuccess}
                isRegistrationOpen={isRegistrationOpen}
                isCuratorRegistrationOpen={isCuratorRegistrationOpen}
              />
            )
          } />
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
          <Route path="/monitoring" element={<Navigate to="/admin/monitoring" replace />} />
          <Route path="*" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer onNavigate={handleNavigate} />
      </div>
    </div>
    </LanguageProvider>
  );
};

export default App;
