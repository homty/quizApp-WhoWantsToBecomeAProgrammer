// src/data/quizData.ts

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const DockerQuiz: Question[] = [
  {
    id: 1,
    question: "What is the main purpose of a Docker Image?",
    options: [
      "A running instance of a container",
      "A read-only template used to create containers",
      "A tool to orchestrate multiple containers",
      "A virtual machine hardware profile"
    ],
    correctAnswer: "A read-only template used to create containers"
  },
  {
    id: 2,
    question: "Which command is used to start a new container from an image?",
    options: ["docker start", "docker build", "docker run", "docker create"],
    correctAnswer: "docker run"
  },
  {
    id: 3,
    question: "What is a Dockerfile?",
    options: [
      "A script containing commands to assemble an image",
      "A log file of container activity",
      "A configuration file for Docker Desktop",
      "A list of running containers"
    ],
    correctAnswer: "A script containing commands to assemble an image"
  },
  {
    id: 4,
    question: "How do you stop a running container?",
    options: ["docker stop <id>", "docker kill -all", "docker remove <id>", "docker exit"],
    correctAnswer: "docker stop <id>"
  },
  {
    id: 5,
    question: "What is Docker Hub?",
    options: [
      "A local storage for images",
      "The Docker command-line interface",
      "A public registry for sharing container images",
      "A tool for monitoring CPU usage"
    ],
    correctAnswer: "A public registry for sharing container images"
  }
];

export const ReactQuiz: Question[] = [
  {
    id: 1,
    question: "What is React?",
    options: ["A JavaScript library for building user interfaces", "A server-side language", "A database management system", "An operating system"],
    correctAnswer: "A JavaScript library for building user interfaces"
  }
];

export const GitQuiz: Question[] = [
  {
    id: 1,
    question: "What is Git?",
    options: ["A distributed version control system", "A cloud storage service", "A code editor", "A programming language"],
    correctAnswer: "A distributed version control system"
  }
];