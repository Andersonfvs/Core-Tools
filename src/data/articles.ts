import articlesData from "./articles.json";

export interface Article {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  category: string;
  summary: string;
  content: string[];
}

export const ARTICLES: Article[] = articlesData as Article[];
