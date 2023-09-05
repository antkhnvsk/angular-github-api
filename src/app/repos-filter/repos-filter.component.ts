import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SearchFilter } from '../models';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-repos-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './repos-filter.component.html',
  styleUrls: ['./repos-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposFilterComponent {
  form = this.fb.group({
    query: '',
    minStars: 0,
    language: '',
    searchScope: 'repos'
  } as SearchFilter);

  @Output() filterChange = new EventEmitter<SearchFilter>();

  constructor(private fb: NonNullableFormBuilder) {

    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntilDestroyed()
      )
      .subscribe(() => this.filterChange.emit(this.form.getRawValue()));
  }

}

