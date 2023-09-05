import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter } from 'rxjs';
import { SearchFilter } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  private filterSubject = new BehaviorSubject<SearchFilter | null>(null);

  state$ = this.filterSubject.asObservable().pipe(filter(Boolean), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)));

  update(filter: SearchFilter) {
    this.filterSubject.next(filter);
  }
}
