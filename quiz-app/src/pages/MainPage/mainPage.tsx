import { useNavigate } from 'react-router-dom';
import Card from "../../components/card.tsx";
import { QuizIcons, type QuizTopic } from '../../assets/quizIcons.ts';

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
    <div>
      <h1 className="title">Select your Quiz</h1>
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
  );
};

export default MainPage;