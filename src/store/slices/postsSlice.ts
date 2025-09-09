import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  hasMore: true,
  page: 1,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.page = 1;
    },
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts.push(...action.payload);
      state.page += 1;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<{ id: string; updates: Partial<Post> }>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload.updates };
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const { setLoading, setPosts, addPosts, addPost, updatePost, deletePost, setHasMore } = postsSlice.actions;
export default postsSlice.reducer;