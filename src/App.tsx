import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './store';
import { loginSuccess } from './store/slices/authSlice';

// Layout Components
import MainLayout from './components/Layout/MainLayout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Messages from './pages/Messages';
import ImageGeneration from './pages/ImageGeneration';

const AppContent: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in on app start
    if (token && !user) {
      // In a real app, you'd validate the token and get user data
      // For demo purposes, we'll create a mock user
      const mockUser = {
        id: '1',
        username: 'demo_user',
        email: 'demo@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo_user',
        bio: 'Welcome to ConnectSphere! This is a demo account.',
        followersCount: 42,
        followingCount: 38,
        postsCount: 12,
      };
      dispatch(loginSuccess({ user: mockUser, token }));
    }
  }, [token, user, dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="generate" element={<ImageGeneration />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;