import assert from 'assert';
import { UuidType } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${UuidType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.UUID,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const uuidType = new UuidType(llschema);

  const data1: JSONData = '1ac7e8d2-d16d-4ef1-af22-c3f4a4544474';
  it(`check data ${data1} is not null`, function() {
    assert(!uuidType.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      uuidType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = 'adfkjloipq4ur9p834qjñuoew8u';
  it(`check data ${data2} is not valid`, function() {
    try {
      uuidType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
