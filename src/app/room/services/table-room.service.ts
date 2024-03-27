import { Injectable } from '@angular/core';
import { Room } from '../model/room.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslationService } from 'src/app/shared/services/translate.service';
import normalizeString from 'src/app/shared/utils/normalizeString';

@Injectable({
  providedIn: 'root'
})
export class TableRoomService {

  private simpleFields = ['number', 'description'];
  private translationFields = ['type', 'status'];

  constructor(private _datePipe: DatePipe,
    private _translateService: TranslationService,
    private _currencyPipe: CurrencyPipe) { }

  private matchesSimpleField = (data: Room, normalizedFilter: string) =>
    this.simpleFields.some((field: string) => {
      const value = data[field as keyof Room] as string | number;
      return normalizeString(value).includes(normalizedFilter);
    });

  private matchFieldTranslation = (data: Room, normalizedFilter: string) =>
    this.translationFields.some((field: string) => {
      const value = data[field as keyof Room] as string;
      return normalizeString(this._translateService.translate(value)).includes(normalizedFilter);
    });

  private matchesComplexField = (data: Room, normalizedFilter: string) =>
    normalizeString(this._datePipe.transform(data.createdAt, 'M-d-yy, h:mm a')).includes(normalizedFilter) ||
    normalizeString(data.features.join(', ')).includes(normalizedFilter) ||
    normalizeString(this._currencyPipe.transform(data.pricePerNight)).includes(normalizedFilter);

  public getTableRoomFilter = (data: Room, filter: string): boolean => {
    const normalizedFilter = normalizeString(filter);
    return this.matchesSimpleField(data, normalizedFilter) ||
      this.matchFieldTranslation(data, normalizedFilter) ||
      this.matchesComplexField(data, normalizedFilter);
  };

}
