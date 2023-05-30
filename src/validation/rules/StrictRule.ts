import { JSONData, JSONDataObject, RuleNames } from '../declarations';
import { Type, ObjectType } from '../types';
import { Rule } from './Rule';

export class StrictRule extends Rule {
  supportedTypes(): Array<typeof Type> {
    return [ObjectType];
  }

  ruleName(): RuleNames {
    return RuleNames.STRICT;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected sanitizeParams(): void {}

  protected abides(data: JSONData): boolean {
    const type = this.type as ObjectType;
    data = data as JSONDataObject;

    if (type.schema) {
      for (const key of Object.keys(data)) {
        if (!Object.keys(type.schema).includes(key)) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}
