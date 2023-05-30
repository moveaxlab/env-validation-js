import {
  JSONData,
  JSONDataArray,
  LowLevelSpec,
  LowLevelSpecArray,
  TypeNames,
} from '../declarations';
import { ArrayError } from '../errors/ArrayError';
import { NullableError } from '../errors/NullableError';
import { TypeError } from '../errors/TypeError';
import { ValidationError } from '../errors/ValidationError';
import { SequenceType, Type, TypeFactory } from './index';
import { BaseError } from '../errors/BaseError';

export class ArrayType extends SequenceType {
  protected nestedValidation: boolean = false;

  protected elements?: Type;

  constructor(spec: LowLevelSpec) {
    super(spec);
    if ('elements' in spec) {
      this.nestedValidation = true;

      const specArr = this.spec as LowLevelSpecArray;
      this.elements = TypeFactory.make(specArr.elements);
    }
  }

  name(): TypeNames {
    return TypeNames.ARRAY;
  }

  isNull(value: JSONData): boolean {
    return super.isNull(value) || (value as JSONDataArray).length === 0;
  }

  validate(value: JSONData): void {
    if (!this.nestedValidation) {
      return super.validate(value);
    }

    let arrayRuleErrors: BaseError[] = [];
    if (this.isNull(value)) {
      if (!this.nullable) {
        arrayRuleErrors = [new NullableError(value)];
      }
    }

    const elementsErrors: ValidationError[] = [];
    if (value != null) {
      const arrayValue = value as JSONDataArray;

      if (!this.validateType(value)) {
        throw new ArrayError([new TypeError(this.name(), value)], []);
      }

      arrayRuleErrors = [...arrayRuleErrors, ...this.validateRules(value)];
      const elements = this.elements as Type;

      arrayValue.forEach((e: JSONData) => {
        try {
          elements.validate(e);
        } catch (e) {
          elementsErrors.push(e as ValidationError);
        }
      });
    }

    if (arrayRuleErrors.length > 0 || elementsErrors.length > 0) {
      throw new ArrayError([...arrayRuleErrors], elementsErrors);
    }
  }

  protected validateType(value: JSONData): boolean {
    return Array.isArray(value);
  }
}
