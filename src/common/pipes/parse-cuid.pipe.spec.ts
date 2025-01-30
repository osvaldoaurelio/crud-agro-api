import { BadRequestException } from '@nestjs/common';
import { ParseCuidPipe } from './parse-cuid.pipe';

describe('ParseCuidPipe', () => {
  let pipe: ParseCuidPipe;

  beforeEach(() => {
    pipe = new ParseCuidPipe();
  });

  it('should throw BadRequestException if value is not a CUID', () => {
    expect(() => pipe.transform('invalid-cuid')).toThrow(BadRequestException);
  });

  it('should return value if it is a CUID', () => {
    const cuid = 'ckj1v3v7d0000y7l7z1v3v7d0';

    expect(pipe.transform(cuid)).toBe(cuid);
  });
});
