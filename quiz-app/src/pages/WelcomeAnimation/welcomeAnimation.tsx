import { useState, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import { Routes, Route } from 'react-router-dom';


const MainPage = lazy(() => import('../MainPage/mainPage.tsx'));
gsap.registerPlugin(useGSAP, TextPlugin);

const Welcome = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Initial states
    gsap.set(".start-button-text", { text: "" });

    tl.from(".title", { 
      y: -30, 
      opacity: 0, 
      duration: 1.5, 
      ease: "power2.out"
    })
    .from(".start-button", { 
      opacity: 0, 
      y: 20, /* Adds a subtle upward float to the button */
      duration: 0.4 
    }, "-=0.4") 
    .to(".start-button-text", { 
      text: "Hello world!", 
      duration: 1, 
      ease: "none"
    });
  }, { scope: container });

  const handleStart = () => {
    //Hide the button and the "Welcome to" prefix
    gsap.to(".start-button", { opacity: 0, y: 20, duration: 0.5, pointerEvents: "none" });
    gsap.to(".welcome-text", { opacity: 0, duration: 0.5, ease: "power2.out" });

    //Dynamically calculate the logo's flight path
    const logoEl = container.current?.querySelector(".logo-text");
    const destEl = container.current?.querySelector(".header-destination");

    if (logoEl && destEl) {
      const logoRect = logoEl.getBoundingClientRect();
      const destRect = destEl.getBoundingClientRect();

      //(Where we want to be) - (Where we are right now)
      const moveX = destRect.left - logoRect.left; 
      const moveY = destRect.top - logoRect.top;

      gsap.to(".logo-text", {
        x: moveX,
        y: moveY,
        scale: 0.5,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          setIsQuizStarted(true);
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
      
      <button className="start-button" onClick={handleStart}>
        <span className="prompt-arrow">{'>'}</span>
        <span className="start-button-text">Hello world!</span>
      </button>

      {isQuizStarted && (
        <div className="main-page-wrapper">
          <Suspense>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/quiz" element={<div>Quiz Page Coming Soon!</div>} />
            </Routes>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default Welcome;