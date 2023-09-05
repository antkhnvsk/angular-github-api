export interface Repo {
  name: string;
}

export interface ReposResults {
  items: Repo[]
  total_count: number;
}