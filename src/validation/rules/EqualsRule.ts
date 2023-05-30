import { JSONData, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { StringType, Type } from '../types';
import { Rule } from './Rule';

export class EqualsRule extends Rule {
  private readonly value: string;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.value = (this.params as string[])[0];
  }

  supportedTypes(): Array<typeof Type> {
    return [StringType];
  }

  ruleName(): RuleNames {
    return RuleNames.EQUALS;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length !== 1) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    if (typeof (this.params as string[])[0] !== 'string') {
      throw new SpecError(`Invalid parameters ${this.params}`);
    }
  }

  protected abides(data: JSONData): boolean {
    return data === this.params![0];
  }
}
