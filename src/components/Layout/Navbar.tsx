import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Home, User, MessageCircle, LogOut, Palette } from 'lucide-react';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ConnectSphere
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Home size={20} />
              <span className="hidden md:block">Home</span>
            </Link>

            <Link
              to={`/profile/${user?.username}`}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                isActive('/profile')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <User size={20} />
              <span className="hidden md:block">Profile</span>
            </Link>

            <Link
              to="/messages"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                isActive('/messages')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <MessageCircle size={20} />
              <span className="hidden md:block">Messages</span>
            </Link>

            <Link
              to="/generate"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                isActive('/generate')
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <Palette size={20} />
              <span className="hidden md:block">Generate</span>
            </Link>

            <div className="flex items-center space-x-3">
              <Link to={`/profile/${user?.username}`}>
                <img
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                  alt={user?.username}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-colors"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;