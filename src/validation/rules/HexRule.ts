import { JSONData, RuleNames } from '../declarations';
import { Type, StringType } from '../types';
import { Rule } from './Rule';

export class HexRule extends Rule {
  supportedTypes(): Array<typeof Type> {
    return [StringType];
  }

  ruleName(): RuleNames {
    return RuleNames.HEX;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected sanitizeParams(): void {}

  protected abides(data: JSONData): boolean {
    const value = data as string;

    if (value === null || value === undefined) {
      return false;
    }

    return /^[A-Fa-f0-9]+$/.test(value);
  }
}
