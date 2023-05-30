import { JSONData, RuleNames } from '../declarations';
import { Type, StringType } from '../types';
import { Rule } from './Rule';

export class AlphaNumRule extends Rule {
  supportedTypes(): Array<typeof Type> {
    return [StringType];
  }

  ruleName(): RuleNames {
    return RuleNames.ALPHA_NUM;
  }

  protected sanitizeParams(): void {
    return;
  }

  protected abides(data: JSONData): boolean {
    const value = data as string;

    return /^[A-Za-z0-9]+$/.test(value);
  }
}
