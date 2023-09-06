import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./app/app-routes";
import { GITHUB_API_HOST, GITHUB_AUTH_TOKEN } from "./app/app-tokens";
import { AppComponent } from "./app/app.component";
import { gitHubAuthInterceptor } from "./app/interceptors";
import { CUSTOM_GITHUB_AUTH_TOKEN } from "./environment";

bootstrapApplication(
  AppComponent,
  {
    providers: [
      provideRouter(APP_ROUTES),
      provideHttpClient(withInterceptors([gitHubAuthInterceptor])),
      { provide: GITHUB_API_HOST, useValue: 'https://api.github.com' },
      { provide: GITHUB_AUTH_TOKEN, useValue: CUSTOM_GITHUB_AUTH_TOKEN },
    ]
  })
  .catch(err => console.error(err));