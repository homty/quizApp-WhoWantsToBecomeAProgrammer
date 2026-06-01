import { useNavigate } from 'react-router-dom';
import { getProfile, clearProfile } from '../../utils/profileStorage.ts';
import { calculateRank } from '../../assets/ranksData.ts';
import { getCustomQuizzes } from '../../utils/customQuizManager.ts';
import './userProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const profile = getProfile();

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect your GitHub profile? This will wipe your quiz achievements and XP from local storage.')) {
      clearProfile();
      navigate('/setup');
    }
  };

  if (!profile) return null;

  const totalQuizzesCompleted = Object.values(profile.completedQuizzes).reduce(
    (acc, quiz) => acc + quiz.completions,
    0
  );

  const rank = calculateRank(profile.totalXP);

  const available_quizzes = [
    { id: 'react', title: 'React JS', desc: 'Hooks, render lifecycle, and component architecture.' },
    { id: 'git', title: 'Git & Version Control', desc: 'Branch merges, cherry-picks, and repository staging.' },
    { id: 'docker', title: 'Docker Containers', desc: 'Image layers, daemon setups, and volumes.' },
  ];

  const customQuizzes = getCustomQuizzes();
  const customQuizAchievements = customQuizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    desc: quiz.description || `Custom developer quiz with ${quiz.questions.length} questions.`,
  }));

  const allQuizzes = [...available_quizzes, ...customQuizAchievements];

  return (
    <div className="profile-container">
      <header className="profile-header-nav">
        <button className="back-btn" onClick={() => navigate('/home')}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to Quizzes
        </button>
        <span className="profile-logo" onClick={() => navigate('/home')}>DevQuiz</span>
      </header>

      <main className="profile-dashboard-layout animate-fade-in">

        <div className="left-column">

          <div className="dashboard-card profile-summary-card">
            <div className="avatar-wrapper">
              <img className="user-avatar" src={profile.avatarUrl} alt={profile.username} />
            </div>

            <h2 className="user-display-name">{profile.name}</h2>
            <a href={`https://github.com/${profile.username}`} target="_blank" rel="noopener noreferrer" className="user-github-link">
              @{profile.username}
            </a>

            {profile.bio && <p className="user-bio">{profile.bio}</p>}

            <button className="disconnect-profile-btn" onClick={handleDisconnect}>
              Disconnect Profile
            </button>
          </div>
        </div>

        <div className="right-column">
          <div className="dashboard-card developer-rank-card">
            <h3 className="card-heading">Programmer Evaluation</h3>

            <div className="rank-display">
              <span className="rank-emoji">{rank.icon}</span>
              <div className="rank-details">
                <span>Assigned Battle Rank</span>
                <h4 className="rank-title">{rank.title}</h4>
              </div>
            </div>

            <p className="rank-desc">{rank.desc}</p>

            <div className="rank-progress-wrapper" style={{ marginTop: '1.2rem' }}>
              <div className="rank-progress-info">
                <span>Rank XP Progress</span>
                <span>{profile.totalXP} / {rank.nextRankXP} XP</span>
              </div>
              <div className="rank-progress-track">
                <div
                  className="rank-progress-fill"
                  style={{ width: `${rank.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="dashboard-card achievements-container">
            <div className="achievements-header-row">
              <h3 className="card-heading">Quiz Achievement Board</h3>
              <span className="tests-taken-badge">{totalQuizzesCompleted} {totalQuizzesCompleted === 1 ? 'Test' : 'Tests'} Taken</span>
            </div>
            <p className="card-subheading">Score cards and metrics compiled dynamically from test sessions</p>

            <div className="achievements-list">
              {allQuizzes.map((quiz) => {
                const quizStats = profile.completedQuizzes[quiz.id];
                const isCompleted = !!quizStats;

                return (
                  <div key={quiz.id} className={`achievement-item-row ${isCompleted ? 'active' : ''}`}>
                    <div className="achievement-left-details">
                      <h4 className="achievement-title">{quiz.title}</h4>
                      <p className="achievement-desc">{quiz.desc}</p>
                    </div>

                    <div className="achievement-right-stats">
                      {isCompleted ? (
                        <>
                          <div className="stats-badge highscore">
                            Highscore: {quizStats.highscore} / {quizStats.totalQuestions}
                          </div>
                          <div className="stats-badge count">
                            Completed {quizStats.completions} {quizStats.completions === 1 ? 'time' : 'times'}
                          </div>
                          <div className="stats-badge xp-bonus">
                            +{quizStats.lastXP} XP last
                          </div>
                        </>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default UserProfile;
