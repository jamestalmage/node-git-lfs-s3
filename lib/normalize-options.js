'use strict';
normalizeOptions.findAndValidateOption = findAndValidateOption;
module.exports = normalizeOptions;
var assert = require('assert');

function normalizeOptions(options) {
  function n(property, env, type) {
    return findAndValidateOption(options, property, env, type);
  }

  return {
    accessKeyId: n('accessKeyId', 'AWS_ACCESS_KEY_ID', 'string'),
    secretAccessKey: n('secretAccessKey', 'AWS_SECRET_ACCESS_KEY', 'string'),
    bucket: n('bucket', 'AWS_BUCKET', 'string'),
    prefix: n('prefix', 'AWS_PREFIX', 'string|null|undefined')
  };
}

function findAndValidateOption(options, property, env, type) {
  var value = options && options[property];
  if (value === null || value === undefined) {
    var envVar = process.env[env];
    if (envVar !== null && envVar !== undefined) {
      value = envVar;
    }
  }
  if (type) {
    var valueType = typeof value;
    if (value === null) {
      valueType = 'null';
    } else if (value === undefined) {
      valueType = 'undefined';
    }
    if (type.split('|').indexOf(valueType) === -1) {
      assert.fail('expected ' + property + ' to be ' + type + '. got: ' + JSON.stringify(value));
    }
  }
  return value;
}

