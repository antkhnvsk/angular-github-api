
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { GithubApiService } from './github-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GITHUB_API_HOST } from '../app-tokens';

describe('GithubApiService', () => {
  let spectator: SpectatorService<GithubApiService>;
  const createService = createServiceFactory({
    service: GithubApiService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: GITHUB_API_HOST, useValue: '' }]
  });

  beforeEach(() => spectator = createService());

  it('loading commits', () => {
    let result;
    spectator.service.getCommits('abc').subscribe(res => result = res);
    expect(result).toBeFalsy();
  });
});
