import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import Home from './pages/Home';
import UsersPage from './pages/UsersPage';
import SuperAdmin from './pages/SuperAdmin';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/super-admin" element={< SuperAdmin/>} />
        <Route path="/admin-dashboard" element={< Admin/>} />
        <Route path="/user" element={ <UsersPage /> } />
      </Routes>
    </Router>
  );
};

export default App;
