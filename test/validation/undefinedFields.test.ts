import assert from 'assert';

import { ValidatorFactory } from '../../src/validation';

import { turnArraysToSets } from './test_utils';
import { stripUndefinedFields } from '../../src/validation/utils/undefinedFields';
import {
  HighLevelSpec,
  JSONDataArray,
  JSONDataObject,
  TypeNames,
} from '../../src/validation/declarations';
import { ValidationError } from '../../src/validation/errors/ValidationError';

const SPECS: Array<{
  spec: HighLevelSpec;
  data: JSONDataObject[][] | JSONDataArray[][];
}> = [
  {
    spec: {
      type: TypeNames.OBJECT,
      rules: [],
      schema: {
        a: {
          type: TypeNames.STRING,
          rules: ['required'],
        },
        b: {
          type: TypeNames.STRING,
          rules: ['required', 'nullable'],
        },
        c: {
          type: TypeNames.STRING,
          rules: ['nullable'],
        },
        d: {
          type: TypeNames.STRING,
          rules: [],
        },
      },
    },
    data: [
      [
        {},
        {
          a: undefined,
          b: undefined,
          c: undefined,
          d: undefined,
        },
      ],
      [
        {
          a: 'abc',
          c: undefined,
          d: undefined,
        },
        {
          a: 'abc',
          b: undefined,
        },
      ],
      [
        {
          a: undefined,
          c: undefined,
          d: 'abc',
        },
        {
          b: undefined,
          d: 'abc',
        },
      ],
    ],
  },
  {
    spec: {
      type: TypeNames.OBJECT,
      rules: [],
      schema: {
        contacts: {
          type: TypeNames.OBJECT,
          rules: ['required'],
          schema: {
            telephone: {
              type: 'phone',
              rules: ['nullable'],
            },
          },
        },
      },
    },
    data: [
      [
        {},
        {
          telephone: undefined,
        },
      ],
    ],
  },
  {
    spec: {
      type: TypeNames.OBJECT,
      rules: [],
      schema: {
        contacts: {
          type: TypeNames.OBJECT,
          rules: ['required'],
          schema: {
            telephone: {
              type: 'phone',
              rules: ['nullable'],
            },
            email: {
              type: 'email',
              rules: ['required'],
            },
          },
        },
      },
    },
    data: [
      [
        {},
        {
          telephone: undefined,
          email: undefined,
        },
      ],
      [
        {
          telephone: undefined,
        },
        {
          email: undefined,
        },
      ],
      [
        {
          email: 'abc@abc.abc',
        },
        {
          email: 'abc@abc.abc',
          telephone: undefined,
        },
      ],
      [
        {
          telephone: '+39 333 33 33 3333',
        },
        {
          telephone: '+39 333 33 33 3333',
          email: undefined,
        },
      ],
    ],
  },
  {
    spec: {
      type: TypeNames.ARRAY,
      rules: [],
      elements: {
        type: TypeNames.OBJECT,
        rules: [],
        schema: {
          a: {
            type: TypeNames.STRING,
            rules: ['required'],
          },
          b: {
            type: TypeNames.STRING,
            rules: ['required', 'nullable'],
          },
          c: {
            type: TypeNames.STRING,
            rules: ['nullable'],
          },
          d: {
            type: TypeNames.STRING,
            rules: [],
          },
        },
      },
    },
    data: [
      [
        [{}],
        [
          {
            a: undefined,
            b: undefined,
            c: undefined,
            d: undefined,
          },
        ],
      ],
      [
        [
          {
            a: 'abc',
            b: undefined,
            c: 'def',
            d: undefined,
          },
        ],
        [
          {
            a: 'abc',
            c: 'def',
          },
        ],
      ],
      [
        [
          {
            a: undefined,
            b: undefined,
          },
        ],
        [
          {
            c: undefined,
            d: undefined,
          },
        ],
      ],
    ],
  },
];

describe('Test that validation is the same when a field is undefined', () => {
  SPECS.forEach(({ spec, data }, idx) => {
    describe(`Test spec #${idx}`, () => {
      data.forEach(
        (
          [data1, _data2]: Array<JSONDataObject | JSONDataArray>,
          dataIdx: number
        ) => {
          it(`tests spec #${idx} on data #${dataIdx}`, () => {
            const validator = ValidatorFactory.make(spec);
            let errors1;
            let errors2;
            try {
              validator.validate(data1);
            } catch (e) {
              errors1 = turnArraysToSets(e.toJSON());
            }
            try {
              validator.validate(data1);
            } catch (e) {
              errors2 = turnArraysToSets(e.toJSON());
            }
            assert.deepStrictEqual(errors1, errors2);
          });
        }
      );
    });
  });
});

