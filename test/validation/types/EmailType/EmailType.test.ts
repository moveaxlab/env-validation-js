import assert from 'assert';
import { EmailType } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${EmailType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.EMAIL,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const emailType = new EmailType(llschema);

  const data1: JSONData = 'contact@example.com';
  it(`check data ${data1} is not null`, function() {
    assert(!emailType.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      emailType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = 'example.com';
  it(`check data ${data2} is not valid`, function() {
    try {
      emailType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
