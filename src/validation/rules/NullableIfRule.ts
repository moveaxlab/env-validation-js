import { JSONData, JSONDataObject, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { ObjectType, Type } from '../types';
import { Rule } from './Rule';

export class NullableIfRule extends Rule {
  private readonly check: string;

  private readonly field: string;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);

    this.check = (this.params as string[])[0];
    this.field = (this.params as string[])[1];
  }

  supportedTypes(): Array<typeof Type> {
    return [ObjectType];
  }

  ruleName(): RuleNames {
    return RuleNames.NULLABLE_IF;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length !== 2) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    const params = this.params as string[];
    const data1 = params[0];
    const data2 = params[1];

    if (!data1 || !data2) {
      throw new SpecError(`Params must be strings ${this.params}`);
    }
  }

  protected abides(data: JSONData): boolean {
    const value = data as JSONDataObject;

    return value[this.check] === true ? true : !!value[this.field];
  }
}
