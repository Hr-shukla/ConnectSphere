import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPosts, addPosts, setLoading, setHasMore } from '../store/slices/postsSlice';
import CreatePost from '../components/Posts/CreatePost';
import PostCard from '../components/Posts/PostCard';
import { postsAPI } from '../api/posts';

const Home: React.FC = () => {
  const { posts, isLoading, hasMore, page } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const loadInitialPosts = async () => {
    dispatch(setLoading(true));
    try {
      // Mock data since we don't have a backend
      const mockPosts = [
        {
          id: '1',
          author: {
            id: '1',
            username: 'johndoe',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
          },
          content: 'Just launched my new project! Really excited to share it with the ConnectSphere community. What do you all think?',
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          likesCount: 12,
          commentsCount: 3,
          isLiked: false,
        },
        {
          id: '2',
          author: {
            id: '2',
            username: 'sarahsmith',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahsmith',
          },
          content: 'Beautiful sunset from my evening walk today. Nature never fails to inspire me! 🌅\n\nSometimes we just need to slow down and appreciate the simple things in life.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          likesCount: 24,
          commentsCount: 8,
          isLiked: true,
        },
        {
          id: '3',
          author: {
            id: '3',
            username: 'techguru',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techguru',
          },
          content: 'Hot take: The future of web development is going to be amazing. With all the new tools and frameworks emerging, we\'re entering a golden age of creativity and performance.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
          likesCount: 45,
          commentsCount: 15,
          isLiked: false,
        },
      ];
      dispatch(setPosts(mockPosts));
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      // In a real app, this would be an API call with pagination
      // For now, we'll just simulate loading more posts
      const mockAdditionalPosts = [
        {
          id: `${Date.now()}`,
          author: {
            id: '4',
            username: 'creativemind',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creativemind',
          },
          content: 'Working on some new designs. Love the creative process!',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          likesCount: 8,
          commentsCount: 2,
          isLiked: false,
        },
      ];
      dispatch(addPosts(mockAdditionalPosts));
      
      // Simulate reaching end of posts after a few loads
      if (page >= 3) {
        dispatch(setHasMore(false));
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, page]);

  if (isLoading && posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 animate-pulse">
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-20 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-20"></div>
            </div>
          </div>
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 animate-pulse">
            <div className="flex space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="flex space-x-4">
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost />
      
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {loadingMore && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 mt-2">Loading more posts...</p>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You've reached the end!</p>
        </div>
      )}
    </div>
  );
};

export default Home;