import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFromUrl',
  standalone: true
})
export class NameFromUrlPipe implements PipeTransform {
  transform(url: string, needEncode = false): any {
    const matches = /repos\/(.*)/g.exec(url);
    const name = matches?.[1] ?? '';

    return needEncode ? encodeURIComponent(name) : name;
  }
}