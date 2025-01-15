import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useThemeStore } from '../store/themeStore';
import SpaceBackground from '../components/SpaceBackground';

// Mock signup function
const mockSignupUser = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!email || !password) {
    throw new Error("Please fill in all fields");
  }
  
  return { success: true };
};

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await mockSignupUser(email, password);
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (error: any) {
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className={`min-h-[80vh] ${!isDarkTheme ? 'text-white' : 'text-gray-800'} flex items-center justify-center p-5 relative`}>
      <SpaceBackground color={!isDarkTheme ? '#8B5CF6' : '#6D28D9'} />
      <motion.div
        className="w-full max-w-md p-8 rounded-xl shadow-lg backdrop-blur-sm bg-white/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={inputVariants} className="space-y-2">
            <label className="block text-sm font-medium">Username</label>
            <div className="relative">
              <FiUser color={`${!isDarkTheme ? '#8B5CF6' : '#6D28D9'}`} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Choose a username"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <div className="relative">
              <FiMail color={`${!isDarkTheme ? '#8B5CF6' : '#6D28D9'}`} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <FiLock color={`${!isDarkTheme ? '#8B5CF6' : '#6D28D9'}`} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Create a password"
                required
              />
            </div>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-500 hover:text-purple-600 font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
