var assert = require('assert');
var sampleOptions = require('./lib/sample-options');
var sampleUpload = require('./lib/sample-upload-request');
var sampleDownload = require('./lib/sample-download-request');
var proxyquire = require('proxyquire').noCallThru();
var MUT = '../lib/produce-upload.js';

describe('produce-upload', function () {
  it('sample upload', function () {
    var produceUpload = proxyquire(MUT, {
      'date-now': function () {
        return Date.parse('Mon, 05 Oct 2015 08:20:24 GMT');
      }
    });

    var uploadProducer = produceUpload(sampleOptions());

    var result = uploadProducer.upload(sampleUpload());

    assert.deepEqual(
      result,
      {
        objects: [
          {
            oid: '1111111',
            size: 123,
            actions: {
              upload: {
                href: 'https://mybucket.s3.amazonaws.com/data/1111111',
                headers: {
                  'content-type': '',
                  'content-length': 123,
                  'date': 'Mon, 05 Oct 2015 08:20:24 GMT',
                  'authorization': 'AWS myAccessKeyId:DJQ48Ergf7gNL8eAxjGn1rTFG1M='
                }
              }
            }
          }
        ]
      }
    );
  });

  it('sample download', function () {
    var produceUpload = proxyquire(MUT, {
      'date-now': function () {
        return Date.parse('Mon, 05 Oct 2015 08:20:24 GMT');
      }
    });

    var uploadProducer = produceUpload(sampleOptions());

    var result = uploadProducer.download(sampleDownload());

    assert.deepEqual(
      result,
      {
        objects: [
          {
            oid: '1111111',
            size: 123,
            actions: {
              download: {
                href: 'https://mybucket.s3.amazonaws.com/data/1111111',
                headers: {
                  date: 'Mon, 05 Oct 2015 08:20:24 GMT',
                  authorization: 'AWS myAccessKeyId:YsyYCIRPb60mQ8MRYAWztB45S/s='
                }
              }
            }
          }
        ]
      }
    );
  });
});
