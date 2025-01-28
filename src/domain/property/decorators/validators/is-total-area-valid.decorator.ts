import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreatePropertyDto } from '../../dto/create-property-dto';

@ValidatorConstraint({ async: false })
class IsTotalAreaValidConstraint implements ValidatorConstraintInterface {
  validate(value: number, { object }: ValidationArguments) {
    const { arableArea, vegetationArea } = object as CreatePropertyDto;
    const totalArea = arableArea + vegetationArea;

    return value >= totalArea;
  }

  defaultMessage({ property }: ValidationArguments) {
    return `${property} area must be greater than or equal to the sum of arable area and vegetation area.`;
  }
}

export function IsTotalAreaValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTotalAreaValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTotalAreaValidConstraint,
    });
  };
}
