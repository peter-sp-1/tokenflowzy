// AI GEN TEMPLATE FIX
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../utils/auth';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make your login API request to get the token here
      const token = 'your_jwt_token'; // Replace with your logic to get token

      // Fetch user info based on the token
      const userInfo = await getUserInfo(token);

      if (userInfo.is_super_admin) {
        navigate('/super-admin'); // Redirect to Super Admin page
      } else if (userInfo.is_admin) {
        navigate('/admin-dashboard'); // Redirect to Admin Dashboard
      } else {
        navigate('/home'); // Or to a regular user page
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginSignup;
