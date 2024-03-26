import { DatePipe } from '@angular/common';
import { searchMultiplePipe } from './search-multiple.pipe';

describe('searchMultiplePipe', () => {
  const data = [
    {
      "name": "Tarjetas de crédito",
      "description": "Tarjeta de consumo bajo la modalidad de credito",
      "date_release": "2023-02-01T00:00:00.000+00:00",
      "date_revision": "2024-02-01T00:00:00.000+00:00"
    },
    {
      "name": "Tarjetas debito",
      "description": "Tarjeta debito usuarios",
      "date_release": "2023-03-01T00:00:00.000+00:00",
      "date_revision": "2024-03-01T00:00:00.000+00:00"
    }
  ];

  const properties = [
    {
      value: 'name',
      type: 'string'
    },
    {
      value: 'description',
      type: 'string'
    },
    {
      value: 'date_release',
      type: 'date'
    },
    {
      value: 'date_revision',
      type: 'date'
    }
  ]
  it('create an instance', () => {
    const pipe = new searchMultiplePipe(new DatePipe('en-US'));
    expect(pipe).toBeTruthy();
  });

  it('should return an empty array if empty array given', () => {
    const pipe = new searchMultiplePipe(new DatePipe('en-US'));
    const result = pipe.transform([], 'search', []);
    expect(result).toEqual([]);
  });

  it('should return same array if no text to search', () => {
    const pipe = new searchMultiplePipe(new DatePipe('en-US'));
    const result = pipe.transform(data, '', []);
    expect(result).toEqual(data);
  });

  it('should return filtered array when checking string', () => {
    const pipe = new searchMultiplePipe(new DatePipe('en-US'));
    const result = pipe.transform(data, 'Tarjetas de credito', properties);
    expect(result).toEqual([data[0]]);
  });

  it('should return filtered array when checking date', () => {
    const pipe = new searchMultiplePipe(new DatePipe('en-US'));
    const result = pipe.transform(data, '02/2023', properties);
    expect(result).toEqual([data[1]]);
  });
});
