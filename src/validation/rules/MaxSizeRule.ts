import { JSONData, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { Base64EncodedFileType, Type } from '../types';
import { getSize } from '../utils/Base64EncodedFileUtils';
import { Rule } from './Rule';

export class MaxSizeRule extends Rule {
  private readonly maxSize: number;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.maxSize = Number((this.params as string[])[0]);
  }

  supportedTypes(): Array<typeof Type> {
    return [Base64EncodedFileType];
  }

  ruleName(): RuleNames {
    return RuleNames.MAX_SIZE;
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

    const value = data as string;

    return getSize(value) <= this.maxSize;
  }
}
