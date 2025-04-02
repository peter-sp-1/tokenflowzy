import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
              <span className="font-extralight">SCY</span>
              <span className="font-medium"> Token </span>
              <span className="font-extralight">Creator</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Create and deploy custom SPL tokens on SonicSvm with elegance and precision
            </p>
            <div className="flex gap-4 justify-center pt-8">
              <button
                onClick={() => navigate('/waitlist')}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 blur-[120px] rounded-full animate-pulse" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Easy to Use',
                description: 'Simple and intuitive interface for token creation',
                icon: '🚀',
              },
              {
                title: 'Secure',
                description: 'Built on SonicSvm blockchain technology',
                icon: '🔒',
              },
              {
                title: 'Customizable',
                description: 'Multiple token extensions and features',
                icon: '⚙️',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;