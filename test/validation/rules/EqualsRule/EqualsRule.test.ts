import assert from 'assert';
import { StringType } from '../../../../src/validation/types';
import { EqualsRule } from '../../../../src/validation/rules';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${EqualsRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.STRING,
    rules: [],
  };

  const testData = '12';

  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new StringType(llschema);
  const rule = new EqualsRule(type, [`${testData}`], '');

  describe(`Checking supported types`, function() {
    it('check IntegerType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => type instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = '12';

    it(`check data ${data1} is equals to ${testData}`, function() {
      assert.doesNotThrow(() => rule.apply(data1));
    });

    const data2 = '20';
    it(`check data ${data2} is not equals to ${testData}`, function() {
      assert.throws(() => rule.apply(data2));
    });
  });
});
