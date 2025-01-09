// this is the default page for the leaderboard where everyone views on entry
// using react typescript, tailwindcss responsive ui, and react router dom for routing
import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold text-center mb-4 sm:text-4xl lg:text-5xl">
        Leaderboard
      </h1>
      <p className="text-center text-sm sm:text-base lg:text-lg mb-6">
        Default page
      </p>
      <button
        onClick={() => navigate('/login')}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base lg:text-lg transition duration-300"
      >
        Log In
      </button>
    </div>
  );
};

export default Home;
