var fs = require('fs');
var RSVP = require('rsvp');
var ncp = require('ncp');
ncp.limit = 1;

var getBuilder = require('./get-builder');

module.exports = function(outputDir) {
  var builder = getBuilder();
  builder.build().then(function (hash) {
    try {
      fs.mkdirSync(outputDir);
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
      console.error('Error: Directory "' + outputDir + '" already exists. Refusing to overwrite files.');
      process.exit(1);
    }
    var dir = hash.directory;
    return RSVP.denodeify(ncp)(dir, outputDir, {
      clobber: false
    , stopOnErr: true
    , dereference: true
    });
  }).finally(function () {
    builder.cleanup();
  }).then(function () {
    process.exit(0);
  }).catch(function (err) {
    // Should show file and line/col if present
    if (err.file) console.error('File: ' + err.file);
    console.error(err.stack);
    console.error('\nBuild failed');
    process.exit(1);
  });
};

