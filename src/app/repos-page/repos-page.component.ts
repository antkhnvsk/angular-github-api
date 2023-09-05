import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { GithubApiService } from '../api';
import { ReposFilterComponent } from '../repos-filter';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { AnyResults, BlankResults, IssuesResults, ReposResults, SearchFilter, SearchResults } from '../models';
import { ReposListComponent } from '../repos-list/repos-list.component';

const LOADING_TEXT = 'Loading...';
const INIT_TEXT = 'Clarify filter to start search';

@Component({
  standalone: true,
  imports: [CommonModule, AsyncPipe, ReposFilterComponent, ReposListComponent],
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposPageComponent implements OnInit {
  private filter$ = new Subject<SearchFilter>();
  results$!: Observable<AnyResults>;

  constructor(private githubApiService: GithubApiService) { }

  ngOnInit(): void {
    this.results$ = this.filter$.pipe(
      switchMap(filter => {
        const search$: Observable<AnyResults> = filter.searchScope == 'repos'
          ? this.githubApiService.searchRepos(filter.query, filter.minStars, filter.language)
          : this.githubApiService.searchIssues(filter.query);

        return search$.pipe(startWith({ blankMessage: LOADING_TEXT }));
      }),
      startWith({ blankMessage: INIT_TEXT })
    );
  }

  filterChange(filter: SearchFilter) {
    this.filter$.next(filter)
  }
}
