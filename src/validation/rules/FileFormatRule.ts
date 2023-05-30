import { JSONData, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { Base64EncodedFileType, Type } from '../types';
import { getFormat } from '../utils/Base64EncodedFileUtils';
import { Rule } from './Rule';

export class FileFormatRule extends Rule {
  private readonly formats: string[];

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.formats = this.params as string[];
  }

  supportedTypes(): Array<typeof Type> {
    return [Base64EncodedFileType];
  }

  ruleName(): RuleNames {
    return RuleNames.FILE_FORMAT;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length <= 0) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    (this.params as string[]).forEach(elem => {
      if (!(Object(elem) instanceof String)) {
        throw new SpecError(`Invalid parameters ${this.params}`);
      }
    });
  }

  protected abides(data: JSONData): boolean {
    const value = data as string;
    if (value) {
      return this.formats.includes(getFormat(value));
    } else {
      return false;
    }
  }
}
