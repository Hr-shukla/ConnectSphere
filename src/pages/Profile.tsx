import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCurrentProfile, setProfilePosts, setLoading, clearProfile } from '../store/slices/profileSlice';
import ProfileHeader from '../components/Profile/ProfileHeader';
import PostCard from '../components/Posts/PostCard';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { currentProfile, profilePosts, isLoading } = useSelector((state: RootState) => state.profile);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      loadProfile(username);
    }
    return () => {
      dispatch(clearProfile());
    };
  }, [username]);

  const loadProfile = async (username: string) => {
    dispatch(setLoading(true));
    try {
      // Mock profile data
      const mockProfile = {
        id: username === user?.username ? user.id : '2',
        username,
        email: username === user?.username ? user?.email : undefined,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        bio: username === user?.username 
          ? user?.bio || 'This is your bio. Edit your profile to add more information about yourself!'
          : 'Software developer passionate about creating amazing user experiences. Love to code, travel, and connect with like-minded people!',
        followersCount: username === user?.username ? user?.followersCount || 42 : 128,
        followingCount: username === user?.username ? user?.followingCount || 38 : 95,
        postsCount: username === user?.username ? user?.postsCount || 12 : 24,
        isFollowing: username !== user?.username ? false : undefined,
      };

      dispatch(setCurrentProfile(mockProfile));

      // Mock posts for this profile
      const mockPosts = [
        {
          id: `${username}-1`,
          author: {
            id: mockProfile.id,
            username,
            avatar: mockProfile.avatar,
          },
          content: username === user?.username 
            ? 'This is my first post on ConnectSphere! Excited to be part of this community.'
            : 'Just finished reading an amazing book about psychology. The human mind is fascinating!',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          likesCount: 15,
          commentsCount: 4,
          isLiked: false,
        },
        {
          id: `${username}-2`,
          author: {
            id: mockProfile.id,
            username,
            avatar: mockProfile.avatar,
          },
          content: username === user?.username
            ? 'Working on some exciting new projects. Can\'t wait to share them with you all!'
            : 'Beautiful morning hike today. Nature always helps clear my mind and sparks creativity.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          likesCount: 8,
          commentsCount: 2,
          isLiked: true,
        },
      ];

      dispatch(setProfilePosts(mockPosts));
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6 animate-pulse">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto md:mx-0 mb-6 md:mb-0"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded w-48 mb-4 mx-auto md:mx-0"></div>
              <div className="flex justify-center md:justify-start space-x-8 mb-4">
                <div className="text-center">
                  <div className="h-6 w-8 bg-gray-200 rounded mb-1 mx-auto"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="h-6 w-8 bg-gray-200 rounded mb-1 mx-auto"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="h-6 w-8 bg-gray-200 rounded mb-1 mx-auto"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full max-w-md mx-auto md:mx-0"></div>
            </div>
          </div>
        </div>
        
        {[...Array(2)].map((_, i) => (
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
          </div>
        ))}
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h2>
        <p className="text-gray-600">The user you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader profile={currentProfile} />
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Posts ({profilePosts.length})
          </h3>
        </div>
        
        {profilePosts.length > 0 ? (
          profilePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500">No posts yet</p>
            {currentProfile.id === user?.id && (
              <p className="text-sm text-gray-400 mt-2">Start sharing your thoughts with the world!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;