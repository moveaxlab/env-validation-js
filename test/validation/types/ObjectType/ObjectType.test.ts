import assert from 'assert';
import { ObjectType } from '../../../../src/validation/types/index';
import {
  LowLevelSpec,
  HighLevelSpec,
  JSONData,
  TypeNames,
} from '../../../../src/validation/declarations';
import { SpecParser } from '../../../../src/validation/parser/SpecParser';

describe(`Test ${ObjectType.name} subclass`, function() {
  const schema: HighLevelSpec = {
    type: TypeNames.OBJECT,
    rules: [],
    schema: {
      a: {
        type: TypeNames.STRING,
        rules: [],
      },
      b: {
        type: TypeNames.STRING,
        rules: [],
      },
    },
  };

  const llschema: LowLevelSpec = SpecParser.parse(schema);
  const objectType = new ObjectType(llschema);

  const data1: JSONData = {
    a: 'hello',
    b: 'world',
  };
  it(`check data {a:"hello",b:"world"} is not null`, function() {
    assert(!objectType.isNull(data1));
  });

  it(`check data {a:"hello",b:"world"} is valid`, function() {
    try {
      objectType.validate(data1);
    } catch (e) {
      assert(false);
    }
  });

  const data2: JSONData = {
    a: 'hello',
    b: false,
  };

  it(`check data {a:"hello",b:false} is not valid`, function() {
    try {
      objectType.validate(data2);
    } catch (e) {
      assert(true);
    }
  });
});
