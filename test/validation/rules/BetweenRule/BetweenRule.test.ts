import assert from 'assert';
import { FloatType } from '../../../../src/validation/types/index';
import { BetweenRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${BetweenRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.FLOAT,
    rules: [],
  };

  const testData = ['3', '5'];
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new FloatType(llschema);
  const rule = new BetweenRule(type, testData, '');

  describe(`Checking supported types`, function() {
    it('check FloatType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => type instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = 4.8;

    it(`check data ${data1} is between ${testData}`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = 2.5;
    it(`check data ${data2} is not between ${testData}`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
