import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
class IsCpfOrCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return cpf.isValid(value) || cnpj.isValid(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid CPF or CNPJ.`;
  }
}

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCpfOrCnpj',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfOrCnpjConstraint,
    });
  };
}
