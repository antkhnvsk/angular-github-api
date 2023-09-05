import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFromUrl',
  standalone: true
})
export class NameFromUrlPipe implements PipeTransform {
  transform(url: string): any {
    const matches = /repos\/(.*)/g.exec(url);

    return matches?.[1] ?? url;
  }
}