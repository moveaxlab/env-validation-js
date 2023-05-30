import { Decimal } from 'decimal.js';
import { JSONData, RuleNames } from '../declarations';
import { Type, StringType } from '../types';
import { Rule } from './Rule';

export class DecimalRule extends Rule {
  supportedTypes(): Array<typeof Type> {
    return [StringType];
  }

  ruleName(): RuleNames {
    return RuleNames.DECIMAL;
  }

  protected sanitizeParams(): void {
    return;
  }

  protected abides(data: JSONData): boolean {
    try {
      const value = data as string | number;
      new Decimal(value);

      return true;
    } catch (e) {
      return false;
    }
  }
}
