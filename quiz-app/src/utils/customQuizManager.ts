import { type Question, type Difficulty } from '../assets/quizData.ts';

export interface CustomQuiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  color?: string;
  icon?: string;
}

const CUSTOM_QUIZZES_KEY = 'devquiz_custom_quizzes';

interface RawQuestion {
  id?: unknown;
  question?: unknown;
  options?: unknown;
  correctAnswer?: unknown;
  difficulty?: unknown;
}

export function validateQuestions(data: unknown): Question[] {
  if (!Array.isArray(data)) {
    throw new Error("Questions must be a JSON array.");
  }
  if (data.length === 0) {
    throw new Error("Questions array must contain at least one question.");
  }

  const validated: Question[] = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i] as RawQuestion | null | undefined;
    const qIndex = i + 1;

    if (!item || typeof item !== 'object') {
      throw new Error(`Question ${qIndex} is not a valid JSON object.`);
    }

    if (typeof item.question !== 'string' || item.question.trim() === '') {
      throw new Error(`Question ${qIndex} is missing a valid 'question' text.`);
    }

    if (!Array.isArray(item.options)) {
      throw new Error(`Question ${qIndex} is missing or has an invalid 'options' array.`);
    }

    if (item.options.length < 2) {
      throw new Error(`Question ${qIndex} must have at least 2 options.`);
    }

    for (let o = 0; o < item.options.length; o++) {
      if (typeof item.options[o] !== 'string' || (item.options[o] as string).trim() === '') {
        throw new Error(`Question ${qIndex}, Option ${o + 1} must be a non-empty string.`);
      }
    }

    if (typeof item.correctAnswer !== 'string' || item.correctAnswer.trim() === '') {
      throw new Error(`Question ${qIndex} is missing a valid 'correctAnswer' string.`);
    }

    const optionsArray = item.options as string[];
    const trimmedOptions = optionsArray.map((opt: string) => opt.trim());
    const trimmedCorrectAnswer = item.correctAnswer.trim();

    if (!trimmedOptions.includes(trimmedCorrectAnswer)) {
      throw new Error(
        `Question ${qIndex} correctAnswer "${trimmedCorrectAnswer}" must be one of its options: [${trimmedOptions.join(', ')}].`
      );
    }

    let difficulty: Difficulty = 'middle';
    if (item.difficulty === 'junior' || item.difficulty === 'middle' || item.difficulty === 'senior') {
      difficulty = item.difficulty;
    }

    validated.push({
      id: typeof item.id === 'number' ? item.id : qIndex,
      question: item.question.trim(),
      options: trimmedOptions,
      correctAnswer: trimmedCorrectAnswer,
      difficulty
    });
  }

  return validated;
}

export async function parseAndValidateJson(jsonText: string): Promise<Question[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "JSON syntax error";
    throw new Error(`Malformed JSON syntax: ${errMsg}`);
  }

  return validateQuestions(parsed);
}

export async function fetchQuestionsFromUrl(url: string): Promise<Question[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
    return validateQuestions(data);
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error("The request timed out after 12 seconds.");
    }
    const errMsg = err instanceof Error ? err.message : "Failed to fetch or parse questions from URL API.";
    throw new Error(errMsg);
  }
}

export function getCustomQuizzes(): CustomQuiz[] {
  try {
    const data = localStorage.getItem(CUSTOM_QUIZZES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse custom quizzes from localStorage", e);
    return [];
  }
}

export function saveCustomQuiz(
  title: string,
  description: string,
  questions: Question[],
  color?: string,
  icon?: string
): CustomQuiz {
  const quizzes = getCustomQuizzes();
  const id = `custom-${Date.now()}`;
  const newQuiz: CustomQuiz = {
    id,
    title: title.trim() || `Custom Quiz ${quizzes.length + 1}`,
    description: description.trim() || `Custom quiz with ${questions.length} questions.`,
    questions,
    color,
    icon
  };
  quizzes.push(newQuiz);
  localStorage.setItem(CUSTOM_QUIZZES_KEY, JSON.stringify(quizzes));
  return newQuiz;
}

export function deleteCustomQuiz(id: string): void {
  const quizzes = getCustomQuizzes();
  const filtered = quizzes.filter(q => q.id !== id);
  localStorage.setItem(CUSTOM_QUIZZES_KEY, JSON.stringify(filtered));

  try {
    const profileKey = 'devquiz_profile';
    const profileData = localStorage.getItem(profileKey);
    if (profileData) {
      const profile = JSON.parse(profileData);
      if (profile.completedQuizzes && profile.completedQuizzes[id]) {
        delete profile.completedQuizzes[id];
        localStorage.setItem(profileKey, JSON.stringify(profile));
      }
    }
  } catch (e) {
    console.error("Failed to clean up profile completion achievements for deleted quiz", e);
  }
}
