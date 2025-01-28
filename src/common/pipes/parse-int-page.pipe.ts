import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPagePipe implements PipeTransform {
  transform(value: any, { data }: ArgumentMetadata) {
    const MIN = 1;
    const MAX = 100_000;

    const intPageValue = parseInt(value, 10);

    if (isNaN(intPageValue) || intPageValue < MIN || intPageValue > MAX) {
      throw new BadRequestException(
        `The ${data} must be a number between ${MIN} and ${MAX}.`,
      );
    }

    return intPageValue;
  }
}
