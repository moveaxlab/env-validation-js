import assert from 'assert';
import { ISO8601DateType } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${ISO8601DateType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.FLOAT,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const dateType = new ISO8601DateType(llschema);

  const data1: JSONData = '2013-02-08 09:30:26';
  it(`check data ${data1} is not null`, function() {
    assert(!dateType.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      dateType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = '2013-02-08-10-35 09:30:26';
  it(`check data ${data2} is not valid`, function() {
    try {
      dateType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
