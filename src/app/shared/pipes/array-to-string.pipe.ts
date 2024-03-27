import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translate.service';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {

  constructor(private _translateService: TranslationService) { }

  transform(value: string[], translate: boolean = true): string {
    if (translate) {
      return value.map((item: string) => this._translateService.translate(item)).join(', ');
    }
    return value.join(', ');
  }

}
