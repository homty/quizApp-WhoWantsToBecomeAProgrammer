import { type Question } from "../assets/quizData";

interface ActiveQuizProps {
    topic: string;
    questions: Question[];
    currentIndex: number;
    userAnswers: Record<number, string>;
    onAnswerClick: (option: string) => void;
    onSkipClick: () => void;
    onPreviousClick: () => void;
    onNavigateToQuestion: (index: number) => void;
}

const ActiveQuiz = ({
    topic,
    questions,
    currentIndex,
    userAnswers,
    onAnswerClick,
    onSkipClick,
    onPreviousClick,
    onNavigateToQuestion
}: ActiveQuizProps ) => {
    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;

    return (
    <div className={`quiz-card ${topic}`}>
      <div className="progress-segments-container" aria-label="Quiz progress">
        {questions.map((_, index) => {
          const isAnswered = userAnswers[index] !== undefined;
          const isCurrent = index === currentIndex;
          return (
            <button 
              key={index} 
              className={`progress-segment ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}`}
              onClick={() => onNavigateToQuestion(index)}
              aria-label={`Go to question ${index + 1}`}
              title={`Question ${index + 1}`}
            ></button>
          );
        })}
      </div>
      <h2 className="question-text">{currentQuestion?.question}</h2>
      
      <div className="options-grid">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = userAnswers[currentIndex] === option;
            return (
              <button 
                  key={index} 
                  className={`option-button ${isSelected ? 'selected' : ''}`}
                  onClick={() => onAnswerClick(option)}
              >
                  {option}
              </button>
            );
          })}
      </div>
      <div className="button-group">
        <button 
          className="previous-button" 
          onClick={onPreviousClick}
          disabled={currentIndex === 0}
        >
          Previous Question
        </button>
        <button className="skip-button" onClick={onSkipClick}>
          {isLastQuestion ? 'Review & Submit' : 'Skip Question'}
        </button>
      </div>
    </div>
  );
};
export default ActiveQuiz;