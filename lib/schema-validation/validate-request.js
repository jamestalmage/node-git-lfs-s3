'use strict';
module.exports = validateRequest;
var requestSchema = require('./http-v1-batch-request-schema.json');
var validate = require('jsonschema').validate;

function validateRequest(obj, throwError) {
  return validate(obj, requestSchema, {throwError: throwError});
}
