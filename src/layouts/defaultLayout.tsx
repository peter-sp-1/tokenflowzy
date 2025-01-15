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
            <div className='max-w-7xl min-h-screen mx-auto relative'>
            <Navbar />
            <div className='flex max-w-full h-full justify-between mt-8'>
                <Sidebar isAuthenticated={isAuthenticated} />
                <main className={`px-4 relative max-h-[75vh] overflow-auto flex w-[calc(100%-256px)] justify-center
                    ${isDarkTheme 
                        ? 'scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 hover:scrollbar-thumb-gray-700' 
                        : 'scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-600'
                    }`}>
                    {children}
                </main>
            </div>
                <footer className='absolute bottom-3 left- max-w-7xl mx-auto'>
                    <p className={`text-sm ${isDarkTheme ? 'text-gray-900' : 'text-white'}`}>&#169; 2025 devstreak</p>
                </footer>
            </div>
        </div>
    );
};

export default DefaultLayout;