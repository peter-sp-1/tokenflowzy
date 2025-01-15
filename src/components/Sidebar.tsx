import { ThemeState, useThemeStore } from '@/store/themeStore';
import React, { useState } from 'react';
import { FaTasks, FaPlus, FaTrophy } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);

    if (!isAuthenticated) return null;

    const menuItems = [
        { id: 'leaderboard', icon: FaTrophy, text: 'Leaderboard', path: '/leaderboard' },
        { id: 'tasks', icon: FaTasks, text: 'Tasks', path: '/tasks' },
        { id: 'submit', icon: FaPlus, text: 'Submit Task', path: '/submit' },
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className={`z-50 flex flex-col pt-0 w-64 min-h-[50vh] border-r ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'} border-gray-700 mt-16 fixed p-3 space-y-2`}>
            <div className="flex flex-col space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.id}
                            className={`flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer
                                ${isActive ? 'bg-gray-800 text-white' : `${isDarkTheme ? 'text-gray-900' : 'text-gray-300'} hover:bg-gray-800 hover:text-white`}
                                ${isHovered === item.id ? 'scale-105' : ''}`}
                            onClick={() => handleNavigation(item.path)}
                            onMouseEnter={() => setIsHovered(item.id)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            <Icon className={`text-2xl ${isActive ? 'text-white' : `${isDarkTheme ? 'text-gray-900' : 'text-gray-400'} group-hover:text-white`} transition-colors duration-200`} />
                            <span className="ml-4 text-sm font-medium">
                                {item.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
