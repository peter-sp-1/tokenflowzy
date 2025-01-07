// this is the default page for the leaderboard where everyone views on entry
// using react typescript, tailwindcss responsive ui, and react router dom for routing
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold text-center">Leaderboard</h1>
        <p className="text-center">default page</p>
    </div>
  );
};

export default Home;