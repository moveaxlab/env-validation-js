import assert from 'assert';
import { ObjectType } from '../../../../src/validation/types/index';
import { StrictRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${StrictRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.OBJECT,
    rules: [],
    schema: {
      m: {
        type: TypeNames.STRING,
        rules: [],
      },
    },
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new ObjectType(llschema);
  const rule = new StrictRule(type, ['m'], '');

  describe(`Checking supported types`, function() {
    it('check ObjectType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => type instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = { m: 'hello' };

    it(`check data {m:"hello"} is valid`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = { m: '' };
    it(`check data {m:""} is not valid`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
