import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposFilterComponent } from './repos-filter.component';

describe('ReposFilterComponent', () => {
  let component: ReposFilterComponent;
  let fixture: ComponentFixture<ReposFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReposFilterComponent]
    });
    fixture = TestBed.createComponent(ReposFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
