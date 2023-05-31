import { Value } from '../types';
import { validate } from './validate';
import { TypeNames } from '../validation/declarations';

function asBase58(
  name: string,
  value?: Value,
  rules: string | string[] = []
): string {
  const schema = {
    rules,
    type: TypeNames.BASE58,
  };

  return validate(name, schema, value, '') as string;
}

export { asBase58 };
