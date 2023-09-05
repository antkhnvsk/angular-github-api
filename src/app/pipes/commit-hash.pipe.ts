import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commitHash',
  standalone: true
})
export class CommitHashPipe implements PipeTransform {
  transform(url: string): any {
    const [hash] = url.split('/').reverse();
    return hash;
  }
}