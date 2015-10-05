'use strict';
var assert = require('assert');
var validateRequest = require('../lib/schema-validation/validate-request.js');

describe('validate-request', function () {
  it('passes valid upload', function () {
    var validUpload = {
      operation: 'upload',
      objects: [
        {
          oid: '1111111',
          size: 123
        }
      ]
    };

    var validationResult = validateRequest(validUpload);

    assert.strictEqual(true, validationResult.valid);
    assert.deepEqual([], validationResult.errors);
  });

  it('throws if missing operation', function () {
    var invalidUpload = {
      objects: [
        {
          oid: '1111111',
          size: 123
        }
      ]
    };

    var validationResult = validateRequest(invalidUpload);

    assert.strictEqual(false, validationResult.valid);
    assert.strictEqual(1, validationResult.errors.length);
    assert(/requires.*operation/.test(validationResult.errors[0]), validationResult.errors[0].message);
  });
});
