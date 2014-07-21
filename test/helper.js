var mkdirp = require('mkdirp');
var chai = require('chai');

mkdirp.sync('test/tmp');

global.expect = chai.expect;

