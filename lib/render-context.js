var path = require('path');
var RSVP = require('rsvp');

var RenderContext = module.exports = function (options) {
  this.cwd = process.cwd();
  this.manifest = options.manifest;
  this.assetFiles = options.assetFiles.map(function (file) {
    return file.replace(/^pages\//, '');
  });
  var data = require(path.join(this.cwd, 'site', 'data'));
  this.siteData = this.toValue(data);
};

RenderContext.prototype.toPath = function (filename) {
  return path.join(this.cwd, 'site', 'pages', filename);
};

RenderContext.prototype.toValue = function (object) {
  return ('function' === typeof object) ? (object()) : object;
};

RenderContext.prototype.toData = function (filename) {
  try {
    filename = filename.substr(0, filename.lastIndexOf('.'));
    filename = filename.replace(/index$/, 'data');
    var data = require(this.toPath(filename));
    return this.toValue(data);
  } catch (e) {
    if ('MODULE_NOT_FOUND' !== e.code) {
      throw (e);
    }
  }
};

RenderContext.prototype.pageAssets = function (filename) {
  var manifest = this.manifest;
  manifest = path.join(manifest.tmpDestDir, manifest.name);
  return require(manifest);
};

RenderContext.prototype.toJSON = function (filename) {
  return RSVP.hash({
    assets: this.pageAssets(filename)
  , page: this.toData(filename)
  , site: this.siteData
  , filename: filename
  });
};

