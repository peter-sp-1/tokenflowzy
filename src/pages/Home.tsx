// this is the default page for the leaderboard where everyone views on entry
// using react typescript, tailwindcss responsive ui, and react router dom for routing
import { useThemeStore } from '../store/themeStore';
import '../styles/theme.css';
import Navbar from '../components/Navbar';
import './Home.css';

const Leaderboard = () => {
    const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);
    const leaders = [
        { position: 1, name: 'Alice', image: 'https://via.placeholder.com/50' },
        { position: 2, name: 'Bob', image: 'https://via.placeholder.com/50' },
        { position: 3, name: 'Charlie', image: 'https://via.placeholder.com/50' },
        { position: 4, name: 'David', image: 'https://via.placeholder.com/50' },
        { position: 5, name: 'Eve', image: 'https://via.placeholder.com/50' },
    ];

    return (
        <div className="max-w-lg mx-auto p-5"> 
            <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
            <ul className="space-y-4">
                {leaders.map((leader) => (
                    <li key={leader.position} className={`flex items-center p-4 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black'} hover:shadow-lg transition-shadow duration-300`}> 
                        <span className="font-bold text-xl mr-4">{leader.position}.</span>
                        <img src={leader.image} alt={leader.name} className="w-12 h-12 rounded-full mr-4" />
                        <span className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>{leader.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Home = () => {
  const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);

    return (
        <div className={`home-container ${isDarkTheme ? 'dark bg-white' : 'light bg-black'}`}> 
          {/* <div className="stars">
            {Array(100).fill(null).map((_, index) => (
              <div key={index} className="star" style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2}px`,
                height: `${Math.random() * 2}px`,
              }}></div>
            ))}
          </div> */}
          <Navbar />
          <Leaderboard />
        </div>
    );
};

export default Home;
