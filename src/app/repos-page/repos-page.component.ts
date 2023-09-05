import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposPageComponent {

}
