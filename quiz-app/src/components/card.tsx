import './card.css';
import { QuizIcons, type QuizTopic } from '../assets/quizIcons.ts';

interface CardProps {
  topic: QuizTopic; // TS will enforce that this is a valid key!
  title: string;
  description: string;
  onClick: () => void;
}

// 1. Accept the 'onClick' prop here
function Card({ topic, title, description, onClick}: CardProps) {
  return (
    <div className="card">
      {/* 2. Attach it to the button's onClick event */}
      <button className="button-design" onClick={onClick}>
        {/* Tip: Use absolute paths for the public folder */}
        <img className="card-img" src={QuizIcons[topic]} alt={topic}/>
        <h1 className="card-title">{title}</h1>
        <p className="description">{description}</p>
      </button>
    </div>
  );
}

export default Card;