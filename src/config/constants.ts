
import React from 'react';
import { Users, Code, Zap, Globe } from 'lucide-react';
import { TeamMember, Feature, StudentProgress, WeeklyHighlight } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'cur-1',
    name: 'Asadbek',
    role: 'Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: "Texnologiyalar ishqibozi va Buddy jamoasining asoschisi. Junior dasturchilarga yo'l ko'rsatadi.",
    longBio: "Dasturlash olamida 5 yillik tajribaga ega mutaxassis. Buddy loyihasining g'oya muallifi.",
    fieldDescription: "Frontend va Backend integratsiyasi bo'yicha mutaxassis.",
    motivationQuote: "Kodni yozish oson, lekin uni san'at darajasiga ko'tarish uchun sabr kerak.",
    skills: ['React', 'Node.js', 'System Design']
  },
  {
    id: 'cur-2',
    name: 'Madina',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
    bio: "Chiroyli va foydali interfeyslar yaratish ustasi. Dizayn yo'nalishidagi o'quvchilarga ustozlik qiladi.",
    longBio: "Dizayn shunchaki ranglar emas, bu foydalanuvchi bilan muloqot qilish san'atidir.",
    fieldDescription: "Foydalanuvchi psixologiyasi va vizual iyerarxiya bo'yicha ekspert.",
    motivationQuote: "Yaxshi dizayn — ko'zga ko'rinmaydigan dizayndir.",
    skills: ['Figma', 'Prototyping', 'Design Systems']
  },
  {
    id: 'cur-3',
    name: 'Javohir',
    role: 'Backend Architect',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
    bio: "Murakkab tizimlar mutaxassisi. Ma'lumotlar bazasi va xavfsizlik bo'yicha kurator.",
    longBio: "Ma'lumotlar oqimini boshqarish bo'yicha 6 yillik tajriba.",
    fieldDescription: "Microservices va SQL/NoSQL bazalari bo'yicha ekspert.",
    motivationQuote: "Tizim poydevori doim oddiy va tushunarli bo'lishi lozim.",
    skills: ['Python', 'PostgreSQL', 'Docker']
  }
];

export const FEATURES: Feature[] = [
  {
    title: 'Innovatsiya',
    description: 'Eng so’nggi texnologiyalar bilan zamonaviy yechimlar.',
    icon: <Zap className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'Jamoaviy Ish',
    description: 'Buddy komandasi har bir a’zosining hissasi qadrlidir.',
    icon: <Users className="w-6 h-6 text-purple-400" />
  },
  {
    title: 'Tezkorlik',
    description: 'Sifatli natijani tez muddatlarda yetkazib beramiz.',
    icon: <Code className="w-6 h-6 text-green-400" />
  },
  {
    title: 'Global Qamrov',
    description: 'Loyihaalarimiz dunyo bo’ylab foydalanuvchilarga xizmat qiladi.',
    icon: <Globe className="w-6 h-6 text-pink-400" />
  }
];

