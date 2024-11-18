import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstTitleCase',
  standalone: true,
})
export class FirstTitleCasePipe implements PipeTransform {
  transform(value: string): string {
    return value[0].toUpperCase() + value.slice(1);
  }
}
