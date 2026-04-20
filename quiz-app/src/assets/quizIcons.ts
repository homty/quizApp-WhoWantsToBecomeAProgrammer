import reactIcon from "./quizSvg/react.svg";
import dockerIcon from "./quizSvg/docker.svg";
import gitIcon from "./quizSvg/git.svg";

export const QuizIcons = {
    react: reactIcon,
    docker: dockerIcon,
    git: gitIcon,
} as const;

export type QuizTopic = keyof typeof QuizIcons;