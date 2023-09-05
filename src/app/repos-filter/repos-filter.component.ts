import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, take } from 'rxjs';
import { SearchFilter } from '../models';
import { FilterStateService } from './filter-state.service';

const INPUT_DEBOUNCE_TIME = 500;

@Component({
  selector: 'app-repos-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './repos-filter.component.html',
  styleUrls: ['./repos-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposFilterComponent implements OnInit {
  form = this.fb.group({
    query: '',
    minStars: 0,
    language: '',
    searchScope: 'repos'
  } as SearchFilter);

  constructor(private fb: NonNullableFormBuilder, private destroyRef: DestroyRef, private filterStateService: FilterStateService) {
  }

  ngOnInit(): void {
    const scopeFC = this.form.controls.searchScope;

    scopeFC.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(scope => {
        if (scope == 'repos') {
          this.form.controls.minStars.enable();
          this.form.controls.language.enable();
        } else {
          this.form.controls.minStars.disable();
          this.form.controls.language.disable();
        }
      });

    this.filterStateService.state$
      .pipe(take(1))
      .subscribe(state => this.form.setValue(state));

    this.form.valueChanges
      .pipe(
        debounceTime(INPUT_DEBOUNCE_TIME),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.filterStateService.update(this.form.getRawValue()));
  }
}

