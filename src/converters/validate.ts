import { ValidatorFactory } from '../validation';
import { Value } from '../types';
import { HighLevelSpec } from '../validation/declarations';

function validate(
  name: string,
  schema: HighLevelSpec,
  value?: Value,
  defaultValue?: Value
): Value | undefined {
  const validator = ValidatorFactory.make(schema);
  if (value === undefined) {
    value = defaultValue;
  }
  try {
    validator.validate(value);
  } catch (e) {
    throw new Error(
      `Value ${JSON.stringify(value)} given for variable ${name} is not valid.`
    );
  }

  return value;
}

export { validate };
