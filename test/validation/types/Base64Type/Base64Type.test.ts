import assert from 'assert';
import { Base64Type } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${Base64Type.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.BASE64,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const base64Type = new Base64Type(llschema);

  const data1: JSONData = 'aGVsbG8gd29ybGQ=';
  it(`check data ${data1} is not null`, function() {
    assert(!base64Type.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      base64Type.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = 'hel@lo';
  it(`check data "${data2}" is not valid`, function() {
    try {
      base64Type.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
