import assert from 'assert';
import { IntegerType, FloatType } from '../../../../src/validation/types/index';
import { MinRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${MinRule.name} rule`, function() {
  const schema1: HighLevelSpec = {
    type: TypeNames.INTEGER,
    rules: [],
  };
  const schema2: HighLevelSpec = {
    type: TypeNames.FLOAT,
    rules: [],
  };

  const testData = ['10'];

  const llschema1: LowLevelSpec = SpecParser.parse(schema1);
  const llschema2: LowLevelSpec = SpecParser.parse(schema2);
  const intType = new IntegerType(llschema1);
  const floatType = new FloatType(llschema2);

  const rule = new MinRule(intType, testData, '');

  describe(`Checking supported types`, function() {
    it('check IntegerType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => intType instanceof element);
      assert(res);
    });

    it('check FloatType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => floatType instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = 15;

    it(`check data ${data1} is greater or equal than min ${testData}`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = 5;
    it(`check data ${data2} is not greater or equal than min ${testData}`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
