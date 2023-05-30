import { TypeNames } from '../declarations';
import { Value } from '../types';
import { validate } from './validate';

function asUuid(
  name: string,
  value?: Value,
  rules: string | string[] = []
): string {
  const schema = {
    rules,
    type: TypeNames.UUID,
  };

  return validate(name, schema, value, '') as string;
}

export { asUuid };
