import assert from 'assert';
import { UrlType } from '../../../../src/validation/types/index';
import {
  HighLevelSpec,
  LowLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${UrlType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.URL,
    rules: [],
  };
  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const urlType = new UrlType(llschema);

  const data1: JSONData = 'https://www.go.clickmeter.com/38w2?id1=123&id2=abc';
  it(`check data ${data1} is not null`, function() {
    assert(!urlType.isNull(data1));
  });

  it(`check data ${data1} is valid`, function() {
    try {
      urlType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2 = 'www.go.clickmeter.com/38w2?id1=123&id2=abc';
  it(`check data ${data2} is not valid`, function() {
    try {
      urlType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
