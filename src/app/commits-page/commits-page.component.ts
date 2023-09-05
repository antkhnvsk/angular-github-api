import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { GithubApiService } from '../api';
import { BlankResults, Commit } from '../models';
import { CommitHashPipe } from '../pipes';

@Component({
  standalone: true,
  imports: [CommonModule, CommitHashPipe],
  templateUrl: './commits-page.component.html',
  styleUrls: ['./commits-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitsPageComponent {
  repo$ = this.activatedRoute.params.pipe(map((data) => decodeURIComponent(data['repo'])));
  commits$ = this.repo$.pipe(switchMap(repo => this.githubApiService.getCommits(repo)));

  constructor(private activatedRoute: ActivatedRoute, private githubApiService: GithubApiService) { }


  isBlank(results: Commit[] | BlankResults): BlankResults | null {
    return 'blankMessage' in results ? results : null;
  }

  isCommits(results: Commit[] | BlankResults): Commit[] | null {
    return !('blankMessage' in results) ? results : null;
  }
}
