var path = require('path');
var findup = require('findup-sync');
var exec = require('child_process').exec;

exports.getTestTmpPath = function () {
  return path.join(findup('test'), 'tmp');
};

exports.execCli = function (command, done) {
  process.chdir(exports.getTestTmpPath());
  exec('../../bin/broccoli-taco '+command, done);
};

exports.exec = function (command, done) {
  process.chdir(exports.getTestTmpPath());
  exec(command, done);
};

exports.macros = {
  exec: function (command) {
    return function (done) { exports.exec(command, done); };
  }
};


