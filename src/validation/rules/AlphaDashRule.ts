import { StringType, Type } from '../types';
import { Rule } from './Rule';
import { JSONData, RuleNames } from '../declarations';

export class AlphaDashRule extends Rule {
  supportedTypes(): Array<typeof Type> {
    return [StringType];
  }

  ruleName(): RuleNames {
    return RuleNames.ALPHA_DASH;
  }

  protected sanitizeParams(): void {
    return;
  }

  protected abides(data: JSONData): boolean {
    const value = data as string;

    return /^[A-Za-z0-9-_]+$/.test(value);
  }
}
