import { JSONData, RuleNames } from '../declarations';
import { BooleanType, Type } from '../types';
import { Rule } from './Rule';

export class MustBeTrueRule extends Rule {
  supportedTypes(): Array<typeof Type> {
    return [BooleanType];
  }

  ruleName(): RuleNames {
    return RuleNames.MUST_BE_TRUE;
  }

  protected sanitizeParams(): void {
    return;
  }

  protected abides(data: JSONData): boolean {
    if (data === null || data === undefined) {
      return false;
    }

    return (data as boolean) && data === true;
  }
}
