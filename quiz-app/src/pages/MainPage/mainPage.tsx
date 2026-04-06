import { useNavigate } from 'react-router-dom';
import Card from "../../components/card.tsx";
import { type QuizTopic } from '../../assets/quizIcons.ts';
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
  }
};

const MainPage = () => {
  const navigate = useNavigate();

 const handleCardClick = (topic: QuizTopic) => {
    navigate(`/${topic}`); 
  };

  return (
    <div className='title-container'>
      <h1 className="title-main-page">Select your Quiz</h1>
      <p className='description-main-page'>Browse the cards below, pick your topic, and view the related question results instantly</p>
      <div className='card-space-container'>
        {(Object.keys(QuizContent) as QuizTopic[]).map((topic) => (
          <Card
            key={topic}
            topic={topic} 
            title={QuizContent[topic].title} 
            description={QuizContent[topic].description} 
            onClick={() => handleCardClick(topic)} 
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;