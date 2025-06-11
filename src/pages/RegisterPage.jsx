import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleRegister = async () => {
    try {
      await axios.post(`${API}/auth/register`, { email, password, role });
      setSuccess('Registration successful! You can now login.');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 mt-12 border bg-blue-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">📝 Register</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

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
      <select
        className="w-full border p-2 rounded mb-3 text-black"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
