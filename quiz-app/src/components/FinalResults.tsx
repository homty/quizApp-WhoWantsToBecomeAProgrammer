import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Question} from '../assets/quizData.ts';

interface FinalResultProps {
    topic: string;
    questions: Question[];
    userAnswers: Record<number, string>;
    score: number;
}

const FinalResults = ({
    topic,
    questions,
    userAnswers,
    score
}: FinalResultProps) => {
    const navigate = useNavigate();
    const [reviewIndex, setReviewIndex] = useState<number | null>(null);

    const isReviewing = reviewIndex !== null;
    const reviewQuestion = isReviewing ? questions[reviewIndex] : null;

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
      
      {!isReviewing ? (
        <>
          <h1 className = "summary-title">Quiz Complete!</h1>
          <p>Your Score: {score} / {questions.length}</p>
          <button className="back-button" onClick={() => navigate('/')}> 
            <span className="back-button-text">Back to Home</span>
          </button>
        </>
      ) : (
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
      )}
    </div>
  );
};
export default FinalResults;