import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { type Question } from '../assets/quizData.ts';

interface FinalResultsProps {
  topic: string;
  questions: Question[];
  userAnswers: Record<number, string>;
  score: number;
  earnedXP: number;
}

const FinalResults = ({ topic, questions, userAnswers, score, earnedXP }: FinalResultsProps) => {
  const navigate = useNavigate();
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const xpRef = useRef<HTMLSpanElement>(null);

  const isReviewing = reviewIndex !== null;
  const reviewQuestion = isReviewing ? questions[reviewIndex] : null;
  useEffect(() => {
    if (!isReviewing && xpRef.current) {
      gsap.fromTo(
        xpRef.current,
        { innerHTML: 0 },
        {
          innerHTML: earnedXP,
          duration: 1.5,
          snap: { innerHTML: 1 },
          ease: 'power2.out'
        }
      );
    }
  }, [earnedXP, isReviewing]);
  let viewContent;

  if (!isReviewing) {
    viewContent = (
      <>
        <h1 className="summary-title">Quiz Complete!</h1>
        <p>Your Score: {score} / {questions.length}</p>S
        
        <div className="xp-reward-container">
            <h2 style={{ color: '#4ade80', fontSize: '2rem', margin: '10px' }}>
               +<span ref={xpRef}>0</span> XP
            </h2>
        </div>

        <button className="back-button" onClick={() => navigate('/')}> 
          <span className="back-button-text">Back to Home</span>
        </button>
      </>
    );
  } else {
    viewContent = (
      <>
        <h2 className="question-text">{reviewQuestion?.question}</h2>
        <div className="options-grid">
          {reviewQuestion?.options.map((option, index) => {
            const isUserAnswer = userAnswers[reviewIndex] === option;
            const isCorrectAnswer = reviewQuestion?.correctAnswer === option;
            
            let optionClass = '';
            if (isCorrectAnswer) optionClass = 'correct-answer';
            else if (isUserAnswer && !isCorrectAnswer) optionClass = 'wrong-answer';

            return (
              <button key={index} className={`option-button ${optionClass}`} disabled>
                  {option}
              </button>
            );
          })}
        </div>
        <button className="start-button" onClick={() => setReviewIndex(null)} style={{ marginTop: '20px' }}>
          <span className="start-button-text">Back to Results</span>
        </button>
      </>
    );
  }

  return (
    <div className={`quiz-card ${topic}`}>
      <span className="persistent-logo">DevQuiz</span>
      <div className="progress-segments-container" aria-label="Quiz progress">
        {questions.map((q, index) => {
          const isCorrect = userAnswers[index] === q.correctAnswer;
          const statusClass = isCorrect ? 'correct' : 'incorrect';
          const isCurrent = index === reviewIndex;
          return (
            <button 
              key={index} 
              className={`progress-segment ${statusClass} ${isCurrent ? 'current' : ''}`}
              onClick={() => setReviewIndex(index)}
              aria-label={`Review Question ${index + 1}`}
              title={`Question ${index + 1}`}
            ></button>
          );
        })}
      </div>
      
      {viewContent}

    </div>
  );
};

export default FinalResults;