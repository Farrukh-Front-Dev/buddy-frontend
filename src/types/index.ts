
import React from 'react';

export type Page = 'home' | 'features' | 'team' | 'contact' | 'auth' | 'dashboard' | 'admin';

export interface SocialLink {
  iconUrl: string;
  linkUrl: string;
}

export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  role: 'student' | 'curator' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  field?: string;
  longBio?: string;
  fieldDescription?: string;
  motivationQuote?: string;
  skills?: string[];
  socialLinks?: SocialLink[];
  assignedCuratorId?: string | null;
  startupCuratorId?: string | null;
  isApproved?: boolean;
  createdAt?: string;
}

export interface Season {
  id: string;
  number: number;
  startDate: string;
  isActive: boolean;
  durationInMonths?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  field?: string;
  avatar: string;
  bio: string;
  longBio: string;
  field_description?: string; // some places might use this
  fieldDescription: string;
  motivationQuote: string;
  skills: string[];
  socialLinks?: SocialLink[];
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface StudentProgress {
  id: string;
  curatorId: string;
  seasonId: string;
  weekNumber: number;
  studentId?: string;
  studentName: string;
  weeklyGoal: string;
  difficulty: string;
  solution: string;
  status: 'Bajarilmoqda' | 'Hal qilindi' | 'Kutilmoqda' | 'Bajarmadi';
  meetingDay: string;
  attended?: boolean;
}

export interface WeeklyHighlight {
  id: string;
  curatorId: string;
  seasonId: string;
  weekNumber: number;
  photoUrl?: string; // legacy base64 or external url
  image?: string; // django image field url
  imageFile?: File; // internal use for upload
  uploadedBy: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  timestamp: string;
  isRead: boolean;
  targetRole: 'all' | 'student' | 'curator';
  targetUserId?: string; // Ma'lum bir foydalanuvchi uchun
  sender: string;
}

/**
 * Buddy Portal Global State Schema
 * Use this as a reference for backend models
 */
export interface BuddyPortalData {
  users: UserData[];
  studentsProgress: StudentProgress[];
  weeklyHighlights: WeeklyHighlight[];
  notifications: Notification[];
  seasons: Season[];
  activeSeasonId: string;
  isRegistrationOpen: boolean;
  chatMessages: Message[];
  currentUser: UserData | null;
  currentPage: Page;
}
