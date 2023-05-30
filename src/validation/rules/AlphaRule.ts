import { JSONData, RuleNames } from '../declarations';
import { Type, StringType } from '../types';
import { Rule } from './Rule';

export class AlphaRule extends Rule {
  supportedTypes(): Array<typeof Type> {
    return [StringType];
  }

  ruleName(): RuleNames {
    return RuleNames.ALPHA;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected sanitizeParams(): void {}

  protected abides(data: JSONData): boolean {
    const value = data as string;

    return /^[A-Za-z]+$/.test(value);
  }
}
