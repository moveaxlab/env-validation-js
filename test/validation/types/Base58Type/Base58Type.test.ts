import assert from 'assert';
import { Base58Type } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${Base58Type.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.BASE58,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const base58Type = new Base58Type(llschema);

  const data1: JSONData = 'aGVsbG8gd29y';
  it(`check data ${data1} is not null`, function() {
    assert(!base58Type.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      base58Type.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = 'hel@lo';
  it(`check data "${data2}" is not valid`, function() {
    try {
      base58Type.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
