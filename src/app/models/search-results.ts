export interface Repo {
  name: string;
  full_name: string;
  owner: RepoOwner;
  created_at: string;
}

export interface RepoOwner {
  avatar_url: string;
}

export interface Issue {
  repository_url: string;
}

export interface SearchResults<T> {
  items: T[]
  total_count: number;
}

export interface BlankResults {
  blankMessage: string;
}

export type ReposResults = SearchResults<Repo>;

export type IssuesResults = SearchResults<Issue>;

export type AnyResults = ReposResults | IssuesResults | BlankResults;