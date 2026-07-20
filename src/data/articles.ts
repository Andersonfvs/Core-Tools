import articlesData from "./articles.json";

export interface Article {
  slug: string;
  title: string;
  date: string;
  dateISO?: string;
  readingTime: string;
  category: string;
  summary: string;
  content: string[];
  author?: {
    name: string;
    role: string;
    bio?: string;
  };
}

export const ARTICLES: Article[] = articlesData as any[];
