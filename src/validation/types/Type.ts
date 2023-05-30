import { JSONData, LowLevelSpec, TypeNames } from '../declarations';
import { NullableError } from '../errors/NullableError';
import { RuleError } from '../errors/RuleError';
import { TypeError } from '../errors/TypeError';
import { ValidationError } from '../errors/ValidationError';
import { Rule, RuleFactory } from '../rules';

export abstract class Type {
  protected rules: Rule[];

  protected nullable: boolean;

  protected spec: LowLevelSpec;

  constructor(spec: LowLevelSpec) {
    this.nullable = spec.nullable !== undefined ? spec.nullable : false;
    this.spec = spec;
    this.rules = [];

    this.rules = spec.rules.map(e =>
      RuleFactory.make(e.name, this, e.params, e.alias)
    );
  }

  abstract name(): TypeNames;

  isNull(value: JSONData): boolean {
    return value === null || value === undefined;
  }

  validate(value: JSONData): void {
    // Check nullable
    if (this.isNull(value)) {
      if (!this.nullable) {
        throw new ValidationError([new NullableError(value)]);
      }
    } else {
      // Check type
      if (!this.validateType(value)) {
        throw new ValidationError([new TypeError(this.name(), value)]);
      }

      // Check rules
      const errors = this.validateRules(value);
      if (errors.length > 0) {
        throw new ValidationError([...errors]);
      }
    }
  }

  protected abstract validateType(value: JSONData): boolean;

  protected validateRules(value: JSONData): RuleError[] {
    const errorList: RuleError[] = [];

    this.rules.forEach(rule => {
      try {
        rule.apply(value);
      } catch (e) {
        const ruleError: RuleError = new RuleError(
          rule.name(),
          value,
          rule.getFailureParams(value)
        );
        errorList.push(ruleError);
      }
    });

    return errorList;
  }
}
