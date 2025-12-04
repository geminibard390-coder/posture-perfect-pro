import { create } from 'zustand';

export interface UserProfile {
  activityLevel: 'sedentary' | 'active' | 'athlete' | '';
  targetZones: string[];
  injuries: string[];
  goal: string;
  completed: boolean;
}

interface UserProfileStore {
  profile: UserProfile;
  currentStep: number;
  setActivityLevel: (level: UserProfile['activityLevel']) => void;
  setTargetZones: (zones: string[]) => void;
  setInjuries: (injuries: string[]) => void;
  setGoal: (goal: string) => void;
  setCurrentStep: (step: number) => void;
  completeProfile: () => void;
  resetProfile: () => void;
}

const initialProfile: UserProfile = {
  activityLevel: '',
  targetZones: [],
  injuries: [],
  goal: '',
  completed: false,
};

export const useUserProfile = create<UserProfileStore>((set) => ({
  profile: initialProfile,
  currentStep: 0,
  
  setActivityLevel: (level) =>
    set((state) => ({
      profile: { ...state.profile, activityLevel: level },
    })),
    
  setTargetZones: (zones) =>
    set((state) => ({
      profile: { ...state.profile, targetZones: zones },
    })),
    
  setInjuries: (injuries) =>
    set((state) => ({
      profile: { ...state.profile, injuries: injuries },
    })),
    
  setGoal: (goal) =>
    set((state) => ({
      profile: { ...state.profile, goal: goal },
    })),
    
  setCurrentStep: (step) => set({ currentStep: step }),
  
  completeProfile: () =>
    set((state) => ({
      profile: { ...state.profile, completed: true },
    })),
    
  resetProfile: () =>
    set({
      profile: initialProfile,
      currentStep: 0,
    }),
}));
