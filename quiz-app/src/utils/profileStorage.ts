export interface QuizAchievement {
  highscore: number;
  totalQuestions: number;
  completions: number;
  lastXP: number;
}

export interface UserProfileData {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string | null;
  totalXP: number;
  completedQuizzes: Record<string, QuizAchievement>;
}

const STORAGE_KEY = 'devquiz_profile';

export const getProfile = (): UserProfileData | null => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (!serializedData) return null;
    return JSON.parse(serializedData) as UserProfileData;
  } catch (error) {
    console.error('Error parsing profile JSON:', error);
    return null;
  }
};

const saveProfile = (data: UserProfileData): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (error) {
    console.error('Error writing profile JSON:', error);
  }
};

export const initializeProfile = (
  username: string,
  name: string,
  avatarUrl: string,
  bio: string | null
): UserProfileData => {
  const newProfile: UserProfileData = {
    username,
    name,
    avatarUrl,
    bio,
    totalXP: 0,
    completedQuizzes: {}
  };
  saveProfile(newProfile);
  return newProfile;
};

export const isProfileInitialized = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};

export const recordQuizResult = (
  topic: string,
  score: number,
  totalQuestions: number,
  earnedXP: number
): UserProfileData | null => {
  const profile = getProfile();
  if (!profile) return null;

  profile.totalXP += earnedXP;

  const lowerTopic = topic.toLowerCase();
  if (!profile.completedQuizzes[lowerTopic]) {
    profile.completedQuizzes[lowerTopic] = {
      highscore: score,
      totalQuestions,
      completions: 1,
      lastXP: earnedXP
    };
  } else {
    const quizStats = profile.completedQuizzes[lowerTopic];
    quizStats.highscore = Math.max(quizStats.highscore, score);
    quizStats.totalQuestions = totalQuestions;
    quizStats.completions += 1;
    quizStats.lastXP = earnedXP;
  }

  saveProfile(profile);
  return profile;
};

export const clearProfile = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
