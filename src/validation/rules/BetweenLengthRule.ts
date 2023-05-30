import { JSONData, JSONDataArray, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { SequenceType, Type } from '../types';
import { Rule } from './Rule';

export class BetweenLengthRule extends Rule {
  private readonly minLen: number;

  private readonly maxLen: number;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);

    this.minLen = Number((this.params as string[])[0]);
    this.maxLen = Number((this.params as string[])[1]);
  }

  supportedTypes(): Array<typeof Type> {
    return [SequenceType];
  }

  ruleName(): RuleNames {
    return RuleNames.BETWEEN_LENGTH;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length !== 2) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    const params = this.params as string[];
    const data1 = Number(params[0]);
    const data2 = Number(params[1]);

    if (isNaN(data1) || isNaN(data2)) {
      throw new SpecError(`${data1} or ${data2} is not a number`);
    }
  }

  protected abides(data: JSONData): boolean {
    if (data === null || data === undefined) {
      return false;
    }

    const value = data as JSONDataArray | string;

    return this.minLen <= value.length && value.length <= this.maxLen;
  }
}
