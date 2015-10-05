'use exports';
// Test Options
module.exports = function () {
  return {
    accessKeyId: 'myAccessKeyId',
    secretAccessKey: 'secretAccessKey',
    bucket: 'myBucket',
    prefix: 'data',
    serverUrl: 'http://example.com:4000'
  };
};
