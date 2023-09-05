export interface Commit {
  url: string;
  commit: CommitInfo;
}

export interface CommitAuthor {
  name: string;
}

export interface CommitInfo {
  message: string
  author: CommitAuthor;
}