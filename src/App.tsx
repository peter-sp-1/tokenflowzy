import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
import TokenCreator from './components/Generator';

const App: React.FC = () => {
    return (
      <Router>
        {/* public routes */}
          <Routes>
              <Route path='/' element={<TokenCreator />} />
          </Routes>
      </Router>
    );
};


export default App;
