import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useThemeStore } from '../store/themeStore';
import type { ThemeState } from '../store/themeStore';

const Navbar = () => {
    const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);
    const toggleTheme = useThemeStore((state: ThemeState) => state.toggleTheme);
    return (
        <nav className={`flex justify-between items-center p-4 ${!isDarkTheme ? 'bg-transparent text-white' : 'bg-transparent text-black'} shadow-none`}> 
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <button onClick={toggleTheme} className="flex items-center p-2 rounded-full hover:bg-gray-700 transition duration-300">
                {!isDarkTheme ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
            </button>
        </nav>
    );
};

export default Navbar;
