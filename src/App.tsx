import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/super-admin" element={<div>Super Admin Page</div>} />
        <Route path="/admin-dashboard" element={<div>Admin Dashboard</div>} />
      </Routes>
    </Router>
  );
};

export default App;
