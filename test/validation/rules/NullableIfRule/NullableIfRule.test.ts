import assert from 'assert';
import { ObjectType } from '../../../../src/validation/types/index';
import { NullableIfRule } from '../../../../src/validation/rules/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${NullableIfRule.name} rule`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.OBJECT,
    rules: [],
    schema: {
      check: {
        type: TypeNames.BOOLEAN,
        rules: [],
      },
      field: {
        type: TypeNames.INTEGER,
        rules: [],
      },
    },
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const type = new ObjectType(llschema);
  const rule = new NullableIfRule(type, ['check', 'field'], '');

  describe(`Checking supported types`, function() {
    it('check ObjectType is supported', function() {
      const res = rule
        .supportedTypes()
        .find(element => type instanceof element);
      assert(res);
    });
  });

  describe(`Checking data`, function() {
    const data1 = { check: true, field: null };
    it(`check data {check:true, field:null} is valid`, function() {
      try {
        rule.apply(data1);
      } catch (e) {
        assert(false);
      }
    });

    const data2 = { check: false, field: null };
    it(`check data {check:false, field:null} is not valid`, function() {
      try {
        rule.apply(data2);
      } catch (e) {
        assert(true);
      }
    });
  });
});
