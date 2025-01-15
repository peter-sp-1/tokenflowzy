import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UsersPage from './pages/UsersPage';
import SuperAdmin from './pages/SuperAdmin';
import Admin from './pages/Admin';
import Task from './pages/Task';
import DefaultLayout from './layouts/defaultLayout';
import { useAuthStore } from './store/authStore';

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
}

const App: React.FC = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
      <Router>
        {/* public routes */}
        <DefaultLayout>
          <Routes>
              <Route path='/' element={<Navigate to="/leaderboard" />} />
              <Route path='/leaderboard' element={<Home />} />
              <Route path="/login" element={
                isAuthenticated ? <Navigate to="/" /> : <Login />
              } />
              <Route path="/signup" element={
                isAuthenticated ? <Navigate to="/" /> : <Signup />
              } />
              <Route path="/super-admin" element={<SuperAdmin />} />
              <Route path="/tasks" element={
                isAuthenticated ? <Task /> : <Navigate to="/login" />
              } />
              <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </DefaultLayout>

          {/* protected routes */}
        <Routes>
          <Route path="/user" element={
            isAuthenticated ? <UsersPage /> : <Navigate to="/login" />
          } />
        </Routes>

        {/* admin routes */}
        <Routes>
            <Route path="/admin" element={
              isAuthenticated ? <Admin /> : <Navigate to="/login" />
            } />
        </Routes>

        {/* super admin routes */}
        <Routes>
            <Route path="/super-admin" element={
              isAuthenticated ? <SuperAdmin /> : <Navigate to="/login" />
            } />
        </Routes>
      </Router>
    );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, element }) => {
    return (
        isAuthenticated ? element : <Navigate to='/login' />
    );
};

export default App;
