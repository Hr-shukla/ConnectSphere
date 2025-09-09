import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { RootState } from '../../store';
import { updatePost, deletePost } from '../../store/slices/postsSlice';
import { Post } from '../../store/slices/postsSlice';
import { postsAPI } from '../../api/posts';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [isLiking, setIsLiking] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const isOwner = user?.id === post.author.id;

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      await postsAPI.likePost(post.id);
      dispatch(updatePost({
        id: post.id,
        updates: {
          isLiked: !post.isLiked,
          likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
        },
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(post.id);
        dispatch(deletePost(post.id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveEdit = async () => {
    if (editContent.trim() === post.content) {
      setIsEditing(false);
      return;
    }
    // In a real app, you'd make an API call here
    dispatch(updatePost({ id: post.id, updates: { content: editContent.trim() } }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(post.content);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex space-x-3">
          <Link to={`/profile/${post.author.username}`}>
            <img
              src={post.author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.username}`}
              alt={post.author.username}
              className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-colors"
            />
          </Link>
          <div>
            <Link
              to={`/profile/${post.author.username}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {post.author.username}
            </Link>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </p>
          </div>
        </div>
        
        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <MoreHorizontal size={20} />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-t-lg"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-b-lg"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 mb-6 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex space-x-6">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
              post.isLiked
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
            } disabled:opacity-50`}
          >
            <Heart size={18} className={post.isLiked ? 'fill-current' : ''} />
            <span className="font-medium">{post.likesCount}</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all">
            <MessageCircle size={18} />
            <span className="font-medium">{post.commentsCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;