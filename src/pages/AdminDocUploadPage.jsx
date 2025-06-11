import React, { useState } from 'react';
import axios from 'axios';

const AdminDocUploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return setError('Please select a .txt file');
    const formData = new FormData();
    formData.append('faq', file);

    try {
      await axios.post('/api/upload-faq', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('📄 Document uploaded successfully');
      setError('');
      setFile(null);
    } catch (err) {
      console.error(err);
      setError('❌ Upload failed');
      setMessage('');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 border rounded p-6 shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">📁 Upload Company Document</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="file"
        accept=".txt"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full border rounded mb-4 p-2"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default AdminDocUploadPage;
