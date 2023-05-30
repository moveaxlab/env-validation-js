import { JSONData, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { Base64EncodedFileType, Type } from '../types';
import { getType } from '../utils/Base64EncodedFileUtils';
import { Rule } from './Rule';

export class FileTypeRule extends Rule {
  private readonly fileType: string;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.fileType = (this.params as string[])[0];
  }

  supportedTypes(): Array<typeof Type> {
    return [Base64EncodedFileType];
  }

  ruleName(): RuleNames {
    return RuleNames.FILE_TYPE;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length !== 1) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    const data = (this.params as string[])[0];
    if (!(Object(data) instanceof String)) {
      throw new SpecError(`Parameter must be a string ${this.params}`);
    }
  }

  protected abides(data: JSONData): boolean {
    const value = data as string;
    if (value) {
      return (this.fileType as string) === getType(value);
    } else {
      return false;
    }
  }
}
