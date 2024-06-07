import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateTime'
})
export class FormatearFechaPipe implements PipeTransform {

  transform(value: string, format: string = 'medium'): string {
    if (!value) return '';

    try {
      const date = new Date(value);
      return formatDate(date, format, 'en-US');
    } catch (error) {
      console.error('Invalid date:', value);
      return value;
    }
  }
}
