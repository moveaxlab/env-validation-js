import assert from 'assert';
import { StringType } from '../../../../src/validation/types/index';
import { MaxLengthRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${MaxLengthRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.STRING,
    rules: [],
  };

  const testData = ['5'];

  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new StringType(llschema);
  const rule = new MaxLengthRule(type, testData, '');

  describe(`Checking supported types`, function() {
    it('check StringType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => type instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = 'hello';

    it(`check data ${data1} is of length max ${testData}`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = 'worlds';
    it(`check data ${data2} is not of length max ${testData}`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
