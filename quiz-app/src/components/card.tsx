import './card.css';
import { QuizIcons, type QuizTopic } from '../assets/quizIcons.ts';

interface CardProps {
  topic: QuizTopic;
  title: string;
  description: string;
  onClick: () => void;
}

function Card({ topic, title, description, onClick}: CardProps) {
  return (
    <div className="card">
      <button className={`button-design ${topic}`} onClick={onClick}>
        <img className="card-img" src={QuizIcons[topic]} alt={topic}/>
        <h1 className="card-title">{title}</h1>
        <p className="description">{description}</p>
      </button>
    </div>
  );
}

export default Card;