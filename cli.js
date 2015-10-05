#!/usr/bin/env node
'use strict';
var meow = require('meow');
var gitLfsS3 = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ git-lfs-s3 [input]',
    '',
    'Options',
    '  --foo  Lorem ipsum. [Default: false]',
    '',
    'Examples',
    '  $ git-lfs-s3',
    '  unicorns & rainbows',
    '  $ git-lfs-s3 ponies',
    '  ponies & rainbows'
  ]
});

console.log(gitLfsS3(cli.input[0] || 'unicorns'));
