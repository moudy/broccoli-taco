var path = require('path');
var RSVP = require('rsvp');
var Promise = RSVP.Promise;

var RenderContext = module.exports = function (options) {
  this.cwd = process.cwd();
  this.manifest = options.manifest;
};

RenderContext.prototype.toPath = function (filename) {
  return path.join(this.cwd, 'site', 'pages', filename);
};

RenderContext.prototype.toData = function (filename) {
  filename = filename.substr(0, filename.lastIndexOf('.'));
  filename = filename.replace(/index$/, 'data');
  return this.getData(this.toPath(filename));
};

RenderContext.prototype.getData = function (path) {
  try {
    var data = require(path);
    if ('object' === typeof data) return data;
    return Promise.resolve(data());
  } catch (e) {
    if ('MODULE_NOT_FOUND' !== e.code) throw (e);
  }
};

RenderContext.prototype.siteData = function () {
  return this.getData(path.join(this.cwd, 'site', 'data'));
};

RenderContext.prototype.pageAssets = function () {
  var manifest = this.manifest;
  if (!manifest) return {};
  manifest = path.join(manifest.tmpDestDir, manifest.name);
  return require(manifest);
};

RenderContext.prototype.toJSON = function (filename) {
  return RSVP.hash({
    assets: this.pageAssets(filename)
  , page: this.toData(filename)
  , site: this.siteData()
  , filename: filename
  });
};

