import reactIcon from "./quizSvg/react.svg";
import dockerIcon from "./quizSvg/docker.svg";
import gitIcon from "./quizSvg/git.svg";
import customIcon from "./quizSvg/custom.svg";

export const QuizIcons = {
    react: reactIcon,
    docker: dockerIcon,
    git: gitIcon,
    custom: customIcon,
} as const;

export type QuizTopic = keyof typeof QuizIcons;