import { JSONData, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { FloatType, IntegerType, Type } from '../types';
import { Rule } from './Rule';

export class BetweenRule extends Rule {
  private readonly min: number;

  private readonly max: number;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.min = Number((this.params as string[])[0]);
    this.max = Number((this.params as string[])[1]);
  }

  supportedTypes(): Array<typeof Type> {
    return [FloatType, IntegerType];
  }

  ruleName(): RuleNames {
    return RuleNames.BETWEEN;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length !== 2) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    const data1 = Number((this.params as string[])[0]);
    const data2 = Number((this.params as string[])[1]);

    if (isNaN(data1) || isNaN(data2)) {
      throw new SpecError(`${data1} or ${data2} is not a number`);
    }
  }

  protected abides(data: JSONData): boolean {
    if (data === null || data === undefined) {
      return false;
    }

    return this.min <= data && data <= this.max;
  }
}
