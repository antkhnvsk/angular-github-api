import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { BlankResults, IssuesResults, ReposResults } from '../models';

const ERROR_TEXT = 'Error! Please try again later or change your search conditions.';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private githubApiHost = 'https://api.github.com'; // todo: move out

  constructor(private httpClient: HttpClient) { }

  searchRepos(name: string, stars?: number, lang?: string): Observable<ReposResults | BlankResults> {
    const starsQuery = stars && stars > 0 ? `stars:>=${stars}` : '';
    const langQuery = lang ? `language:${lang}` : '';
    const q = `${name} ${starsQuery} ${langQuery}`;

    return this.httpClient.get(`${this.githubApiHost}/search/repositories`, {
      params: { q }
    }).pipe(tap(console.log), catchError(err => this.handleError(err)))
  }

  searchIssues(issue: string): Observable<IssuesResults | BlankResults> {
    return this.httpClient.get(`${this.githubApiHost}/search/issues`, {
      params: { q: issue }
    }).pipe(tap(console.log), catchError(err => this.handleError(err)))
  }

  private handleError(err: any): Observable<BlankResults> {
    return of({ blankMessage: err?.error?.message ?? err?.message ?? ERROR_TEXT })
  }
}