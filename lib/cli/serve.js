var broccoli = require('broccoli');
var Watcher = require('../watcher');
var getBuilder = require('./get-builder');

module.exports = function(options) {
  var builder = getBuilder();
  options.watcher = new Watcher(builder, {verbose: true});
  broccoli.server.serve(builder, options);
};
