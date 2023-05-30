import assert from 'assert';
import { TypeFactory } from '../../../../src/validation/types';
import { TypeNames } from '../../../../src/validation/declarations';

describe(`Test TypeFactory`, function() {
  describe('check the type exists', function() {
    for (const key of Object.values(TypeNames)) {
      it(`checks that TypeFactory can make a type ${key}`, function() {
        assert.doesNotThrow(() =>
          TypeFactory.make({ type: key as TypeNames, rules: [] })
        );
      });
    }
  });
});
