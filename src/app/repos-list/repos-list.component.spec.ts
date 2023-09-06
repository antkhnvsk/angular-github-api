import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposListComponent } from './repos-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('ReposListComponent', () => {
  let spectator: Spectator<ReposListComponent>;

  const createComponent = createComponentFactory({
    component: ReposListComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        results: { blankMessage: 'Mock' }
      }
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
