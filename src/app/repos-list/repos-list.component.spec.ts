
import { SpectatorRouting, createRoutingFactory } from '@ngneat/spectator';
import { IssuesResults, ReposResults } from '../models';
import { ReposListComponent } from './repos-list.component';
import { DatePipe } from '@angular/common';
import { MockPipe } from 'ng-mocks';
import { NameFromUrlPipe } from '../pipes';
import { PipeTransform } from '@angular/core';

describe('ReposListComponent', () => {
  let spectator: SpectatorRouting<ReposListComponent>;

  const createComponent = createRoutingFactory({
    component: ReposListComponent,
    shallow: true,
    declarations: [
      MockPipe<PipeTransform>(DatePipe, n => n),
      MockPipe(NameFromUrlPipe, n => n)
    ]
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        results: { blankMessage: 'blank message' }
      }
    });
  });

  it('create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('render blank message', () => {
    expect(spectator.query('.border.rounded')).toContainText('blank message');
  });

  it('render repo result', () => {
    spectator.setInput('results', {
      total_count: 1,
      items: [{
        owner: { avatar_url: 'url' },
        full_name: 'name/repo',
        name: 'nname',
        created_at: 'date'
      }]
    } as ReposResults)

    const [colAva, colName, colDate] = spectator.queryAll('.repo > div');

    expect(colAva).toHaveDescendant('img[src="url"]');
    expect(colName).toContainText('name/repo');
    expect(colDate).toContainText('date');
  });

  it('render issue result', () => {
    spectator.setInput('results', {
      total_count: 1,
      items: [{
        repository_url: 'repo_url'
      }]
    } as IssuesResults)

    const link = spectator.query('.issue .col-12');

    expect(link).toContainText('repo_url');
  });
});
