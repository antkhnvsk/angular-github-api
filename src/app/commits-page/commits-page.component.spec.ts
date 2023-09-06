
import { Spectator, createRoutingFactory, } from '@ngneat/spectator';
import { GithubApiService } from '../api';
import { CommitsPageComponent } from './commits-page.component';
import { MockProvider, MockProviders } from 'ng-mocks';
import { of } from 'rxjs';
describe('CommitsPageComponent', () => {
  let spectator: Spectator<CommitsPageComponent>;

  const createComponent = createRoutingFactory({
    component: CommitsPageComponent,
    shallow: true,
    params: { repo: 'user/repo' },
    providers: [
      MockProvider(GithubApiService, { getCommits: () => of([]) }),
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
