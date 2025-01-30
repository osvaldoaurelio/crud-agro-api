import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ParseIntLimitPipe } from './parse-int-limit.pipe';

describe('ParseIntLimitPipe', () => {
  const args = { data: 'limit' } as ArgumentMetadata;

  let pipe: ParseIntLimitPipe;

  beforeEach(() => {
    pipe = new ParseIntLimitPipe();
  });

  it('should throw BadRequestException if value is not a number', () => {
    expect(() => pipe.transform('not-a-number', args)).toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if value is less than 1', () => {
    expect(() => pipe.transform(0, args)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if value is greater than 1000', () => {
    expect(() => pipe.transform(1001, args)).toThrow(BadRequestException);
  });

  it('should return value if it is a number between 1 and 1000', () => {
    const limit = 500;

    expect(pipe.transform(limit, args)).toBe(limit);
  });
});
