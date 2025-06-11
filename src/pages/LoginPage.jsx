import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate(res.data.role === 'admin' ? '/admin' : '/chat');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-10 mt-20 border bg-blue-600 rounded shadow text-white">
      <h2 className="text-2xl font-bold mb-4">🔐 Login</h2>
      {error && <p className="text-red-200 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded mb-3 text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded mb-3 text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
