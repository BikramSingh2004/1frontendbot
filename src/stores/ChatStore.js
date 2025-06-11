import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

class ChatStore {
  messages = [];
  isLoading = false;
  userInput = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUserInput(value) {
    this.userInput = value;
  }

  addMessage(role, content) {
    this.messages.push({ role, content });
  }

  async sendMessage() {
    const userMessage = this.userInput.trim();
    if (!userMessage) return;

    this.addMessage('user', userMessage);
    this.userInput = '';
    this.isLoading = true;

    try {
      const res = await axios.post(`${API}/message`, {
        message: userMessage,
        userId: 'default-user',
      });

      this.addMessage('assistant', res.data.reply || 'No response');
    } catch (err) {
      this.addMessage('assistant', 'Error connecting to server');
    } finally {
      this.isLoading = false;
    }
  }

  async loadHistory() {
    try {
      const res = await axios.get(`${API}/history?userId=default-user`);
      this.messages = res.data.messages || [];
    } catch (err) {
      console.error('Failed to load history:', err.message);
    }
  }
}

export const chatStore = new ChatStore();
