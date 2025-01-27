import { removeNonNumeric, trimString } from './strings';

describe('string-utils', () => {
  it('removeNonNumeric should remove non-numeric characters', () => {
    expect(removeNonNumeric('123-456.789')).toBe('123456789');
    expect(removeNonNumeric('abc')).toBe('');
    expect(removeNonNumeric(123)).toBe(123);
    expect(removeNonNumeric(null)).toBe(null);
  });

  it('trimString should trim spaces from strings', () => {
    expect(trimString('  hello  ')).toBe('hello');
    expect(trimString('  world')).toBe('world');
    expect(trimString('test')).toBe('test');
    expect(trimString(123)).toBe(123);
    expect(trimString(null)).toBe(null);
  });
});
