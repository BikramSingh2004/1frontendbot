import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { chatStore } from '../stores/ChatStore';
import { useNavigate } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';

const ChatPage = observer(() => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const sendMessage = async () => {
    const userMessage = chatStore.userInput.trim();
    if (!userMessage && !file) return;

    chatStore.setUserInput('');
    chatStore.isLoading = true;

    // First: Upload file if any
    if (file) {
      const formData = new FormData();
      formData.append('faq', file);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload-faq`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        chatStore.addMessage('assistant', `📄 File "${file.name}" uploaded successfully.`);
      } catch (err) {
        chatStore.addMessage('assistant', '❌ Failed to upload file.');
      }

      setFile(null); // reset file
    }

    // Then: Send user message if any
    if (userMessage) {
      chatStore.addMessage('user', userMessage);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage, userId: 'default-user' }),
        });
        const data = await res.json();
        chatStore.addMessage('assistant', data.reply || 'No response');
      } catch (err) {
        chatStore.addMessage('assistant', '❌ Error getting AI response');
      }
    }

    chatStore.isLoading = false;
  };

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) setFile(uploaded);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-3 flex justify-between items-center shadow">
        <div>
          <h2 className="text-xl font-bold text-green-400">💬 AI Chat Assistant</h2>
          <p className="text-xs text-gray-400">Available 24/7</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-700 hover:bg-gray-600 text-sm px-3 py-1 rounded"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-900">
        {chatStore.messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'ml-auto bg-green-600 text-white'
                : 'mr-auto bg-zinc-800 text-gray-200'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {chatStore.isLoading && (
          <div className="text-xs text-gray-400 italic">Agent is typing...</div>
        )}
      </div>

      {/* Input Section */}
      <div className="border-t bg-zinc-800 p-3 flex items-center gap-2">
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 text-gray-300 hover:text-white"
          title="Attach .txt/.jpg/.png"
        >
          <UploadCloud className="w-5 h-5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".txt,.jpg,.jpeg,.png"
        />
        <input
          type="text"
          className="flex-1 rounded-full px-4 py-2 text-sm text-black focus:outline-none"
          placeholder="Ask something..."
          value={chatStore.userInput}
          onChange={(e) => chatStore.setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
});

export default ChatPage;
