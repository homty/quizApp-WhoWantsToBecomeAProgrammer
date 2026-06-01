export interface RankDefinition {
  minXP: number;
  title: string;
  icon: string;
  desc: string;
}

export interface RankDetails {
  title: string;
  icon: string;
  desc: string;
  nextRankXP: number;
  progress: number;
}

export const ranks: RankDefinition[] = [
  {
    minXP: 1500,
    title: "Tech-founder",
    icon: "🚀",
    desc: "Building high-performance software systems and establishing the future of technology."
  },
  {
    minXP: 1200,
    title: "CTO",
    icon: "🌌",
    desc: "Defining modular code standardizations and driving system scaling strategies."
  },
  {
    minXP: 900,
    title: "Team Lead",
    icon: "👑",
    desc: "Directing code patterns, aligning repo merges, and mentoring engineers."
  },
  {
    minXP: 600,
    title: "Senior",
    icon: "🧙",
    desc: "Optimizing application packages, resolving strict errors, and designing schemas."
  },
  {
    minXP: 300,
    title: "Middle",
    icon: "💻",
    desc: "Writing clean modular components, testing code rules, and solving bugs."
  },
  {
    minXP: 100,
    title: "Junior",
    icon: "🛠️",
    desc: "Fixing console issues, building straightforward interfaces, and styling pages."
  },
  {
    minXP: 0,
    title: "Intern",
    icon: "👶",
    desc: "Writing primary variables, learning code loops, and adding documentation."
  }
];

export const calculateRank = (xp: number): RankDetails => {
  const currentRankIndex = ranks.findIndex(r => xp >= r.minXP);
  const currentRank = currentRankIndex !== -1 ? ranks[currentRankIndex] : ranks[ranks.length - 1];

  const nextRankIndex = currentRankIndex - 1;
  const nextRank = nextRankIndex >= 0 ? ranks[nextRankIndex] : null;

  let progress = 100;
  let nextRankXP = currentRank.minXP;

  if (nextRank) {
    nextRankXP = nextRank.minXP;
    const range = nextRank.minXP - currentRank.minXP;
    const earned = xp - currentRank.minXP;
    progress = Math.min(Math.round((earned / range) * 100), 100);
  } else {
    progress = 100;
    nextRankXP = currentRank.minXP;
  }

  return {
    title: currentRank.title,
    icon: currentRank.icon,
    desc: currentRank.desc,
    nextRankXP,
    progress
  };
};
