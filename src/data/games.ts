import source from '../../data/games.json';

export type Studio = {
  name: string;
  wordmark: string;
  tagline: string;
  taglineStatus: string;
  url: string;
  intro: string;
  authorName: string;
  authorUrl: string;
  about: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type Game = {
  slug: string;
  name: string;
  signature: string;
  url: string;
  urlStatus: string;
  pitch: string;
  genre: string;
  platform: string;
  controls: string;
  session?: string;
  playLabel: string;
  statusLabel: string;
};

export const studio: Studio = source.studio;
export const games: Game[] = source.games;
