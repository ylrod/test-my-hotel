import { Pipe, PipeTransform } from '@angular/core';
import normalizeString from '../utils/normalizeString';
import { DatePipe } from '@angular/common';
import { SearchProperty } from '../model/search-property.model';

@Pipe({
  name: 'searchMultiple'
})
export class searchMultiplePipe implements PipeTransform {

  constructor(private _datePipe: DatePipe) {

  }

  transform(array: any[] | null, textToSearch: string, properties: SearchProperty[]): any[] {
    if (!array || !textToSearch || !properties) {
      return array || [];
    }
    const normalizedTextToSearch = normalizeString(textToSearch);
    return array.filter(item =>
      properties.some(property => {
        let value = item[property.value];
        if (property.type === 'date') {
          value = this._datePipe.transform(value, 'M-d-yy, h:mm a');
        } else if (property.type === 'number') {
          value = value.toString();
        }
        return normalizeString(value).includes(normalizedTextToSearch);
      })
    );

  }

}
