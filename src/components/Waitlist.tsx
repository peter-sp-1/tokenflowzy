import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { submitWaitlistEntry } from '../services/WaitlistServices';

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    console.log('Navigating to home...');
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await submitWaitlistEntry(email);
      toast.success('🎉 Successfully joined the waitlist!', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #009933',
          padding: '16px',
          fontSize: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        },
        icon: '✨',
      });
      setEmail('');
    } catch (error) {
      toast.error('Failed to join waitlist. Please try again.', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #ff4444',
          padding: '16px',
          fontSize: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4">
      <div className="w-full max-w-4xl mx-auto py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-sm bg-black/30 rounded-2xl shadow-xl border border-[#009933]/30 p-4 sm:p-8 relative overflow-hidden"
        >
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
              <span className="font-extralight">Sonic</span>
              <span className="font-medium"> Token </span>
              <span className="font-extralight">Creator</span>
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto px-4">
              Join our waitlist to be notified when we launch our token creation platform
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 px-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white focus:border-purple-500 transition-colors"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-6 py-3 bg-purple-500 text-white rounded-lg transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join Waitlist'}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400 mb-4">Return to homepage?</p>
              <button
                onClick={handleHomeClick}
                className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-purple-500/20 hover:border-purple-500/50 flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                Home
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
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