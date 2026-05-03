import { UserData } from '../types';

export const getAssignedCurator = (
  student: UserData | null,
  allUsers: UserData[]
): UserData | null => {
  if (!student || student.role !== 'student') return null;
  return allUsers.find(u => u.id === student.assignedCuratorId) || null;
};

export const getStartupCurator = (
  student: UserData | null,
  allUsers: UserData[]
): UserData | null => {
  if (!student || student.role !== 'student') return null;
  return allUsers.find(u => u.id === student.startupCuratorId) || null;
};

export const getAssignedStudents = (
  curator: UserData | null,
  allUsers: UserData[]
): UserData[] => {
  if (!curator || curator.role !== 'curator') return [];
  return allUsers.filter(u =>
    String(u.assignedCuratorId || (u as any).assigned_curator_id) === String(curator.id) ||
    String(u.startupCuratorId || (u as any).startup_curator_id) === String(curator.id)
  );
};
