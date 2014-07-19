var broccoli = require('broccoli');

module.exports = function () {
  var tree = broccoli.loadBrocfile();
  return new broccoli.Builder(tree);
};
