'use strict';
var assert = require('assert');
var normalizeOptions = require('../lib/normalize-options.js');
var find = normalizeOptions.findAndValidateOption;

describe('normalize-options', function () {
  it('#findAndValidateOption', function () {
    assert.strictEqual(
      'ab',
      find({ab: 'ab'}, 'ab', 'ENV_OPT_AB', 'string'),
      'should find string property'
    );

    assert.strictEqual(
      null,
      find({ab: null}, 'ab', 'ENV_OPT_AB', 'string|null|undefined'),
      'should allow null using OR `|` symbol'
    );

    assert.strictEqual(
      undefined,
      find(undefined, 'ab', 'ENV_OPT_AB', 'string|null|undefined'),
      'should allow undefined using OR `|` symbol'
    );

    process.env.ENV_OPT_ABCD = 'abcd';
    assert.strictEqual(
      'abcd',
      find(undefined, 'abcd', 'ENV_OPT_ABCD', 'string')
    );

    assert.throws(function () {
      find({}, 'ab', 'ENV_OPT_AB', 'string');
    }, /string/);
  });
});

