import {
  asBase58,
  asBase64,
  asBoolean,
  asEmail,
  asFloat,
  asInteger,
  asISO8601Date,
  asString,
  asUrl,
  asUuid,
} from './converters';
import { asType } from './declarations';
import { Value } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getFromContainer(
  container: NodeJS.ProcessEnv,
  name: string,
  defaultValue?: Value
) {
  let value = defaultValue;
  if (name in container) {
    value = container[name];
  }

  return {
    [asType.Base58]: (rules: string | string[] = []) =>
      asBase58(name, value, rules),
    [asType.Base64]: (rules: string | string[] = []) =>
      asBase64(name, value, rules),
    [asType.Boolean]: (rules: string | string[] = []) =>
      asBoolean(name, value, rules),
    [asType.Email]: (rules: string | string[] = []) =>
      asEmail(name, value, rules),
    [asType.Float]: (rules: string | string[] = []) =>
      asFloat(name, value, rules),
    [asType.ISO8601Date]: (rules: string | string[] = []) =>
      asISO8601Date(name, value, rules),
    [asType.Integer]: (rules: string | string[] = []) =>
      asInteger(name, value, rules),
    [asType.String]: (rules: string | string[] = []) =>
      asString(name, value, rules),
    [asType.Url]: (rules: string | string[] = []) => asUrl(name, value, rules),
    [asType.Uuid]: (rules: string | string[] = []) =>
      asUuid(name, value, rules),
  };
}

export { getFromContainer };
