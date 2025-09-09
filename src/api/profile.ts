import api from './axios';

export const profileAPI = {
  getProfile: async (username: string) => {
    const response = await api.get(`/profile/${username}`);
    return response.data;
  },

  getUserPosts: async (username: string) => {
    const response = await api.get(`/profile/${username}/posts`);
    return response.data;
  },

  followUser: async (userId: string) => {
    const response = await api.post(`/profile/${userId}/follow`);
    return response.data;
  },

  unfollowUser: async (userId: string) => {
    const response = await api.delete(`/profile/${userId}/follow`);
    return response.data;
  },
};