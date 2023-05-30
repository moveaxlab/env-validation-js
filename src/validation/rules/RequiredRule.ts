import { JSONData, JSONDataObject, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { ObjectType, Type } from '../types';
import { Rule } from './Rule';

export class RequiredRule extends Rule {
  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);

    this.params = params as string[];
  }

  supportedTypes(): Array<typeof Type> {
    return [ObjectType];
  }

  ruleName(): RuleNames {
    return RuleNames.REQUIRED;
  }

  getFailureParams(value: JSONData): string[] {
    const valueKeys = Object.keys(value as JSONDataObject);

    return this.params!.filter(p => !valueKeys.includes(p));
  }

  protected checkParams(): void {
    if (!this.params || this.params.length <= 0) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    const data = this.params as string[];

    data.forEach(e => {
      if (!(Object(e) instanceof String)) {
        throw new SpecError(`${data} is not a string`);
      }
    });
  }

  protected abides(data: JSONData): boolean {
    const objectData = data as JSONDataObject;
    const fields = this.params as string[];

    for (const field of fields) {
      if (objectData[field] === undefined) {
        return false;
      }
    }

    return true;
  }
}
