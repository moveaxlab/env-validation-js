import { JSONData, JSONDataObject, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { ObjectType, Type } from '../types';
import { Rule } from './Rule';

export class EqualsToRule extends Rule {
  private readonly field1: string;

  private readonly field2: string;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.field1 = (this.params as string[])[0];
    this.field2 = (this.params as string[])[1];
  }

  supportedTypes(): Array<typeof Type> {
    return [ObjectType];
  }

  ruleName(): RuleNames {
    return RuleNames.EQUALS_TO;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length !== 2) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    // TODO: check that type has fields
    const data1 = (this.params as string[])[0];
    const data2 = (this.params as string[])[1];

    if (
      !(Object(data1) instanceof String) ||
      !(Object(data2) instanceof String)
    ) {
      throw new SpecError(`Invalid parameters ${this.params}`);
    }
  }

  protected abides(data: JSONData): boolean {
    if (data === null || data === undefined) {
      return false;
    }

    const obj = data as JSONDataObject;

    return obj[this.field1 as string] === obj[this.field2 as string];
  }
}
