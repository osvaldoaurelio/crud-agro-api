import { Exclude, Expose, Transform } from 'class-transformer';
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
  plantingDate: Date;

  @Exclude()
  @Transform(({ obj }) => {
    const date = new Date(obj.plantingDate);
    return date.getFullYear();
  })
  harvest: number;
}
