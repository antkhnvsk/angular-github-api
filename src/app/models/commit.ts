export interface Commit {
  url: string;
  commit: CommitInfo;
  html_url: string;
}

export interface CommitAuthor {
  name: string;
}

export interface CommitInfo {
  message: string
  author: CommitAuthor;
}