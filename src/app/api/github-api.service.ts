import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IssuesResults, ReposResults } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private githubApiHost = 'https://api.github.com'; // todo: move out

  constructor(private httpClient: HttpClient) { }

  searchRepos(name: string, stars?: number, lang?: string): Observable<ReposResults> {
    const starsQuery = stars && stars > 0 ? `stars:>=${stars}` : '';
    const langQuery = lang ? `language:${lang}` : '';
    const q = `${name} ${starsQuery} ${langQuery}`;

    return this.httpClient.get(`${this.githubApiHost}/search/repositories`, {
      params: { q }
    }).pipe(tap(console.log))
  }

  searchIssues(issue: string): Observable<IssuesResults> {
    return this.httpClient.get(`${this.githubApiHost}/search/issues`, {
      params: { q: issue }
    }).pipe(tap(console.log))
  }

}