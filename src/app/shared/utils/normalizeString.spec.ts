import normalizeString from "./normalizeString";

describe('normalizeString', () => {

  it('function should exist', () => {
    expect(normalizeString).toBeDefined();
  })

  it('should return empty string if value is null', () => {
    const result = normalizeString(null);
    expect(result).toEqual('');
  });

  it('should return empty string if value is empty', () => {
    const result = normalizeString('');
    expect(result).toEqual('');
  });

  it('should return normalized string', () => {
    const result = normalizeString('áéíóú');
    expect(result).toEqual('aeiou');
  });

  it('should return normalized string', () => {
    const result = normalizeString('ÁÉÍÓÚ');
    expect(result).toEqual('aeiou');
  });

  it('should return normalized string', () => {
    const result = normalizeString('ñ');
    expect(result).toEqual('n');
  });
});
