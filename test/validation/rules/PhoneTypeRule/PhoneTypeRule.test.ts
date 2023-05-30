import assert from 'assert';
import { PhoneType } from '../../../../src/validation/types/index';
import { PhoneTypeRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${PhoneTypeRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.PHONE,
    rules: [],
  };

  const testData = ['mobile'];
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new PhoneType(llschema);
  const rule = new PhoneTypeRule(type, testData, '');

  describe(`Checking supported types`, function() {
    it('check PhoneType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => element.name === PhoneType.name);
      assert(res);
    });

    it('check PhoneType is the only type supported', function() {
      assert(rule.supportedTypes().length === 1);
    });
  });

  describe(`Checking data`, function() {
    const data1 = '+393342523330';
    it(`check data ${data1} is supported in file type ${testData}`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = '+39069631811';
    it(`check data ${data2} is not supported in file type ${testData}`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
