import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const API = import.meta.env.VITE_API_BASE_URL;
    axios.get(`${API}/faq`).then((res) => {
      if (Array.isArray(res.data)) setFaqs(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-blue-700 text-2xl font-bold">💬 AI Chat Support</div>
          <div className="flex gap-3">
            <Link to="/login" className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Login</Link>
            <Link to="/register" className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Register</Link>
            <Link to="/chat" className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Chat</Link>
            <Link to="/admin" className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">Admin</Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <h2 className="text-3xl font-bold mb-16 text-center text-blue-900">🤖 Welcome to the AI Customer Support Portal</h2>

        <h3 className="text-xl font-semibold mb-4 text-gray-700">📚 Frequently Asked Questions</h3>
        {faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq._id}
                className="bg-white border rounded p-4 shadow-md hover:shadow-lg transition"
              >
                <p className="font-semibold text-blue-700">Q: {faq.question}</p>
                <p className="text-sm text-gray-600 mt-1">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No FAQs available yet.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
