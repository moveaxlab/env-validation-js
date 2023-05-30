import assert from 'assert';
import { StringType } from '../../../../src/validation/types/index';
import { AlphaRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${AlphaRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.STRING,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new StringType(llschema);
  const rule = new AlphaRule(type, [], '');

  describe(`Checking supported types`, function() {
    it('check StringType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => element.name === StringType.name);
      assert(res);
    });

    it('check StringType is the only type supported', function() {
      assert(rule.supportedTypes().length === 1);
    });
  });

  describe(`Checking data`, function() {
    const data1 = 'abcd';

    it(`check data ${data1} is valid`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = 'abc123';
    it(`check data ${data2} is not valid`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
