import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { take } from 'rxjs';
import { FilterStateService } from './filter-state.service';

describe('FilterStateService', () => {
  let spectator: SpectatorService<FilterStateService>;

  const createService = createServiceFactory({
    service: FilterStateService,
  });

  beforeEach(() => spectator = createService());

  it('doesn`t return initial empty state', () => {
    let state: any = 'untouched';
    spectator.service.state$.pipe(take(1)).subscribe(s => state = s).unsubscribe();
    expect(state).toBe('untouched');
  });

  it('update state', () => {
    let state: any = 'untouched';

    spectator.service.update({ language: '', minStars: 0, query: '', searchScope: 'repos' });
    spectator.service.state$.pipe(take(1)).subscribe(s => state = s).unsubscribe();

    expect(state).toEqual({ language: '', minStars: 0, query: '', searchScope: 'repos' });
  });
});
