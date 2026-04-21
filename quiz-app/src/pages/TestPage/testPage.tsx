import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type QuizTopic } from '../../assets/quizIcons.ts';
import { DockerQuiz, ReactQuiz, GitQuiz, type Question } from '../../assets/quizData.ts';
import './testPage.css';

const quizMap: Record<string, Question[]> = {
  docker: DockerQuiz,
  react: ReactQuiz,
  git: GitQuiz
};

const TestPage = () => {
  /*React routers
  useParams for creating specific URL using REACT router, 
  and useNavigate for navigate between URLs that already exist
  */
  const { topic } = useParams<{ topic: QuizTopic }>(); 
  const navigate = useNavigate(); 
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  let questions: Question[] = [];
  if (topic && quizMap[topic]) {
    questions = quizMap[topic];
  }
  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (selectedOption: string) => {
    const copiedAnswers = { ...userAnswers };
    copiedAnswers[currentIndex] = selectedOption;
    setUserAnswers(copiedAnswers);

    const nextIndex = currentIndex + 1;
    const isFinished = nextIndex === questions.length;
    if (isFinished) {
      setShowResults(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkipClick = () => {
    const nextIndex = currentIndex + 1;
    const isFinished = nextIndex === questions.length;
    if (isFinished) {
      setShowResults(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateFinalScore = () => {
    let finalScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        finalScore += 1;
      }
    });
    return finalScore;
  };

  if (showResults) {
    const isReviewing = reviewIndex !== null;
    const reviewQuestion = isReviewing ? questions[reviewIndex] : null;

    return (
      <div className="title-container">
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
                  aria-label={`Review Question ${index + 1} which was ${isCorrect ? 'correct' : 'incorrect'}`}
                  title={`Question ${index + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}`}
                ></button>
              );
            })}
          </div>
          
          {!isReviewing ? (
            <>
              <h1>Quiz Complete!</h1>
              <p>Your Score: {calculateFinalScore()} / {questions.length}</p>
              <button className="start-button" onClick={() => navigate('/home')}> 
                <span className="start-button-text">Back to Home</span>
              </button>
            </>
          ) : (
            <>
              <h2 className="question-text">{reviewQuestion?.question}</h2>
              <div className="options-grid">
                {reviewQuestion?.options.map((option, index) => {
                  const isUserAnswer = userAnswers[reviewIndex] === option;
                  const isCorrectAnswer = reviewQuestion.correctAnswer === option;
                  
                  let optionClass = '';
                  if (isCorrectAnswer) {
                    optionClass = 'correct-answer';
                  } else if (isUserAnswer && !isCorrectAnswer) {
                    optionClass = 'wrong-answer';
                  }

                  return (
                    <button 
                        key={index} 
                        className={`option-button ${optionClass}`}
                        disabled
                    >
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
      </div>
    );
  }

  return (
    <div className="title-container">
        <span className="persistent-logo">DevQuiz</span>

        <div className={`quiz-card ${topic}`}>
          <div className="progress-segments-container" aria-label="Quiz progress">
            {questions.map((_, index) => {
              //Check if an answer exists for this index
              const isAnswered = userAnswers[index] !== undefined;
              const isCurrent = index === currentIndex;

              return (
                <button 
                  key={index} 
                  className={`progress-segment ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to question ${index + 1}`}
                  title={`Question ${index + 1}`}
                ></button>
              );
            })}
          </div>
        
          <h2 className="question-text">{currentQuestion?.question}</h2>
          
          <div className="options-grid">
              {currentQuestion?.options.map((option, index) => {
                //we check our answers to know, if the user answered on it
                const isSelected = userAnswers[currentIndex] === option;

                return (
                  <button 
                      key={index} 
                      className={`option-button ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleAnswerClick(option)}
                  >
                      {option}
                  </button>
                );
              })}
          </div>
          <div className="button-group">
            <button 
              className="previous-button" 
              onClick={handlePreviousClick}
              disabled={currentIndex === 0}
            >
              Previous Question
            </button>
            <button className="skip-button" onClick={handleSkipClick}>
              Skip Question
            </button>
          </div>
        </div>
    </div>
  );
}

export default TestPage;