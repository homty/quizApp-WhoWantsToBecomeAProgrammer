import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type QuizTopic } from '../../assets/quizIcons.ts';
import { DockerQuiz, ReactQuiz, GitQuiz, type Question } from '../../assets/quizData.ts';
import { getShuffledQuiz } from '../../assets/quizData.ts';
import ActiveQuiz from '../../components/ActiveQuiz.tsx';
import PreSubmitReview from '../../components/PreSubmitReview.tsx';
import FinalResults from './../../components/FinalResults.tsx';
import './testPage.css';

const quizMap: Record<string, Question[]> = {
  docker: DockerQuiz,
  react: ReactQuiz,
  git: GitQuiz
};

const TestPage = () => {
  const { topic } = useParams<{ topic: QuizTopic }>(); 
  const navigate = useNavigate(); 
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isReviewScreen, setIsReviewScreen] = useState(false); 
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  if (!topic || !quizMap[topic]) {
    return (
      <div className="title-container">
         <h2>Quiz not found!</h2>
         <button className="start-button" onClick={() => navigate('/')}>
            <span className="start-button-text">Go back home</span>
         </button>
      </div>
    );
  }

  const questions: Question[] = useMemo(() => {
    return topic && quizMap[topic] ? getShuffledQuiz(quizMap[topic]) : [];
  }, [topic]);
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswerClick = (selectedOption: string) => {
    setUserAnswers(prev => ({ ...prev, [currentIndex]: selectedOption }));
    if (isLastQuestion){
      setIsReviewScreen(true);
    }
    else 
    {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkipClick = () => {
    if (isLastQuestion){
      setIsReviewScreen(true)
    }
    else 
    {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const calculateFinalScore = () => {
    return questions.reduce((score, q, index) => {
      return userAnswers[index] === q.correctAnswer ? score + 1 : score;
    }, 0);
  };

  return (
    <div className="title-container">
        <span className="persistent-logo">DevQuiz</span>
        
        {showResults ? (
          <FinalResults 
            topic={topic} 
            questions={questions} 
            userAnswers={userAnswers} 
            score={calculateFinalScore()} 
          />
        ) : isReviewScreen ? (
          <PreSubmitReview 
            topic={topic} 
            questions={questions} 
            userAnswers={userAnswers}
            onNavigateQuestion={(index) => {
              setCurrentIndex(index);
              setIsReviewScreen(false);
            }}
            onSubmit={() => setShowResults(true)}
          />
        ) : (
          <ActiveQuiz 
            topic={topic}
            questions={questions}
            currentIndex={currentIndex}
            userAnswers={userAnswers}
            onAnswerClick={handleAnswerClick}
            onSkipClick={handleSkipClick}
            onPreviousClick={handlePreviousClick}
            onNavigateToQuestion={(index) => setCurrentIndex(index)}
          />
        )}
    </div>
  );
};

export default TestPage;