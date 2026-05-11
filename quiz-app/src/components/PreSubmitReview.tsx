import { type Question } from '../assets/quizData.ts';

interface PreSubmitReviewProps {
  topic: string;
  questions: Question[];
  userAnswers: Record<number, string>;
  onNavigateQuestion: (index: number) => void;
  onSubmit: () => void;
}

const PreSubmitReview = ({
  topic,
  questions,
  userAnswers,
  onNavigateQuestion,
  onSubmit
}: PreSubmitReviewProps) => {
  const answeredCount = Object.keys(userAnswers).length;
  const totalCount = questions.length;

  return (
    <div className={`quiz-card ${topic}`}>
      <span className="persistent-logo">DevQuiz</span>
      
      <div className="progress-segments-container" aria-label="Quiz progress">
        {questions.map((_, index) => {
          const isAnswered = userAnswers[index] !== undefined;
          
          return (
            <button 
              key={index} 
              className={`progress-segment ${isAnswered ? 'answered' : ''}`}
              onClick={() => onNavigateQuestion(index)}
              aria-label={`Go to Question ${index + 1}`}
              title={`Question ${index + 1}: ${isAnswered ? 'Answered' : 'Not Answered'}`}
            ></button>
          );
        })}
      </div>

      <h2 className="summary-title">Review Your Answers</h2>
      
      {answeredCount === totalCount ? (
        <p className="summary-status complete">Great job! You've answered all {totalCount} questions.</p>
      ) : (
        <p className="summary-status incomplete">
          Wait! You have only answered {answeredCount} out of {totalCount} questions.
        </p>
      )}

      <p className="summary-subtitle">
        Click on any of the progress buttons above to jump back and edit your answer before submitting.
      </p>
      
      <button className="start-button" onClick={onSubmit}>
        <span className="start-button-text">Lock in Score & Submit</span>
      </button>
    </div>
  );
};

export default PreSubmitReview;