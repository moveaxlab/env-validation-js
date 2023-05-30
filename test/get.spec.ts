import assert from 'assert';
import { asType } from '../src/declarations';

import { getFromContainer } from '../src/getFromContainer';

// eslint-disable-next-line
const vectors: { [key in asType]: any } = {
  asBase58: {
    valid: [
      {
        value: 'Q88wZgv6xXmdQYZc23d8RFS9SqTTmgzm96cGngNXf',
        expected: 'Q88wZgv6xXmdQYZc23d8RFS9SqTTmgzm96cGngNXf',
      },
      {
        value: 'Jp7ZU99nAZqKzUuAwkzhwAvMVr7Ad3M3JiCzzPgApu7u5weyhhAYFYrq',
        expected: 'Jp7ZU99nAZqKzUuAwkzhwAvMVr7Ad3M3JiCzzPgApu7u5weyhhAYFYrq',
      },
    ],
    invalid: ['eGN2Z2JkZmIgZmdiIGZnYiB4ZmdmbmdobmdobQ', 'aaaaaa@bbbbb.com'],
    nullValue: '',
  },
  asBase64: {
    valid: [
      {
        value: 'eGN2Z2JkZmIgZmdiIGZnYiB4ZmdmbmdobmdobQ==',
        expected: 'eGN2Z2JkZmIgZmdiIGZnYiB4ZmdmbmdobmdobQ==',
      },
      {
        value: 'ZUdOMloySmtabUlnWm1kaUlHWm5ZaUI0Wm1kbWJtZG9ibWRvYlE9PQ==',
        expected: 'ZUdOMloySmtabUlnWm1kaUlHWm5ZaUI0Wm1kbWJtZG9ibWRvYlE9PQ==',
      },
    ],
    invalid: [
      'http://www.example.org',
      'aaaaaa@bbbbb.com',
      'Is it future or is it past?',
    ],
    nullValue: '',
  },
  asBoolean: {
    valid: [
      {
        value: true,
        expected: true,
      },
      {
        value: 'true',
        expected: true,
      },
      {
        value: 'TRUE',
        expected: true,
      },
      {
        value: 'TrUe',
        expected: true,
      },
      {
        value: false,
        expected: false,
      },
      {
        value: 'false',
        expected: false,
      },
      {
        value: 'FALSE',
        expected: false,
      },
      {
        value: 'FaLsE',
        expected: false,
      },
    ],
    invalid: ['truthy', 'falsy', 1, 3.14, 'a', ''],
    nullValue: undefined,
  },
  asEmail: {
    valid: [
      {
        value: 'aaaaaa@bbbbb.com',
        expected: 'aaaaaa@bbbbb.com',
      },
      {
        value: 'aaaaa+bbbbb@ccccc.com',
        expected: 'aaaaa+bbbbb@ccccc.com',
      },
      {
        value: 'AaaAaa@bBbbB.cCc',
        expected: 'AaaAaa@bBbbB.cCc',
      },
    ],
    invalid: [
      'mailto:aaaa@bbbb.com',
      'maiLto:aaAA@bbBb.Com',
      'HELL GOD BABY DAMN NO!',
    ],
    nullValue: '',
  },
  asFloat: {
    valid: [
      {
        value: 1.2,
        expected: 1.2,
      },
      {
        value: '1.2',
        expected: 1.2,
      },
      {
        value: '0',
        expected: 0,
      },
      {
        value: '999000',
        expected: 999000,
      },
    ],
    invalid: ['abc', '9abc', '1239abcdef'],
    nullValue: undefined,
  },
  asInteger: {
    valid: [
      {
        value: '1',
        expected: 1,
      },
      {
        value: 1,
        expected: 1,
      },
      {
        value: '123456789',
        expected: 123456789,
      },
    ],
    invalid: ['abc', '9abc', '1239abcdef', '3.14', 3.14],
    nullValue: undefined,
  },
  asISO8601Date: {
    valid: [
      {
        value: '2018-09-29 00:00:00.000000',
        expected: '2018-09-29 00:00:00.000000',
      },
      {
        value: '2018-09-29 00:00:00',
        expected: '2018-09-29 00:00:00',
      },
      {
        value: '2010-01-01T05:06:07',
        expected: '2010-01-01T05:06:07',
      },
    ],
    invalid: ['2018-02-29', '29-09-2018', 'abc', 123],
    nullValue: '',
  },
  asString: {
    valid: [
      {
        value: 'abc',
        expected: 'abc',
      },
      {
        value: 'ABC',
        expected: 'ABC',
      },
      {
        value: 'mailto:def@ghi.com',
        expected: 'mailto:def@ghi.com',
      },
      {
        value: 'http://abc.com',
        expected: 'http://abc.com',
      },
      {
        value: '1',
        expected: '1',
      },
      {
        value: '2.14',
        expected: '2.14',
      },
      {
        value: 'true',
        expected: 'true',
      },
    ],
    invalid: [1, 1.2, true, null],
    nullValue: '',
  },
  asUrl: {
    valid: [
      {
        value: 'http://www.example.org',
        expected: 'http://www.example.org',
      },
      {
        value: 'ftp://google.com/example?a=10&b=20&c=true',
        expected: 'ftp://google.com/example?a=10&b=20&c=true',
      },
      {
        value: 'https://chainside.net/abcdef-ghijk/',
        expected: 'https://chainside.net/abcdef-ghijk/',
      },
    ],
    invalid: [
      'htt://example.com',
      'www.example.com',
      'mailto:aaaa@bbbb.com',
      'It Just Might Be a One-Shot Deal',
      2,
    ],
    nullValue: '',
  },
  asUuid: {
    valid: [
      {
        value: 'e4fd4922-9b47-4d97-b662-c014c8020ba8',
        expected: 'e4fd4922-9b47-4d97-b662-c014c8020ba8',
      },
      {
        value: 'd27651c6-95ca-4c0c-ba9e-9477d2b9484e',
        expected: 'd27651c6-95ca-4c0c-ba9e-9477d2b9484e',
      },
      {
        value: '3a61341b-2026-4e14-8754-12b9939ac4a3',
        expected: '3a61341b-2026-4e14-8754-12b9939ac4a3',
      },
      {
        value: '5273f4da-d93f-4a70-9aba-b6f7b35f5df4',
        expected: '5273f4da-d93f-4a70-9aba-b6f7b35f5df4',
      },
    ],
    invalid: [
      'Through the darkness of future past the Magician longs to see',
      2,
    ],
    nullValue: '',
  },
};

