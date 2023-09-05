export interface Repo {
  name: string;
}

export interface Issue {
  repository_url: string;
}

export interface SearchResults<T> {
  items: T[]
  total_count: number;
}

export type ReposResults = SearchResults<Repo>;

export type IssuesResults = SearchResults<Issue>;
