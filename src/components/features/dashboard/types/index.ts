import { UserData, StudentProgress, WeeklyHighlight, Season, Notification } from '../../../../types';

export interface DashboardProps {
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

export type DashboardTab = 'panel' | 'profile' | 'notifications';

export interface ProfileFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  field: string;
  longBio: string;
  fieldDescription: string;
  motivationQuote: string;
  skills: string;
  socialLinks: any[];
}

export interface PlanFormData {
  studentName: string;
  meetingDay: string;
  weeklyGoal: string;
  difficulty: string;
}

export interface EditPlanFormData {
  meetingDay: string;
  attended: boolean;
  weeklyGoal: string;
  difficulty: string;
  solution: string;
  status: 'Bajarilmoqda' | 'Hal qilindi' | 'Kutilmoqda' | 'Bajarmadi';
}

export * from '../../../../types';
