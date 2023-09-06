
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GithubApiService } from '../api';
import { BlankResults } from '../models';
import { ReposFilterComponent } from '../repos-filter';
import { ReposListComponent } from '../repos-list/repos-list.component';
import { ReposPageComponent } from './repos-page.component';

describe('ReposPageComponent', () => {
  let spectator: Spectator<ReposPageComponent>;

  const createComponent = createComponentFactory({
    component: ReposPageComponent,
    shallow: true,
    mocks: [GithubApiService]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('render filter', () => {
    const filter = spectator.query(ReposFilterComponent);

    expect(filter).toBeTruthy();
  });

  it('render repos list', () => {
    const reposList = spectator.query(ReposListComponent);

    expect(reposList).toBeTruthy();
    expect((reposList?.results as BlankResults).blankMessage).toBe('Customize your search to see results')
  });
});
