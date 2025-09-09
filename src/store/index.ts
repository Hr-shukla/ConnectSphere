import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import postsSlice from './slices/postsSlice';
import profileSlice from './slices/profileSlice';
import messagesSlice from './slices/messagesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    profile: profileSlice,
    messages: messagesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;