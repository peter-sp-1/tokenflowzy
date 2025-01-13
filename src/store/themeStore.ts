import {create} from 'zustand';

export interface ThemeState {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set: (arg0: (state: any) => { isDarkTheme: boolean; }) => any) => ({
  isDarkTheme: false, // Default theme
  toggleTheme: () => set((state: { isDarkTheme: any; }) => ({ isDarkTheme: !state.isDarkTheme })),
}));