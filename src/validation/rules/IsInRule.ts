import { JSONData, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { Type } from '../types';
import { Rule } from './Rule';

export class IsInRule extends Rule {
  private readonly values: string[];

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.values = this.params as string[];
  }

  supportedTypes(): Array<typeof Type> {
    return [Type];
  }

  ruleName(): RuleNames {
    return RuleNames.IS_IN;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length <= 0) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    (this.params as string[]).forEach(element => {
      if (!(Object(element) instanceof String)) {
        throw new SpecError(`Parameter must be a string ${this.params}`);
      }
    });
  }

  protected abides(data: JSONData): boolean {
    if (data === null || data === undefined) {
      return false;
    } else {
      return this.values.includes(data.toString());
    }
  }
}
