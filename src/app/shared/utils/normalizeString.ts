export default function normalizeString(value: string | number | null): string {
  if (!value) {
    return '';
  }
  return (value + '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n');
}
