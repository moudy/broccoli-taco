var path = require('path');
var RSVP = require('rsvp');
var Promise = RSVP.Promise;

var RenderContext = module.exports = function (options) {
  this.cwd = process.cwd();
  this.manifest = options.manifest;
  this.basePath = options.basePath;
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

RenderContext.prototype.pageData = function (filename) {
  filename = filename
    .substr(0, filename.lastIndexOf('.'))
    .replace(/index$/, 'data');
  return this.getData(path.join(this.cwd, 'site/pages', filename));
};

RenderContext.prototype.assetsData = function () {
  var manifest = this.manifest;
  if (!manifest) return {};
  manifest = path.join(manifest.tmpDestDir, manifest.name);
  return require(manifest);
};

RenderContext.prototype.toJSON = function (filename) {
  return RSVP.hash({
    assets: this.assetsData(filename)
  , page: this.pageData(filename)
  , site: this.siteData()
  , filename: filename
  , basePath: this.basePath
  });
};

