import api from './axios';

export const messagesAPI = {
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  getMessages: async (conversationId: string) => {
    const response = await api.get(`/messages/${conversationId}`);
    return response.data;
  },

  sendMessage: async (conversationId: string, content: string) => {
    const response = await api.post(`/messages/${conversationId}`, { content });
    return response.data;
  },
};