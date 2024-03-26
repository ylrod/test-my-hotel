import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private _translateService: TranslationService) { }

  transform(value: string,): string {
    return this._translateService.translate(value);
  }

}
