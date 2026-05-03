import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardTab, ProfileFormData, PlanFormData, EditPlanFormData, UserData, StudentProgress } from '../types';

export const useDashboardState = (user: UserData | null, activeSeasonId: string) => {
  const { activeTab: urlTab } = useParams<{ activeTab: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<DashboardTab>(
    (urlTab as DashboardTab) || 'panel'
  );

  const [selectedWeek, setSelectedWeek] = useState(() =>
    Number(localStorage.getItem('buddy_dashboard_week')) || 1
  );

  const [selectedSeason, setSelectedSeason] = useState(() =>
    localStorage.getItem('buddy_dashboard_season') || activeSeasonId
  );

  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAssigningStudent, setIsAssigningStudent] = useState(false);
  const [studentToAssign, setStudentToAssign] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedUserForView, setSelectedUserForView] = useState<UserData | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editingProgress, setEditingProgress] = useState<StudentProgress | null>(null);
  const [activeSocialLinkIndex, setActiveSocialLinkIndex] = useState<number | null>(null);

  const [newPlanForm, setNewPlanForm] = useState<PlanFormData>({
    studentName: '',
    meetingDay: '',
    weeklyGoal: '',
    difficulty: ''
  });

  const [editPlanForm, setEditPlanForm] = useState<EditPlanFormData>({
    meetingDay: '',
    attended: false,
    weeklyGoal: '',
    difficulty: '',
    solution: '',
    status: 'Kutilmoqda'
  });

  const [profileForm, setProfileForm] = useState<ProfileFormData>({
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

  // Sync with URL
  useEffect(() => {
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab as DashboardTab);
    }
  }, [urlTab]);

  // Handle tab change
  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`);
    localStorage.setItem('buddy_dashboard_tab', tab);
  };

  // Persist state
  useEffect(() => {
    localStorage.setItem('buddy_dashboard_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('buddy_dashboard_week', selectedWeek.toString());
  }, [selectedWeek]);

  useEffect(() => {
    localStorage.setItem('buddy_dashboard_season', selectedSeason);
  }, [selectedSeason]);

  // Sync activeSeasonId
  useEffect(() => {
    setSelectedSeason(activeSeasonId);
  }, [activeSeasonId]);

  // Scroll lock for modals
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

  return {
    activeTab,
    handleTabChange,
    selectedWeek,
    setSelectedWeek,
    selectedSeason,
    setSelectedSeason,
    isAddingStudent,
    setIsAddingStudent,
    isAssigningStudent,
    setIsAssigningStudent,
    studentToAssign,
    setStudentToAssign,
    selectedImage,
    setSelectedImage,
    selectedUserForView,
    setSelectedUserForView,
    isEditingProfile,
    setIsEditingProfile,
    showPassword,
    setShowPassword,
    editingProgress,
    setEditingProgress,
    activeSocialLinkIndex,
    setActiveSocialLinkIndex,
    newPlanForm,
    setNewPlanForm,
    editPlanForm,
    setEditPlanForm,
    profileForm,
    setProfileForm
  };
};
