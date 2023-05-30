import { TypeNames } from '../declarations';
import { Value } from '../types';
import { validate } from './validate';

function asBase64(
  name: string,
  value?: Value,
  rules: string | string[] = []
): string {
  const schema = {
    rules,
    type: TypeNames.BASE64,
  };

  return validate(name, schema, value, '') as string;
}

export { asBase64 };
