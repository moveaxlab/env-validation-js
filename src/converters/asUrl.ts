import { TypeNames } from '../declarations';
import { Value } from '../types';
import { validate } from './validate';

function asUrl(
  name: string,
  value?: Value,
  rules: string | string[] = []
): string {
  const schema = {
    rules,
    type: TypeNames.URL,
  };

  return validate(name, schema, value, '') as string;
}

export { asUrl };
