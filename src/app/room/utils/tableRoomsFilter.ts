import normalizeString from "src/app/shared/utils/normalizeString";
import { Room } from "../model/room.model";
import { DatePipe } from "@angular/common";
import { TranslationService } from "src/app/shared/services/translate.service";

type TableRoomsFilterParams = {
  _datePipe: DatePipe;
  _translateService: TranslationService;
};

const simpleFields = ['number', 'description', 'id'];
const translationFields = ['type', 'status'];

const matchesSimpleField = (data: Room, normalizedFilter: string) =>
  simpleFields.some((field: string) => {
    const value = data[field as keyof Room] as string | number;
    return normalizeString(value).includes(normalizedFilter);
  });

const matchFieldTranslation = (data: Room, normalizedFilter: string, _translateService: TranslationService) =>
  translationFields.some((field: string) => {
    const value = data[field as keyof Room] as string;
    return normalizeString(_translateService.translate(value)).includes(normalizedFilter);
  });

const matchesComplexField = (data: Room, normalizedFilter: string, _datePipe: DatePipe) =>
  normalizeString(_datePipe.transform(data.createdAt, 'M-d-yy, h:mm a')).includes(normalizedFilter) ||
  normalizeString(data.features.join(', ')).includes(normalizedFilter);

export default ({ _datePipe, _translateService }: TableRoomsFilterParams) => (data: Room, filter: string): boolean => {
  const normalizedFilter = normalizeString(filter);
  return matchesSimpleField(data, normalizedFilter) ||
    matchFieldTranslation(data, normalizedFilter, _translateService) ||
    matchesComplexField(data, normalizedFilter, _datePipe);
};
