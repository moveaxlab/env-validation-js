import { BaseErrorJSON, JSONData } from '../declarations';

export abstract class BaseError {
  protected name: string;

  protected value: JSONData;

  constructor(name: string, value: JSONData) {
    this.name = name;
    this.value = value;
  }

  abstract toJSON(): BaseErrorJSON;
}
