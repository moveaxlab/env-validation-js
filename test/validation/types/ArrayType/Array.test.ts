import assert from 'assert';
import { ArrayType } from '../../../../src/validation/types/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${ArrayType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.ARRAY,
    rules: [],
    elements: {
      type: TypeNames.STRING,
      rules: [],
    },
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const arrayType = new ArrayType(llschema);

  const data1: JSONData = ['hello', 'bye'];
  it(`check data ${data1} is not null`, function() {
    assert(!arrayType.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      arrayType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = 'hel@lo';
  it(`check data "${data2}" is not valid`, function() {
    try {
      arrayType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
