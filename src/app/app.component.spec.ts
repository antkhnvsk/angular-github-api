import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    shallow: true,
    imports: [RouterTestingModule]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
