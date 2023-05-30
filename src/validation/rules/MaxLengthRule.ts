import { JSONData, JSONDataArray, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { SequenceType, Type } from '../types';
import { Rule } from './Rule';

export class MaxLengthRule extends Rule {
  private readonly maxLen: number;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.maxLen = Number((this.params as string[])[0]);
  }

  supportedTypes(): Array<typeof Type> {
    return [SequenceType];
  }

  ruleName(): RuleNames {
    return RuleNames.MAX_LENGTH;
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
    const value = data as JSONDataArray | string;

    return value.length <= this.maxLen;
  }
}
