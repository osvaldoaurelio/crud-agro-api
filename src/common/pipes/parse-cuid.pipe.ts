import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isCuid } from 'cuid';

@Injectable()
export class ParseCuidPipe implements PipeTransform {
  transform(value: string) {
    if (typeof value !== 'string' || !isCuid(value)) {
      throw new BadRequestException(`Invalid CUID: ${value}`);
    }

    return value;
  }
}
