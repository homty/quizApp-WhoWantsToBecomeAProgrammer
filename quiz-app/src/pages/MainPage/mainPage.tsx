import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "../../components/card.tsx";
import { type QuizTopic } from '../../assets/quizIcons.ts';
import { getProfile } from '../../utils/profileStorage.ts';
import { getCustomQuizzes, deleteCustomQuiz, type CustomQuiz } from '../../utils/customQuizManager.ts';
import { calculateRank } from '../../assets/ranksData.ts';
import './mainPage.css';

const QuizContent: Record<QuizTopic, { title: string; description: string }> = {
  docker: {
    title: "Docker Quiz",
    description: "Test your container knowledge",
  },
  react: {
    title: "React Quiz",
    description: "Test your React skills",
  },
  git: {
    title: "Git Quiz",
    description: "Test your Git knowledge",
  },
  custom: {
    title: "+ Create Quiz",
    description: "Build custom quizzes via JSON paste or URL APIs"
  }
};

const MainPage = () => {
  const navigate = useNavigate();
  const profile = getProfile();
  const rank = profile ? calculateRank(profile.totalXP) : null;
  const [customQuizzes, setCustomQuizzes] = useState<CustomQuiz[]>(() => getCustomQuizzes());

  const handleCardClick = (topic: string) => {
    navigate(`/${topic}`);
  };

  const handleDeleteQuiz = (id: string) => {
    if (window.confirm("Are you sure you want to delete this custom quiz? This will also wipe its score achievements.")) {
      deleteCustomQuiz(id);
      setCustomQuizzes(getCustomQuizzes());
    }
  };

  return (
    <div className='title-container'>
      <span className="persistent-logo" onClick={() => navigate('/home')}>DevQuiz</span>

      <button className="profile-nav-btn" onClick={() => navigate('/profile')}>
        {profile ? (
          <>
            <img className="header-avatar" src={profile.avatarUrl} alt={profile.username} />
            <div className="header-profile-info">
              <span className="header-profile-name">{profile.name}</span>
              <span className="header-profile-xp">{rank?.title} • {profile.totalXP} XP</span>
              <div className="header-progress-track">
                <div className="header-progress-fill" style={{ width: `${rank?.progress}%` }} />
              </div>
            </div>
          </>
        ) : (
          <>
            <svg className="github-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>Link GitHub</span>
          </>
        )}
      </button>

      <h1 className="title-main-page">Select your Quiz</h1>
      <p className='description-main-page'>Browse the cards below, pick your topic, and view the related question results instantly</p>

      <div className='card-space-container'>
        {(Object.keys(QuizContent) as QuizTopic[])
          .filter(t => t !== 'custom')
          .map((topic) => {
            const quizStats = profile?.completedQuizzes[topic];
            return (
              <Card
                key={topic}
                topic={topic}
                title={QuizContent[topic].title}
                description={QuizContent[topic].description}
                onClick={() => handleCardClick(topic)}
                highscore={quizStats?.highscore}
                totalQuestions={quizStats?.totalQuestions}
                completions={quizStats?.completions}
              />
            );
          })}

        {customQuizzes.map((quiz) => {
          const quizStats = profile?.completedQuizzes[quiz.id];
          return (
            <Card
              key={quiz.id}
              topic={quiz.id}
              title={quiz.title}
              description={quiz.description}
              onClick={() => handleCardClick(quiz.id)}
              highscore={quizStats?.highscore}
              totalQuestions={quiz.questions.length}
              completions={quizStats?.completions}
              onDelete={() => handleDeleteQuiz(quiz.id)}
              customColor={quiz.color}
              customIcon={quiz.icon}
            />
          );
        })}
        <Card
          topic="custom"
          title={QuizContent.custom.title}
          description={QuizContent.custom.description}
          onClick={() => navigate('/custom-builder')}
        />
      </div>
    </div>
  );
};

export default MainPage;