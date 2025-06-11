import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get('/api/faq').then((res) => {
      if (Array.isArray(res.data)) setFaqs(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          
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
