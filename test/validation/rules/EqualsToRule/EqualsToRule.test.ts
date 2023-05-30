import assert from 'assert';
import { ObjectType } from '../../../../src/validation/types/index';
import { EqualsToRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${EqualsToRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.OBJECT,
    rules: [],
    schema: {
      key1: {
        type: TypeNames.INTEGER,
        rules: [],
      },
      key2: {
        type: TypeNames.INTEGER,
        rules: [],
      },
    },
  };

  const testData = ['m', 'n'];
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new ObjectType(llschema);
  const rule = new EqualsToRule(type, [...testData], '');

  describe(`Checking supported types`, function() {
    it('check Object is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => type instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = { m: 12, n: 12 };
    it(`check data {m:12, n:12} has fields ${testData.toString()} with the same value`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = { m: 12, n: 21 };
    it(`check data {m:12, n:21} has not fields ${testData.toString()} with the same value`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
