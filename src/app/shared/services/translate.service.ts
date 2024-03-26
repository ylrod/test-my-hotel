import { Injectable } from '@angular/core';
import translations from './translations';
import { Translation } from '../model/translation.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: Translation = translations;

  constructor() { }

  translate(term: string, lang: string = 'es'): string {
    return this.translations[lang as keyof Translation][term as keyof Translation[typeof lang]] || term;
  }
}
