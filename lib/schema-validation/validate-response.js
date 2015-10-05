'use strict';
module.exports = validateResponse;
var responseSchema = require('./http-v1-batch-response-schema.json');
var validate = require('jsonschema').validate;

function validateResponse(obj, throwError) {
  return validate(obj, responseSchema, {throwError: throwError});
}
