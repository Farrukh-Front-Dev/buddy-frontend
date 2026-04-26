import { create } from 'zustand';

interface HomeState {
  isRegistrationOpen: boolean;
  setRegistrationOpen: (open: boolean) => void;
  
  activeSection: 'hero' | 'about' | 'features' | 'stats' | 'cta';
  setActiveSection: (section: HomeState['activeSection']) => void;
  
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  isRegistrationOpen: true,
  setRegistrationOpen: (open) => set({ isRegistrationOpen: open }),
  
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
