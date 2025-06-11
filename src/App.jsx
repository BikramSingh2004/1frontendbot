import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import AdminFaqDashboard from './pages/AdminFaqDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminDocUploadPage from './pages/AdminDocUploadPage';
import RegisterPage from './pages/RegisterPage';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="w-full flex justify-between items-center mb-6 border-b pb-2 bg-blue-100 px-4 py-3 rounded">
      <Link to="/" className="text-xl font-bold text-blue-800">🏠 AI Support</Link>
      <div className="flex gap-3">
        <Link to="/" className="text-sm bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded">Home</Link>
        <Link to="/chat" className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Chat</Link>
        <Link to="/admin" className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded">Admin</Link>

        {!token ? (
          <>
            <Link to="/login" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Login</Link>
            <Link to="/register" className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
};

const App = observer(() => (
  <Router>
    <div className="w-full max-w-5xl mx-auto p-4 bg-blue-100 min-h-screen">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute role="user">
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminFaqDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/upload-doc"
          element={
            <PrivateRoute role="admin">
              <AdminDocUploadPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  </Router>
));

export default App;
