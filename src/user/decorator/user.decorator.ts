import { UnauthorizedException } from '@nestjs/common';
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export const IsEmailAlreadyExist =
  (validationOptions?: ValidationOptions) =>
  (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsEmailAlreadyExist',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        async validate(
          value: string,
          validationArguments?: ValidationArguments,
        ) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const isEmail = emailRegex.test(value);

          if (!isEmail)
            throw new UnauthorizedException('사용할 수 없는 이메일입니다.');

          return true;
        },
      },
    });
  };

export const IsNameAlreadyExist =
  (validationOptions?: ValidationOptions) =>
  (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsNameAlreadyExist',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        async validate(
          value: string,
          validationArguments?: ValidationArguments,
        ) {
          const nameRegex = /^[가-힣a-zA-Z0-9]{3,14}$/;
          const isName = nameRegex.test(value);

          if (!isName)
            throw new UnauthorizedException('사용할 수 없는 이름입니다.');

          return true;
        },
      },
    });
  };

export const IsPassword =
  (validationOptions?: ValidationOptions) =>
  (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, validationArguments?: ValidationArguments) {
          const passwordRegex = /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,18}/;
          const isPassword = passwordRegex.test(value);

          if (!isPassword)
            throw new UnauthorizedException('사용할 수 없는 비밀번호입니다.');

          return true;
        },
      },
    });
  };
