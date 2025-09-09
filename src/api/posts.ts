import api from './axios';
import { Post } from '../store/slices/postsSlice';

export const postsAPI = {
  getPosts: async (page: number = 1) => {
    const response = await api.get(`/posts?page=${page}`);
    return response.data;
  },

  createPost: async (content: string) => {
    const response = await api.post('/posts', { content });
    return response.data;
  },

  likePost: async (postId: string) => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },

  deletePost: async (postId: string) => {
    await api.delete(`/posts/${postId}`);
  },

  getComments: async (postId: string) => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },

  addComment: async (postId: string, content: string) => {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  },
};