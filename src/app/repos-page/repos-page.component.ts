import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { GithubApiService } from '../api';
import { ReposFilterComponent } from '../repos-filter';
import { Observable, Subject, filter, startWith, switchMap } from 'rxjs';
import { AnyResults, BlankResults, IssuesResults, ReposResults, SearchFilter, SearchResults } from '../models';
import { ReposListComponent } from '../repos-list/repos-list.component';
import { FilterStateService } from '../repos-filter/filter-state.service';

const LOADING_TEXT = 'Loading...';
const INIT_TEXT = 'Customize your search to see results';

@Component({
  standalone: true,
  imports: [CommonModule, AsyncPipe, ReposFilterComponent, ReposListComponent],
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposPageComponent implements OnInit {
  results$!: Observable<AnyResults>;

  constructor(private githubApiService: GithubApiService, private filterStateService: FilterStateService) { }

  ngOnInit(): void {
    this.results$ = this.filterStateService.state$.pipe(
      switchMap(filter => {
        const search$: Observable<AnyResults> = filter.searchScope == 'repos'
          ? this.githubApiService.searchRepos(filter.query, filter.minStars, filter.language)
          : this.githubApiService.searchIssues(filter.query);

        return search$.pipe(startWith({ blankMessage: LOADING_TEXT }));
      }),
      startWith({ blankMessage: INIT_TEXT })
    );
  }
}
