
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GITHUB_API_HOST, GITHUB_AUTH_TOKEN } from '../app-tokens';

export const gitHubAuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const githubApiHost = inject(GITHUB_API_HOST);
  const githubAuthToken = inject(GITHUB_AUTH_TOKEN);

  if (!request.url.startsWith(githubApiHost) || !githubAuthToken) {
    return next(request);
  }

  const headers = request.headers
    .set('Authorization', `Bearer ${githubAuthToken}`);

  const modifiedRequest = request.clone({ headers });

  return next(modifiedRequest);
};
