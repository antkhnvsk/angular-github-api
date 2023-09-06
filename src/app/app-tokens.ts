import { InjectionToken } from "@angular/core";

export const GITHUB_API_HOST = new InjectionToken<string>('githubApiHost');
export const GITHUB_AUTH_TOKEN = new InjectionToken<string>('Github Auth Token');