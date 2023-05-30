import assert from 'assert';
import { StringType } from '../../../../src/validation/types/index';
import { BetweenLengthRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${BetweenLengthRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.STRING,
    rules: [],
  };

  const testData = ['3', '5'];
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new StringType(llschema);
  const rule = new BetweenLengthRule(type, testData, '');

  describe(`Checking supported types`, function() {
    it('check StringType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => type instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = 'abcd';

    it(`check data ${data1} is between length ${testData}`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = 'ab';
    it(`check data ${data2} is not between length ${testData}`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
