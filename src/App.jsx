import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import AdminFaqDashboard from './pages/AdminFaqDashboard';
import AdminDocUploadPage from './pages/AdminDocUploadPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (location.pathname === '/chat') return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        <Link to="/" className="text-2xl font-bold text-green-400 flex items-center gap-2">
          <span role="img" aria-label="home">🏠</span> AI Support
        </Link>

        <div className="flex flex-wrap gap-2 justify-center">
          <Link to="/" className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-sm">
            Home
          </Link>

          {token && role === 'user' && (
            <Link to="/chat" className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm">
              Chat
            </Link>
          )}

          {token && role === 'admin' && (
            <Link to="/admin" className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm">
              Admin
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                Login
              </Link>
              <Link to="/register" className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm text-black">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const App = observer(() => (
  <Router>
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-zinc-900 dark:to-zinc-800 text-gray-900 dark:text-white">
      <NavBar />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
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
    </div>
  </Router>
));

export default App;
