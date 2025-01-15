import {create} from 'zustand';

export interface ThemeState {
    isDarkTheme: boolean;
    toggleTheme: () => void;

}

export const useThemeStore = create<ThemeState>((set) => ({
    isDarkTheme: false,
    toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
}));