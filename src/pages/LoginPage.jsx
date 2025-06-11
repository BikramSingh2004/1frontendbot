import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate(res.data.role === 'admin' ? '/admin' : '/chat');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-10 mt-20 border bg-blue-600 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🔐 Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
