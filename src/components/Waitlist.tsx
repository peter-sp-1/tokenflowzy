import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success('Successfully joined the waitlist!');
      setEmail('');
      setTimeout(() => navigate('/create'), 2000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to join waitlist');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => navigate('/create');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-sm bg-black/30 rounded-2xl shadow-xl border border-[#009933]/30 p-8 relative overflow-hidden"
        >
          {/* Background Effect */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 blur-[120px] rounded-full animate-pulse" />
          </div>

          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
              <span className="font-extralight">SCY</span>
              <span className="font-medium"> Token </span>
              <span className="font-extralight">Creator</span>
            </h1>
            
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Join our waitlist to be notified when we launch our token creation platform
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white focus:border-purple-500 transition-colors"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`px-6 py-3 bg-purple-500 text-white rounded-lg transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join Waitlist'}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400 mb-4">Ready to create your token now?</p>
              <button
                onClick={handleSkip}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-purple-500/20 hover:border-purple-500/50 flex items-center gap-2 mx-auto"
              >
                Skip Waitlist
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Waitlist;