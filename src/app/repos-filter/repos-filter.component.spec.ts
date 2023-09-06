import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ReposFilterComponent } from './repos-filter.component';
import { FilterStateService } from './filter-state.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ReposFilterComponent', () => {
  let spectator: Spectator<ReposFilterComponent>;

  const createComponent = createComponentFactory({
    component: ReposFilterComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('submit form ', fakeAsync(() => {
    const filterStateService = spectator.inject(FilterStateService);
    spyOn(filterStateService, 'update');

    spectator.typeInElement('query', spectator.query('input[formControlName="query"]') as any);
    spectator.typeInElement('1', spectator.query('input[formControlName="minStars"]') as any);
    spectator.typeInElement('lang', spectator.query('input[formControlName="language"]') as any);
    spectator.selectOption(spectator.query('select[formControlName="searchScope"]') as any, 'issues');

    tick(1000);

    expect(filterStateService.update).toHaveBeenCalledWith({ query: 'query', minStars: 1, language: 'lang', searchScope: 'issues' });
  }));
});
