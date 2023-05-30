import { JSONData, RuleErrorJSON } from '../declarations';
import { BaseError } from './BaseError';

export class RuleError extends BaseError {
  private params?: string[];

  constructor(name: string, value: JSONData, params?: string[]) {
    super(name, value);
    this.params = params;
  }

  toJSON(): RuleErrorJSON {
    return {
      name: this.name,
      params: this.params,
      value: this.value,
    };
  }
}
