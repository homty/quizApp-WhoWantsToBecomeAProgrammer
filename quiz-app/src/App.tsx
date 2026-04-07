import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import Welcome from './pages/WelcomeAnimation/welcomeAnimation.tsx';
import MainPage from './pages/MainPage/mainPage.tsx';
import TestPage from './pages/TestPage/testPage.tsx';
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []); 

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/:topic" element={<TestPage />} />
    </Routes>
  );
}

export default App;