describe(`Test ${stripUndefinedFields.name} function`, () => {
  describe('Test validation specs data', () => {
    SPECS.forEach(({ data }, idx) => {
      data.forEach(
        (
          [data1, data2]: Array<JSONDataObject | JSONDataArray>,
          dataIdx: number
        ) => {
          it(`test equality between data #${dataIdx} of spec #${idx}`, () => {
            assert.notDeepStrictEqual(data1, data2);
            assert.deepStrictEqual(
              stripUndefinedFields(data1),
              stripUndefinedFields(data2)
            );
          });
        }
      );
    });
  });

  describe('Test expected outputs', () => {
    [
      {
        source: {
          a: 'abc',
          b: undefined,
        },
        expected: {
          a: 'abc',
        },
      },
      {
        source: {
          contacts: {
            telephone: undefined,
            email: 'abc@abc.abc',
          },
          name: 'John',
          surname: undefined,
        },
        expected: {
          contacts: {
            email: 'abc@abc.abc',
          },
          name: 'John',
        },
      },
      {
        source: {
          stuff: [
            {
              telephone: undefined,
            },
            {
              telephone: undefined,
              email: 'abc@abc.abc',
            },
            {
              telephone: undefined,
              email: undefined,
            },
            {
              telephone: '+39 333 33 33 3333',
              email: 'abc@abc.abc',
            },
          ],
          a: undefined,
          b: 'abc',
        },
        expected: {
          stuff: [
            {},
            {
              email: 'abc@abc.abc',
            },
            {},
            {
              telephone: '+39 333 33 33 3333',
              email: 'abc@abc.abc',
            },
          ],
          b: 'abc',
        },
      },
      {
        source: [
          {
            a: undefined,
            b: 'abc',
          },
          {
            a: 'abc',
            b: undefined,
          },
          {
            a: undefined,
            b: undefined,
          },
          {
            a: 'abc',
            b: 'def',
          },
        ],
        expected: [
          {
            b: 'abc',
          },
          {
            a: 'abc',
          },
          {},
          {
            a: 'abc',
            b: 'def',
          },
        ],
      },
    ].forEach(({ source, expected }, idx) => {
      describe(`Test expected output #${idx}`, () => {
        it(`checks that source and expected output differ`, () => {
          assert.notDeepStrictEqual(source, expected);
        });

        it(`tests that stripping undefined fields does not modify soruce object`, () => {
          const stripped = stripUndefinedFields(source);
          assert.notDeepStrictEqual(stripped, source);
        });

        it(`tests that output matches expected output`, () => {
          assert.deepStrictEqual(stripUndefinedFields(source), expected);
        });

        it(`tests that stripping undefined fields is equivalent to JSON serialization`, () => {
          assert.deepStrictEqual(
            stripUndefinedFields(source),
            JSON.parse(JSON.stringify(source))
          );
        });
      });
    });
  });
});

describe('Test undefined value', () => {
  it('tests undefined on primitive type', () => {
    const spec = {
      type: TypeNames.INTEGER,
      rules: ['min:0'],
    };

    let validator = ValidatorFactory.make(spec);

    assert.throws(() => validator.validate(undefined));

    try {
      validator.validate(undefined);
    } catch (e) {
      const expected = {
        errors: ['nullable'],
      };
      assert.deepStrictEqual(
        turnArraysToSets(e.toJSON()),
        turnArraysToSets(expected)
      );
    }

    validator = ValidatorFactory.make({
      ...spec,
      rules: spec.rules.concat(['nullable']),
    });

    assert.doesNotThrow(() => {
      validator.validate(undefined);
    });
  });

  it('tests undefined on object type', () => {
    const spec = {
      type: TypeNames.OBJECT,
      rules: [] as string[],
      schema: {
        a: {
          type: TypeNames.STRING,
          rules: [] as string[],
        },
      },
    };

    let validator = ValidatorFactory.make(spec);

    assert.throws(() => validator.validate(undefined));

    try {
      validator.validate(undefined);
    } catch (e) {
      const expected = {
        errors: ['nullable'],
        schema_errors: {},
      };
      assert.deepStrictEqual(
        turnArraysToSets(e.toJSON()),
        turnArraysToSets(expected)
      );
    }

    validator = ValidatorFactory.make({
      ...spec,
      rules: spec.rules.concat(['nullable']),
    });

    assert.doesNotThrow(() => {
      validator.validate(undefined);
    });
  });

  it('tests undefined on array type', () => {
    const spec = {
      type: TypeNames.ARRAY,
      rules: [] as string[],
      elements: {
        type: TypeNames.STRING,
        rules: [] as string[],
      },
    };

    let validator = ValidatorFactory.make(spec);

    assert.throws(() => validator.validate(undefined));

    try {
      validator.validate(undefined);
    } catch (e) {
      assert(e instanceof ValidationError, e);
      const expected = {
        errors: ['nullable'],
        elements_errors: [],
      };
      assert.deepStrictEqual(
        turnArraysToSets(e.toJSON()),
        turnArraysToSets(expected)
      );
    }

    validator = ValidatorFactory.make({
      ...spec,
      rules: spec.rules.concat(['nullable']),
    });

    assert.doesNotThrow(() => {
      validator.validate(undefined);
    });
  });
});
