import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { GithubApiService } from '../api/github-api.service';

@Component({
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposPageComponent {
  repos$ = this.githubApiService.searchReposByName('name');
  constructor(private githubApiService: GithubApiService) {

  }
}
