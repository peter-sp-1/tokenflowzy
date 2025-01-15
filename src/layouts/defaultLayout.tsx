import Navbar from '@/components/Navbar';
import Sidebar from '../components/Sidebar';
import { ThemeState, useThemeStore } from '@/store/themeStore';
import React from 'react';
import { useAuthStore } from '@/store/authStore';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return (
        <div className={`relative ${isDarkTheme ? 'dark bg-gray-200' : 'light bg-[#040507]'}`}> 
            <div className='max-w-7xl min-h-screen max-h-screen mx-auto relative'>
            <Navbar />
            <Sidebar isAuthenticated={isAuthenticated} />

            <main className='px-8 px-4 relative'>{children}</main>
            <footer className='absolute bottom-3 left- max-w-7xl mx-auto'>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-900' : 'text-white'}`}>&#169; 2025 devstreak</p>
            </footer>
            </div>
        </div>
    );
};

export default DefaultLayout;