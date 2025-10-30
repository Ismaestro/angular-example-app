import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'firstTitleCase',
})
export class FirstTitleCasePipe implements PipeTransform {
  transform(value: string | undefined): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
