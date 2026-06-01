import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeProfile } from '../../utils/profileStorage.ts';
import './profileSetup.css';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = usernameInput.trim();
    if (!cleanUsername) return;

    setLoading(true);
    setError(null);

    try {
      const userResponse = await fetch(`https://api.github.com/users/${cleanUsername}`);

      if (userResponse.status === 404) {
        throw new Error('GitHub account not found! Double check your username spelling.');
      } else if (userResponse.status === 403) {
        throw new Error('GitHub API rate limit exceeded! Please try again later.');
      } else if (!userResponse.ok) {
        throw new Error('Failed to connect to GitHub. Please check your network.');
      }

      const userData = await userResponse.json();

      initializeProfile(
        userData.login,
        userData.name || userData.login,
        userData.avatar_url,
        userData.bio || null
      );

      navigate('/home');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during setup.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-container">
      <span className="persistent-logo" onClick={() => navigate('/home')}>DevQuiz</span>

      <div className="setup-island animate-fade-in">
        <h1 className="setup-title">Setup Developer Profile</h1>
        <p className="setup-description">
          Enter your GitHub username to link your profile, evaluate your battle ranks, synchronize repository statistics, and save your quiz XP level to local storage.
        </p>

        <form onSubmit={handleSetupSubmit} className="setup-form">
          <div className={`setup-input-group ${error ? 'has-error' : ''}`}>
            <span className="setup-at-prefix">@</span>
            <input
              type="text"
              placeholder="github_username"
              className="setup-username-input"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              disabled={loading}
            />
          </div>
          <button type="submit" className="setup-submit-btn" disabled={loading}>
            {loading ? 'Analyzing...' : 'Link Account'}
          </button>
        </form>

        {error && (
          <div className="setup-error-box">
            <svg viewBox="0 0 24 24" width="16" height="16" className="error-icon">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
