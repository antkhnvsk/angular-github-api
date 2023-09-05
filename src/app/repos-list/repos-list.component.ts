import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnyResults, BlankResults, IssuesResults, Repo, ReposResults, SearchResults } from '../models';

@Component({
  selector: 'app-repos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposListComponent {
  @Input({ required: true }) results!: AnyResults;

  isBlank(results: AnyResults): BlankResults | null {
    if ('items' in results && results.items.length == 0) {
      return { blankMessage: 'No results found' };
    }
    return 'blankMessage' in results ? results : null;
  }

  isRepoResults(results: AnyResults): ReposResults | null {
    return 'items' in results && results.items.length && 'name' in results.items[0] ? results as ReposResults : null;
  }

  isIssuesResults(results: AnyResults): IssuesResults | null {
    return 'items' in results && results.items.length && !('name' in results.items[0]) ? results as IssuesResults : null;
  }
}
