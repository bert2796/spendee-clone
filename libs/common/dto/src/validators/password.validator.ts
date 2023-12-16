import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

export class StringUtilities {
  /**
   * Checks if a string contains uppercase letters
   * @param value The string value to test
   * @returns Returns true if it contains uppercase
   */
  static containsUpperCase(value: string): boolean {
    return /[A-Z]/.test(value);
  }

  /**
   * Checks if a string contains lowercase letters
   * @param value The string value to test
   * @returns Returns true if it contains lowercase
   */
  static containsLowerCase(value: string): boolean {
    return /[a-z]/.test(value);
  }

  /**
   * Checks if a string contains digit/number (0-9)
   * @param value The string value to test
   * @returns Returns true if it contains digit/number
   */
  static containsNumber(value: string): boolean {
    return /[0-9]/.test(value);
  }

  /**
   * Checks if a string contains special character [!#$%&'()*+,-./:;<=>?@[\]^_{|}~]
   * @param value The string value to test
   * @returns Returns true if it contains special character
   */
  static containsSpecialCharacter(value: string): boolean {
    return /[!#$%&'()*+,-./:;<=>?@[\]^_{|}~]/.test(value);
  }
}

export function IsPasswordValid(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      constraints: [property],
      name: "isLongerThan",
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        validate(value: string) {
          if (!value) {
            return false;
          }

          if (!StringUtilities.containsUpperCase(value)) return false;

          if (!StringUtilities.containsLowerCase(value)) return false;

          if (!StringUtilities.containsNumber(value)) return false;

          if (!StringUtilities.containsSpecialCharacter(value)) return false;

          return true; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}

@ValidatorConstraint({ async: false, name: "passwordValidation" })
export class PasswordValidation implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!value) {
      return false;
    }

    if (!StringUtilities.containsUpperCase(value)) return false;

    if (!StringUtilities.containsLowerCase(value)) return false;

    if (!StringUtilities.containsNumber(value)) return false;

    if (!StringUtilities.containsSpecialCharacter(value)) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    if (!value) {
      return "";
    }

    if (!StringUtilities.containsUpperCase(value)) return "Password must contain uppercase";

    if (!StringUtilities.containsLowerCase(value)) return "Password must contain lowercase";

    if (!StringUtilities.containsNumber(value)) return "Password must contain number";

    if (!StringUtilities.containsSpecialCharacter(value))
    return "Password must contain special characters";

    return "";
  }
}
