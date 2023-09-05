import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./app/app-routes";
import { provideHttpClient } from "@angular/common/http";
import { GITHUB_API_HOST } from "./app/app-tokens";

bootstrapApplication(
  AppComponent,
  {
    providers: [
      provideRouter(APP_ROUTES),
      provideHttpClient(),
      { provide: GITHUB_API_HOST, useValue: 'https://api.github.com' }
    ]
  })
  .catch(err => console.error(err));