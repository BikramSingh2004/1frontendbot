import React, { useEffect, useState } from 'react';
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
  <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-100 dark:from-zinc-900 dark:to-zinc-800 text-gray-900 dark:text-white">
    {/* Navbar */}
    <nav className="bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Add nav links or content if needed */}
      </div>
    </nav>

    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-10 text-center text-blue-900 dark:text-green-400">
        🤖 Welcome to the AI Customer Support Portal
      </h2>

        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          📚 Frequently Asked Questions
        </h3>

        {faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq._id}
                className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded p-4 shadow-md hover:shadow-lg transition"
              >
                <p className="font-semibold text-blue-700 dark:text-green-400">Q: {faq.question}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No FAQs available yet.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
