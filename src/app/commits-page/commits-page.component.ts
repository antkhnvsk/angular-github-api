import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commits-page.component.html',
  styleUrls: ['./commits-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitsPageComponent {
  repo$ = this.ac.params.pipe(map((data) => decodeURIComponent(data['repo'])));
  constructor(private ac: ActivatedRoute) { }
}
