import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ReposResults } from '../models/repos';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private githubApiHost = 'https://api.github.com'; // todo: move out

  constructor(private httpClient: HttpClient) { }

  searchReposByName(name: string): Observable<ReposResults> {
    return this.httpClient.get(`${this.githubApiHost}/search/repositories`, {
      params: { q: name }
    }).pipe(tap(console.log))
  }
}