import api from './axios';

export const imageGenerationAPI = {
  generateImage: async (prompt: string) => {
    const response = await api.post('/ai/generate-image', { prompt });
    return response.data;
  },
};