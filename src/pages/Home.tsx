import { ThemeState, useThemeStore } from '../store/themeStore';
import '../styles/theme.css';
import './Home.css';
import { defaultProfileImg, flowerything } from '@/assets';

const Leaderboard = () => {
    const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);
    const leaders = [
        { position: 1, name: 'Alice', image: defaultProfileImg },
        { position: 2, name: 'Bob', image: defaultProfileImg },
        { position: 3, name: 'Charlie', image: defaultProfileImg },
        { position: 4, name: 'David', image: defaultProfileImg },
        { position: 5, name: 'Eve', image: defaultProfileImg },
    ];

    return (
        <div className="max-w-lg mx-auto p-5"> 
            <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
            <ul className="space-y-4">
                {leaders.map((leader) => (
                    <li key={leader.position} className={`flex relative items-center p-4 overflow-hidden rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} hover:shadow-lg transition-shadow duration-300`}> 
                        <span className="font-bold text-xl mr-4">{leader.position}.</span>
                        <img src={leader.image} alt={leader.name} className="w-12 h-12 rounded-full mr-4" />
                        <span className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>{leader.name}</span>
                        <img src={flowerything} alt="Flowerything" className="w-[50%] absolute -right-2 opacity-70" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Home = () => {
  const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);

    return (
        <div className={`bg-transparent min-h-screen ${!isDarkTheme ? 'text-white' : 'text-black'}`}> 
          <div className="stars fixed w-screen h-screen right-0 top-0">
            {Array(100).fill(null).map((_, index) => (
              <div key={index} className="star" style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${1.5 + Math.random() * 1.8}px`,
                height: `${1.5 + Math.random() * 1.8}px`,
                animationDelay: `${Math.random() * 5}s`,
              }}></div>
            ))}
          </div>
          {isDarkTheme && <img src={flowerything} alt="Flowerything" className="w-[50%] absolute -right-2 bottom-0 opacity-20 pointer-events-none" />}
          <Leaderboard />
        </div>
    );
};

export default Home;
