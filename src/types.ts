export interface MemoryCard {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string; // URL or generated illustration
}

export interface LoveReason {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export type ThemeType = 'romantic-light' | 'romantic-dark';

export interface AppState {
  currentPage: number;
  unlockedMemories: string[]; // IDs of memories currently revealed
  theme: ThemeType;
  isMusicPlaying: boolean;
  isJourneyComplete: boolean;
}
