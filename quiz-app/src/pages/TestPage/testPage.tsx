import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type QuizTopic } from '../../assets/quizIcons.ts';
import { DockerQuiz, ReactQuiz, GitQuiz, type Question } from '../../assets/quizData.ts'; // Import your questions
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
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = topic ? quizMap[topic] || [] : [];
  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (selectedOption: string) => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="title-container">
        <h1>Quiz Complete!</h1>
        <p>Your Score: {score} / {questions.length}</p>
        <button className="start-button" onClick={() => navigate('/home')}>
           <span className="start-button-text">Back to Home</span>
        </button>
      </div>
    );
  }

  return (
    <div className="title-container">
        <span className="persistent-logo">DevQuiz</span>
        
        <div className={`quiz-card ${topic}`}>
        <p className="question-count">Question {currentIndex + 1} of {questions.length}</p>
        <h2 className="question-text">{currentQuestion?.question}</h2>
        
        <div className="options-grid">
            {currentQuestion?.options.map((option, index) => (
            <button 
                key={index} 
                className="option-button"
                onClick={() => handleAnswerClick(option)}
            >
                {option}
            </button>
            ))}
        </div>
        </div>
    </div>
  );
}

export default TestPage;