import assert from 'assert';
import { PhoneType } from '../../../../src/validation/types';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${PhoneType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.PHONE,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const phoneType = new PhoneType(llschema);

  const data1: JSONData = '+34611234569';
  it('should check swissnumber', function() {
    const swissSchema: HighLevelSpec = {
      type: TypeNames.PHONE,
      rules: ['phone_type:mobile'],
    };
    const swissLlschema: LowLevelSpec = SpecParser.parse(swissSchema);
    const swissPhoneType = new PhoneType(swissLlschema);
    const swissData: JSONData = '+41794626584';
    try {
      swissPhoneType.validate(swissData);
    } catch (e) {
      assert(false);
    }
  });

  it(`check data ${data1} is not null`, function() {
    assert(!phoneType.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      phoneType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = '22';
  it(`check data ${data2} is not valid`, function() {
    try {
      phoneType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
