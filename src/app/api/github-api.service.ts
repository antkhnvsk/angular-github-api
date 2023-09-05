import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BlankResults, Commit, IssuesResults, ReposResults } from '../models';
import { GITHUB_API_HOST } from '../app-tokens';

const ERROR_TEXT = 'Error! Please try again later or change your search conditions.';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  constructor(private httpClient: HttpClient, @Inject(GITHUB_API_HOST) private githubApiHost: string) { }

  searchRepos(name: string, stars?: number, lang?: string): Observable<ReposResults | BlankResults> {
    const nameQuery = name ? `${name} in:name` : '';
    const starsQuery = stars ? `stars:>=${stars}` : '';
    const langQuery = lang ? `language:${lang}` : '';
    const q = `${nameQuery} ${starsQuery} ${langQuery}`.trim();

    return this.httpClient.get<ReposResults>(`${this.githubApiHost}/search/repositories`, {
      params: { q }
    }).pipe(catchError(err => this.handleError(err)))
  }

  searchIssues(issue: string): Observable<IssuesResults | BlankResults> {
    return this.httpClient.get<IssuesResults>(`${this.githubApiHost}/search/issues`, {
      params: { q: issue }
    }).pipe(catchError(err => this.handleError(err)))
  }

  getCommits(ownerAndRepo: string): Observable<Commit[] | BlankResults> {
    return this.httpClient.get<Commit[]>(`${this.githubApiHost}/repos/${ownerAndRepo}/commits`).pipe(catchError(err => this.handleError(err)));
  }

  private handleError(err: any): Observable<BlankResults> {
    return of({
      blankMessage: err?.error?.message ?? err?.message ?? ERROR_TEXT
    })
  }
}