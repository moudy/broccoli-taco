var fs       = require('fs');
var path     = require('path');
var ncp      = require('ncp').ncp;
var chalk    = require('chalk');
var walkSync = require('walk-sync');

ncp.limit = 1;

function isDir (name) {
  try {
    var stats = fs.lstatSync(name);
    return stats.isDirectory();
  } catch (e) {
    if ('ENOENT' === e.code) return false;
    throw e;
  }
}

function logCreated (files) {
  var output = files.map(function (file) {
    return chalk.green('  created')+' '+file;
  });
  output.unshift(chalk.cyan('Creating new site'));
  output.unshift('');
  console.log(output.join('\n'));
}

function logInstructions (siteName) {
  var output = [
  , chalk.cyan('Next steps')
  , '  1. Install dependencies: '+chalk.magenta('cd '+siteName+' && npm install')
  , '  2. Serve site for development: '+chalk.magenta('broccoli-taco serve')
  , '  3. Build site into folder: '+chalk.magenta('broccoli-taco build dist')
  , ''
  ];
  console.log(output.join('\n'));
}

function rewritePackage (siteName) {
  var modulePackage = require('../../package');
  var packagePath = path.join(process.cwd(), siteName, 'package.json');
  var package = require(packagePath);
  package.name = siteName;
  package.dependencies[modulePackage.name] = modulePackage.version;
  fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));
}

module.exports = function (siteName) {
  if (isDir(siteName)) {
    console.log(chalk.red("Directory '"+siteName+"' already exists."));
    process.exit(1);
  }
  var templatePath = path.join(__dirname, '..', '..', 'templates', 'default');
  var targetPath = path.join(process.cwd(), siteName);

  ncp(templatePath, targetPath, function (err) {
    if (err) return console.error(err);
    rewritePackage(siteName);
    logCreated(walkSync('./'+siteName));
    logInstructions(siteName);
  });
};
