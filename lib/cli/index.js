#!/usr/bin/env node

process.title = 'broccoli-taco';

var fs = require('fs');
var program = require('commander');

var serve = require('./serve');
var build = require('./build');
var newSite = require('./new');

module.exports = function () {
  program
    .version(JSON.parse(fs.readFileSync(__dirname + '/../../package.json', 'utf8')).version)
    .usage('[options] <command> [<args ...>]');

  program.command('serve')
    .description('start a broccoli-taco server')
    .option('--port <port>', 'the port to bind to [4200]', 4200)
    .option('--host <host>', 'the host to bind to [localhost]', 'localhost')
    .option('--live-reload-port <port>', 'the port to start LiveReload on [35729]', 35729)
    .action(serve);

  program.command('build <target>')
    .description('output files to target directory')
    .action(build);

  program.command('new <name>')
    .description('output files to target directory')
    .action(newSite);

  program.command('').action(function () {
    program.outputHelp();
    process.exit(1);
  });

  program.parse(process.argv);

  if(process.argv.length === 2) {
    program.outputHelp();
    process.exit(1);
  }
};

