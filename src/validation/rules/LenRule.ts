import { JSONData, JSONDataArray, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { SequenceType, Type } from '../types';
import { Rule } from './Rule';

export class LenRule extends Rule {
  private readonly len: number;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.len = Number((this.params as string[])[0]);
  }

  supportedTypes(): Array<typeof Type> {
    return [SequenceType];
  }

  ruleName(): RuleNames {
    return RuleNames.LEN;
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
    if (data === null || data === undefined) {
      return false;
    }

    const value = data as JSONDataArray | string;

    return value.length === this.len;
  }
}
