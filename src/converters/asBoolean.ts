import { TypeNames } from '../declarations';
import { Value } from '../types';
import { validate } from './validate';

function asBoolean(
  name: string,
  value?: Value,
  rules: string | string[] = []
): boolean {
  const schema = {
    rules,
    type: TypeNames.BOOLEAN,
  };
  if (typeof value === 'string') {
    if (/false/i.test(value)) {
      value = false;
    } else if (/true/i.test(value)) {
      value = true;
    } else {
      throw new Error(`Value given for variable ${name} is not valid.`);
    }
  }

  return validate(name, schema, value) as boolean;
}

export { asBoolean };
