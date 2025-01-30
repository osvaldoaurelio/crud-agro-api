import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ParseIntPagePipe } from './parse-int-page.pipe';

describe('ParseIntPagePipe', () => {
  const args = { data: 'page' } as ArgumentMetadata;

  let pipe: ParseIntPagePipe;

  beforeEach(() => {
    pipe = new ParseIntPagePipe();
  });

  it('should throw BadRequestException if value is not a number', () => {
    expect(() => pipe.transform('not-a-number', args)).toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if value is less than 1', () => {
    expect(() => pipe.transform(0, args)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if value is greater than 100000', () => {
    expect(() => pipe.transform(100001, args)).toThrow(BadRequestException);
  });

  it('should return value if it is a number between 1 and 100000', () => {
    const page = 5000;

    expect(pipe.transform(page, args)).toBe(page);
  });
});
