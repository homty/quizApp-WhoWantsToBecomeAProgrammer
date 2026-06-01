import React from 'react';
import './card.css';
import { QuizIcons } from '../assets/quizIcons.ts';

interface CardProps {
  topic: string;
  title: string;
  description: string;
  onClick: () => void;
  highscore?: number;
  totalQuestions?: number;
  completions?: number;
  onDelete?: () => void;
  customColor?: string;
  customIcon?: string;
}

const StandardColors = {
  react: '#61DAFB',
  docker: '#2496ED',
  git: '#F05032',
};

function Card({ topic, title, description, onClick, highscore, totalQuestions, completions, onDelete, customColor, customIcon }: CardProps) {
  const isCompleted = completions !== undefined && completions > 0;
  const progressPercent = isCompleted && highscore && totalQuestions
    ? Math.round((highscore / totalQuestions) * 100)
    : 0;

  const isStandardTopic = ['docker', 'react', 'git'].includes(topic);
  const themeClass = isStandardTopic ? topic : 'custom';

  const customStyles = !isStandardTopic && customColor ? {
    '--hover-border': customColor,
    '--hover-shadow': `${customColor}80`
  } as React.CSSProperties : undefined;

  const activeColor = isStandardTopic ? (StandardColors[topic as keyof typeof StandardColors] || '#ffffff') : (customColor || '#ffffff');
  const renderIcon = () => {
    if (!isStandardTopic && customIcon && customIcon.trim().startsWith('<svg')) {
      return (
        <div
          className="custom-uploaded-svg"
          dangerouslySetInnerHTML={{ __html: customIcon }}
        />
      );
    }
    const iconSrc = QuizIcons[topic as keyof typeof QuizIcons] || QuizIcons.custom;
    return <img className="card-img" src={iconSrc} alt={topic} />;
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      {onDelete && (
        <button
          className="delete-card-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Delete custom quiz"
          aria-label="Delete custom quiz"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      )}
      <button className={`button-design ${themeClass}`} onClick={onClick} style={customStyles}>
        {renderIcon()}
        <h1 className="card-title">{title}</h1>
        <p className="description">{description}</p>

        {isCompleted && (
          <div className="card-completion-stats">
            <div className="card-stats-row">
              <span className="card-score-pill" style={customColor ? { color: customColor } : undefined}>
                Best: {highscore}/{totalQuestions}
              </span>
              <span className="card-plays-pill">{completions} completions</span>
            </div>
            <div className="card-progress-track">
              <div className="card-progress-fill" style={{ width: `${progressPercent}%`, backgroundColor: activeColor }} />
            </div>
          </div>
        )}
      </button>
    </div>
  );
}

export default Card;