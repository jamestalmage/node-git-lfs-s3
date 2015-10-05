'use strict';
module.exports = sampleUploadRequest;

function sampleUploadRequest() {
  return {
    operation: 'upload',
    objects: [
      {
        oid: '1111111',
        size: 123
      }
    ]
  };
}
