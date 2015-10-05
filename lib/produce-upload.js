'use strict';
module.exports = uploader;

var AwsSign = require('aws-sign');
var normalizeOptions = require('./normalize-options');
var validate = require('./schema-validation');
var decamelize = require('decamelize');
var url = require('url');
var assert = require('assert');
var forEach = require('for-each');
var now = require('date-now');

function uploader(opts) {
  opts = normalizeOptions(opts);

  var signer = new AwsSign({
    accessKeyId: opts.accessKeyId,
    secretAccessKey: opts.secretAccessKey
  });

  var prefix = opts.prefix;

  if (!prefix) {
    prefix = '';
  } else {
    prefix = withTrailingSlash(prefix);
  }

  var bucketUrl = opts.bucket.toLowerCase() + '.s3.amazonaws.com';
  // var verifyUrl = withTrailingSlash(opts.serverUrl) + 'verify';

  return {
    upload: createUploadBatchResponse,
    download: createDownloadBatchResponse
  };

  function createUploadBatchResponse(uploadRequest) {
    validate.request(uploadRequest, true);
    assert.strictEqual('upload', uploadRequest.operation);

    return {
      objects: uploadRequest.objects.map(makeUploadObjectResponse)
    };
  }

  function makeUploadObjectResponse(object) {
    return {
      oid: object.oid,
      size: object.size,
      actions: {
        upload: makeUploadLink(object.oid, object.size)
        /* ,
        verify: {
          href: verifyUrl
        }   */
      }
    };
  }

  function makeUploadLink(oid, size) {
    var requestDefinition = {
      method: 'PUT',
      protocol: 'https',
      host: bucketUrl,
      path: prefix + oid,
      pathname: prefix + oid,
      headers: {
        'content-type': '',
        'content-length': size,
        'date': new Date(now()).toGMTString()
      }
    };

    signer.sign(requestDefinition);

    var headers = {};

    forEach(requestDefinition.headers, function (v, k) {
      headers[decamelize(k, '-')] = v;
    });

    return {
      href: url.format(requestDefinition),
      headers: headers
    };
  }

  function createDownloadBatchResponse(downloadRequest) {
    validate.request(downloadRequest, true);
    assert.strictEqual('download', downloadRequest.operation);

    return {
      objects: downloadRequest.objects.map(makeDownloadObjectResponse)
    };
  }

  function makeDownloadObjectResponse(object) {
    return {
      oid: object.oid,
      size: object.size,
      actions: {
        download: makeDownloadLink(object.oid, object.size)
        /* ,
         verify: {
         href: verifyUrl
         }   */
      }
    };
  }

  function makeDownloadLink(oid, size) { // eslint-disable-line no-unused-vars
    var requestDefinition = {
      method: 'GET',
      protocol: 'https',
      host: bucketUrl,
      path: prefix + oid,
      pathname: prefix + oid,
      headers: {
        date: new Date(now()).toGMTString()
      }
    };

    signer.sign(requestDefinition);

    var headers = {};

    forEach(requestDefinition.headers, function (v, k) {
      headers[decamelize(k, '-')] = v;
    });

    return {
      href: url.format(requestDefinition),
      headers: headers
    };
  }
}

function withTrailingSlash(path) {
  return /\/$/.test(path) ? path : path + '/';
}