export const INITIAL_PROGRESS_DATA: StudentProgress[] = [
  // Season 1, Asadbek (cur-1)
  { id: '101', curatorId: 'cur-1', seasonId: '1', weekNumber: 1, studentName: 'Behruz Aliyev', weeklyGoal: "React Hooks o'rganish", difficulty: 'useEffect loop', solution: 'Dependency array', status: 'Hal qilindi', meetingDay: '2025-05-10T10:00', attended: true },
  { id: '102', curatorId: 'cur-1', seasonId: '1', weekNumber: 1, studentName: 'Sardor Rahimboev', weeklyGoal: 'Context API', difficulty: 'Prop drilling', solution: 'useContext', status: 'Hal qilindi', meetingDay: '2025-05-10T11:30', attended: true },
  { id: '103', curatorId: 'cur-1', seasonId: '1', weekNumber: 1, studentName: 'Umid Abdullayev', weeklyGoal: 'Redux Toolkit', difficulty: 'Slices', solution: 'Counter misoli', status: 'Bajarilmoqda', meetingDay: '2025-05-11T09:00', attended: true },
  { id: '104', curatorId: 'cur-1', seasonId: '1', weekNumber: 1, studentName: 'Nigora Karimova', weeklyGoal: 'TypeScript', difficulty: 'Interfaces', solution: 'Farqlari ko\'rsatildi', status: 'Kutilmoqda', meetingDay: '2025-05-11T14:00', attended: false },
  { id: '105', curatorId: 'cur-1', seasonId: '1', weekNumber: 1, studentName: 'Aziz Toshpo\'latov', weeklyGoal: 'Next.js', difficulty: 'Hydration', solution: 'Client split', status: 'Bajarmadi', meetingDay: '2025-05-12T10:00', attended: false },

  // Season 1, Madina (cur-2)
  { id: '201', curatorId: 'cur-2', seasonId: '1', weekNumber: 1, studentName: 'Zilola Zokirova', weeklyGoal: "Figma Auto-layout", difficulty: 'Spacing', solution: "Real demo", status: 'Hal qilindi', meetingDay: '2025-05-10T14:00', attended: true },
  { id: '202', curatorId: 'cur-2', seasonId: '1', weekNumber: 1, studentName: 'Malika Ahmedova', weeklyGoal: "Ranglar nazariyasi", difficulty: 'Contrast', solution: "Adobe Color", status: 'Hal qilindi', meetingDay: '2025-05-10T15:30', attended: true },
  { id: '203', curatorId: 'cur-2', seasonId: '1', weekNumber: 1, studentName: 'Jasur Islomov', weeklyGoal: "Tipografika", difficulty: 'Readability', solution: "Fonts list", status: 'Bajarilmoqda', meetingDay: '2025-05-11T16:00', attended: true },
  { id: '204', curatorId: 'cur-2', seasonId: '1', weekNumber: 1, studentName: 'Diyora Rustamova', weeklyGoal: "Design System", difficulty: 'Variants', solution: "Naming rules", status: 'Kutilmoqda', meetingDay: '2025-05-12T11:00', attended: false },
  { id: '205', curatorId: 'cur-2', seasonId: '1', weekNumber: 1, studentName: 'Bobur Mansurov', weeklyGoal: "User Personas", difficulty: 'Research', solution: "Interview guide", status: 'Bajarmadi', meetingDay: '2025-05-12T15:00', attended: false },

  // Season 1, Javohir (cur-3)
  { id: '301', curatorId: 'cur-3', seasonId: '1', weekNumber: 1, studentName: 'Jasur Ortiqov', weeklyGoal: 'Schema design', difficulty: 'Normalization', solution: 'BNCF rules', status: 'Hal qilindi', meetingDay: '2025-05-10T16:00', attended: true },
  { id: '302', curatorId: 'cur-3', seasonId: '1', weekNumber: 1, studentName: 'Kamola Ergasheva', weeklyGoal: 'RESTful API', difficulty: 'Status codes', solution: 'HTTP standards', status: 'Hal qilindi', meetingDay: '2025-05-10T17:30', attended: true },
  { id: '303', curatorId: 'cur-3', seasonId: '1', weekNumber: 1, studentName: 'Rustam G\'aniyev', weeklyGoal: 'JWT Auth', difficulty: 'Refresh tokens', solution: 'Middleware', status: 'Bajarilmoqda', meetingDay: '2025-05-11T10:00', attended: true },
  { id: '304', curatorId: 'cur-3', seasonId: '1', weekNumber: 1, studentName: 'Sevara Omonova', weeklyGoal: 'Dockerization', difficulty: 'Layers', solution: 'Multi-stage build', status: 'Kutilmoqda', meetingDay: '2025-05-12T09:00', attended: false },
  { id: '305', curatorId: 'cur-3', seasonId: '1', weekNumber: 1, studentName: 'Farrux Xo\'jayev', weeklyGoal: 'Unit Testing', difficulty: 'Mocks', solution: 'jest.fn()', status: 'Bajarmadi', meetingDay: '2025-05-12T13:00', attended: false }
];

export const INITIAL_HIGHLIGHTS_DATA: WeeklyHighlight[] = [
  { id: 'h1', curatorId: 'cur-1', seasonId: '1', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Asadbek' },
  { id: 'h2', curatorId: 'cur-2', seasonId: '1', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Madina' },
  { id: 'h3', curatorId: 'cur-3', seasonId: '1', weekNumber: 1, photoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600', uploadedBy: 'Javohir' }
];
