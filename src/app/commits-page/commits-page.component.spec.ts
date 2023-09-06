
import { SpectatorRouting, createRoutingFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { GithubApiService } from '../api';
import { CommitsPageComponent } from './commits-page.component';

describe('CommitsPageComponent', () => {
  let spectator: SpectatorRouting<CommitsPageComponent>;

  const createComponent = createRoutingFactory({
    component: CommitsPageComponent,
    shallow: true,
    params: { repo: 'user/repo' },
    providers: [
      MockProvider(GithubApiService, {
        getCommits: () => of([{
          url: 'url',
          html_url: 'html_url',
          commit: {
            message: 'commit message',
            author: {
              name: 'author name'
            }
          }
        }])
      }),
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('render commit', () => {
    const [colAuthor, colMessage, colHref] = spectator.queryAll('div.row > div');

    expect(colAuthor).toContainText('author name');
    expect(colMessage).toContainText('commit message');
    expect(colHref).toHaveDescendant('a[href="html_url"]');
  });

  it('render blank message', () => {
    const api = spectator.inject(GithubApiService);

    spyOn(api, 'getCommits').and.returnValue(of({ blankMessage: 'blankMessage' }))
    spectator.setRouteParam('repo', 'error');

    expect(spectator.query('.border.rounded')).toContainText('blankMessage');
  });
});
