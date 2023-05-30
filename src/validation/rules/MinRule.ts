import { JSONData, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { FloatType, IntegerType, Type } from '../types';
import { Rule } from './Rule';

export class MinRule extends Rule {
  private readonly min: number;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.min = Number((this.params as string[])[0]);
  }

  supportedTypes(): Array<typeof Type> {
    return [FloatType, IntegerType];
  }

  ruleName(): RuleNames {
    return RuleNames.MIN;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length !== 1) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    const data = Number((this.params as string[])[0]);

    if (isNaN(data)) {
      throw new SpecError(`${this.params} is not a number`);
    }
  }

  protected abides(data: JSONData): boolean {
    if (data === null || data === undefined || isNaN(Number(data))) {
      return false;
    }

    const value = Number(data);

    return value >= this.min;
  }
}
