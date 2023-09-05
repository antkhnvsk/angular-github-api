import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { GithubApiService } from '../api';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commits-page.component.html',
  styleUrls: ['./commits-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitsPageComponent {
  repo$ = this.activatedRoute.params.pipe(map((data) => decodeURIComponent(data['repo'])));
  commits$ = this.repo$.pipe(switchMap(repo => this.githubApiService.commits(repo)));

  constructor(private activatedRoute: ActivatedRoute, private githubApiService: GithubApiService) { }
}
