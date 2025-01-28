import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntLimitPipe implements PipeTransform {
  transform(value: any, { data }: ArgumentMetadata) {
    const MIN = 1;
    const MAX = 1_000;

    const intLimitValue = parseInt(value, 10);

    if (isNaN(intLimitValue) || intLimitValue < MIN || intLimitValue > MAX) {
      throw new BadRequestException(
        `The ${data} must be a number between ${MIN} and ${MAX}.`,
      );
    }

    return intLimitValue;
  }
}
