import assert from 'assert';
import { RuleFactory } from '../../../../src/validation/rules';
import { RuleNames, TypeNames } from '../../../../src/validation/declarations';
import {
  Base64EncodedFileType,
  BooleanType,
  IntegerType,
  ObjectType,
  PhoneType,
  StringType,
  TypeFactory,
} from '../../../../src/validation/types';

const ruleType: { [key in RuleNames]: TypeNames } = {
  [RuleNames.ALPHA]: StringType.prototype.name(),
  [RuleNames.ALPHA_NUM]: StringType.prototype.name(),
  [RuleNames.ALPHA_DASH]: StringType.prototype.name(),
  [RuleNames.BETWEEN]: IntegerType.prototype.name(),
  [RuleNames.BETWEEN_LENGTH]: StringType.prototype.name(),
  [RuleNames.DECIMAL]: StringType.prototype.name(),
  [RuleNames.EQUALS]: StringType.prototype.name(),
  [RuleNames.EQUALS_TO]: ObjectType.prototype.name(),
  [RuleNames.FILE_FORMAT]: Base64EncodedFileType.prototype.name(),
  [RuleNames.FILE_TYPE]: Base64EncodedFileType.prototype.name(),
  [RuleNames.HEX]: StringType.prototype.name(),
  [RuleNames.IS_IN]: StringType.prototype.name(),
  [RuleNames.LEN]: StringType.prototype.name(),
  [RuleNames.MAX_LENGTH]: StringType.prototype.name(),
  [RuleNames.MAX]: IntegerType.prototype.name(),
  [RuleNames.MAX_SIZE]: Base64EncodedFileType.prototype.name(),
  [RuleNames.MIN_LENGTH]: StringType.prototype.name(),
  [RuleNames.MIN]: IntegerType.prototype.name(),
  [RuleNames.MIN_SIZE]: Base64EncodedFileType.prototype.name(),
  [RuleNames.MUST_BE_TRUE]: BooleanType.prototype.name(),
  [RuleNames.NULLABLE_IF]: ObjectType.prototype.name(),
  [RuleNames.PHONE_TYPE]: PhoneType.prototype.name(),
  [RuleNames.REGEX]: StringType.prototype.name(),
  [RuleNames.REQUIRED]: ObjectType.prototype.name(),
  [RuleNames.STRICT]: ObjectType.prototype.name(),
};

const ruleParams: { [key in RuleNames]: string[] } = {
  [RuleNames.ALPHA]: [],
  [RuleNames.ALPHA_NUM]: [],
  [RuleNames.ALPHA_DASH]: [],
  [RuleNames.BETWEEN]: ['1', '2'],
  [RuleNames.BETWEEN_LENGTH]: ['1', '2'],
  [RuleNames.DECIMAL]: [],
  [RuleNames.EQUALS]: ['a'],
  [RuleNames.EQUALS_TO]: ['a', 'b'],
  [RuleNames.FILE_FORMAT]: ['jpeg'],
  [RuleNames.FILE_TYPE]: ['image'],
  [RuleNames.HEX]: [],
  [RuleNames.IS_IN]: ['a', 'b'],
  [RuleNames.LEN]: ['1'],
  [RuleNames.MAX_LENGTH]: ['1'],
  [RuleNames.MAX]: ['1'],
  [RuleNames.MAX_SIZE]: ['1'],
  [RuleNames.MIN_LENGTH]: ['1'],
  [RuleNames.MIN]: ['1'],
  [RuleNames.MIN_SIZE]: ['1'],
  [RuleNames.MUST_BE_TRUE]: [],
  [RuleNames.NULLABLE_IF]: ['a', 'b'],
  [RuleNames.PHONE_TYPE]: ['mobile'],
  [RuleNames.REGEX]: ['^d$'],
  [RuleNames.REQUIRED]: ['a', 'b'],
  [RuleNames.STRICT]: [],
};

describe(`Test RuleFactory`, function() {
  describe('Check rules factory', function() {
    for (const key of Object.values(RuleNames) as RuleNames[]) {
      it(`checks the key for ${key}`, function() {
        const type = TypeFactory.make({ type: ruleType[key], rules: [] });
        assert.doesNotThrow(() => RuleFactory.make(key, type, ruleParams[key]));
      });
    }
  });
});
