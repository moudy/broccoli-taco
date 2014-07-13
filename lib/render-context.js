var path = require('path');

var MAIN_ASSET = /^(javascript|css)/;

var RenderContext = module.exports = function (options) {
  this.cwd = process.cwd();
  this.assetFiles = options.assetFiles;
  var data = require(path.join(this.cwd, 'data'));
  this.siteData = this.toValue(data);
};

RenderContext.prototype.toPath = function (filename) {
  return path.join(this.cwd, 'pages', filename);
};

RenderContext.prototype.toValue = function (object) {
  return ('function' === typeof object) ? object() : object;
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
  function getPath (str) {
    var parts = str.split('/');
    parts.pop();
    return parts.join('/');
  }

  var filepath = getPath(filename);

  return this.assetFiles.slice().filter(function (asset) {
    var assetpath = getPath(asset);
    return (MAIN_ASSET.test(asset) || assetpath === filepath);
  });
};

RenderContext.prototype.toJSON = function (filename) {
  return {
    assets: this.pageAssets(filename)
  , page: this.toData(filename)
  , site: this.siteData
  };
};


