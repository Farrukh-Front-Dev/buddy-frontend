import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, ShieldAlert, Activity, Search, Trash2,
  ChevronLeft, ChevronRight, Briefcase, Eye, X, Menu,
  Shield, AlertTriangle, Lightbulb, CheckCircle2, XCircle,
  FileSpreadsheet, FileText, UserCircle, Rocket, History, Power,
  ShieldCheck, Clock, Award, Filter, ListFilter, UserCheck, UserX,
  Mail, AtSign, Code, Bell, Check, Save, Target,
  ExternalLink, Fingerprint, CalendarDays, Zap, Quote, Link2, Send, Info, ChevronDown, Loader2, TrendingUp, TrendingDown, Calendar, Edit2, Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';
import ExcelJS from 'exceljs';
import { UserData, StudentProgress, Season, Notification } from '../../types';
import CustomDropdown from './CustomDropdown';

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
}

const ITEMS_PER_PAGE = 15;

const AdminPanel: React.FC<AdminPanelProps> = ({
  user, allUsers, allProgress, onDeleteUser, onChangeRole, onApproveUser, onChangeStatus,
  isRegistrationOpen, onToggleRegistration, isCuratorRegistrationOpen, onToggleCuratorRegistration, seasons, activeSeasonId, onSwitchSeason, onStartNewSeason, onUpdateSeason, onDeleteSeason, onSendNotification, onUpdateProgress, notifications, onMarkAsRead, onMarkAllRead, isDataSaving
}) => {
  const { activeTab: urlTab } = useParams<{ activeTab: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'monitoring' | 'users' | 'requests' | 'seasons' | 'messages' | 'settings'>(
    (urlTab as any) || 'stats'
  );

  useEffect(() => {
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab as any);
    }
  }, [urlTab]);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
    localStorage.setItem('buddy_admin_tab', tab);
  };
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [monitoringWeek, setMonitoringWeek] = useState(() => Number(localStorage.getItem('buddy_admin_monitoring_week')) || 1);
  const [monitoringSeasonId, setMonitoringSeasonId] = useState(activeSeasonId);

  const unreadMessagesCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const tabLabels = useMemo(() => ({
    stats: { title: 'Statistika Markazi', desc: 'Platformaning umumiy ko\'rsatkichlari va faollik tahlili.', icon: <Activity className="w-4 h-4" /> },
    monitoring: { title: 'Global Monitoring', desc: 'Haftalik o\'sish va kuratorlik natijalarini kuzatish.', icon: <Activity className="w-4 h-4" /> },
    users: { title: 'Loyiha A\'zolari', desc: 'Barcha talabalar, kuratorlar va adminlarni boshqarish jadvali.', icon: <Users className="w-4 h-4" /> },
    requests: { title: 'Kuratorlik So\'rovlari', desc: 'Yangi ro\'yxatdan o\'tgan mentorlarni ko\'rib chiqing va tasdiqlang.', icon: <Zap className="w-4 h-4" /> },
    seasons: { title: 'Mavsumlar Boshqaruvi', desc: 'O\'quv mavsumlarini yaratish, tahrirlash va faollashtirish.', icon: <CalendarDays className="w-4 h-4" /> },
    messages: {
      title: 'Global Xabarnomalar',
      desc: 'Barcha foydalanuvchilarga bildirishnomalar yuborish va tarix.',
      icon: (
        <div className="relative">
          <Mail className="w-4 h-4" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] px-1 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-pulse border border-[#0f0f12]">
              {unreadMessagesCount}
            </span>
          )}
        </div>
      )
    },
    settings: { title: 'Tizim Sozlamalari', desc: 'Platforma konfiguratsiyasi va registratsiya jarayonini boshqarish.', icon: <Shield className="w-4 h-4" /> }
  }), [unreadMessagesCount]);

  // Edit Student Modal State
  const [editingProgress, setEditingProgress] = useState<StudentProgress | null>(null);
  const [editPlanForm, setEditPlanForm] = useState({
    meetingDay: '',
    attended: false,
    weeklyGoal: '',
    difficulty: '',
    solution: '',
    status: 'Kutilmoqda' as 'Bajarilmoqda' | 'Hal qilindi' | 'Kutilmoqda' | 'Bajarmadi'
  });

  useEffect(() => {
    setMonitoringSeasonId(activeSeasonId);
  }, [activeSeasonId]);

  useEffect(() => {
    const activeSeason = seasons.find(s => s.id === monitoringSeasonId);
    const maxWeeks = (activeSeason?.durationInMonths || 3) * 4;
    if (monitoringWeek > maxWeeks) {
      setMonitoringWeek(maxWeeks);
    }
  }, [monitoringSeasonId, seasons, monitoringWeek]);

  useEffect(() => {
    localStorage.setItem('buddy_admin_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('buddy_admin_monitoring_week', monitoringWeek.toString());
  }, [monitoringWeek]);
  const [monitoringSearch, setMonitoringSearch] = useState('');
  const [monitoringCuratorFilter, setMonitoringCuratorFilter] = useState('all');
  const [monitoringStatusFilter, setMonitoringStatusFilter] = useState('all');
  const [monitoringAttendanceFilter, setMonitoringAttendanceFilter] = useState<'all' | 'attended' | 'not-attended'>('all');
  const [monitoringPage, setMonitoringPage] = useState(1);

  const [usersSearchQuery, setUsersSearchQuery] = useState('');
  const [usersFilterRole, setUsersFilterRole] = useState<'all' | 'student' | 'curator' | 'admin'>('all');
  const [usersPage, setUsersPage] = useState(1);

  const [selectedUserForView, setSelectedUserForView] = useState<UserData | null>(null);
  const [isDirectMessaging, setIsDirectMessaging] = useState(false);
  const [directMessageForm, setDirectMessageForm] = useState({ title: '', message: '', type: 'info' as Notification['type'] });

  const [messageForm, setMessageForm] = useState({
    title: '',
    message: '',
    type: 'info' as Notification['type'],
    targetRole: 'all' as Notification['targetRole']
  });
  const [sendResult, setSendResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [seasonToDelete, setSeasonToDelete] = useState<string | null>(null);

  const handleEditStudent = (progress: StudentProgress) => {
    setEditingProgress(progress);
    setEditPlanForm({
      meetingDay: progress.meetingDay || '',
      attended: progress.attended || false,
      weeklyGoal: progress.weeklyGoal || '',
      difficulty: progress.difficulty || '',
      solution: progress.solution || '',
      status: progress.status || 'Kutilmoqda'
    });
  };

  const handleSaveEdit = () => {
    if (!editingProgress) return;
    onUpdateProgress({
      ...editingProgress,
      ...editPlanForm
    });
    setEditingProgress(null);
  };

  useEffect(() => {
    if (selectedUserForView) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      setIsDirectMessaging(false);
    }
    }, [selectedUserForView]);

  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem('buddy_admin_notification_settings');
    return saved ? JSON.parse(saved) : {
      adminEmail: user?.email || '',
      onNewCuratorRequest: true,
      onGoalCompleted: true,
      onSeasonStart: true
    };
  });

  useEffect(() => {
    localStorage.setItem('buddy_admin_notification_settings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  useEffect(() => setUsersPage(1), [usersSearchQuery, usersFilterRole]);
  useEffect(() => setMonitoringPage(1), [monitoringSearch, monitoringCuratorFilter, monitoringStatusFilter, monitoringWeek, monitoringAttendanceFilter]);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#0a0a0c]">
        <div className="text-center p-12 bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-3xl border border-red-500/10 shadow-xl">
          <ShieldAlert className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white mb-4">Kirish Taqiqlandi</h2>
          <p className="text-slate-400">Sizda ushbu sahifani ko'rish uchun ruxsat yo'q.</p>
        </div>
      </div>
    );
  }

  const curatorsList = useMemo(() => allUsers.filter(u => u.role === 'curator'), [allUsers]);
  const approvedCurators = useMemo(() => curatorsList.filter(u => u.status === 'active'), [curatorsList]);
  const pendingUsers = useMemo(() => allUsers.filter(u => u.status === 'pending'), [allUsers]);

  const stats = useMemo(() => {
    const totalCompleted = allProgress.filter(p => p.status === 'Hal qilindi').length;
    const overallRate = allProgress.length > 0 ? Math.round((totalCompleted / allProgress.length) * 100) : 0;
    return {
      curatorsCount: approvedCurators.length,
      pendingCount: pendingUsers.length,
      studentsCount: allUsers.filter(u => u.role === 'student').length,
      totalPlans: allProgress.length,
      overallRate
    };
  }, [approvedCurators, pendingUsers, allUsers, allProgress]);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(u => {
      const matchesSearch = (u.name || '').toLowerCase().includes(usersSearchQuery.toLowerCase()) ||
        (u.username || '').toLowerCase().includes(usersSearchQuery.toLowerCase());
      const matchesRole = usersFilterRole === 'all' || u.role === usersFilterRole;
      return matchesSearch && matchesRole;
    });
  }, [allUsers, usersSearchQuery, usersFilterRole]);

  const totalUsersPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const start = (usersPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, usersPage]);

  const seasonProgress = useMemo(() => {
    return allProgress.filter(p => p.seasonId === monitoringSeasonId);
  }, [allProgress, monitoringSeasonId]);

  const filteredMonitoring = useMemo(() => {
    return seasonProgress.filter(p => {
      const matchesWeek = p.weekNumber === monitoringWeek;
      const matchesSearch = (p.studentName || '').toLowerCase().includes(monitoringSearch.toLowerCase());
      const matchesCurator = monitoringCuratorFilter === 'all' || p.curatorId === monitoringCuratorFilter;
      const matchesStatus = monitoringStatusFilter === 'all' || p.status === monitoringStatusFilter;
      const matchesAttendance = monitoringAttendanceFilter === 'all' ||
        (monitoringAttendanceFilter === 'attended' ? p.attended === true : p.attended === false);
      return matchesWeek && matchesSearch && matchesCurator && matchesStatus && matchesAttendance;
    });
  }, [seasonProgress, monitoringWeek, monitoringSearch, monitoringCuratorFilter, monitoringStatusFilter, monitoringAttendanceFilter]);

  const curatorsWithProgress = useMemo(() => {
    const curatorIds = Array.from(new Set(filteredMonitoring.map(p => p.curatorId)));
    return curatorIds.map(id => {
      const curator = allUsers.find(u => u.id === id);
      const progress = filteredMonitoring.filter(p => p.curatorId === id);
      return { curator, progress };
    });
  }, [filteredMonitoring, allUsers]);

  const totalMonitoringPages = Math.ceil(curatorsWithProgress.length / 5);
  const paginatedCurators = useMemo(() => {
    const start = (monitoringPage - 1) * 5;
    return curatorsWithProgress.slice(start, start + 5);
  }, [curatorsWithProgress, monitoringPage]);

  // ========== EXCEL EXPORT ==========
  const [exportingSeasonId, setExportingSeasonId] = useState<string | null>(null);

  const exportMonitoringToExcel = async (seasonId: string) => {
    const activeSeason = seasons.find(s => s.id === seasonId);
    if (!activeSeason) return;
    setExportingSeasonId(seasonId);
    const seasonName = `Mavsum #${activeSeason.number}`;
    const maxWeeks = (activeSeason.durationInMonths || 3) * 4;

    // Barcha kuratorlarni va ularning progresslarini olish
    const allSeasonProgress = allProgress.filter(p => p.seasonId === seasonId);
    const curatorIds = Array.from(new Set(allSeasonProgress.map(p => p.curatorId)));

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Monitoring');

    // 1-qator: Mavsum nomi
    const titleRow = sheet.addRow([seasonName]);
    titleRow.getCell(1).font = { bold: true, size: 16, color: { argb: 'FF4F46E5' } };
    titleRow.getCell(1).alignment = { horizontal: 'left' };
    sheet.mergeCells(1, 1, 1, 1 + maxWeeks * 5);

    // 2-qator: bo'sh
    sheet.addRow([]);

    let currentRow = 3;

    curatorIds.forEach((curatorId, cIdx) => {
      const curator = allUsers.find(u => u.id === curatorId);
      const curatorName = curator?.name || 'Noma\'lum kurator';

      // Kurator ismi (merged, bold)
      const curatorRow = sheet.addRow([curatorName]);
      curatorRow.getCell(1).font = { bold: true, size: 13, color: { argb: 'FF818CF8' } };
      curatorRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E1B4B' } };
      sheet.mergeCells(currentRow, 1, currentRow, 1 + maxWeeks * 5);
      currentRow++;

      // Header 1-qator: O'quvchi | 1-HAFTA (merged 5) | 2-HAFTA (merged 5) | ...
      const header1: string[] = ["O'quvchi"];
      for (let w = 1; w <= maxWeeks; w++) {
        header1.push(`${w}-HAFTA`, '', '', '', '');
      }
      const h1Row = sheet.addRow(header1);
      h1Row.getCell(1).font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
      h1Row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF312E81' } };
      h1Row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
      h1Row.getCell(1).border = { bottom: { style: 'thin', color: { argb: 'FF4338CA' } } };
      // Merge hafta headerlari
      for (let w = 0; w < maxWeeks; w++) {
        const startCol = 2 + w * 5;
        sheet.mergeCells(currentRow, startCol, currentRow, startCol + 4);
        const cell = h1Row.getCell(startCol);
        cell.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: w % 2 === 0 ? 'FF3730A3' : 'FF4338CA' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = { bottom: { style: 'thin', color: { argb: 'FF4338CA' } } };
      }
      currentRow++;

      // Header 2-qator: (bo'sh) | Uchrashuv | Maqsad | Muammo | Yechim | Holat | ...
      const header2: string[] = [''];
      for (let w = 0; w < maxWeeks; w++) {
        header2.push('Uchrashuv', 'Maqsad', 'Muammo', 'Yechim', 'Holat');
      }
      const h2Row = sheet.addRow(header2);
      h2Row.eachCell((cell, colNumber) => {
        cell.font = { bold: true, size: 9, color: { argb: 'FFA5B4FC' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E1B4B' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = { bottom: { style: 'thin', color: { argb: 'FF312E81' } } };
      });
      currentRow++;

      // O'quvchilar satrlarini topish
      const curatorProgress = allSeasonProgress.filter(p => p.curatorId === curatorId);
      const studentNames: string[] = Array.from(new Set(curatorProgress.map(p => p.studentName)));

      studentNames.forEach((name, sIdx) => {
        const rowData: string[] = [name];
        for (let w = 1; w <= maxWeeks; w++) {
          const wp = curatorProgress.find(p => p.studentName === name && p.weekNumber === w);
          if (wp) {
            const meetDay = wp.meetingDay ? new Date(wp.meetingDay).toLocaleDateString('uz-UZ', { month: 'numeric', day: 'numeric' }) : '';
            rowData.push(
              meetDay,
              wp.weeklyGoal || '',
              wp.difficulty || '',
              wp.solution || '',
              wp.status || ''
            );
          } else {
            rowData.push('', '', '', '', '');
          }
        }
        const dataRow = sheet.addRow(rowData);
        dataRow.eachCell((cell, colNumber) => {
          cell.font = { size: 10, color: { argb: 'FFE2E8F0' } };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sIdx % 2 === 0 ? 'FF0F172A' : 'FF1E293B' } };
          cell.alignment = { vertical: 'middle', wrapText: true };
          if (colNumber === 1) {
            cell.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
          }
          // Holat ustunlari uchun rang
          if (colNumber > 1 && (colNumber - 1) % 5 === 0) {
            const val = cell.value?.toString() || '';
            if (val === 'Hal qilindi') cell.font = { size: 10, bold: true, color: { argb: 'FF22C55E' } };
            else if (val === 'Bajarmadi') cell.font = { size: 10, bold: true, color: { argb: 'FFEF4444' } };
            else if (val === 'Bajarilmoqda') cell.font = { size: 10, bold: true, color: { argb: 'FF818CF8' } };
            else if (val === 'Kutilmoqda') cell.font = { size: 10, bold: true, color: { argb: 'FFEAB308' } };
          }
        });
        currentRow++;
      });

      // Kuratorlar orasida bo'sh satr
      if (cIdx < curatorIds.length - 1) {
        sheet.addRow([]);
        currentRow++;
      }
    });

    // Ustun kengliklarini sozlash
    sheet.getColumn(1).width = 22;
    for (let i = 2; i <= 1 + maxWeeks * 5; i++) {
      sheet.getColumn(i).width = 14;
    }

    // Faylni yuklab olish
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monitoring_mavsum_${activeSeason.number}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
    setExportingSeasonId(null);
  };

  // Jadval uchun Progress holati
  const getProgressStatusStyle = (status: string) => {
    switch (status) {
      case 'Hal qilindi': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Bajarmadi': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Bajarilmoqda': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Kutilmoqda': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  // Kuratorlar uchun foydalanuvchi statusi
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

  const handleSaveNotificationSettings = async () => {
    // Local storage ga saqlash useEffect'da bor, backend bo'lsa onUpdateSettings chaqiriladi
  };

  const handleSendMessage = async () => {
    if (!messageForm.title || !messageForm.message) return;
    setSendResult(null);
    setIsSendingMessage(true);
    try {
      await onSendNotification({
        title: messageForm.title,
        message: messageForm.message,
        type: messageForm.type,
        targetRole: messageForm.targetRole,
        isRead: true,
        sender: user?.name || 'Admin'
      });
      setMessageForm({ title: '', message: '', type: 'info', targetRole: 'all' });
      setSendResult({ ok: true, msg: 'Xabar muvaffaqiyatli yuborildi! ✓' });
    } catch (e: any) {
      console.error('Xabar yuborishda xatolik:', e);
      setSendResult({ ok: false, msg: `Xatolik: ${e?.response?.data ? JSON.stringify(e.response.data) : e.message}` });
    } finally {
      setTimeout(() => setSendResult(null), 4000);
      setIsSendingMessage(false);
    }
  };

  const handleSendDirectMessage = async () => {
    if (!selectedUserForView || !directMessageForm.title || !directMessageForm.message) return;
    setSendResult(null);
    setIsSendingMessage(true);
    try {
      await onSendNotification({
        title: directMessageForm.title,
        message: directMessageForm.message,
        type: directMessageForm.type,
        targetRole: 'none',
        targetUserId: selectedUserForView.id,
        isRead: true,
        sender: user?.name || 'Admin'
      });
      setDirectMessageForm({ title: '', message: '', type: 'info' });
      setIsDirectMessaging(false);
      setSendResult({ ok: true, msg: `${selectedUserForView.name} ga xabar yuborildi! ✓` });
    } catch (e: any) {
      console.error('Shaxsiy xabar yuborishda xatolik:', e);
      setSendResult({ ok: false, msg: `Xatolik: ${e?.response?.data ? JSON.stringify(e.response.data) : e.message}` });
    } finally {
      setTimeout(() => setSendResult(null), 4000);
      setIsSendingMessage(false);
    }
  };

  const handleStartNewSeasonInternal = async () => {
    try {
      setSendResult(null);
      await onStartNewSeason();
      setSendResult({ ok: true, msg: 'Yangi mavsum muvaffaqiyatli boshlandi! ✓' });
    } catch (e: any) {
      console.error('Mavsum boshlashda xatolik:', e);
      setSendResult({ ok: false, msg: `Mavsumda xatolik: ${e?.response?.data ? JSON.stringify(e.response.data) : e.message}` });
    } finally {
      setTimeout(() => setSendResult(null), 4000);
      setIsSendingMessage(false);
    }
  };

  const getAssignedCurator = (student: UserData | null) => {
    if (!student || student.role !== 'student') return null;
    return allUsers.find(u => u.id === student.assignedCuratorId) || null;
  };

  const getStartupCurator = (student: UserData | null) => {
    if (!student || student.role !== 'student') return null;
    return allUsers.find(u => u.id === student.startupCuratorId) || null;
  };

  const getAssignedStudents = (curator: UserData | null) => {
    if (!curator || curator.role !== 'curator') return [];
    return allUsers.filter(u => u.assignedCuratorId === curator.id || u.startupCuratorId === curator.id);
  };

  return (
    <section className="py-6 md:py-10 bg-[#0a0a0c] min-h-screen">
      {isSendingMessage && (
        <div className="fixed inset-0 z-[1500] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/5 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Send className="w-8 h-8 text-indigo-500 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-white font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Xabar yuborilmoqda...</p>
        </div>
      )}
      <div className="max-w-[1700px] mx-auto px-3 sm:px-4 lg:px-10">
        {/* ===== TOP CENTERED HEADER SECTION ===== */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-6">
              <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] break-words">
              Administrator Boshqaruv Markazi
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-7xl font-black text-white tracking-tighter mb-4 break-words w-full">
            {tabLabels[activeTab].title}
          </h1>
          <p className="text-slate-500 max-w-full sm:max-w-2xl text-xs sm:text-sm md:text-lg leading-relaxed font-bold mb-10 break-words w-full px-4">
            {tabLabels[activeTab].desc}
          </p>
        </div>
        {activeTab === 'stats' && (
          <div className="animate-in fade-in duration-500 space-y-12">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {/* Card 1 */}
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl md:rounded-[10px] border border-indigo-500/10 p-5 md:p-8 relative overflow-hidden group hover:border-indigo-500/40 transition-colors bg-[#11131a] shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-indigo-500/20"></div>
                <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-[10px] bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                    <Users className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-indigo-500/20">
                    <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" /> <span className="hidden sm:inline">Faol</span>
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-1 md:mb-2">{stats.studentsCount}</h3>
                  <p className="text-[10px] md:text-xs font-black uppercase text-slate-500 tracking-widest">O'quvchilar</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl md:rounded-[10px] border border-purple-500/10 p-5 md:p-8 relative overflow-hidden group hover:border-purple-500/40 transition-colors bg-[#15111a] shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/20"></div>
                <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-[10px] bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                    <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-purple-500/20">
                    <Award className="w-2.5 h-2.5 md:w-3 md:h-3" /> <span className="hidden sm:inline">Mentorlar</span>
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-1 md:mb-2">{stats.curatorsCount}</h3>
                  <p className="text-[10px] md:text-xs font-black uppercase text-slate-500 tracking-widest">Kuratorlar</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl md:rounded-[10px] border border-green-500/10 p-5 md:p-8 relative overflow-hidden group hover:border-green-500/40 transition-colors bg-[#111a14] shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-green-500/20"></div>
                <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-[10px] bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-400">
                    <Target className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-500/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-green-500/20">
                    <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" /> {stats.overallRate}%
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-1 md:mb-2">{stats.totalPlans}</h3>
                  <p className="text-[10px] md:text-xs font-black uppercase text-slate-500 tracking-widest">Jami Rejalar</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl md:rounded-[10px] border border-orange-500/10 p-5 md:p-8 relative overflow-hidden group hover:border-orange-500/40 transition-colors bg-[#1a1511] shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-orange-500/20"></div>
                <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-[10px] bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-400">
                    <Clock className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-orange-500/20">
                    <AlertTriangle className="w-2.5 h-2.5 md:w-3 md:h-3" /> <span className="hidden sm:inline">Kutish</span>
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-1 md:mb-2">{stats.pendingCount}</h3>
                  <p className="text-[10px] md:text-xs font-black uppercase text-slate-500 tracking-widest">Kutilmoqda</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Progress Chart */}
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[10px] border border-white/5 p-8 shadow-xl">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6 ml-2">Haftalik O'sish</h4>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={Array.from({ length: (seasons.find(s => s.id === activeSeasonId)?.durationInMonths || 3) * 4 }, (_, i) => i + 1).map(week => {
                      const weekData = allProgress.filter(p => p.weekNumber === week && p.seasonId === activeSeasonId);
                      return {
                        name: `${week}-hafta`,
                        'Bajarildi': weekData.filter(p => p.status === 'Hal qilindi').length,
                        'Jami': weekData.length
                      };
                    })}>
                      <defs>
                        <linearGradient id="colorBajarildi" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorJami" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#121214', border: '1px solid #ffffff10', borderRadius: '1rem' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}
                        labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
                      />
                      <Area type="monotone" dataKey="Jami" stroke="#6366f1" fillOpacity={1} fill="url(#colorJami)" strokeWidth={3} activeDot={{ r: 6 }} />
                      <Area type="monotone" dataKey="Bajarildi" stroke="#10b981" fillOpacity={1} fill="url(#colorBajarildi)" strokeWidth={3} activeDot={{ r: 6 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Distribution Chart */}
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[10px] border border-white/5 p-8 shadow-xl">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6 ml-2">Holatlar Taqvimi</h4>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Hal qilindi', count: allProgress.filter(p => p.status === 'Hal qilindi').length, color: '#10b981' },
                      { name: 'Bajarilmoqda', count: allProgress.filter(p => p.status === 'Bajarilmoqda').length, color: '#3b82f6' },
                      { name: 'Kutilmoqda', count: allProgress.filter(p => p.status === 'Kutilmoqda').length, color: '#f59e0b' },
                      { name: 'Bajarmadi', count: allProgress.filter(p => p.status === 'Bajarmadi').length, color: '#ef4444' },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#121214', border: '1px solid #ffffff10', borderRadius: '1rem' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}
                        labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
                        cursor={{ fill: '#ffffff05' }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {
                          [
                            { name: 'Hal qilindi', count: allProgress.filter(p => p.status === 'Hal qilindi').length, color: '#10b981' },
                            { name: 'Bajarilmoqda', count: allProgress.filter(p => p.status === 'Bajarilmoqda').length, color: '#3b82f6' },
                            { name: 'Kutilmoqda', count: allProgress.filter(p => p.status === 'Kutilmoqda').length, color: '#f59e0b' },
                            { name: 'Bajarmadi', count: allProgress.filter(p => p.status === 'Bajarmadi').length, color: '#ef4444' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))
                        }
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Attendance Pie Chart */}
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[10px] border border-white/5 p-8 shadow-xl">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6 ml-2">Davomat Ko'rsatkichi</h4>
                <div className="h-[300px] w-full flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Qatnashganlar', value: allProgress.filter(p => p.attended === true).length, color: '#10b981' },
                          { name: 'Qatnashmaganlar', value: allProgress.filter(p => p.attended === false).length, color: '#ef4444' },
                          { name: 'Belgilanmagan', value: allProgress.filter(p => p.attended === undefined).length, color: '#64748b' }
                        ].filter(d => d.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {
                          [
                            { name: 'Qatnashganlar', value: allProgress.filter(p => p.attended === true).length, color: '#10b981' },
                            { name: 'Qatnashmaganlar', value: allProgress.filter(p => p.attended === false).length, color: '#ef4444' },
                            { name: 'Belgilanmagan', value: allProgress.filter(p => p.attended === undefined).length, color: '#64748b' }
                          ].filter(d => d.value > 0).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))
                        }
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#121214', border: '1px solid #ffffff10', borderRadius: '1rem' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}
                        labelStyle={{ display: 'none' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-white">{allProgress.filter(p => p.attended === true).length}</span>
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest mt-1">Qatnashgan</span>
                  </div>
                </div>
              </div>

              {/* Top Curators */}
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[10px] border border-white/5 p-8 shadow-xl">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6 ml-2">Eng Faol Kuratorlar</h4>
                <div className="space-y-4">
                  {allUsers
                    .filter(u => u.role === 'curator')
                    .map(curator => {
                      const curatorProgress = allProgress.filter(p => p.curatorId === curator.id);
                      const completedCount = curatorProgress.filter(p => p.status === 'Hal qilindi').length;
                      const totalCount = curatorProgress.length;
                      const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
                      return { curator, completedCount, totalCount, completionRate };
                    })
                    .sort((a, b) => b.completionRate - a.completionRate)
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={item.curator.id} className="flex flex-col p-4 rounded-[10px] bg-white/5 border border-white/5">
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="w-10 h-10 rounded-[10px] bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-black text-sm border border-indigo-500/20">
                              #{index + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h5 className="text-sm font-black text-white truncate break-words">{item.curator.name}</h5>
                              <p className="text-[9px] font-bold uppercase text-slate-500 tracking-widest mt-0.5">{item.completedCount} ta hal qilingan</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-black text-white">{item.completionRate}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1.5">
                          <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${item.completionRate}%` }}></div>
                        </div>
                      </div>
                    ))
                  }
                  {allUsers.filter(u => u.role === 'curator').length === 0 && (
                    <div className="text-center py-10 text-slate-500 text-sm">Kuratorlar topilmadi</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="animate-in fade-in duration-500 space-y-12">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-12 w-full">
              {/* Week Selector */}
              <div className="flex items-center bg-[#121214] border border-white/5 rounded-2xl p-1 h-[52px] shadow-xl w-full sm:w-auto justify-between sm:justify-center order-2 sm:order-1">
                <button disabled={monitoringWeek === 1} onClick={() => setMonitoringWeek(w => w - 1)} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all disabled:opacity-20 active:scale-90">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="px-6 flex flex-col items-center justify-center border-x border-white/5 h-2/3 min-w-[100px]">
                  <span className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] leading-none mb-1">Haftalik</span>
                  <span className="text-xl font-black text-white leading-none">#{monitoringWeek.toString().padStart(2, '0')}</span>
                </div>
                <button disabled={monitoringWeek >= (seasons.find(s => s.id === monitoringSeasonId)?.durationInMonths || 3) * 4} onClick={() => setMonitoringWeek(w => w + 1)} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all disabled:opacity-20 active:scale-90">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Season Selector */}
              <div className="flex items-center w-full sm:w-auto order-1 sm:order-2">
                <CustomDropdown
                  variant="compact"
                  className="w-full sm:w-[220px]"
                  options={seasons.map(s => ({
                    value: s.id,
                    label: `Mavsum #${s.number}`,
                    icon: <div className={`w-1.5 h-1.5 rounded-full ${s.isActive ? 'bg-green-500 animate-pulse' : 'bg-indigo-500'}`} />
                  }))}
                  value={monitoringSeasonId}
                  onChange={setMonitoringSeasonId}
                  placeholder="Mavsum tanlang"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-6 bg-[#121214] p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[3rem] border border-white/5 shadow-2xl">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors z-10" />
                <input type="text" placeholder="O'quvchini qidirish..." className="w-full bg-[#0a0a0c] border border-white/5 rounded-2xl py-4 pl-12 sm:pl-14 pr-4 sm:pr-6 text-xs sm:text-sm text-white text-sm outline-none focus:border-indigo-600 transition-all shadow-inner" value={monitoringSearch} onChange={e => setMonitoringSearch(e.target.value)} />
              </div>

              <CustomDropdown
                options={[
                  { value: 'all', label: 'Barcha Kuratorlar' },
                  ...approvedCurators.map(c => ({ value: c.id, label: c.name }))
                ]}
                value={monitoringCuratorFilter}
                onChange={setMonitoringCuratorFilter}
                icon={<Users className="w-5 h-5" />}
                placeholder="Kuratorni tanlang"
              />

              <CustomDropdown
                options={[
                  { value: 'all', label: 'Barcha Holatlar' },
                  { value: 'Hal qilindi', label: 'Hal qilindi' },
                  { value: 'Bajarilmoqda', label: 'Bajarilmoqda' },
                  { value: 'Kutilmoqda', label: 'Kutilmoqda' },
                  { value: 'Bajarmadi', label: 'Bajarmadi' }
                ]}
                value={monitoringStatusFilter}
                onChange={setMonitoringStatusFilter}
                icon={<Filter className="w-5 h-5" />}
                placeholder="Holatni tanlang"
              />

              <CustomDropdown
                options={[
                  { value: 'all', label: 'Barcha Davomat' },
                  { value: 'attended', label: 'Qatnashganlar' },
                  { value: 'not-attended', label: 'Qatnashmaganlar' }
                ]}
                value={monitoringAttendanceFilter}
                onChange={(val) => setMonitoringAttendanceFilter(val as any)}
                icon={monitoringAttendanceFilter === 'not-attended' ? <UserX className="w-5 h-5 text-red-500" /> : <UserCheck className="w-5 h-5" />}
                placeholder="Davomatni tanlang"
              />

              <div className="flex items-center justify-end gap-3">
                <button onClick={() => { setMonitoringSearch(''); setMonitoringCuratorFilter('all'); setMonitoringStatusFilter('all'); setMonitoringAttendanceFilter('all'); }} className="px-6 py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">Tozalash</button>
              </div>
            </div>
            <div className="space-y-12">
              {paginatedCurators.length > 0 ? paginatedCurators.map(({ curator, progress }, index) => (
                <div key={curator?.id || `unknown-${index}`} className="space-y-6">
                  <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 sm:px-8 py-5 sm:py-6 bg-indigo-600/10 border border-indigo-500/10 rounded-3xl sm:rounded-[2.5rem] shadow-lg cursor-pointer hover:bg-indigo-600/20 transition-all"
                    onClick={() => curator && setSelectedUserForView(curator)}
                  >
                    <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1 w-full sm:w-auto">
                      {curator?.avatar ? (
                        <img src={curator.avatar} alt={curator.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover shadow-xl border border-white/10" />
                      ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-xl">
                          {(curator?.name || curator?.username || '?')[0].toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight transition-colors truncate break-words">{curator?.name || 'Noma\'lum Kurator'}</h3>
                        <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] truncate ${curator?.field === 'StartUp Community' ? 'text-pink-400' : 'text-indigo-400'}`}>
                          {curator?.field === 'StartUp Community' ? 'Startup Buddy' : 'Asosiy Buddy'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto px-6 py-3 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between sm:justify-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest sm:mr-3">O'quvchilar:</span>
                      <span className="text-lg font-black text-white">{progress.length}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-3xl md:rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl bg-[#0a0a0c]/60 backdrop-blur-3xl">
                    {/* Desktop View */}
                    <div className="hidden lg:block w-full overflow-x-auto">
                      <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
                        <thead>
                          <tr className="bg-white/[0.04] border-b border-white/5">
                            <th className="w-[22%] px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">O'quvchi</th>
                            <th className="w-[15%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Uchrashuv</th>
                            <th className="w-[20%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Haftalik Maqsad</th>
                            <th className="w-[15%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Asosiy Muammo</th>
                            <th className="w-[15%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Berilgan Yechim</th>
                            <th className="w-[10%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Holat</th>
                            <th className="w-[12%] px-6 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Amal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {progress.map(item => {
                            const student = allUsers.find(u => u.name === item.studentName);

                            return (
                              <tr key={item.id} className="hover:bg-indigo-600/[0.03] transition-all duration-300">
                                <td className="px-10 py-8">
                                  <div className="flex items-center gap-4 cursor-pointer group/name min-w-0" onClick={() => student && setSelectedUserForView(student)}>
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/10 flex items-center justify-center text-sm text-indigo-400 font-black group-hover/name:bg-indigo-600 group-hover/name:text-white transition-all shadow-sm shrink-0">{(item.studentName || '?')[0].toUpperCase()}</div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-base font-black text-white tracking-tight group-hover/name:text-indigo-400 transition-colors break-words">{item.studentName}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-8">
                                  <div className="flex flex-col gap-1.5 min-w-0">
                                    <p className="text-[11px] break-words text-indigo-300 font-black uppercase tracking-widest flex items-center gap-1.5 break-words"><Calendar className="w-3.5 h-3.5 shrink-0" /> {item.meetingDay ? new Date(item.meetingDay).toLocaleDateString() : 'Kiritilmagan'}</p>
                                    <p className={`text-[9px] font-black uppercase tracking-widest break-words ${item.attended ? 'text-green-500' : 'text-red-500'}`}>{item.attended ? 'Ishtirok etdi' : 'Ishtirok etmadi'}</p>
                                  </div>
                                </td>
                                <td className="px-6 py-8"><p className="text-[13px] text-slate-300 leading-relaxed font-medium break-words">{item.weeklyGoal || 'Kiritilmagan'}</p></td>
                                <td className="px-6 py-8">
                                  <p className={`text-[13px] leading-relaxed font-medium break-words ${!item.difficulty || item.difficulty === 'Yo\'q' ? 'text-slate-500' : 'text-slate-300'}`}>{item.difficulty || 'Yo\'q'}</p>
                                </td>
                                <td className="px-6 py-8">
                                  <p className={`text-[13px] leading-relaxed font-medium break-words ${!item.solution ? 'text-slate-500 italic' : 'text-slate-300'}`}>{item.solution || 'Kutilmoqda'}</p>
                                </td>
                                <td className="px-6 py-8"><span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all shadow-sm ${getProgressStatusStyle(item.status as any)}`}>{item.status}</span></td>
                                <td className="px-6 py-8 text-center">
                                  <div className="flex items-center justify-center">
                                    <button onClick={() => handleEditStudent(item)} className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5"><Edit2 className="w-4 h-4" /></button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden p-4 md:p-6 space-y-6">
                      {progress.map((item) => {
                        const student = allUsers.find(u => u.name === item.studentName);

                            return (
                          <div key={item.id} className="p-4 sm:p-6 bg-white/5 border border-white/5 rounded-2xl space-y-5 shadow-xl">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                              <div className="flex items-center gap-3 cursor-pointer min-w-0 w-full flex-1 mr-4" onClick={() => student && setSelectedUserForView(student)}>
                                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center font-black text-indigo-400 text-xs border border-indigo-500/20 shrink-0">{(item.studentName || '?')[0].toUpperCase()}</div>
                                <div className="min-w-0 flex-1">
                                  <span className="font-black text-white text-sm sm:text-base block truncate break-words">{item.studentName}</span>
                                  <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5 truncate"><Calendar className="w-3 h-3 shrink-0" /> <span className="truncate break-words">{item.meetingDay ? new Date(item.meetingDay).toLocaleDateString() : 'Noma\'lum'}</span></span>
                                </div>
                              </div>
                              <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase border shrink-0 ${getProgressStatusStyle(item.status as any)}`}>{item.status}</span>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase text-indigo-400 tracking-widest flex items-center gap-2"><Target className="w-3 h-3" /> Maqsad</p>
                                <p className="text-[13px] text-slate-300 leading-relaxed font-medium bg-white/5 p-3 rounded-xl break-words whitespace-pre-wrap">{item.weeklyGoal || 'Kiritilmagan'}</p>
                              </div>

                              <div className="grid grid-cols-1 gap-3">
                                <div className="space-y-1">
                                  <p className="text-[9px] font-black uppercase text-orange-400 tracking-widest flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> Muammo</p>
                                  <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                                    <p className={`text-[12px] leading-relaxed font-bold break-words whitespace-pre-wrap ${!item.difficulty || item.difficulty === 'Yo\'q' ? 'text-slate-600 italic' : 'text-orange-300'}`}>{item.difficulty || 'Yo\'q'}</p>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-[9px] font-black uppercase text-green-400 tracking-widest flex items-center gap-2"><Lightbulb className="w-3 h-3" /> Yechim</p>
                                  <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                                    <p className="text-[12px] text-green-300 leading-relaxed italic font-medium break-words whitespace-pre-wrap">{item.solution || 'Kutilmoqda'}</p>
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
                <div className="py-40 text-center bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[3.5rem] border-dashed border-2 border-white/5">
                  <Activity className="w-20 h-20 text-slate-800 mx-auto mb-8 opacity-20" />
                  <p className="text-2xl font-black text-slate-700 uppercase tracking-widest">Ma'lumotlar mavjud emas</p>
                </div>
              )}
            </div>

            {/* Pagination for Monitoring */}
            {totalMonitoringPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-10">
                <button
                  disabled={monitoringPage === 1}
                  onClick={() => setMonitoringPage(p => p - 1)}
                  className="p-4 bg-white/5 text-slate-400 rounded-2xl border border-white/5 hover:text-white transition-all disabled:opacity-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-sm font-black text-white">{monitoringPage} / {totalMonitoringPages}</span>
                </div>
                <button
                  disabled={monitoringPage === totalMonitoringPages}
                  onClick={() => setMonitoringPage(p => p + 1)}
                  className="p-4 bg-white/5 text-slate-400 rounded-2xl border border-white/5 hover:text-white transition-all disabled:opacity-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-8 bg-[#121214] p-4 md:p-10 rounded-2xl md:rounded-[3rem] border border-white/5 shadow-2xl">
              <div className="flex-1 w-full max-w-2xl relative group"><Search className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-slate-500 group-focus-within:text-indigo-500 transition-colors" /><input type="text" placeholder="A'zoni qidirish..." className="w-full bg-[#0a0a0c] border border-white/5 rounded-2xl md:rounded-[2.5rem] py-4 md:py-6 pl-12 md:pl-20 pr-4 md:pr-8 text-white text-sm md:text-base outline-none focus:border-indigo-600 transition-all shadow-inner" value={usersSearchQuery} onChange={e => setUsersSearchQuery(e.target.value)} /></div>
              <div className="flex flex-wrap justify-center p-1 md:p-1.5 bg-[#0a0a0c] rounded-2xl md:rounded-[2.5rem] border border-white/5 shadow-inner gap-1">{(['all', 'student', 'curator', 'admin'] as const).map(r => (<button key={r} onClick={() => setUsersFilterRole(r)} className={`px-4 md:px-8 py-2 md:py-3.5 rounded-xl md:rounded-[2rem] text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all ${usersFilterRole === r ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>{r === 'all' ? 'Barchasi' : r}</button>))}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-[#0a0a0c]/50">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-hidden">
                  <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                      <tr className="bg-white/[0.03] border-b border-white/5">
                        <th className="w-[38%] px-8 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Foydalanuvchi</th>
                        <th className="w-[14%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Status</th>
                        <th className="w-[14%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Lavozimi</th>
                        <th className="hidden lg:table-cell w-[20%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Soha</th>
                        <th className="w-[14%] px-4 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Amal</th>
                      </tr>
                    </thead>
                  <tbody className="divide-y divide-white/5">
                    {paginatedUsers.length > 0 ? paginatedUsers.map(u => (
                      <tr key={u.id} className="group hover:bg-indigo-600/[0.03] transition-all duration-300 cursor-pointer" onClick={() => setSelectedUserForView(u)}>
                        <td className="px-8 py-6 align-middle">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-white/5 flex items-center justify-center font-black text-indigo-400 text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all overflow-hidden relative shrink-0">
                              {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover" /> : (u.name || u.username || '?')[0].toUpperCase()}
                            </div>
                            <div className="min-w-0 overflow-hidden">
                              <p className="text-base font-black text-white leading-none mb-1 truncate">{u.name}</p>
                              <p className="text-[12px] text-slate-600 font-bold truncate">@{u.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-6 text-center align-middle">
                          <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${getUserStatusStyle(u.status)}`}>
                            {u.status === 'active' ? 'Faol' : u.status === 'inactive' ? 'Passiv' : 'Kutish'}
                          </span>
                        </td>
                        <td className="px-4 py-6 text-center align-middle">
                          <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${getRoleStyle(u.role)}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="hidden lg:table-cell px-4 py-6 align-middle">
                          <div className="flex items-center gap-2 min-w-0">
                            <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400 shrink-0" />
                            <span className="text-xs font-bold text-slate-500 truncate">{u.field || 'Noma\'lum'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-6 text-center align-middle">
                          <div className="flex items-center justify-center gap-2">
                            <div className="p-3 bg-white/5 text-slate-500 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all" title="Ko'rish">
                              <Eye className="w-4 h-4" />
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); onDeleteUser(u.id); }} className="p-3 text-red-500/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all" title="O'chirish">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={5} className="py-32 text-center text-slate-700 font-black uppercase tracking-widest text-xs">A'zolar topilmadi</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden p-4 space-y-4">
                {paginatedUsers.length > 0 ? paginatedUsers.map(u => (
                  <div key={u.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-5" onClick={() => setSelectedUserForView(u)}>
                    <div className="flex items-center justify-between min-w-0 gap-4">
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-white/5 flex items-center justify-center font-black text-indigo-400 text-lg overflow-hidden shrink-0">
                          {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover" /> : (u.name || u.username || '?')[0].toUpperCase()}
                        </div>
                         <div className="min-w-0 flex-1">
                           <p className="text-base font-black text-white leading-none mb-1 truncate">{u.name}</p>
                           <p className="text-[11px] break-words text-slate-600 font-bold truncate">@{u.username}</p>
                         </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border shrink-0 ${getRoleStyle(u.role)}`}>
                        {u.role}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${getUserStatusStyle(u.status)}`}>
                        {u.status === 'active' ? 'Faol' : u.status === 'inactive' ? 'Passiv' : 'Kutish'}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="p-2.5 bg-white/5 text-slate-400 rounded-xl border border-white/5">
                          <Eye className="w-4 h-4" />
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); onDeleteUser(u.id); }} className="p-2.5 text-red-500/40 hover:text-red-500 bg-red-500/10 rounded-xl border border-red-500/10">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center text-slate-700 font-black uppercase tracking-widest text-xs">A'zolar topilmadi</div>
                )}
              </div>
            </div>
            {/* Pagination for Users */}
            {totalUsersPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-10">
                <button
                  disabled={usersPage === 1}
                  onClick={() => setUsersPage(p => p - 1)}
                  className="p-4 bg-white/5 text-slate-400 rounded-2xl border border-white/5 hover:text-white transition-all disabled:opacity-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-sm font-black text-white">{usersPage} / {totalUsersPages}</span>
                </div>
                <button
                  disabled={usersPage === totalUsersPages}
                  onClick={() => setUsersPage(p => p + 1)}
                  className="p-4 bg-white/5 text-slate-400 rounded-2xl border border-white/5 hover:text-white transition-all disabled:opacity-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {pendingUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {pendingUsers.map(pc => (
                  <div key={pc.id} onClick={() => setSelectedUserForView(pc)} className="bg-white/5 backdrop-blur-[12px] border border-white/10 border border-white/5 rounded-[3rem] p-6 md:p-10 flex flex-col items-center text-center group hover:border-indigo-500/40 transition-all shadow-2xl cursor-pointer">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-600/10 border border-white/5 mb-8 flex items-center justify-center text-indigo-400 text-4xl font-black overflow-hidden shadow-xl group-hover:scale-105 transition-transform">{pc.avatar ? <img src={pc.avatar} className="w-full h-full object-cover" /> : (pc.name || pc.username || '?')[0].toUpperCase()}</div>
                    <div className="space-y-3 mb-10 w-full min-w-0">
                      <h3 className="text-2xl font-black text-white truncate px-4">{pc.name}</h3>
                      <p className="text-indigo-400 font-bold text-sm truncate px-4">@{pc.username}</p>
                      <div className="flex items-center justify-center gap-2 text-slate-500 text-xs mt-4 px-4 overflow-hidden min-w-0">
                        <Briefcase className="w-4 h-4 shrink-0" />
                        <span className="font-bold uppercase tracking-widest truncate">{pc.field || 'Mentor'}</span>
                      </div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onApproveUser(pc.id); }} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-all">Tezkor Tasdiqlash</button>
                  </div>
                ))}
              </div>
            ) : (<div className="py-32 text-center"><CheckCircle2 className="w-20 h-20 text-indigo-500 mx-auto mb-8 opacity-20" /><p className="text-2xl font-black text-slate-700 uppercase tracking-widest">Yangi so'rovlar yo'q</p></div>)}
          </div>
        )}

        {/* SEASONS TAB */}
        {activeTab === 'seasons' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Active Season Card - Redesigned */}
              <div className="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#0a0a0c] p-6 md:p-14 text-center transition-all hover:border-indigo-500/30">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-600/20 blur-[60px]"></div>
                <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-600/20 blur-[60px]"></div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-600/30">
                    <CalendarDays className="h-10 w-10 text-white" />
                  </div>

                  <h3 className="mb-2 text-4xl font-black tracking-tighter text-white md:text-5xl">
                    Mavsum #{seasons.find(s => s.id === activeSeasonId)?.number}
                  </h3>

                  <div className="mb-10 flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Jarayonda</span>
                  </div>

                  <div className="grid w-full grid-cols-2 gap-4 mb-10">
                    <div className="rounded-3xl bg-white/5 p-4 border border-white/5">
                      <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Boshlanish</p>
                      <p className="text-lg font-bold text-white">{seasons.find(s => s.id === activeSeasonId)?.startDate}</p>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-4 border border-white/5 relative group/duration">
                      <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Davomiyligi</p>
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="12"
                          value={seasons.find(s => s.id === activeSeasonId)?.durationInMonths || 3}
                          onChange={(e) => onUpdateSeason(activeSeasonId, { durationInMonths: parseInt(e.target.value) || 3 })}
                          className="bg-transparent text-lg font-bold text-white w-12 outline-none border-b border-white/10 focus:border-indigo-500 transition-colors text-center"
                        />
                        <span className="text-lg font-bold text-white">Oy</span>
                      </div>
                      <Edit2 className="w-3 h-3 text-indigo-500 absolute top-4 right-4" />
                    </div>
                  </div>

                  <button
                    onClick={handleStartNewSeasonInternal}
                    className="group/btn relative w-full overflow-hidden rounded-2xl bg-white py-5 text-center font-black uppercase tracking-widest text-indigo-950 shadow-xl transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Rocket className="h-5 w-5 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                      Yangi Mavsum
                    </span>
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 transition-opacity group-hover/btn:opacity-100"></div>
                  </button>

                  {sendResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl text-xs font-bold text-center border mt-4 ${sendResult.ok ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}
                    >
                      {sendResult.msg}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* History List */}
              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[3rem] border border-white/5 p-6 md:p-8">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6 ml-2">Mavsumlar Tarixi</h4>
                <div className="space-y-4">
                  {seasons.map(season => (
                    <div key={season.id} onClick={() => onSwitchSeason(season.id)} className={`p-6 rounded-2xl border flex items-center justify-between cursor-pointer transition-all group/season ${season.id === activeSeasonId ? 'bg-indigo-600/20 border-indigo-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                      <div>
                        <h5 className="text-xl font-black text-white">Mavsum #{season.number}</h5>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{season.startDate} da boshlangan</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); exportMonitoringToExcel(season.id); }}
                          disabled={exportingSeasonId === season.id}
                          className="px-4 py-2.5 bg-emerald-600/10 hover:bg-emerald-600/25 text-emerald-400 hover:text-emerald-300 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-emerald-500/20 flex items-center gap-2 shadow-lg shadow-emerald-500/5 opacity-0 group-hover/season:opacity-100 disabled:opacity-100"
                          title={`Mavsum #${season.number} monitoringini yuklab olish`}
                        >
                          {exportingSeasonId === season.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5" />
                          )}
                          Excel
                        </button>
                        {seasons.length > 1 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setSeasonToDelete(season.id); }}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full opacity-0 group-hover/season:opacity-100 transition-all"
                            title="Mavsumni o'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        {season.id === activeSeasonId ? (
                          <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-[9px] font-black uppercase">Active</div>
                        ) : (
                          <div className="p-2 bg-white/5 rounded-full text-slate-500"><History className="w-4 h-4" /></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[3rem] border border-white/5 p-6 md:p-14">

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Xabar Sarlavhasi</label>
                  <input
                    type="text"
                    value={messageForm.title}
                    onChange={e => setMessageForm({ ...messageForm, title: e.target.value })}
                    className="w-full bg-[#121214] border border-white/10 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-indigo-600 transition-all"
                    placeholder="Masalan: Platformada texnik ishlar"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Xabar Turi</label>
                    <CustomDropdown
                      variant="compact"
                      className="w-full"
                      options={[
                        { value: 'info', label: 'Info (Ko\'k)', icon: <div className="w-2 h-2 rounded-full bg-blue-500" /> },
                        { value: 'success', label: 'Success (Yashil)', icon: <div className="w-2 h-2 rounded-full bg-green-500" /> },
                        { value: 'warning', label: 'Warning (Sariq)', icon: <div className="w-2 h-2 rounded-full bg-yellow-500" /> },
                        { value: 'urgent', label: 'Urgent (Qizil)', icon: <div className="w-2 h-2 rounded-full bg-red-500" /> }
                      ]}
                      value={messageForm.type}
                      onChange={(val) => setMessageForm({ ...messageForm, type: val as any })}
                      placeholder="Xabar turini tanlang"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Qabul Qiluvchilar</label>
                    <CustomDropdown
                      variant="compact"
                      className="w-full"
                      options={[
                        { value: 'all', label: 'Barcha Foydalanuvchilar', icon: <Users className="w-4 h-4" /> },
                        { value: 'student', label: 'Faqat O\'quvchilar', icon: <UserCircle className="w-4 h-4" /> },
                        { value: 'curator', label: 'Faqat Kuratorlar', icon: <Briefcase className="w-4 h-4" /> }
                      ]}
                      value={messageForm.targetRole}
                      onChange={(val) => setMessageForm({ ...messageForm, targetRole: val as any })}
                      placeholder="Qabul qiluvchilarni tanlang"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Xabar Matni</label>
                  <textarea
                    value={messageForm.message}
                    onChange={e => setMessageForm({ ...messageForm, message: e.target.value })}
                    className="w-full bg-[#121214] border border-white/5 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-indigo-600 transition-all h-40 resize-none"
                    placeholder="Xabar mazmunini kiriting..."
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!messageForm.title || !messageForm.message}
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  Xabarni Yuborish
                </button>

                {sendResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl text-xs font-bold text-center border ${sendResult.ok ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}
                  >
                    {sendResult.msg}
                  </motion.div>
                )}
              </div>
            </div>

            {/* MESSAGE HISTORY */}
            <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[3rem] p-6 md:p-14">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <History className="w-6 h-6 text-indigo-500" /> Xabarlar Tarixi
                </h3>
                {onMarkAllRead && notifications.some(n => !n.isRead) && (
                  <button
                    onClick={onMarkAllRead}
                    className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-indigo-500/20 active:scale-95 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                    Barchasini o'qilgan deb belgilash
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {notifications && notifications.length > 0 ? (
                  [...notifications].sort((a, b) => new Date(b.timestamp || (b as any).createdAt || Date.now()).getTime() - new Date(a.timestamp || (a as any).createdAt || Date.now()).getTime()).slice(0, 20).map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-6 rounded-2xl border border-white/5 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-500/30 transition-all ${!notif.isRead ? 'border-l-4 border-l-indigo-500' : ''}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`w-2 h-2 rounded-full ${notif.type === 'urgent' ? 'bg-red-500' :
                            notif.type === 'warning' ? 'bg-yellow-500' :
                              notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                            }`} />
                          <h4 className="font-black text-white break-words text-sm">{notif.title}</h4>
                          <span className="text-[9px] font-bold text-slate-500 shrink-0 uppercase tracking-widest">
                            {new Date(notif.timestamp || (notif as any).createdAt || Date.now()).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-400 break-words text-xs leading-relaxed">{notif.message}</p>
                        <div className="mt-2 flex items-center gap-4">
                          <span className="text-[8px] font-black uppercase text-indigo-400 break-words tracking-tighter">Kimga: {notif.targetRole === 'all' ? 'Hamma' : (notif.targetRole === 'none' ? (notif.targetUserId ? 'Shaxsiy' : 'Noma\'lum') : notif.targetRole)}</span>
                          <span className="text-[8px] font-black uppercase text-slate-600 break-words tracking-tighter">Yubordi: {notif.sender}</span>
                        </div>
                      </div>

                      {!notif.isRead && notif.sender !== (user?.name || 'Admin') && (
                        <button
                          onClick={() => onMarkAsRead(notif.id)}
                          className="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-xl text-[9px] font-black uppercase hover:bg-indigo-600 hover:text-white transition-all whitespace-nowrap"
                        >
                          O'qildi deb belgilash
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center text-slate-700 font-black uppercase tracking-widest text-xs border-4 border-dashed border-white/5 rounded-[3rem]">
                    Xabarlar mavjud emas
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="space-y-6">

              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[3rem] border border-white/5 p-6 md:p-10">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3"><Shield className="w-6 h-6 text-indigo-500" /> Ro'yxatdan o'tish</h3>
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="min-w-0 mr-4">
                    <p className="text-sm font-bold text-white mb-1 break-words">Yangi a'zolar qabuli</p>
                    <p className="text-xs text-slate-500 break-words">O'chirilganda, yangi foydalanuvchilar ro'yxatdan o'ta olmaydi.</p>
                  </div>
                  <button
                    onClick={onToggleRegistration}
                    className={`w-14 h-8 rounded-full p-1 transition-colors ${isRegistrationOpen ? 'bg-green-500' : 'bg-slate-700'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${isRegistrationOpen ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 mt-4">
                  <div className="min-w-0 mr-4">
                    <p className="text-sm font-bold text-white mb-1 break-words">Yangi kuratorlar qabuli</p>
                    <p className="text-xs text-slate-500 break-words">O'chirilganda, faqat student bo'lib ro'yxatdan o'tish mumkin bo'ladi.</p>
                  </div>
                  <button
                    onClick={onToggleCuratorRegistration}
                    className={`w-14 h-8 rounded-full p-1 transition-colors ${isCuratorRegistrationOpen ? 'bg-green-500' : 'bg-slate-700'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${isCuratorRegistrationOpen ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[3rem] border border-white/5 p-6 md:p-10">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3"><Bell className="w-6 h-6 text-purple-500" /> Bildirishnomalar</h3>

                <div className="space-y-4">
                  {/* Loop through settings */}
                  {[
                    { key: 'onSeasonStart', label: 'Mavsum yangilanishi', desc: 'Mavsum o\'zgarganda avtomatik xabar yuborish.' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="min-w-0 mr-4">
                        <p className="text-sm font-bold text-white mb-1 break-words">{setting.label}</p>
                        <p className="text-xs text-slate-500 break-words">{setting.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings(prev => ({ ...prev, [setting.key]: !prev[setting.key as keyof typeof notificationSettings] }))}
                        className={`w-14 h-8 rounded-full p-1 transition-colors ${notificationSettings[setting.key as keyof typeof notificationSettings] ? 'bg-indigo-600' : 'bg-slate-700'}`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${notificationSettings[setting.key as keyof typeof notificationSettings] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Admin Email</label>
                    <input
                      type="email"
                      value={notificationSettings.adminEmail}
                      onChange={e => setNotificationSettings({ ...notificationSettings, adminEmail: e.target.value })}
                      className="w-full bg-[#121214] border border-white/10 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-indigo-600 transition-all"
                    />
                  </div>
                  <button
                    onClick={handleSaveNotificationSettings}
                    className="w-full mt-6 py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Sozlamalarni Saqlash
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                      {!isDirectMessaging ? (
                        <>
                          <div className="space-y-6"><h4 className="text-[11px] break-words font-black uppercase text-slate-500 tracking-[0.4em] flex items-center gap-3"><Code className="w-5 h-5 text-purple-500" /> Texnik Stack</h4><div className="flex flex-wrap gap-2.5">{selectedUserForView.skills && selectedUserForView.skills.length > 0 ? (selectedUserForView.skills.map((skill, i) => (<span key={i} className="px-5 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-slate-400 break-words uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-default shadow-sm group/skill">{skill}</span>))) : (<div className="w-full p-6 text-center border-2 border-dashed border-white/5 rounded-3xl text-slate-700 font-bold text-xs uppercase tracking-widest">Ma'lumot yo'q</div>)}</div></div>

                          {/* STATUS MANAGEMENT SECTION - Only for Curators */}
                          {selectedUserForView.role === 'curator' && (
                            <div className="space-y-4 pt-6 border-t border-white/5">
                              <h4 className="text-[11px] break-words font-black uppercase text-slate-500 tracking-[0.4em]">Statusni Boshqarish</h4>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => { onChangeStatus?.(selectedUserForView.id, 'active'); setSelectedUserForView(prev => prev ? { ...prev, status: 'active' } : null); }}
                                  className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase border transition-all ${selectedUserForView.status === 'active' ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-white/5 border-white/5 text-slate-500 hover:text-slate-300'}`}
                                >Aktiv</button>
                                <button
                                  onClick={() => { onChangeStatus?.(selectedUserForView.id, 'inactive'); setSelectedUserForView(prev => prev ? { ...prev, status: 'inactive' } : null); }}
                                  className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase border transition-all ${selectedUserForView.status === 'inactive' ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20' : 'bg-white/5 border-white/5 text-slate-500 hover:text-slate-300'}`}
                                >Passiv</button>
                              </div>
                            </div>
                          )}

                          {!selectedUserForView.isApproved && selectedUserForView.role === 'curator' && (
                            <div className="pt-2"><button onClick={() => { onApproveUser(selectedUserForView.id); setSelectedUserForView(prev => prev ? { ...prev, isApproved: true, status: 'active' } : null); }} className="w-full py-6 bg-green-600 hover:bg-green-500 text-white rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl transition-all hover:scale-[1.02]"><UserCheck className="w-5 h-5" /> Kuratorni Tasdiqlash</button></div>
                          )}
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
                                    className="w-12 h-12 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                                  >
                                    {link.iconUrl ? (
                                      <img src={link.iconUrl} className="w-6 h-6 object-cover rounded-md" />
                                    ) : (
                                      <Link2 className="w-5 h-5 text-slate-500 group-hover:text-black transition-colors" />
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
                          <div className="pt-6"><button onClick={() => setIsDirectMessaging(true)} className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20"><Send className="w-4 h-4" /> Xabar yuborish</button></div>
                        </>
                      ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[11px] break-words font-black uppercase text-indigo-400 tracking-[0.4em] flex items-center gap-3">
                              <Mail className="w-5 h-5" /> Shaxsiy xabar
                            </h4>
                            <button onClick={() => setIsDirectMessaging(false)} className="text-slate-500 hover:text-white transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-1">Sarlavha</label>
                              <input type="text" className="w-full bg-[#1a1a1e] border border-white/5 rounded-2xl py-4 px-5 text-white text-sm outline-none focus:border-indigo-600 transition-all" placeholder="Masalan: Maqsadlar haqida" value={directMessageForm.title} onChange={e => setDirectMessageForm({ ...directMessageForm, title: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-1">Xabar turi</label>
                              <CustomDropdown
                                options={[
                                  { value: 'info', label: 'Info', icon: <div className="w-2 h-2 rounded-full bg-blue-500" /> },
                                  { value: 'urgent', label: 'Muhim', icon: <div className="w-2 h-2 rounded-full bg-red-500" /> },
                                  { value: 'success', label: 'Natija', icon: <div className="w-2 h-2 rounded-full bg-green-500" /> },
                                  { value: 'warning', label: 'Ogohlantirish', icon: <div className="w-2 h-2 rounded-full bg-yellow-500" /> }
                                ]}
                                value={directMessageForm.type}
                                onChange={(val) => setDirectMessageForm({ ...directMessageForm, type: val as any })}
                                placeholder="Turini tanlang"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-1">Xabar matni</label>
                              <textarea className="w-full bg-[#1a1a1e] border border-white/5 rounded-2xl py-4 px-5 text-white text-sm outline-none focus:border-indigo-600 transition-all h-32 resize-none" placeholder="Bu yerga yozing..." value={directMessageForm.message} onChange={e => setDirectMessageForm({ ...directMessageForm, message: e.target.value })} />
                            </div>
                            <button onClick={handleSendDirectMessage} disabled={!directMessageForm.title || !directMessageForm.message} className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                              <Send className="w-5 h-5" /> Yuborish
                            </button>
                            <button onClick={() => setIsDirectMessaging(false)} className="w-full py-4 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">Bekor qilish</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* EDIT STUDENT MODAL */}
        {editingProgress && (
          <div className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-xl flex items-start md:items-center justify-center p-3 md:p-4 animate-in fade-in duration-300 overflow-y-auto">
            <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 w-full max-w-4xl rounded-2xl md:rounded-[3rem] p-4 sm:p-6 md:p-10 relative shadow-2xl my-4">
              <button
                onClick={() => setEditingProgress(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white text-2xl md:text-3xl font-black shadow-xl shrink-0">
                  {(editingProgress.studentName || '?')[0].toUpperCase()}
                </div>
                <div className="overflow-hidden pr-14 md:pr-20">
                  <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight truncate">{editingProgress.studentName}</h3>
                  <p className="text-[9px] md:text-[11px] break-words font-black uppercase text-indigo-400 tracking-[0.2em] mt-2 truncate">Hafta #{editingProgress.weekNumber.toString().padStart(2, '0')} Monitoringini Tahrirlash</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] break-words font-black uppercase text-slate-500 tracking-widest ml-1 block">Uchrashuv vaqti va davomat</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="datetime-local"
                        value={editPlanForm.meetingDay}
                        onChange={(e) => setEditPlanForm(prev => ({ ...prev, meetingDay: e.target.value }))}
                        className="w-full sm:flex-1 bg-[#121214] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors [color-scheme:dark]"
                      />
                      <button
                        onClick={() => setEditPlanForm(prev => ({ ...prev, attended: !prev.attended }))}
                        className={`w-full sm:w-auto px-6 py-4 sm:py-0 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all border ${editPlanForm.attended ? 'bg-green-500 text-white border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'}`}
                      >
                        {editPlanForm.attended ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                        {editPlanForm.attended ? 'Ishtirok Etdi' : 'Ishtirok Etmadi'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] break-words font-black uppercase text-slate-500 tracking-widest ml-1 block">Haftalik maqsad</label>
                    <textarea
                      value={editPlanForm.weeklyGoal}
                      onChange={(e) => setEditPlanForm(prev => ({ ...prev, weeklyGoal: e.target.value }))}
                      className="w-full bg-[#121214] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] break-words font-black uppercase text-slate-500 tracking-widest ml-1 block">Monitoring holati</label>
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
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] break-words font-black uppercase text-slate-500 tracking-widest ml-1 block">Asosiy muammo</label>
                    <textarea
                      value={editPlanForm.difficulty}
                      onChange={(e) => setEditPlanForm(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full bg-[#121214] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[150px] resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] break-words font-black uppercase text-slate-500 tracking-widest ml-1 block">Tavsiya qilingan yechim</label>
                    <textarea
                      value={editPlanForm.solution}
                      onChange={(e) => setEditPlanForm(prev => ({ ...prev, solution: e.target.value }))}
                      className="w-full bg-[#121214] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[150px] resize-none"
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

      </div>
    </section >
  );
};

export default AdminPanel;
