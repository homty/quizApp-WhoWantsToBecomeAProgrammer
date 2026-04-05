import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin'; // 1. Import the TextPlugin

// 2. Register BOTH plugins so GSAP knows how to use them
gsap.registerPlugin(useGSAP, TextPlugin);

const Welcome = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(".start-button-text", { text: "" });

    tl.from(".title", { 
      y: -50, 
      opacity: 0, 
      duration: 2, 
      autoRound: true
    })
    .from(".start-button", { 
      opacity: 0, 
      duration: 0.4 
    }, "-=0.4") 
    .to(".start-button-text", { 
      text: "Hello world!", 
      duration: 1, 
      ease: "none"
    });
  }, { scope: container });

  return (
    <div ref={container} className="welcome-container">
      <h1 className="title">Welcome to DevQuiz</h1>
      <button className="start-button">
        <span className="prompt-arrow" style={{ color: '#FFFFFF', marginRight: '8px' }}>{'>'}</span>
        <span className="start-button-text">Hello world!</span>
      </button>
    </div>
  );
};

export default Welcome;