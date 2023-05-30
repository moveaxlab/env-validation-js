import assert from 'assert';
import fs from 'fs';
import { ValidatorFactory } from '../../src/validation';
import { turnArraysToSets } from './test_utils';
import { UTest } from './test_declarations';
import { ValidationError } from '../../src/validation/errors/ValidationError';
const file = fs.readFileSync('./validation-test-vectors/vectors.json', 'utf8');
const { specs, strict }: UTest = JSON.parse(file) as UTest;

describe('Test specs', function() {
  for (const spec of specs) {
    describe(`test spec ${spec.spec.type}`, function() {
      let dataIdx = 1;
      for (const data of spec.success) {
        it(`runs spec on data ${dataIdx}`, function() {
          try {
            const type = ValidatorFactory.make(spec.spec);
            type.validate(data);
          } catch (e) {
            assert(false);
          }
        });
        dataIdx += 1;
      }
      dataIdx = 1;
      for (const testData of spec.failure) {
        it(`fails to run spec on data ${dataIdx}`, function() {
          try {
            const type = ValidatorFactory.make(spec.spec);
            console.log(testData.data);
            console.log(spec.spec);
            console.log(testData.failing);
            type.validate(testData.data);
            assert(false);
          } catch (e) {
            console.log(e);
            const computed = turnArraysToSets((e as ValidationError).toJSON());
            const expected = turnArraysToSets(testData.failing);
            assert.deepStrictEqual(computed, expected);
          }
        });
        dataIdx += 1;
      }
    });
  }
});

describe('Test strict validation', function() {
  for (const spec of strict) {
    describe(`test spec ${spec.spec} for strict validation`, function() {
      let dataIdx = 1;
      for (const data of spec.success) {
        it(`runs strict spec on data ${dataIdx}`, function() {
          try {
            const type = ValidatorFactory.make(spec.spec, true);
            type.validate(data);
          } catch (e) {
            // do nothing
          }
        });
        dataIdx += 1;
      }
      dataIdx = 1;
      for (const testData of spec.failure) {
        it(`runs non-strict spec on failure data ${dataIdx}`, function() {
          const type = ValidatorFactory.make(spec.spec, false);
          type.validate(testData.data);
        });
        it(`fails to run strict spec on failure data ${dataIdx}`, function() {
          try {
            const type = ValidatorFactory.make(spec.spec, true);
            type.validate(testData.data);
          } catch (e) {
            const computed = turnArraysToSets((e as ValidationError).toJSON());
            const expected = turnArraysToSets(testData.failing);
            assert.deepStrictEqual(computed, expected);
          }
        });
        dataIdx += 1;
      }
    });
  }
});
