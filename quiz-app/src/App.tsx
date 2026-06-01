import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import Welcome from './pages/WelcomeAnimation/welcomeAnimation.tsx';
import MainPage from './pages/MainPage/mainPage.tsx';
import TestPage from './pages/TestPage/testPage.tsx';
import UserProfile from './pages/UserProfile/userProfile.tsx';
import ProfileSetup from './pages/ProfileSetup/profileSetup.tsx';
import CustomQuizBuilder from './pages/CustomQuizBuilder/customQuizBuilder.tsx';
import { isProfileInitialized } from './utils/profileStorage.ts';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialized = isProfileInitialized();

    if (location.pathname !== '/' && location.pathname !== '/setup' && !initialized) {
      navigate('/', { replace: true });
      return;
    }

    if (location.pathname === '/setup' && initialized) {
      navigate('/home', { replace: true });
      return;
    }

    const protectedRoutes = ['/home', '/profile', '/custom-builder'];
    const isQuizRoute = !['/', '/home', '/profile', '/setup', '/custom-builder'].includes(location.pathname);

    if ((protectedRoutes.includes(location.pathname) || isQuizRoute) && !initialized) {
      navigate('/setup', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/setup" element={<ProfileSetup />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/custom-builder" element={<CustomQuizBuilder />} />
      <Route path="/:topic" element={<TestPage />} />
    </Routes>
  );
}

export default App;