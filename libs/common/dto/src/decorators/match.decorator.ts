import { ClassConstructor } from "class-transformer";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

export const Match = <T>(
  type: ClassConstructor<T>,
  property: (o: T) => NonNullable<unknown>,
  propertyDisplayName: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      constraints: [property, propertyDisplayName],
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: MatchConstraint,
    });
  };
};

@ValidatorConstraint({ name: "Match" })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: NonNullable<unknown>, args: ValidationArguments) {
    const [fn] = args.constraints;
    return fn(args.object) === value;
  }

  defaultMessage(args: ValidationArguments) {
    const [, displayName]: (() => NonNullable<unknown>)[] = args.constraints;
    return `${displayName} and ${args.property} does not match`;
  }
}
