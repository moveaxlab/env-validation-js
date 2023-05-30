import assert from 'assert';
import { StringType } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${StringType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.STRING,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const stringType = new StringType(llschema);

  const data1: JSONData = 'hello world';
  it(`check data ${data1} is not null`, function() {
    assert(!stringType.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      stringType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = 23;
  it(`check data ${data2} is not valid`, function() {
    try {
      stringType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
