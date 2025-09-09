import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from './postsSlice';

interface ProfileUser {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
}

interface ProfileState {
  currentProfile: ProfileUser | null;
  profilePosts: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  currentProfile: null,
  profilePosts: [],
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentProfile: (state, action: PayloadAction<ProfileUser>) => {
      state.currentProfile = action.payload;
    },
    setProfilePosts: (state, action: PayloadAction<Post[]>) => {
      state.profilePosts = action.payload;
    },
    toggleFollow: (state) => {
      if (state.currentProfile) {
        state.currentProfile.isFollowing = !state.currentProfile.isFollowing;
        state.currentProfile.followersCount += state.currentProfile.isFollowing ? 1 : -1;
      }
    },
    clearProfile: (state) => {
      state.currentProfile = null;
      state.profilePosts = [];
      state.error = null;
    },
  },
});

export const { setLoading, setError, setCurrentProfile, setProfilePosts, toggleFollow, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;