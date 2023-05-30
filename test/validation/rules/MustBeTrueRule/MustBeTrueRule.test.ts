import assert from 'assert';
import { BooleanType } from '../../../../src/validation/types/index';
import { MustBeTrueRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${MustBeTrueRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.BOOLEAN,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new BooleanType(llschema);
  const rule = new MustBeTrueRule(type, [], '');

  describe(`Checking supported types`, function() {
    it('check BooleanType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => type instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = true;

    it(`check data ${data1} is valid`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = false;
    it(`check data ${data2} is not valid`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
