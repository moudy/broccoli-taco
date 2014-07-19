var fs = require('fs');
var path = require('path');
var ncp = require('ncp').ncp;
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

module.exports = function (siteName) {
  if (isDir(siteName)) {
    console.log('Directory \'' + siteName + '\' already exists.\n');
    process.exit(1);
  }
  var templatePath = path.join(__dirname, '..', '..', 'templates', 'default');
  var targetPath = path.join(process.cwd(), siteName);

  ncp(templatePath, targetPath, function (err) {
    if (err) return console.error(err);
    console.log('run `cd '+siteName+' && npm install`');
  });
};
