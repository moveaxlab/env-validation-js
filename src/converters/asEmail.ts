import { TypeNames } from '../validation/declarations';
import { Value } from '../types';
import { validate } from './validate';

function asEmail(
  name: string,
  value?: Value,
  rules: string | string[] = []
): string {
  const schema = {
    rules,
    type: TypeNames.EMAIL,
  };

  return validate(name, schema, value, '') as string;
}

export { asEmail };
