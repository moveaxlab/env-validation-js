import assert from 'assert';
import { FloatType } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${FloatType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.FLOAT,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const floatType = new FloatType(llschema);

  const data1: JSONData = 2.54;
  it(`check data ${data1} is not null`, function() {
    assert(!floatType.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      floatType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = '2.54';
  it(`check data "${data2}" is not valid`, function() {
    try {
      floatType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
