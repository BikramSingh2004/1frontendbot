import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminFaqDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [docMessage, setDocMessage] = useState('');

  const fetchFaqs = async () => {
    try {
      const res = await axios.get('/api/faq');
      if (Array.isArray(res.data)) {
        setFaqs(res.data);
      } else {
        setFaqs([]);
        console.error('Expected array, got:', res.data);
      }
    } catch (err) {
      setError('Failed to fetch FAQs');
      setFaqs([]);
      console.error(err);
    }
  };

  const handleAddFaq = async () => {
    if (!question.trim() || !answer.trim()) return;
    try {
      setLoading(true);
      await axios.post('/api/faq', { question, answer });
      setQuestion('');
      setAnswer('');
      fetchFaqs();
    } catch (err) {
      setError('Failed to add FAQ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/faq/${id}`);
      fetchFaqs();
    } catch (err) {
      setError('Failed to delete FAQ');
      console.error(err);
    }
  };

  const handleDocUpload = async () => {
    if (!docFile) return;
    try {
      const formData = new FormData();
      formData.append('faq', docFile);
      await axios.post('/api/upload-faq', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDocMessage('📄 Document uploaded successfully');
      setDocFile(null);
    } catch (err) {
      console.error(err);
      setDocMessage('❌ Upload failed');
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <motion.div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4 text-center">🛠️ Admin FAQ Portal</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded border border-red-300">
          {error}
        </div>
      )}

      <div className="mb-6 bg-white rounded-lg shadow p-4 space-y-3 border border-gray-200">
        <input
          placeholder="Enter question..."
          className="w-full border rounded p-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          placeholder="Enter answer..."
          className="w-full border rounded p-2"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          onClick={handleAddFaq}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add FAQ'}
        </button>

        <div className="pt-4 border-t mt-4">
          <label className="block text-sm font-medium mb-1">Upload Document (.txt)</label>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setDocFile(e.target.files[0])}
            className="w-full border rounded p-2"
          />
          <button
            onClick={handleDocUpload}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
          >
            Upload Document
          </button>
          {docMessage && <p className="text-sm mt-2 text-blue-600">{docMessage}</p>}
        </div>
      </div>

      <div className="space-y-4">
        {Array.isArray(faqs) && faqs.length > 0 ? (
          faqs.map((faq) => (
            <motion.div
              key={faq._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-blue-50 border border-blue-200 rounded p-4 flex justify-between items-start shadow-sm">
                <div>
                  <p className="font-semibold text-blue-800">Q: {faq.question}</p>
                  <p className="text-sm text-gray-700 mt-1">A: {faq.answer}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(faq._id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center italic">No FAQs yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AdminFaqDashboard;
