import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposPageComponent } from './repos-page.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GithubApiService } from '../api';

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

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
