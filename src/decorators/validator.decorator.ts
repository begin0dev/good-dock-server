import { registerDecorator } from 'class-validator';
import * as dayjs from 'dayjs';

export function IsDayjs() {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'IsDayJs',
      target: object.constructor,
      validator: {
        validate(value: any): Promise<boolean> | boolean {
          return value instanceof dayjs;
        },
      },
    });
  };
}
