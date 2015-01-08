var path = require('path');
var BroccoliSaneWatcher = require('broccoli-sane-watcher');

var HELPERS_PATH_REGEX = /^helpers\//;
var DATA_PATH_REGEX = /data\.(js|json)$/;
var REQUIRABLE_REGEX = /\.(js|json)$/;

module.exports = SiteWatcher;
SiteWatcher.prototype = Object.create(BroccoliSaneWatcher.prototype);
SiteWatcher.prototype.constructor = SiteWatcher;
function SiteWatcher () {
  BroccoliSaneWatcher.apply(this, arguments);
  this.cwd = process.cwd();
}

SiteWatcher.prototype.onFileChanged = function (filepath) {
  this.clearRequireCache(filepath);
  BroccoliSaneWatcher.prototype.onFileChanged.apply(this, arguments);
};

SiteWatcher.prototype.clearRequireCache = function (filepath) {
  if (!REQUIRABLE_REGEX.test(filepath)) return;

  try {
    var requireFilepath = require.resolve(path.join(this.cwd, 'site', filepath));
    var toDelete;
    if (HELPERS_PATH_REGEX.test(filepath)) toDelete = requireFilepath;
    if (DATA_PATH_REGEX.test(filepath)) toDelete = requireFilepath;

    toDelete && delete require.cache[toDelete];
  } catch (e) {
    if ('MODULE_NOT_FOUND' !== e.code) throw e;
  }
};

