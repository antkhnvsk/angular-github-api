export interface SearchFilter {
  query: string;
  minStars: number;
  language: string;
  searchScope: SearchScope;
}

export type SearchScope = 'repos' | 'issues';