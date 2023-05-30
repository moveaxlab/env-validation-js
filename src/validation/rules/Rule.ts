import { Type } from '../types';
import { JSONData, RuleNames } from '../declarations';
import { RuleError } from '../errors/RuleError';
import { SpecError } from '../errors/SpecError';

export abstract class Rule {
  params?: string[];

  protected type: Type;

  protected alias?: string;

  constructor(type: Type, params?: string[], alias?: string) {
    this.type = type;
    this.params = params;
    this.alias = alias;

    this.checkType();
    this.checkParams();
  }

  abstract supportedTypes(): Array<typeof Type>;

  abstract ruleName(): RuleNames;

  name(): string {
    return this.alias ? this.alias : this.ruleName();
  }

  apply(data: JSONData): void {
    if (!this.abides(data)) {
      throw new RuleError(this.name(), data, this.getFailureParams(data));
    }
  }

  // returns the params as an array of strings
  getFailureParams(_value: JSONData): string[] {
    return this.params ? this.params : [];
  }

  // Check that the Type is an instance of a subclass of the supported Types
  protected checkType(): void {
    if (!this.supportedTypes().find(t => this.type instanceof t)) {
      throw new SpecError(
        `Rule::checkType - The type ${
          this.type.constructor.name
        } is not an instance of subclass of supported Types`
      );
    }
  }

  // Should throw an exception if the parameters are not valid.
  // Otherwise it should store the parameters in a convenient format
  protected abstract sanitizeParams(): void;

  // Check that the number of parameters is correct
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected checkParams(): void {}

  // Should return true if and only if the rule is respected
  protected abstract abides(value: JSONData): boolean;
}
