import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import './welcomeStyle.css';

gsap.registerPlugin(useGSAP, TextPlugin);

// 1. Tell Vite/Webpack to fetch this file when called
const preloadMainPage = () => {
  import('../MainPage/mainPage.tsx');
};

const Welcome = () => {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    gsap.set(".start-button-text", { text: "" });

    tl.from(".title", { 
      y: -30, 
      opacity: 0, 
      duration: 1.5, 
      ease: "power2.out"
    })
    .from(".start-button", { 
      opacity: 0, 
      y: 20,
      duration: 0.4 
    }, "-=0.4") 
    .to(".start-button-text", { 
      text: "Hello world!", 
      duration: 1, 
      ease: "none"
    });
  }, { scope: container });

  const handleStart = () => {
    gsap.to(".start-button", { opacity: 0, y: 20, duration: 0.5, pointerEvents: "none" });
    gsap.to(".welcome-text", { opacity: 0, duration: 0.5, ease: "power2.out" });

    const logoEl = container.current?.querySelector(".logo-text");
    const destEl = container.current?.querySelector(".header-destination");

    if (logoEl && destEl) {
      const logoRect = logoEl.getBoundingClientRect();
      const destRect = destEl.getBoundingClientRect();

      const moveX = destRect.left - logoRect.left; 
      const moveY = destRect.top - logoRect.top;

      gsap.to(".logo-text", {
        x: moveX,
        y: moveY,
        scale: 0.5,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          navigate('/home'); 
        }
      });
    }
  };

  return (
    <div ref={container} className="welcome-container">
      <div className="header-destination"/>

      <h1 className="title">
        <span className="welcome-text">Welcome to </span>
        <span className="logo-text">DevQuiz</span>
      </h1>
      
      {/* 2. Trigger the download on hover */}
      <button 
        className="start-button" 
        onMouseEnter={preloadMainPage}
        onClick={handleStart}
      >
        <span className="prompt-arrow">{'>'}</span>
        <span className="start-button-text">Hello world!</span>
      </button>
    </div>
  );
};

export default Welcome;