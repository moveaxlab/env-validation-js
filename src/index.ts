import { getFromContainer } from './getFromContainer';
import { Value } from './types';
import { asType } from './declarations';

const envValidation = {
  get: (
    name: string,
    defaultValue?: Value
  ): {
    [key in asType]: (rules?: string | string[]) => string | boolean | number
  } => getFromContainer(process.env, name, defaultValue),
};

export { envValidation };
