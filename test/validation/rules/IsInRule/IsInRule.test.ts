import assert from 'assert';
import { IntegerType } from '../../../../src/validation/types/index';
import { IsInRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${IsInRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.INTEGER,
    rules: [],
  };

  const testData = ['20', '40', '60'];

  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new IntegerType(llschema);
  const rule = new IsInRule(type, testData, '');

  describe(`Checking supported types`, function() {
    it('check IntegerType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => type instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = 20;

    it(`check data ${data1} is in ${testData}`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = 10;
    it(`check data ${data2} is not in ${testData}`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
