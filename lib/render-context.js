var path = require('path');
var RSVP = require('rsvp');
var Promise = RSVP.Promise;

var RenderContext = module.exports = function (options) {
  this.cwd = process.cwd();
  this.manifest = options.manifest;
  this.assetFiles = options.assetFiles.map(function (file) {
    return file.replace(/^pages\//, '');
  });
};

RenderContext.prototype.toPath = function (filename) {
  return path.join(this.cwd, 'site', 'pages', filename);
};

RenderContext.prototype.toData = function (filename) {
  try {
    filename = filename.substr(0, filename.lastIndexOf('.'));
    filename = filename.replace(/index$/, 'data');
    var data = require(this.toPath(filename));
    if ('object' === typeof data) return data;
    return Promise.resolve(data());
  } catch (e) {
    if ('MODULE_NOT_FOUND' !== e.code) {
      throw (e);
    }
  }
};

RenderContext.prototype.siteData = function () {
  var data = require(path.join(this.cwd, 'site', 'data'));
  if ('object' === typeof data) return data;
  return Promise.resolve(data());
};

RenderContext.prototype.pageAssets = function () {
  var manifest = this.manifest;
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

