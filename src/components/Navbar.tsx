import { FaSun, FaMoon, FaUser } from 'react-icons/fa';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ThemeState } from '../store/themeStore';
import { defaultProfileImg } from '@/assets';

const Navbar = () => {
    const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);
    const toggleTheme = useThemeStore((state: ThemeState) => state.toggleTheme);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <nav className={`px-4 flex justify-between items-center p-4 ${!isDarkTheme ? 'bg-transparent text-white' : 'bg-transparent text-black'} shadow-none`}> 
            <h1 className="text-xl font-bold">devstreak</h1>
            <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="flex items-center p-2 rounded-full hover:bg-gray-700 transition duration-300">
                    {!isDarkTheme ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
                </button>
                {isAuthenticated ? (
                    <div className="flex items-center">
                        <img 
                            src={defaultProfileImg} 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                        />
                    </div>
                ) : pathname !== '/login' && (
                    <button 
                        onClick={() => navigate('/login')}
                        className={`px-4 py-2 bg-transparent border-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                        !isDarkTheme 
                        ? 'border-white text-white hover:bg-white hover:text-black' 
                        : 'border-black text-black hover:bg-black hover:text-white'
                    }`}>
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
