export type Feature = {
  mark: string;
  title: string;
  body: string;
};

export type Album = {
  catalog: string;
  title: string;
  year: string;
  format: string;
  blurb: string;
  tracks: string[];
  listenUrl: string;
};

export type Article = {
  date: string;
  title: string;
  excerpt: string;
  body: string[];
};

export type Band = {
  name: string;
  tagline: string;
};

export type PageContent = {
  band: Band;
  features: Feature[];
  albums: Album[];
  article: Article;
};