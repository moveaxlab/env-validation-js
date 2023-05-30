import { SpecError } from '../errors/SpecError';
import { Type } from '../types';
import {
  Rule,
  AlphaDashRule,
  AlphaNumRule,
  AlphaRule,
  BetweenLengthRule,
  BetweenRule,
  DecimalRule,
  EqualsRule,
  EqualsToRule,
  FileFormatRule,
  FileTypeRule,
  HexRule,
  IsInRule,
  LenRule,
  MaxLengthRule,
  MaxRule,
  MaxSizeRule,
  MinLengthRule,
  MinRule,
  MinSizeRule,
  MustBeTrueRule,
  NullableIfRule,
  RegexRule,
  RequiredRule,
  StrictRule,
  PhoneTypeRule,
} from './index';
import { RuleNames } from '../declarations';

export class RuleFactory {
  static readonly rules = {
    [RuleNames.ALPHA]: AlphaRule,
    [RuleNames.ALPHA_NUM]: AlphaNumRule,
    [RuleNames.ALPHA_DASH]: AlphaDashRule,
    [RuleNames.BETWEEN]: BetweenRule,
    [RuleNames.BETWEEN_LENGTH]: BetweenLengthRule,
    [RuleNames.DECIMAL]: DecimalRule,
    [RuleNames.EQUALS]: EqualsRule,
    [RuleNames.EQUALS_TO]: EqualsToRule,
    [RuleNames.FILE_FORMAT]: FileFormatRule,
    [RuleNames.FILE_TYPE]: FileTypeRule,
    [RuleNames.HEX]: HexRule,
    [RuleNames.IS_IN]: IsInRule,
    [RuleNames.LEN]: LenRule,
    [RuleNames.MAX_LENGTH]: MaxLengthRule,
    [RuleNames.MAX]: MaxRule,
    [RuleNames.MAX_SIZE]: MaxSizeRule,
    [RuleNames.MIN_LENGTH]: MinLengthRule,
    [RuleNames.MIN]: MinRule,
    [RuleNames.MIN_SIZE]: MinSizeRule,
    [RuleNames.MUST_BE_TRUE]: MustBeTrueRule,
    [RuleNames.NULLABLE_IF]: NullableIfRule,
    [RuleNames.PHONE_TYPE]: PhoneTypeRule,
    [RuleNames.REGEX]: RegexRule,
    [RuleNames.REQUIRED]: RequiredRule,
    [RuleNames.STRICT]: StrictRule,
  };

  static make(
    ruleName: RuleNames,
    type: Type,
    params?: string[],
    alias?: string
  ): Rule {
    const rule = RuleFactory.rules[ruleName];
    if (!rule) {
      throw new SpecError(`RuleFactory - rulename ${ruleName} does not exist`);
    }

    return new rule(type, params, alias);
  }
}
