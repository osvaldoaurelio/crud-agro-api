import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';

@Exclude()
export class CreatePlantingDto {
  @Expose()
  @MaxLength(255)
  @MinLength(4)
  @IsString()
  cropName: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  plantingDate: Date;

  @Exclude()
  harvest: number;
}
