import React from 'react';
import { observer } from 'mobx-react-lite';
import { chatStore } from '../stores/ChatStore';
import { useNavigate } from 'react-router-dom';

const ChatPage = observer(() => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-3xl mx-auto shadow-xl border bg-red-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">💬 AI Chat Assistant</h2>
          <p className="text-xs text-white/80">Available 24/7</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 px-2 py-1 text-xs rounded"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-2 py-1 text-xs rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {chatStore.messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'ml-auto bg-blue-100 text-blue-800 text-right'
                : 'mr-auto bg-gray-200 text-gray-800 text-left'
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
      <div className="border-t bg-white p-3 flex items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Ask something..."
          value={chatStore.userInput}
          onChange={(e) => chatStore.setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && chatStore.sendMessage()}
        />
        <button
          onClick={() => chatStore.sendMessage()}
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
});

export default ChatPage;
