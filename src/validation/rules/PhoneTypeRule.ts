import { JSONData, RuleNames } from '../declarations';
import { SpecError } from '../errors/SpecError';
import { PhoneType, Type } from '../types';
import { Rule } from './Rule';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';

export class PhoneTypeRule extends Rule {
  private readonly phoneType: string;

  constructor(type: Type, params?: string[], alias?: string) {
    super(type, params, alias);
    this.phoneType = this.params![0];
  }

  supportedTypes(): Array<typeof Type> {
    return [PhoneType];
  }

  ruleName(): RuleNames {
    return RuleNames.PHONE_TYPE;
  }

  protected checkParams(): void {
    if (!this.params || this.params.length !== 1) {
      throw new SpecError(`Wrong number of parameters ${this.params}`);
    }

    this.sanitizeParams();
  }

  protected sanitizeParams(): void {
    if (!['mobile', 'landline'].includes(this.params![0])) {
      throw new SpecError(`Invalid parameters ${this.params}`);
    }
  }

  // eslint-disable-next-line complexity
  protected abides(data: JSONData): boolean {
    const value = data as string;
    const phone = parsePhoneNumberFromString(value);
    const type = phone.getType();

    switch (type) {
      case 'FIXED_LINE_OR_MOBILE':
        return true;
      case 'MOBILE':
        return this.phoneType === 'mobile';
      case 'FIXED_LINE':
        return this.phoneType === 'landline';
      case 'PAGER':
      case 'PERSONAL_NUMBER':
      case 'PREMIUM_RATE':
      case 'SHARED_COST':
      case 'TOLL_FREE':
      case 'UAN':
      case 'VOICEMAIL':
      case 'VOIP':
      default:
        return false;
    }
  }
}
