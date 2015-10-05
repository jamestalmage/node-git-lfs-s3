'use strict';
var assert = require('assert');
var validateResponse = require('../lib/schema-validation/validate-response.js');

describe('validate-response', function () {
  it('allows a valid response', function () {
    var validResponse = {
      objects: [
        {
          oid: '1111111',
          size: 123,
          actions: {
            upload: {
              href: 'https://some-upload.com',
              header: {
                Key: 'value'
              }
            },
            verify: {
              href: 'https://some-callback.com',
              header: {
                Key: 'value'
              }
            }
          }
        }
      ]
    };

    var validationResult = validateResponse(validResponse);
    assert.strictEqual(true, validationResult.valid, 'should be valid');
  });
});
