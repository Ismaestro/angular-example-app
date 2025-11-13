import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstTitleCase',
})
export class FirstTitleCasePipe implements PipeTransform {
  transform(value?: string | null): string {
    if (!value?.length) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