describe('Test getFromContainer', function() {
  (Object.keys(vectors) as asType[]).forEach(type => {
    describe(`test ${type}`, function() {
      it(`fails to get as non-nullable ${type} if no value and no default provided`, function() {
        const key = 'ABC';
        const container = {};
        assert.throws(() => {
          getFromContainer(container, key)[type]();
        });
      });

      if ('nullValue' in vectors[type]) {
        it(`gets as nullable ${type} if no value and no default provided`, function() {
          const key = 'ABC';
          const container = {};
          assert.strictEqual(
            getFromContainer(container, key)[type]('nullable'),
            vectors[type].nullValue
          );
        });
      }

      for (const valid of vectors[type].valid) {
        it(`gets ${valid.value} correctly ${type}`, function() {
          const key = 'ABC';
          const container = {
            [key]: valid.value,
          };
          assert.strictEqual(
            getFromContainer(container, key)[type](),
            valid.expected
          );
        });

        it(`gets ${valid.value} as default value for ${type}`, function() {
          const key = 'ABC';
          const container = {};
          assert.strictEqual(
            getFromContainer(container, key, valid.value)[type](),
            valid.expected
          );
        });
      }

      for (const invalid of vectors[type].invalid) {
        it(`fails to get ${invalid} with ${type}`, function() {
          const key = 'ABC';
          const container = {
            [key]: invalid,
          };
          assert.throws(() => {
            getFromContainer(container, key)[type]();
          });
        });
      }
    });
  });
});
