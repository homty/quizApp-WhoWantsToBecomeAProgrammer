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
  },
  {
    id: 6,
    question: "What is the primary use of Docker Volumes?",
    options: [
      "To increase container CPU limits",
      "To persist data generated and used by containers",
      "To network multiple containers together",
      "To store older versions of a Docker image"
    ],
    correctAnswer: "To persist data generated and used by containers"
  },
  {
    id: 7,
    question: "Which tool is used to define and run multi-container Docker applications?",
    options: ["Docker Swarm", "Docker Machine", "Docker Compose", "Docker Hub"],
    correctAnswer: "Docker Compose"
  },
  {
    id: 8,
    question: "Which command lists all running containers?",
    options: ["docker list", "docker ps", "docker images", "docker run -ls"],
    correctAnswer: "docker ps"
  },
  {
    id: 9,
    question: "How do you completely remove an image from your local system?",
    options: ["docker rm <image_id>", "docker clean <image_id>", "docker rmi <image_id>", "docker delete <image_id>"],
    correctAnswer: "docker rmi <image_id>"
  },
  {
    id: 10,
    question: "What does the -p flag do in a 'docker run' command?",
    options: [
      "Maps a host port to a container port",
      "Assigns a persistent volume",
      "Sets the container to privileged mode",
      "Provides a custom name to the container"
    ],
    correctAnswer: "Maps a host port to a container port"
  }
];

export const ReactQuiz: Question[] = [
  {
    id: 1,
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces", 
      "A server-side framework", 
      "A database management system", 
      "An operating system"
    ],
    correctAnswer: "A JavaScript library for building user interfaces"
  },
  {
    id: 2,
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON X-style",
      "JavaScript X-Node"
    ],
    correctAnswer: "JavaScript XML"
  },
  {
    id: 3,
    question: "What is the main difference between state and props?",
    options: [
      "Props are mutable, state is immutable",
      "State is passed from a parent, props are managed locally",
      "State is mutable and local, props are immutable and passed down",
      "There is no difference; they are interchangeable"
    ],
    correctAnswer: "State is mutable and local, props are immutable and passed down"
  },
  {
    id: 4,
    question: "Which hook is used to perform side effects in a functional component?",
    options: ["useState", "useEffect", "useReducer", "useContext"],
    correctAnswer: "useEffect"
  },
  {
    id: 5,
    question: "What is the Virtual DOM?",
    options: [
      "A direct copy of the database",
      "A lightweight in-memory representation of the actual DOM",
      "A browser extension for debugging React",
      "A separate server that handles UI rendering"
    ],
    correctAnswer: "A lightweight in-memory representation of the actual DOM"
  },
  {
    id: 6,
    question: "What does the useState hook return?",
    options: [
      "An object with state properties",
      "A single value containing the current state",
      "An array with the current state value and a function to update it",
      "A boolean indicating if the component has mounted"
    ],
    correctAnswer: "An array with the current state value and a function to update it"
  },
  {
    id: 7,
    question: "Why are keys required when rendering lists in React?",
    options: [
      "To style list items automatically",
      "To prevent components from rendering twice",
      "To help React identify which items have changed, been added, or removed",
      "To sort the list items alphabetically"
    ],
    correctAnswer: "To help React identify which items have changed, been added, or removed"
  },
  {
    id: 8,
    question: "What is the React Context API used for?",
    options: [
      "To share data globally across the component tree without prop drilling",
      "To manage local component state securely",
      "To handle HTTP requests in React",
      "To replace Redux entirely"
    ],
    correctAnswer: "To share data globally across the component tree without prop drilling"
  },
  {
    id: 9,
    question: "What is a React Fragment (<></>) used for?",
    options: [
      "To apply CSS styles to multiple children",
      "To render elements conditionally based on state",
      "To group multiple elements without adding an extra node to the DOM",
      "To create reusable component templates"
    ],
    correctAnswer: "To group multiple elements without adding an extra node to the DOM"
  },
  {
    id: 10,
    question: "Which hook is used to access a DOM element directly?",
    options: ["useRef", "useEffect", "useDOM", "useMemo"],
    correctAnswer: "useRef"
  }
];

export const GitQuiz: Question[] = [
  {
    id: 1,
    question: "What is Git?",
    options: [
      "A distributed version control system", 
      "A cloud storage service", 
      "A code editor", 
      "A programming language"
    ],
    correctAnswer: "A distributed version control system"
  },
  {
    id: 2,
    question: "What does the 'git commit' command do?",
    options: [
      "Pushes changes to a remote server",
      "Records changes to the repository's history",
      "Adds new files to the staging area",
      "Merges two branches together"
    ],
    correctAnswer: "Records changes to the repository's history"
  },
  {
    id: 3,
    question: "Which command uploads local repository content to a remote repository?",
    options: ["git upload", "git send", "git push", "git commit -remote"],
    correctAnswer: "git push"
  },
  {
    id: 4,
    question: "What is the primary difference between 'git merge' and 'git rebase'?",
    options: [
      "Merge deletes the old branch, rebase keeps it",
      "Rebase is only for remote branches, merge is for local",
      "Merge creates a new commit keeping history intact, rebase rewrites history for a linear path",
      "There is no difference, they are aliases"
    ],
    correctAnswer: "Merge creates a new commit keeping history intact, rebase rewrites history for a linear path"
  },
  {
    id: 5,
    question: "Which command shows the working tree status?",
    options: ["git check", "git log", "git status", "git branch"],
    correctAnswer: "git status"
  },
  {
    id: 6,
    question: "How do you create a local copy of an existing remote repository?",
    options: ["git copy <url>", "git duplicate <url>", "git fetch <url>", "git clone <url>"],
    correctAnswer: "git clone <url>"
  },
  {
    id: 7,
    question: "What does 'git stash' do?",
    options: [
      "Deletes all uncommitted changes",
      "Temporarily saves modified tracked files without committing them",
      "Hides a branch from the commit history",
      "Compresses older commits to save space"
    ],
    correctAnswer: "Temporarily saves modified tracked files without committing them"
  },
  {
    id: 8,
    question: "What two commands does 'git pull' essentially combine?",
    options: [
      "git fetch and git merge",
      "git commit and git push",
      "git add and git commit",
      "git branch and git checkout"
    ],
    correctAnswer: "git fetch and git merge"
  },
  {
    id: 9,
    question: "What is the purpose of the .gitignore file?",
    options: [
      "To list developers who are not allowed to commit",
      "To specify intentionally untracked files that Git should ignore",
      "To store deleted files temporarily",
      "To disable Git entirely in specific directories"
    ],
    correctAnswer: "To specify intentionally untracked files that Git should ignore"
  },
  {
    id: 10,
    question: "How do you switch to an existing branch named 'feature-auth'?",
    options: [
      "git move feature-auth",
      "git switch feature-auth",
      "git branch feature-auth",
      "git go feature-auth"
    ],
    correctAnswer: "git switch feature-auth"
  }
];