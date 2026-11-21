import source from '../../data/games.json';

export type Studio = {
  name: string;
  wordmark: string;
  tagline: string;
  taglineStatus: string;
  url: string;
};

export type Game = {
  slug: string;
  name: string;
  signature: string;
  url: string | null;
  urlStatus: string;
  notes?: string;
};

export const studio: Studio = source.studio;
export const games: Game[] = source.games;
