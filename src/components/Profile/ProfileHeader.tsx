import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, UserPlus, UserMinus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { toggleFollow } from '../../store/slices/profileSlice';
import { profileAPI } from '../../api/profile';

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

interface ProfileHeaderProps {
  profile: ProfileUser;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const isOwnProfile = user?.id === profile.id;

  const handleFollowToggle = async () => {
    try {
      if (profile.isFollowing) {
        await profileAPI.unfollowUser(profile.id);
      } else {
        await profileAPI.followUser(profile.id);
      }
      dispatch(toggleFollow());
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
            alt={profile.username}
            className="w-32 h-32 rounded-full border-4 border-gray-200 mx-auto md:mx-0"
          />
        </div>

        <div className="flex-1">
          <div className="text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                {profile.username}
              </h1>
              {isOwnProfile ? (
                <Link
                  to="/profile/edit"
                  className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Edit size={18} />
                  <span>Edit Profile</span>
                </Link>
              ) : (
                <button
                  onClick={handleFollowToggle}
                  className={`inline-flex items-center space-x-2 px-6 py-2 rounded-lg transition-all ${
                    profile.isFollowing
                      ? 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  }`}
                >
                  {profile.isFollowing ? (
                    <>
                      <UserMinus size={18} />
                      <span>Unfollow</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex justify-center md:justify-start space-x-8 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profile.postsCount}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profile.followersCount}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profile.followingCount}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>

            {profile.bio && (
              <p className="text-gray-700 leading-relaxed max-w-md">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;