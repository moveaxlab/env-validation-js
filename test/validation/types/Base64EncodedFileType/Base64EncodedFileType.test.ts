import assert from 'assert';
import { Base64EncodedFileType } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${Base64EncodedFileType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.BASE64_ENCODED_FILE,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const base64EncodedFileType = new Base64EncodedFileType(llschema);

  const data1: JSONData =
    'data:image/jpeg;base64,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';
  it(`check data ${data1.substr(0, 100)}...  is not null`, function() {
    assert(!base64EncodedFileType.isNull(data1));
  });

  it(`check data ${data1.substr(0, 100)}... is valid`, function() {
    try {
      base64EncodedFileType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = 'hel@lo';
  it(`check data "${data2.substr(0, 100)}..." is not valid`, function() {
    try {
      base64EncodedFileType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
