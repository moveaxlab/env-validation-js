import { JSONData, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { Type, StringType } from '../types';
import { Rule } from './Rule';

export class RegexRule extends Rule {
  private readonly regex: RegExp;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.regex = new RegExp((this.params as string[])[0]);
  }

  supportedTypes(): Array<typeof Type> {
    return [StringType];
  }

  ruleName(): RuleNames {
    return RuleNames.REGEX;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length !== 1) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    const data = this.params && this.params[0];
    if (!(Object(data) instanceof String)) {
      throw new SpecError(`${data} is not a string`);
    }
  }

  protected abides(data: JSONData): boolean {
    const value = data as string;

    return this.regex.test(value);
  }
}
