import assert from 'assert';
import { BooleanType } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${BooleanType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.BOOLEAN,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const booleanType = new BooleanType(llschema);

  const data1: JSONData = true;
  it(`check data ${data1} is not null`, function() {
    assert(!booleanType.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      booleanType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = 'hello';
  it(`check data "${data2}" is not valid`, function() {
    try {
      booleanType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
